const nodemailer = require("nodemailer");
const { getTempleteEmail } = require('../models/customerModel');

async function sendMailOtp(matricula, creaFecha, vigeniaFecha, pedidos, link, email) {
  try {
    const template = await getTempleteEmail("email");
    console.log("vigeniaFecha--->", vigeniaFecha)
    const subject = "Link de pago INEC";
    const body = template.template;

    const vigeniaFechaDate = new Date(vigeniaFecha); // Crear un objeto Date a partir de la fecha ajustada

    const opciones = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    
    const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", opciones); // Formatear la fecha
    

    // Genera el HTML de los pedidos
    let pedidosHtml = '';
    for (let i = 0; i < pedidos.length; i++) {
      const pedido = pedidos[i];
      const monto = getPagoActual(pedido); // Llama a la función getPagoActual aquí
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
                      <h4 style="font-size: 20px; font-weight: bold; margin: 0;">${formatPesos(monto)}</h4>
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
        .replace('${total}', formatPesos(total))
        .replace('${link}', link)
    };

    let info = await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
}

function formatPesos(monto) {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2
  });
  return formatter.format(monto);
}

function calcularTotal(pedidos) {
    let total = 0;
    for (let i = 0; i < pedidos.length; i++) {
      const pedido = pedidos[i];
      const monto = getPagoActual(pedido);
      total += parseFloat(monto);
    }
    return total.toFixed(2);
  }

const getPagoActual = (pedido) => {
  const fechaActual = new Date();

  // Verifica si la fecha de descuento existe y si aplica
  if (pedido.fecha_vigenica_descuento && fechaActual <= new Date(pedido.fecha_vigenica_descuento)) {
    return pedido.pago_descuento || "0";
  }

  // Verifica si la fecha de recargo existe y si aplica
  if (pedido.fecha_vigencia_recargo && fechaActual >= new Date(pedido.fecha_vigencia_pago)) {
    return pedido.pago_recargo || "0";
  }

  // Verifica si la fecha de pago existe y si aplica
  if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
    return pedido.pago || "0";
  }

  // Si no hay fechas o no aplica ninguna, se considera "normal"
  return "0";
};

module.exports = { sendMailOtp };
