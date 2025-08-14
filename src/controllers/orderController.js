import { getStudentByOpenPayId } from '../models/studentModel.ts';
import {
  getOrdersByMatricula,
  getAvailableMonths,
  updateOrders,
  cancelOrdersPaymentData,
  getAllOrdersForSurcharge,
  updateOrderSurcharge
} from '../models/orderModel.ts';
import {
  getCustomer,
  createCharge,
  createDirectCharge,
  createChargeRequestWithSurcharge,
  getChargeStatusByOrderId
} from '../services/openpayService.js';
import {
  sendOrderConfirmationMessage,
  sendPaymentLinkMessage,
  formatMexicanPhoneNumber
} from '../services/whatsappService.js';
import {
  formatPaymentDate,
  formatMonthYear,
  formatCurrencyMX,
  getCurrentFormattedDate,
  createDueDateISO,
  generateUniqueOrderId,
  processOrderDates
} from '../services/formatService.js';
import { sendMailOtp, sendPaymentConfirmationEmail } from '../utils/sendEmail.ts';

export const createPaymentLink = (req, res, next) => {
  const { customer, description, enrollment } = req.body;

  const chargeRequest = {
    method: "card",
    amount: 1500,
    description,
    order_id: enrollment,
    customer,
    send_email: true,
    confirm: false,
  };

  createDirectCharge(chargeRequest)
    .then(order => {
      res.json({ payment_url: order.payment_method.url || "No se generó un link de pago" });
    })
    .catch(error => {
      res.status(400).json({ error: error.description });
    });
};

