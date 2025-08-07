import { getStudentByOpenPayId } from '../models/studentModel.ts';
import {
  getOrdersByMatricula,
  getAvailableMonths,
  updateOrders,
  cancelOrdersPaymentData
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

const createPaymentLink = (req, res, next) => {
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

const createPaymentLinkIdCustomer = async (req, res, next) => {
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

/**
 * Crear link de pago para estudiante con múltiples pedidos
 * Ruta: POST /api/orders/createOrderStudent
 */
const createPaymentLinkStudent = async (req, res, next) => {
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

const processCharge = async (req, res) => {
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
    res.status(500).json({ success: false, error: error.message });
  }
};

const createChargeWithCard = async (customerId, token, amount, description, orderId, deviceSessionId, ids) => {
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

/**
 * Obtener órdenes completadas del estudiante (actividad)
 * Ruta: POST /api/orders/activity
 */
const getStudentOrdersActivity = async (req, res, next) => {
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

/**
 * Cancelar pedidos eliminando datos de pago
 * Ruta: POST /api/orders/cancel
 */
const getCancelOrdersData = async (req, res, next) => {
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

// === FUNCIONES AUXILIARES ===

/**
 * Formatear órdenes para display
 */
const formatOrders = async (orders) => {
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

const groupOrdersByPaymentId = (pedidos) => {
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
};

export {
  createPaymentLink,
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  processCharge,
  getStudentOrdersActivity,
  getCancelOrdersData,
};