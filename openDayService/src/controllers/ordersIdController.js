const Openpay = require('openpay');
const axios = require('axios');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);

// Método para enviar el mensaje de WhatsApp
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
    /*
    const messagePayload = {
      messaging_product: "whatsapp",    
      recipient_type: "individual", // Especificamos que es un mensaje individual  
      to: phoneNumber, // El número de teléfono del cliente
      type: "text",
      text: {
        body: message // El cuerpo del mensaje de texto
      }
    };
    */
    return axios.post(whatsappApiUrl, messagePayload, {
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,  // Token de acceso
        'Content-Type': 'application/json'
      }
    });
  };
  


exports.createPaymentLinkIdCustomer = (req, res, next) => {
  const { customer_id, description } = req.body;
   // ID del cliente previamente registrado

  // Primero, obtenemos los datos del cliente
  openpay.customers.get(customer_id, (error, customerData) => {
      if (error) {
          console.error("Error al obtener el cliente:", error);
          return res.status(400).json({ error: error.description });
      }
  
// Crear una nueva fecha con la fecha y hora actual
const dueDate = new Date();

// Sumarle 15 días a la fecha actual
//dueDate.setDate(dueDate.getDate() + 15);
dueDate.setHours(dueDate.getHours() + 1);
// Convertir la fecha a formato ISO (esto es lo que Openpay espera)
const isoDueDate = dueDate.toISOString();

// Crear la orden de pago con los datos completos del cliente
      var chargeRequest = { 
          method: "card",
          amount: 1500,
          description,
          order_id: "oid-" + new Date().getTime(), // ID único por pedido
          send_email: true,
          confirm: false,
          redirect_url: "http://localhost:3000/payment-success",
          due_date: isoDueDate, // Fecha de vencimiento
          
      };
      console.log("customerData ", customerData)
      // Crear la orden de pago (Cargo)
      openpay.customers.charges.create(customerData.id, chargeRequest, (error, order) => {
      //openpay.charges.create(chargeRequest, (error, order) => {
          if (error) {
              console.error("Error al crear el pedido:", error);
              return res.status(400).json({ error: error.description });
          }
          res.json({ payment_url: order.payment_method?.url || "No se generó un link de pago" });

          //______________________
          
            const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
            // Obtener el número de teléfono del cliente
            const customerPhone = 52+customerData.phone_number;  // Asegúrate de que el cliente tenga un número de teléfono

            // Si el cliente tiene un número de teléfono, enviamos el mensaje por WhatsApp
            if (customerPhone) {
                const message = `${paymentUrl}`;

                // Enviar el mensaje por WhatsApp
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


          //___________________-__


      });
  });

  
};