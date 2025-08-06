const nodemailer = require("nodemailer");
const { paymentConfirmationTemplate } = require('./paymentConfirmationTemplate');
const { paymentLinkTemplate } = require('./paymentLinkTemplate');

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "desarrollo.movil@inssoftmx.com",
      pass: "6wVcjd7W0kFyEHhp"
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

async function sendMailOtp(matricula, creaFecha, vigeniaFecha, pedidos, link, email) {
  try {
    const vigeniaFechaDate = new Date(vigeniaFecha);
    const opciones = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", opciones);
    
    const total = calcularTotal(pedidos);
    
    // Generar el HTML usando el template separado
    const htmlContent = paymentLinkTemplate(matricula, creaFecha, vigeniaFechaFormateada, pedidos, total, link);

    const transporter = createTransporter();

    const mailOptions = {
      from: '"INEC" <test@test.com>',
      to: email,
      subject: 'Link de pago INEC',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
}

function calcularTotal(pedidos) {
  let total = 0;
  for (let i = 0; i < pedidos.length; i++) {
    const pedido = pedidos[i];
    const monto = pedido.pago || "0";
    total += parseFloat(monto);
  }
  return total.toFixed(2);
}

async function sendPaymentConfirmationEmail(matricula, pedidos, transactionId, amount, email) {
  try {
    const htmlContent = paymentConfirmationTemplate(matricula, pedidos, transactionId, amount);

    const transporter = createTransporter();

    const mailOptions = {
      from: '"INEC" <test@test.com>',
      to: email,
      subject: '"Confirmación de pago exitoso - INEC"',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el email de confirmación de pago: ", error);
  }
}

module.exports = { sendMailOtp, sendPaymentConfirmationEmail };