export const createPaymentLinkIdCustomer = async (req, res, next) => {
  const { customer_id, description } = req.body;

  try {
    const customerData = await getCustomer(customer_id);
    const orderId = `${customerData.external_id}-${generateUniqueOrderId()}`;
    const dueDate = createDueDateISO(1);

    const chargeRequest = createChargeRequestWithSurcharge(
      1500,
      description,
      orderId,
      dueDate
    );

    const order = await createCharge(customerData.id, chargeRequest);

    res.json({ payment_url: order.payment_method?.url || "No se generó un link de pago" });

    // Enviar WhatsApp
    const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
    const customerPhone = formatMexicanPhoneNumber(customerData.phone_number);

    if (customerPhone && paymentUrl !== "No se generó un link de pago") {
      try {
        await sendOrderConfirmationMessage(customerPhone, paymentUrl);
      } catch (whatsappError) {
        console.error("Error enviando WhatsApp:", whatsappError);
      }
    }

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const createPaymentLinkStudent = async (req, res, next) => {
  const {
    customer_id,
    description,
    amount,
    pedidoIds,
    fechaVigencia,
    pedidosSeleccionados
  } = req.body;

  try {
    const student = await getStudentByOpenPayId(customer_id);

    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    // Función para generar concepto dinámico
    const generarConcepto = (pedidos) => {
      const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      if (pedidos.length === 1) {
        const pedido = pedidos[0];
        const nombreMes = meses[pedido.mes - 1] || "Mes desconocido";
        return `Pago de ${nombreMes} ${pedido.anio}`;
      } else {
        // Para múltiples pagos, listar todos los meses
        const mesesUnicos = [...new Set(pedidos.map(p => p.mes))].sort((a, b) => a - b);
        const nombresMeses = mesesUnicos.map(mes => meses[mes - 1] || "Mes desconocido");
        const anio = pedidos[0].anio;

        if (nombresMeses.length === 1) {
          return `Pago de ${nombresMeses[0]} ${anio}`;
        } else if (nombresMeses.length === 2) {
          return `Pago de ${nombresMeses[0]} y ${nombresMeses[1]} ${anio}`;
        } else {
          const ultimoMes = nombresMeses.pop();
          return `Pago de ${nombresMeses.join(", ")} y ${ultimoMes} ${anio}`;
        }
      }
    };

    const concepto = generarConcepto(pedidosSeleccionados);

    const orderId = `${student.matricula}-${generateUniqueOrderId()}`;

    const chargeRequest = {
      method: "card",
      amount,
      description: concepto,
      order_id: orderId,
      send_email: true,
      confirm: false,
      redirect_url: "http://inecestudiantes.s3-website-us-east-1.amazonaws.com/",
      due_date: fechaVigencia,
    };

    const order = await createCharge(customer_id, chargeRequest);
    const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
    const customerPhone = formatMexicanPhoneNumber(student.celular);
    const nameFull = `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`;

    // Actualizar pedidos
    const actualizar = {
      identificador_pago: order.order_id,
      link_de_pago: paymentUrl,
      transaccion_Id: order.id
    };

    try {
      await updateOrders(pedidoIds, actualizar);
    } catch {
      return res.status(500).json({ error: "Error al actualizar los pedidos." });
    }

    // Enviar WhatsApp
    if (customerPhone) {
      try {
        await sendPaymentLinkMessage(fechaVigencia, paymentUrl, nameFull, customerPhone, student.matricula);
      } catch (whatsappError) {
        console.error("Error enviando WhatsApp:", whatsappError);
      }
    }

    // Enviar email
    const creaFecha = getCurrentFormattedDate();
    sendMailOtp(student.matricula, creaFecha, fechaVigencia, pedidosSeleccionados, paymentUrl, student.email);

    res.json({ payment_url: paymentUrl });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const processCharge = async (req, res) => {
  try {
    const {
      customer_id,
      token,
      amount,
      description,
      orderId,
      deviceSessionId,
      pedidoIds,
    } = req.body;

    const charge = await createChargeWithCard(
      customer_id, token, amount, description, orderId, deviceSessionId, pedidoIds
    );

    res.status(200).json({ success: true, charge });

  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const createChargeWithCard = async (customerId, token, amount, description, orderId, deviceSessionId, ids) => {
  try {
    let cardId = token;

    const chargeRequest = {
      source_id: cardId,
      method: 'card',
      amount: amount,
      description: description,
      order_id: `${orderId}-${generateUniqueOrderId()}`,
      currency: 'MXN',
      device_session_id: deviceSessionId
    };

    const charge = await createCharge(customerId, chargeRequest);

    const actualizar = {
      identificador_pago: charge.order_id,
      link_de_pago: charge.authorization,
      transaccion_Id: charge.id
    };

    await updateOrders(ids, actualizar);

    // Si el pago fue exitoso, enviar email de confirmación
    if (charge && (charge.status === 'completed' || charge.status === 'COMPLETED')) {
      try {
        // Obtener datos del estudiante
        const student = await getStudentByOpenPayId(customerId);

        // Obtener los pedidos pagados
        const pedidosPagados = await getOrdersByMatricula(student.matricula, null);
        const pedidosSeleccionados = pedidosPagados.filter(pedido => ids.includes(pedido.id_pedido));

        // Enviar email de confirmación
        await sendPaymentConfirmationEmail(
          student.matricula,
          pedidosSeleccionados,
          charge.id,
          amount,
          student.email
        );

        console.log(`Email de confirmación enviado a ${student.email} para la transacción ${charge.id}`);
      } catch (emailError) {
        console.error('Error al enviar email de confirmación:', emailError);
        // No fallar el pago por error en el email
      }
    }

    return { charge };
  } catch (error) {
    throw error;
  }
};

export const getStudentOrdersActivity = async (req, res, next) => {
  const { matricula } = req.body;

  try {
    const pedidos = await getOrdersByMatricula(matricula, 'completed');
    const meses = await getAvailableMonths(matricula);
    const pedidosFormateados = await formatOrders(pedidos);
    const pedidosAgrupados = groupOrdersByPaymentId(pedidosFormateados);

    res.json({
      pedidos: pedidosAgrupados,
      mesesDisponibles: meses
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCancelOrdersData = async (req, res, next) => {
  const { pedidosConLinks, pedidosComp } = req.body;

  try {
    // Extraer IDs de los pedidos con links de pago
    const pedidoIds = pedidosConLinks.flatMap(grupo =>
      grupo.pedidos ? grupo.pedidos.map(p => p.id_pedido) : [grupo.id_pedido]
    ).filter(id => id);

    if (pedidoIds.length === 0) {
      return res.status(400).json({ message: 'No se encontraron pedidos válidos para cancelar' });
    }

    await cancelOrdersPaymentData(pedidoIds);

    // Obtener los pedidos actualizados
    const matricula = pedidosConLinks[0]?.matricula ||
      (pedidosConLinks[0]?.pedidos && pedidosConLinks[0].pedidos[0]?.matricula);

    if (!matricula) {
      return res.status(400).json({ message: 'No se pudo determinar la matrícula' });
    }

    const pedidosActualizados = await getOrdersByMatricula(matricula, 'pending');
    const pedidosProcesados = pedidosActualizados.map(processOrderDates);

    res.json(pedidosProcesados);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const formatOrders = async (orders) => {
  return Promise.all(orders.map(async (order) => {
    const monto = order.monto_real_pago;
    const fechaFormateada = formatPaymentDate(order.fecha_pago);
    const openpayStatus = await getChargeStatusByOrderId(order.open_pay_id, order.identificador_pago);
    const mesAnio = formatMonthYear(order.mes, order.anio);

    return {
      numero: order.identificador_pago || 'N/A',
      pago: mesAnio,
      fecha: fechaFormateada,
      monto: formatCurrencyMX(monto),
      factura: order.transaccion_Id ? 'Descargar' : 'Sin factura',
      card: {
        card_brand: openpayStatus?.card?.brand || 'N/A',
        card_number: openpayStatus?.card?.card_number || 'N/A',
        card_id: openpayStatus?.card?.id || 'N/A'
      }
    };
  }));
};

export const groupOrdersByPaymentId = (pedidos) => {
  const grupos = {};

  pedidos.forEach(pedido => {
    if (!grupos[pedido.numero]) {
      grupos[pedido.numero] = {
        numero: pedido.numero,
        conceptos: [],
        fecha: pedido.fecha,
        montoTotal: 0,
        factura: pedido.factura,
        card: pedido.card,
        detalles: []
      };
    }

    grupos[pedido.numero].conceptos.push(pedido.pago);
    grupos[pedido.numero].montoTotal = parseFloat(pedido.monto.replace('$', '').replace(/,/g, ''));
    grupos[pedido.numero].detalles.push(pedido);
  });

  return Object.values(grupos).map(grupo => ({
    numero: grupo.numero,
    pago: grupo.conceptos.join(', '),
    fecha: grupo.fecha,
    monto: formatCurrencyMX(grupo.montoTotal),
    factura: grupo.factura,
    card: grupo.card,
    cantidadConceptos: grupo.conceptos.length,
    pedidosDetail: grupo.detalles
  }));

  return groupedOrders;
};

// Nueva función para calcular recargos correctamente
// Lógica: cada mes mantiene su monto base, cuando se vence un mes se aplica 10% a los siguientes
// Ejemplo: mayo-1500, junio-1650, julio-1815, agosto-1996.5
// Nueva función que calcula recargos considerando todo el ciclo
// Esta es la implementación correcta de la lógica de negocio
export function calculateSurchargeForCycle(pedidos, fechaActual) {
  const pedidosAgrupados = {};
  
  // Agrupar pedidos por ciclo
  pedidos.forEach(pedido => {
    if (!pedidosAgrupados[pedido.ciclo]) {
      pedidosAgrupados[pedido.ciclo] = [];
    }
    pedidosAgrupados[pedido.ciclo].push(pedido);
  });

  const resultados = [];

  Object.keys(pedidosAgrupados).forEach(cicloKey => {
    const ciclo = pedidosAgrupados[cicloKey];
    
    // Ordenar por año y mes
    ciclo.sort((a, b) => {
      if (a.anio !== b.anio) return a.anio - b.anio;
      return a.mes - b.mes;
    });

    // Calcular montos acumulativos para todo el ciclo
     const baseAmount = 1500;
     const surchargeRate = 0.10;
     const montos = [];
     
     // El primer mes del ciclo siempre mantiene el monto base
     montos.push(baseAmount);
     
     // Calcular secuencialmente cada mes del ciclo
     for (let i = 1; i < ciclo.length; i++) {
       const pedidoAnterior = ciclo[i - 1];
       const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
       
       if (fechaVencimientoAnterior < fechaActual) {
         // El mes anterior está vencido, aplicar 10% al monto del mes anterior
         const montoAnterior = montos[i - 1];
         const nuevoMonto = montoAnterior * (1 + surchargeRate);
         montos.push(Math.round(nuevoMonto * 100) / 100);
       } else {
         // El mes anterior no está vencido, mantener monto base
         montos.push(baseAmount);
       }
     }

    // Asignar montos calculados a cada pedido
     ciclo.forEach((pedidoActual, index) => {
       const montoActual = parseFloat(pedidoActual.pago);
       const yaTieneRecargo = montoActual > baseAmount;
       const montoFinal = montos[index];
      
      // Contar recargos aplicados
      let recargosAplicados = 0;
      for (let i = 0; i < index; i++) {
        const pedidoAnterior = ciclo[i];
        const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
        if (fechaVencimientoAnterior < fechaActual) {
          recargosAplicados++;
        }
      }
      
      resultados.push({
        ...pedidoActual,
        montoOriginal: montoActual,
        montoConRecargo: montoFinal,
        recargosAplicados,
        yaTeniaRecargo: yaTieneRecargo
      });
    });
  });
  
  return resultados;
}

// Función legacy - mantener para compatibilidad pero ya no se usa
export function calculateSurchargeForOrder(montoOriginal, fechaVencimiento, fechaActual) {
  // El monto base siempre se mantiene para el mes actual
  let montoFinal = montoOriginal;
  
  // Si la fecha de vencimiento aún no ha pasado, no hay recargo
  if (fechaVencimiento >= fechaActual) {
    return { monto: montoFinal, fecha: fechaVencimiento };
  }
  
  // NOTA: Esta función ahora requiere contexto del ciclo completo para funcionar correctamente
  // Por ahora, mantenemos la lógica anterior como fallback
  // TODO: Implementar calculateSurchargeForCycle que considere todos los meses del ciclo
  
  let fechaProximaVigencia = new Date(fechaVencimiento);
  
  // Mover inmediatamente al siguiente mes para aplicar el primer recargo
  const primerMesRecargo = fechaProximaVigencia.getMonth() + 1;
  const primerAnioRecargo = fechaProximaVigencia.getFullYear() + (primerMesRecargo > 11 ? 1 : 0);
  const primerMesAjustado = primerMesRecargo > 11 ? 0 : primerMesRecargo;
  
  fechaProximaVigencia = new Date(primerAnioRecargo, primerMesAjustado, 15);
  
  // Calcular cuántos períodos de recargo han pasado desde el mes siguiente
  while (fechaProximaVigencia < fechaActual) {
    // Aplicar recargo del 10%
    montoFinal = Math.round((montoFinal * 1.10) * 100) / 100;
    
    // Mover la fecha al 15 del siguiente mes
    const siguienteMes = fechaProximaVigencia.getMonth() + 1;
    const siguienteAnio = fechaProximaVigencia.getFullYear() + (siguienteMes > 11 ? 1 : 0);
    const mesAjustado = siguienteMes > 11 ? 0 : siguienteMes;
    
    fechaProximaVigencia = new Date(siguienteAnio, mesAjustado, 15);
  }
  
  return { monto: montoFinal, fecha: fechaProximaVigencia };
}
