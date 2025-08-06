const nodemailer = require("nodemailer");
const { paymentConfirmationTemplate, paymentLinkTemplate } = require('./emailTemplates');

const paymentLinkEmailConfig = {
  subject: "Link de pago INEC"
};

/**
 * Envía email con link de pago (OTP)
 */
async function sendMailOtp(matricula, creaFecha, vigeniaFecha, pedidos, link, email) {
  try {
    const subject = paymentLinkEmailConfig.subject;

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

    // Usar transportador centralizado
    const transporter = nodemailer.createTransport({
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

    const mailOptions = {
      from: '"INEC" <test@test.com>',
      to: email,
      subject: subject,
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

/**
 * Envía email de confirmación de pago exitoso
 */
async function sendPaymentConfirmationEmail(matricula, pedidos, transactionId, amount, email) {
  try {
    const subject = "Confirmación de pago exitoso - INEC";
    
    // Generar el HTML usando el template separado
    const htmlContent = paymentConfirmationTemplate(matricula, pedidos, transactionId, amount);

    // Usar transportador centralizado
    const transporter = nodemailer.createTransporter({
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

    const mailOptions = {
      from: '"INEC" <test@test.com>',
      to: email,
      subject: subject,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de confirmación de pago enviado a: ${email}`);

  } catch (error) {
    console.error("Error al enviar el email de confirmación de pago: ", error);
  }
}

module.exports = { sendMailOtp, sendPaymentConfirmationEmail };
