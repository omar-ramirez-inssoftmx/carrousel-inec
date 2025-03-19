const Openpay = require('openpay');
const axios = require('axios');
const { getMyOpenPay } = require('../models/selectStudentSataModel');
const { updatePedidos } = require('../models/customerModel');
const { sendMailOtp } = require('../utils/sendEmail');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);

// Método para enviar el mensaje de WhatsApp
const sendWhatsappMessage = (fecha, link, nombre, phoneNumber, matricula) => {
    const whatsappApiUrl = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const vigeniaFechaDate = new Date(fecha); // Crear un objeto Date a partir de la fecha ajustada

    const opciones = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    
    const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", opciones); // Formatear la fecha
    

    const messagePayload = {
      messaging_product: "whatsapp",
      to: phoneNumber, // El número de teléfono del alumno
      type: "template",
      template: {
        name: "inec_link_pago", // El nombre de la plantilla
        language: { code: "es_MX" }, // El idioma de la plantilla
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: nombre }, 
              { type: "text", text: matricula }, 
              { type: "text", text: link }, 
              { type: "text", text: vigeniaFechaFormateada },            
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
            redirect_url: "http://inecestudiantes.s3-website-us-east-1.amazonaws.com/",
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


const createPaymentLinkStudent = async (req, res, next) => {
    const { customer_id, description, amount, pedidoIds, fechaVigencia, pedidosSeleccionados } = req.body;


    try {
        const student = await getMyOpenPay(customer_id);

        if (!student || student.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
        }

        let concepto = "";
        if(pedidosSeleccionados.length > 2){
            concepto = "Varios pagos";
        }else{
            concepto = pedidosSeleccionados[0].concepto_pedido;
        }
        // Crear la orden de pago con los datos completos del cliente
    
        var chargeRequest = {
            method: "card",
            amount,
            description:concepto,
            order_id: student.matricula + "-" + new Date().getTime(), // ID único por pedido
            send_email: true,
            confirm: false,
            redirect_url: "http://inecestudiantes.s3-website-us-east-1.amazonaws.com/",
            due_date: fechaVigencia,
        };
        console.log("chargeRequest ", chargeRequest)
        // Envolver la llamada a OpenPay en una promesa
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
        console.log("order creada", order)
        const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
        const customerPhone = 52 + student.celular; // Asegúrate de que el cliente tenga un número de teléfono
        const nameFull = student.nombre + " " + student.apellido_paterno + " " + student.apellido_materno;

        // Llamar a la función updatePedidos para actualizar los registros de la base de datos

        const idsSeleccionados = pedidoIds;  // Ya que lo recibes del body


        const actualizar = {
            identificador_pago: order.order_id,  // Utilizamos el order_id como identificador
            link_de_pago: paymentUrl, 
            transaccion_Id: order.id// Link de pago generado
        };

        try {
            await updatePedidos(idsSeleccionados, actualizar); // Actualizamos los registros
            console.log("Pedidos actualizados correctamente.");
        } catch (error) {
            console.error("Error al actualizar los pedidos:", error);
            return res.status(500).json({ error: "Error al actualizar los pedidos." });
        }

        // Enviar mensaje por WhatsApp y email después de actualizar los registros
        if (customerPhone) {
            const message = `${paymentUrl}`;
            sendWhatsappMessage(fechaVigencia, message, nameFull, customerPhone, student.matricula)
                .then(response => {
                    console.log("Mensaje enviado a WhatsApp:", response.data);
                })
                .catch(error => {
                    console.error("Error al enviar el mensaje de WhatsApp:", error);
                });
        } else {
            console.log("No se encontró un número de teléfono para el cliente.");
        }
        
        const creaFecha = getCurrentDate();
        sendMailOtp(student.matricula , creaFecha, fechaVigencia, pedidosSeleccionados, paymentUrl, student.email)
        res.json({ payment_url: paymentUrl });
        
    } catch (error) {
        console.error("Error en la creación del link de pago:", error);
        return res.status(400).json({ error: error.message });
    }
};

   
function getCurrentDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('es-ES', options);
  }
  
 
  const createCharge = async (customerId, token, amount, description, orderId, deviceSessionId, ids, fechaVigencia, pedidosSeleccionados) => {
    return new Promise((resolve, reject) => {
      const chargeRequest = {
        source_id: token, // Token de la tarjeta generado desde el frontend
        method: 'card',
        amount: amount,
        description: description,
        order_id: orderId + "-" + new Date().getTime(), // Agregar un timestamp único al orderId
        currency: 'MXN',
        device_session_id: deviceSessionId // Debes generarlo desde el frontend
      };
  
      // Crear el cargo en OpenPay
      openpay.customers.charges.create(customerId, chargeRequest, async (error, charge) => {
        if (error) {
          reject(error); // Rechazar la promesa si hay un error
        } else {
          try {
            console.log("charge card ", charge)
            // Datos para actualizar los pedidos
            const actualizar = {
              identificador_pago: charge.order_id, // Utilizamos el order_id del cargo como identificador
              link_de_pago: charge.authorization, // Link de pago generado (si aplica)
              transaccion_Id: charge.id // ID de la transacción
            };
            console.log("charge ids ", ids)
            console.log("charge actualizar ", actualizar)
  
            // Actualizar los pedidos en la base de datos
            await updatePedidos(ids, actualizar); // Actualizamos los registros
            console.log("Pedidos actualizados correctamente.");
  
            // Resolver la promesa con el cargo y el resultado de la actualización
            resolve({ charge });
          } catch (error) {
            console.error("Error al actualizar los pedidos:", error);
            reject(error); // Rechazar la promesa si hay un error en la actualización
          }
        }
      });
    });
  };

module.exports = {
    createPaymentLinkIdCustomer,
    createPaymentLinkStudent,
    createCharge

};
  