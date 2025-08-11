import axios from 'axios';

export const sendOrderConfirmationMessage = (phoneNumber, message) => {
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
            { type: "text", text: message },
          ]
        }
      ]
    }
  };

  return axios.post(whatsappApiUrl, messagePayload, {
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
};

export const sendPaymentLinkMessage = (fecha, link, nombre, phoneNumber, matricula) => {
  const whatsappApiUrl = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const vigeniaFechaDate = new Date(fecha);
  const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const messagePayload = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: "inec_link_pago",
      language: { code: "es_MX" },
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
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
};

export const formatMexicanPhoneNumber = (phoneNumber) => {
  const cleanNumber = phoneNumber.toString().replace(/\D/g, '');
  return 52 + cleanNumber;
};
