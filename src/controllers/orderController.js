const { getStudentByOpenPayId } = require('../models/studentModel');
const {
  getPendingOrdersByMatricula,
  getCompletedOrdersByMatricula,
  getAvailableMonths,
  updateOrders,
  cancelOrdersPaymentData
} = require('../models/orderModel');
const { createCardForStudent } = require('../models/cardModel');
const { 
  getCustomer,
  createCharge,
  createDirectCharge,
  createChargeRequestWithSurcharge,
  createCustomerCard
} = require('../services/openpayService');
const { getCustomerChargesStatus } = require('../services/chargeService');
const {
  sendOrderConfirmationMessage,
  sendPaymentLinkMessage,
  formatMexicanPhoneNumber
} = require('../services/whatsappService');
const {
  formatPaymentDate,
  formatMonthYear,
  formatCurrencyMX,
  getCurrentFormattedDate,
  createDueDateISO,
  generateUniqueOrderId,
  processOrderDates
} = require('../services/formatService');
const { sendMailOtp } = require('../utils/sendEmail');

/**
 * Controlador consolidado para órdenes
 * Unifica ordersController, ordersIdController, cancelController, actividadController, chargeController
 */

/**
 * Crear link de pago simple
 * Ruta: POST /api/orders/create
 */
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
    redirect_url: "http://localhost:3000/payment-success"
  };

  createDirectCharge(chargeRequest)
    .then(order => {
      res.json({ payment_url: order.payment_method.url || "No se generó un link de pago" });
    })
    .catch(error => {
      res.status(400).json({ error: error.description });
    });
};

/**
 * Crear link de pago para customer específico con ID
 * Ruta: POST /api/orders/createId
 */
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

    let concepto = "";
    if (pedidosSeleccionados.length > 2) {
      concepto = "Varios pagos";
    } else {
      concepto = pedidosSeleccionados[0].concepto_pedido;
    }

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

/**
 * Procesar cargo con tarjeta
 * Ruta: POST /api/orders/pay
 */
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
      fechaVigencia,
      pedidosSeleccionados,
      saveCard,
      tokenGuardar,
      telefono,
      ciudad,
      postal,
      idAlumno,
      nombreTarjeta
    } = req.body;

    if (!customer_id || !token || !amount || !description || !orderId || !deviceSessionId) {
      return res.status(400).json({ error: 'Faltan parámetros' });
    }

    const charge = await createChargeWithCard(
      customer_id, token, amount, description, orderId, deviceSessionId,
      pedidoIds, fechaVigencia, pedidosSeleccionados, saveCard, tokenGuardar,
      telefono, ciudad, postal, idAlumno, nombreTarjeta
    );

    res.status(200).json({ success: true, charge });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Crear charge con tarjeta (función auxiliar)
 */
const createChargeWithCard = async (customerId, token, amount, description, orderId, deviceSessionId, ids, fechaVigencia, pedidosSeleccionados, saveCard, tokenGuardar, telefono, ciudad, postal, idAlumno, nombreTarjeta) => {
  try {
    let cardId = token;

    // Si debemos guardar la tarjeta
    if (saveCard) {
      const cardRequest = {
        token_id: token,
        device_session_id: deviceSessionId,
      };

      const card = await createCustomerCard(customerId, cardRequest);
      cardId = card.id;

      const vencimiento = `${card.expiration_month}/${card.expiration_year}`;
      await createCardForStudent(idAlumno, card.card_number, card.id, nombreTarjeta, card.brand, card.holder_name, vencimiento, telefono, ciudad, postal);
    }

    // Preparamos la solicitud de cargo
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
    const pedidos = await getCompletedOrdersByMatricula(matricula);
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

    // Cancelar los datos de pago de los pedidos
    await cancelOrdersPaymentData(pedidoIds);

    // Obtener los pedidos actualizados
    const matricula = pedidosConLinks[0]?.matricula || 
                     (pedidosConLinks[0]?.pedidos && pedidosConLinks[0].pedidos[0]?.matricula);
    
    if (!matricula) {
      return res.status(400).json({ message: 'No se pudo determinar la matrícula' });
    }

    const pedidosActualizados = await getPendingOrdersByMatricula(matricula);
    const pedidosProcesados = pedidosActualizados.map(processOrderDates);
    
    res.json(pedidosProcesados);

  } catch (error) {
    console.error('Error al cancelar pedidos:', error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * Crear charge directo (legacy)
 * Ruta: POST /api/charges/create
 */
const createDirectChargeHandler = (req, res, next) => {
  const {
    token_id,
    device_session_id,
    customer,
    amount,
    description,
    currency
  } = req.body;

  const chargeRequest = {
    source_id: token_id,
    method: 'card',
    amount,
    currency,
    description,
    device_session_id,
    customer,
  };

  createDirectCharge(chargeRequest)
    .then(charge => {
      res.status(200).json({ charge });
    })
    .catch(error => {
      return next(error);
    });
};

// === FUNCIONES AUXILIARES ===

/**
 * Formatear órdenes para display
 */
const formatOrders = async (orders) => {
  return Promise.all(orders.map(async (order) => {
    const monto = order.monto_real_pago;
    const fechaFormateada = formatPaymentDate(order.fecha_pago);
         const openpayStatus = await getCustomerChargesStatus(order.open_pay_id, order.identificador_pago);
    const mesAnio = formatMonthYear(order.mes, order.anio);

    return {
      numero: order.identificador_pago || 'N/A',
      pago: mesAnio,
      fecha: fechaFormateada,
      monto: formatCurrencyMX(monto),
      factura: order.transaccion_Id ? 'Descargar' : 'Sin factura',
      concepto_original: order.concepto_pedido || 'Sin concepto',
      card: {
        card_brand: openpayStatus?.card?.brand || 'N/A',
        card_number: openpayStatus?.card?.card_number || 'N/A',
        card_id: openpayStatus?.card?.id || 'N/A'
      }
    };
  }));
};

/**
 * Agrupar pedidos por identificador de pago
 */
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

module.exports = {
  createPaymentLink,
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  processCharge,
  getStudentOrdersActivity,
  getCancelOrdersData,
  createDirectChargeHandler
};