const { getStudentByMatricula } = require('../models/studentModel');
const { getPendingOrdersByMatricula, updateOrderStatus } = require('../models/orderModel');
const { 
  getChargeStatusByOrderId, 
  mapOpenpayStatusToDBStatus,
  createChargeRequestWithSurcharge,
  createCharge
} = require('../services/openpayService');
const { getCustomerChargesStatus } = require('../services/chargeService');
const {
  sendOrderConfirmationMessage,
  formatMexicanPhoneNumber
} = require('../services/whatsappService');
const { processOrderDates } = require('../services/formatService');

/**
 * Controlador consolidado para estudiantes
 * Unifica selectStudentDataController y customerController
 */

/**
 * Obtener datos de estudiante y sus pedidos pendientes
 * Ruta: POST /api/student/selectStudent
 */
const getStudentData = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const pedidos = await getPendingOrdersByMatricula(matricula);

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pagos para la matrícula' });
    }

    // Procesar los pedidos para obtener el estado de cada uno y actualizarlo en la base de datos
    const pedidosConEstado = await Promise.all(
      pedidos.map(async (pedido) => {
        const openpayStatus = await getCustomerChargesStatus(pedido.open_pay_id, pedido.identificador_pago);

        let estatus = null;
        if (openpayStatus != null) {
          if (openpayStatus.status === "charge_pending") {
            const dueDate = new Date(openpayStatus.due_date);
            const now = new Date();

            if (dueDate < now) {
              estatus = "CANCELLED";
            } else {
              estatus = openpayStatus.status;
            }
          } else {
            estatus = openpayStatus.status;
          }
        }

        const estado = mapOpenpayStatusToDBStatus(estatus);

        if (pedido.identificador_pago && pedido.transaccion_Id && estado !== 'Desconocido') {
          await updateOrderStatus(pedido.id_pedido, estado, openpayStatus);
        }

        return {
          ...pedido,
          estado,
        };
      })
    );

    // Obtener pedidos actualizados
    const pedidosActualizados = await getPendingOrdersByMatricula(matricula);
    const pedidosProcesados = pedidosActualizados.map(processOrderDates);

    res.json(pedidosProcesados);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

/**
 * Obtener información básica del estudiante por matrícula
 * Ruta: POST /api/student/selectStudentMatricula
 */
const getStudentByMatriculaData = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const student = await getStudentByMatricula(matricula);

    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

/**
 * Crear cliente y generar link de pago
 * Ruta: POST /api/customers/create
 */
const createCustomerWithPayment = async (req, res) => {
  try {
    const { name, last_name, email, phone_number, external_id } = req.body;

    const customerData = {
      name,
      last_name,
      email,
      phone_number,
      external_id,
    };

    // Crear customer en OpenPay
    const customer = await new Promise((resolve, reject) => {
      const { openpay } = require('../utils/openPay');
      openpay.customers.create(customerData, (error, customer) => {
        if (error) reject(error);
        else resolve(customer);
      });
    });

    // Crear charge request con recargo si aplica
    const baseAmount = 1500;
    const description = "Pago creando cliente y generando link de pago";
    const orderId = `oid-${new Date().getTime()}`;

    const chargeRequest = createChargeRequestWithSurcharge(
      baseAmount,
      description,
      orderId,
      null // sin due_date específico
    );

    // Configurar redirect URL para customer creation
    chargeRequest.redirect_url = "http://localhost:3000/payment-success";

    // Crear la orden de pago
    const order = await createCharge(customer.id, chargeRequest);

    res.json({
      success: true,
      message: 'Cliente y orden de pago creados exitosamente',
      payment_url: order.payment_method?.url || "No se generó un link de pago",
    });

    // Enviar WhatsApp si tiene teléfono
    const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
    const customerPhone = formatMexicanPhoneNumber(customerData.phone_number);

    if (customerPhone && paymentUrl !== "No se generó un link de pago") {
      try {
        await sendOrderConfirmationMessage(customerPhone, paymentUrl);
      } catch (whatsappError) {
        console.error("Error enviando WhatsApp:", whatsappError);
        // No fallar la request por error de WhatsApp
      }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Hubo un error al crear el cliente y la orden de pago',
      error: error.message || error.description || error,
    });
  }
};

/**
 * Listar customer por external_id
 * Ruta: POST /api/customers/list
 */
const listCustomer = async (req, res) => {
  const { external_id } = req.body;
  const searchParams = { external_id };

  const { openpay } = require('../utils/openPay');
  openpay.customers.list(searchParams, (error, customers) => {
    if (error) {
      return res.status(400).json({ error: error.description });
    }
    res.json(customers);
  });
};

/**
 * Editar customer
 * Ruta: POST /api/customers/edit
 */
const editCustomer = async (req, res) => {
  const { email, customerId } = req.body;

  const searchParams = {
    name: "Jeny Álvarez Félix",
    email,
  };

  const { openpay } = require('../utils/openPay');
  openpay.customers.update(customerId, searchParams, function (error, customers) {
    if (error) {
      return res.status(400).json({ error: error.description });
    }
    res.json(customers);
  });
};

module.exports = {
  getStudentData,
  getStudentByMatriculaData,
  createCustomerWithPayment,
  listCustomer,
  editCustomer
}; 