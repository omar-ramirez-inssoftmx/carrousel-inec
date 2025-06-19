const Openpay = require('openpay');
const axios = require('axios');

const isProduction = process.env.OPENPAY_PRIVATE_TYPE === 'true'; // Solo será `true` si la variable es "true"
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, isProduction);

const sendWhatsappMessage = (phoneNumber, message) => {
  const whatsappApiUrl = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  /*const messagePayload = {     
    messaging_product: "whatsapp",      
    to: phoneNumber, // El número de teléfono del cliente
    type: "template",
    template: { name: "hello_world", language: { code: "en_US" } }
  };*/

  const messagePayload = {
    messaging_product: "whatsapp",
    to: phoneNumber, // El número de teléfono del alumno
    type: "template",
    template: {
      name: "confirma_orden", // El nombre de la plantilla
      language: { code: "es_MX" }, // El idioma de la plantilla
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: message },  // Sustituye {1} con             
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

const createCustomer = async (req, res) => {
  try {
    const { name, last_name, email, phone_number, external_id } = req.body;

    const customerData = {
      name,
      last_name,
      email,
      phone_number,
      external_id,
    };

    const customer = await new Promise((resolve, reject) => {
      openpay.customers.create(customerData, (error, customer) => {
        if (error) reject(error);
        else resolve(customer);
      });
    });

    // Obtener el día del mes
    const fecha = new Date();
    const dia = fecha.getDate();
    let amount = 1500;

    // Si el día no es 1 ni 15, se agrega el 10%
    if (dia !== 1 && dia !== 15) {
      amount = amount + (amount * 0.10);  // Aumentar el 10%
    }

    console.log('Cliente creado:', customer);

    const chargeRequest = {
      method: "card", // Método de pago, por ejemplo "card"
      amount: amount, // Monto en centavos (15.00 MXN)
      description: "Pago creando cliente y generando link de pago", // Descripción del pago
      order_id: "oid-" + new Date().getTime(), // ID único para el pedido
      send_email: true,
      confirm: false, // Confirmación del cargo
      redirect_url: "http://localhost:3000/payment-success", // URL a la que redirigir después del pago
    };

    // Crear la orden de pago (Cargo)
    openpay.customers.charges.create(customer.id, chargeRequest, (error, order) => {
      if (error) {
        return res.status(400).json({ error: error.description });
      }

      console.log('Orden de pago creada:', order);
      res.json({
        success: true,
        message: 'Cliente y orden de pago creados exitosamente',
        payment_url: order.payment_method?.url || "No se generó un link de pago",
      });

      const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
      const customerPhone = 52 + customerData.phone_number;

      // Si el cliente tiene un número de teléfono, enviamos el mensaje por WhatsApp
      if (customerPhone) {
        const message = `${paymentUrl}`;

        sendWhatsappMessage(customerPhone, message)
          .then(response => {
            console.log("Mensaje enviado a WhatsApp:", response.data);
            console.log("Response ", response)
          })
          .catch(error => {
            console.error("Error al enviar el mensaje de WhatsApp:", error);
          });
      } else {
        console.log("No se encontró un número de teléfono para el cliente.");
      }
    });

  } catch (error) {
    console.error('Error al crear el cliente y la orden de pago:', error);

    res.status(500).json({
      success: false,
      message: 'Hubo un error al crear el cliente y la orden de pago',
      error: error.message || error.description || error,
    });
  }
};
const editCustomer = async (req, res) => {

  const { email, customerId } = req.body;

  const searchParams = {
    name: "Jeny Álvarez Félix",
    email,
  };

  openpay.customers.update(customerId, searchParams, function (error, customers) {
    if (error) {
      console.error("Error al ediar clientes:", error);
      return res.status(400).json({ error: error.description });
    }
    res.json(customers);
  });
}

const listCustomer = async (req, res) => {
  const { external_id } = req.body;

  const searchParams = {
    external_id,
  };

  openpay.customers.list(searchParams, (error, customers) => {
    if (error) {
      console.error("Error al obtener clientes:", error);
      return res.status(400).json({ error: error.description });
    }
    res.json(customers);
  });
}

module.exports = {
  createCustomer,
  listCustomer,
  editCustomer
};
