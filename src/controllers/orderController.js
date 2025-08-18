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
    const studentArray = await getStudentByOpenPayId(customer_id);

    if (!studentArray || studentArray.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    // Obtener el primer estudiante del array
    const student = studentArray[0];

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

    // Validar y formatear la fecha de vencimiento para OpenPay
    let dueDateFormatted;
    const now = new Date();

    if (fechaVigencia && typeof fechaVigencia === 'string') {
      // Si viene como string (ej: "2025-05-16"), convertir a fecha con hora específica
      const targetDate = new Date(fechaVigencia);

      if (!isNaN(targetDate.getTime())) {
        // Establecer hora a las 23:59:59 del día especificado
        targetDate.setHours(23, 59, 59, 999);

        // Verificar que la fecha sea en el futuro (al menos 1 hora desde ahora)
        const oneHourFromNow = new Date(now.getTime() + (60 * 60 * 1000));

        if (targetDate > oneHourFromNow) {
          dueDateFormatted = targetDate.toISOString();
        } else {
          // Si la fecha es muy cercana o en el pasado, usar 24 horas desde ahora
          const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
          tomorrow.setHours(23, 59, 59, 999);
          dueDateFormatted = tomorrow.toISOString();
        }
      } else {
        // Si no es válida, usar 24 horas desde ahora
        const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
        tomorrow.setHours(23, 59, 59, 999);
        dueDateFormatted = tomorrow.toISOString();
      }
    } else {
      // Si no viene fechaVigencia o no es string, usar 24 horas desde ahora
      const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
      tomorrow.setHours(23, 59, 59, 999);
      dueDateFormatted = tomorrow.toISOString();
    }



    const chargeRequest = {
      method: "card",
      amount,
      description: concepto,
      order_id: orderId,
      send_email: true,
      confirm: false,
      redirect_url: "http://inecestudiantes.s3-website-us-east-1.amazonaws.com/",
      due_date: dueDateFormatted,
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

    try {
      await sendMailOtp(student.matricula, creaFecha, fechaVigencia, pedidosSeleccionados, paymentUrl, student.email);
    } catch (emailError) {
      console.error(`Error al enviar email con enlace de pago para estudiante ${student.matricula}:`, emailError);
      // No fallar la creación del enlace por error en el email
    }

    res.json({ payment_url: paymentUrl });

  } catch (error) {
    console.error(error);

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
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] 💳 PAGO COMPLETADO EXITOSAMENTE - Iniciando proceso de notificación`);
      console.log(`[${timestamp}] 💳 Charge ID: ${charge.id}`);
      console.log(`[${timestamp}] 💳 Order ID: ${charge.order_id}`);
      console.log(`[${timestamp}] 💳 Status: ${charge.status}`);
      console.log(`[${timestamp}] 💳 Amount: $${amount}`);

      try {
        console.log(`[${timestamp}] 🔍 Obteniendo datos del estudiante...`);
        // Obtener datos del estudiante
        const studentResult = await getStudentByOpenPayId(customerId);

        if (!studentResult || studentResult.length === 0) {
          console.error(`[${timestamp}] ❌ No se encontró estudiante con customer_id: ${customerId}`);
          throw new Error('Estudiante no encontrado');
        }

        const student = studentResult[0]; // getStudentByOpenPayId devuelve un array
        console.log(`[${timestamp}] 👤 Estudiante encontrado: ${student.matricula} - ${student.email}`);

        console.log(`[${timestamp}] 📋 Obteniendo pedidos pagados...`);
        // Obtener los pedidos pagados
        const pedidosPagados = await getOrdersByMatricula(student.matricula, null);
        const pedidosSeleccionados = pedidosPagados.filter(pedido => ids.includes(pedido.id_pedido));
        console.log(`[${timestamp}] 📋 Pedidos seleccionados para notificación: ${pedidosSeleccionados.length}`);

        console.log(`[${timestamp}] 📧 Iniciando envío de email de confirmación...`);
        // Enviar email de confirmación
        await sendPaymentConfirmationEmail(
          student.matricula,
          pedidosSeleccionados,
          charge.id,
          amount,
          student.email
        );

        console.log(`[${timestamp}] ✅ PROCESO DE NOTIFICACIÓN COMPLETADO EXITOSAMENTE`);
        console.log(`[${timestamp}] 📧 Email enviado a: ${student.email}`);
        console.log(`[${timestamp}] 💳 Transacción: ${charge.id}`);
      } catch (emailError) {
        console.error(`[${timestamp}] ❌ ERROR EN PROCESO DE NOTIFICACIÓN:`);
        console.error(`[${timestamp}] 💳 Charge ID: ${charge.id}`);
        console.error(`[${timestamp}] 👤 Customer ID: ${customerId}`);
        console.error(`[${timestamp}] 📧 Error details:`, emailError);
        // No fallar el pago por error en el email
        console.log(`[${timestamp}] ⚠️  El pago fue exitoso pero falló la notificación por email`);
      }
    } else {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ⚠️  PAGO NO COMPLETADO - No se enviará email de confirmación`);
      console.log(`[${timestamp}] 💳 Charge status: ${charge?.status || 'undefined'}`);
      console.log(`[${timestamp}] 💳 Charge ID: ${charge?.id || 'undefined'}`);
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

  // Convertir fechaActual a horario de México (GMT-6)
  const fechaActualMexico = new Date(fechaActual.getTime() - (6 * 60 * 60 * 1000));

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

    // Ordenar por año y mes cronológicamente
    ciclo.sort((a, b) => {
      if (a.anio !== b.anio) return a.anio - b.anio;
      return a.mes - b.mes;
    });

    // Identificar el primer mes del ciclo (el mes más temprano en la secuencia)
    // Este será el mes base que debe mantener $1500
    const primerMesCiclo = ciclo[0].mes;
    const primerAnioCiclo = ciclo[0].anio;

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

      // Convertir fecha de vencimiento a horario de México
      const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.getTime() - (6 * 60 * 60 * 1000));

      // El recargo se aplica el día 16 del mes de vencimiento del pedido anterior a primera hora (00:00:01)
      // Por lo tanto, el día 15 completo (hasta 23:59:59) es válido para pagar sin recargos
      const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);

      if (fechaActualMexico >= fechaLimiteRecargo) {
        // El mes anterior está vencido (ya pasó el día 15 de su mes de vencimiento), aplicar 10% al monto del mes anterior
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

      // SOLO procesar pedidos pendientes (estatus 3) para aplicar recargos
      // Los pedidos pagados (estatus 1) o cancelados (estatus 2) se incluyen en el cálculo
      // pero no se modifican
      const esPendiente = pedidoActual.id_cat_estatus === 3;

      // Contar recargos aplicados
      let recargosAplicados = 0;
      for (let i = 0; i < index; i++) {
        const pedidoAnterior = ciclo[i];
        const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
        const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.getTime() - (6 * 60 * 60 * 1000));
        const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);

        if (fechaActualMexico >= fechaLimiteRecargo) {
          recargosAplicados++;
        }
      }

      // Solo incluir en resultados si es pendiente Y necesita actualización
      if (esPendiente) {
        resultados.push({
          ...pedidoActual,
          montoOriginal: montoActual,
          montoConRecargo: montoFinal,
          recargosAplicados,
          yaTeniaRecargo: yaTieneRecargo,
          necesitaActualizacion: Math.abs(montoActual - montoFinal) > 0.01 // Tolerancia para decimales
        });
      }
    });
  });

  return resultados;
}

