const Openpay = require('openpay');
const axios = require('axios');
const { getMyOpenPay } = require('../models/selectStudentSataModel');
const { updatePedidos } = require('../models/customerModel');
const { sendMailOtp } = require('../utils/sendEmail');

const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);

const sendWhatsappMessage = (fecha, link, nombre, phoneNumber) => {
  const whatsappApiUrl = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const messagePayload = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: "confirma_orden",
      language: { code: "es_MX" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: nombre },
            { type: "text", text: link },
            { type: "text", text: fecha },
          ]
        }
      ]
    }
  };

  return axios.post(whatsappApiUrl, messagePayload, {
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,  // Token de acceso
      'Content-Type': 'application/json'
    }
  });
};

// Función para crear el link de pago para el cliente
const createPaymentLinkIdCustomer = async (req, res, next) => {
  const { customer_id, description } = req.body;

  try {
    // Primero, obtenemos los datos del cliente
    const customerData = await new Promise((resolve, reject) => {
      openpay.customers.get(customer_id, (error, customerData) => {
        if (error) {
          reject(error);
        } else {
          resolve(customerData);
        }
      });
    });

    // Aquí obtenemos el número de órdenes de pago para el cliente
    //const charges = await getCustomerChargesCount(customer_id);
    //console.log("Todos los cargos del cliente:", charges);

    // Obtener el día del mes
    const fecha = new Date();
    const dia = fecha.getDate();
    let amount = 1500;

    // Si el día no es 1 ni 15, se agrega el 10%
    if (dia !== 1 && dia !== 15) {
      amount = amount + (amount * 0.10);  // Aumentar el 10%
    }

    // Crear la orden de pago con los datos completos del cliente
    const dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + 1); // Seteamos la hora de vencimiento
    const isoDueDate = dueDate.toISOString();

    var chargeRequest = {
      method: "card",
      amount: amount,
      description,
      order_id: customerData.external_id + "-" + new Date().getTime(), // ID único por pedido
      send_email: true,
      confirm: false,
      redirect_url: "http://localhost:3000/payment-success",
      due_date: isoDueDate,
    };

    // Crear la orden de pago (Cargo)
    openpay.customers.charges.create(customerData.id, chargeRequest, (error, order) => {
      if (error) {
        console.error("Error al crear el pedido:", error);
        return res.status(400).json({ error: error.description });
      }

      res.json({ payment_url: order.payment_method?.url || "No se generó un link de pago" });

      // Obtener el número de teléfono del cliente
      const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
      const customerPhone = 52 + customerData.phone_number;  // Asegúrate de que el cliente tenga un número de teléfono

      if (customerPhone) {
        const message = `${paymentUrl}`;
        sendWhatsappMessage(customerPhone, message)
      }
    });
  } catch (error) {
    console.error("Error en la creación del link de pago:", error);
    return res.status(400).json({ error: error.message });
  }
};


const createPaymentLinkStudent = async (req, res, next) => {
  const { customer_id, description, amount, pedidoIds, fechaVigencia, pedidosSeleccionados } = req.body;


  try {
    const student = await getMyOpenPay(customer_id);

    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    // Crear la orden de pago con los datos completos del cliente

    var chargeRequest = {
      method: "card",
      amount,
      description,
      order_id: student.matricula + "-" + new Date().getTime(), // ID único por pedido
      send_email: true,
      confirm: false,
      redirect_url: "http://localhost:3000/payment-success",
      due_date: fechaVigencia,
    };

    const createCharge = (customer_id, chargeRequest) => {
      return new Promise((resolve, reject) => {
        openpay.customers.charges.create(customer_id, chargeRequest, (error, order) => {
          if (error) {
            reject(error);
          } else {
            resolve(order);
          }
        });
      });
    };

    // Esperar la creación del cargo
    const order = await createCharge(customer_id, chargeRequest);

    const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
    const customerPhone = 52 + student.celular; // Asegúrate de que el cliente tenga un número de teléfono
    const nameFull = student.nombre + " " + student.apellido_paterno + " " + student.apellido_materno;
    const idsSeleccionados = pedidoIds;

    const actualizar = {
      identificador_pago: order.order_id,  // Utilizamos el order_id como identificador
      link_de_pago: paymentUrl,  // Link de pago generado
    };

    try {
      await updatePedidos(idsSeleccionados, actualizar); // Actualizamos los registros
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar los pedidos." });
    }

    if (customerPhone) {
      const message = `${paymentUrl}`;
      sendWhatsappMessage("Aquí va la fecha", message, nameFull, customerPhone)
    }

    const creaFecha = getCurrentDate();
    sendMailOtp(student.matricula, creaFecha, fechaVigencia, pedidosSeleccionados, paymentUrl, student.email)
    res.json({ payment_url: paymentUrl });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

function getCurrentDate() {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('es-ES', options);
}

module.exports = {
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent
};
