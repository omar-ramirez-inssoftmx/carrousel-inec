const Openpay = require('openpay');
const axios = require('axios');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);

// Importamos la función getCustomerChargesCount desde el servicio
const { getCustomerChargesCount } = require('./chargesList');  // Asegúrate de la ruta correcta

// Método para enviar el mensaje de WhatsApp
const sendWhatsappMessage = (phoneNumber, message) => {
    const whatsappApiUrl = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

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

// Función para crear el link de pago para el cliente
exports.createPaymentLinkIdCustomer = async (req, res, next) => {
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

            // Si el cliente tiene un número de teléfono, enviamos el mensaje por WhatsApp
            if (customerPhone) {
                const message = `${paymentUrl}`;

                // Enviar el mensaje por WhatsApp
                sendWhatsappMessage(customerPhone, message)
                    .then(response => {
                        console.log("Mensaje enviado a WhatsApp:", response.data);
                    })
                    .catch(error => {
                        console.error("Error al enviar el mensaje de WhatsApp:", error);
                    });

            } else {
                console.log("No se encontró un número de teléfono para el cliente.");
            }
        });
    } catch (error) {
        console.error("Error en la creación del link de pago:", error);
        return res.status(400).json({ error: error.message });
    }
};