// Función legacy - mantener para compatibilidad pero ya no se usa
export function calculateSurchargeForOrder(montoOriginal, fechaVencimiento, fechaActual) {
  // El monto base siempre se mantiene para el mes actual
  let montoFinal = montoOriginal;

  // Convertir fechas a horario de México (GMT-6)
  const fechaActualMexico = new Date(fechaActual.toLocaleString("en-US", { timeZone: "America/Mexico_City" }));
  const fechaVencimientoMexico = new Date(fechaVencimiento.toLocaleString("en-US", { timeZone: "America/Mexico_City" }));

  // El recargo se aplica el día 16 a primera hora (00:00:01)
  // Por lo tanto, el día 15 completo es válido para pagar sin recargos
  const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);

  // Si aún no ha llegado el día 16, no hay recargo
  if (fechaActualMexico < fechaLimiteRecargo) {
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
  while (true) {
    // Crear fecha límite de recargo para el mes actual (día 16 a primera hora)
    const fechaLimiteRecargoActual = new Date(fechaProximaVigencia.getFullYear(), fechaProximaVigencia.getMonth(), 16, 0, 0, 1);

    // Si la fecha actual de México no ha llegado al día 16 de este mes, salir del bucle
    if (fechaActualMexico < fechaLimiteRecargoActual) {
      break;
    }

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
