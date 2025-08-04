const nodemailer = require("nodemailer");
const { formatCurrencyMX } = require('../services/formatService');

const emailTemplate = {
  subject: "Link de pago INEC",
  body: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hola, tu link de pago está listo</h2>
        <p>Matrícula: <b>${'${matricula}'}</b></p>
        <p>Fecha de creación: <b>${'${creaFecha}'}</b></p>
        <p>Fecha de vigencia: <b>${'${vigeniaFecha}'}</b></p>
        <table width="100%" style="border-collapse: collapse;">
          <tbody>
            ${'${pedidos}'}
          </tbody>
        </table>
        <h3>Total: ${'${total}'}</h3>
        <p><a href="${'${link}'}" style="background: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Pagar ahora</a></p>
      </div>
    `
};

async function sendMailOtp(matricula, creaFecha, vigeniaFecha, pedidos, link, email) {
  try {
    const subject = emailTemplate.subject;
    const body = emailTemplate.body;

    const vigeniaFechaDate = new Date(vigeniaFecha);

    const opciones = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };

    const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", opciones);

    let pedidosHtml = '';

    for (let i = 0; i < pedidos.length; i++) {
      const pedido = pedidos[i];
      const monto = pedido.pago || "0";

      pedidosHtml += `
            <tr>
              <td style="border-bottom: 2px solid #F0F0F0; padding: 20px;">
                <table role="presentation" width="100%">
                  <tr>
                    <td style="text-align: left;">
                      <h4 style="font-size: 20px; font-weight: bold; margin: 0;">Mensualidad</h4>
                      <p style="margin: 5px 0;">${pedido.concepto_pedido}</p>
                      <p style="margin: 5px 0;">Cant. 1</p>
                    </td>
                    <td style="text-align: right;">
                      <h4 style="font-size: 20px; font-weight: bold; margin: 0;">
                        ${formatCurrencyMX(monto)}
                      </h4>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
      `;
    }

    const total = calcularTotal(pedidos);

    let transporter = nodemailer.createTransport({
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

    let mailOptions = {
      from: '"INEC" <test@test.com>',
      to: email,
      subject: subject,
      html: body
        .replace('${matricula}', matricula)
        .replace('${creaFecha}', creaFecha)
        .replace('${vigeniaFecha}', vigeniaFechaFormateada)
        .replace('${pedidos}', pedidosHtml)
        .replace('${total}', formatCurrencyMX(total))
        .replace('${link}', link)
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

module.exports = { sendMailOtp };
