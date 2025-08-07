import paymentConfirmationTemplate from './email/paymentConfirmation';
import paymentLinkTemplate from './email/paymentLink';
import { createTransporter } from './email/transporter';

interface Pedido {
  mes: number;
  anio: number;
  pago?: string | number;
  [key: string]: any;
}

async function sendMailOtp(
  matricula: string,
  creaFecha: string,
  vigeniaFecha: string,
  pedidos: Pedido[],
  link: string,
  email: string
): Promise<void> {
  try {
    const vigeniaFechaDate = new Date(vigeniaFecha);
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", opciones);

    const total = calcularTotal(pedidos);
    const htmlContent = paymentLinkTemplate(matricula, creaFecha, vigeniaFechaFormateada, pedidos, total, link);

    const transporter = createTransporter();

    await transporter.sendMail({
      from: '"INEC" <no-reply@inec.com>',
      to: email,
      subject: '"Enlace de pago - INEC"',
      html: htmlContent
    })
  } catch (error) {
    console.error("Error al enviar el email: ", error);
  }
}

function calcularTotal(pedidos: Pedido[]): string {
  let total = 0;
  for (let i = 0; i < pedidos.length; i++) {
    const pedido = pedidos[i];
    const monto = pedido.pago || "0";
    total += parseFloat(String(monto));
  }
  return total.toFixed(2);
}

async function sendPaymentConfirmationEmail(
  matricula: string,
  pedidos: Pedido[],
  transactionId: string,
  amount: string | number,
  email: string
): Promise<void> {
  try {
    const htmlContent = paymentConfirmationTemplate(matricula, pedidos, transactionId, amount);
    const transporter = createTransporter();

    await transporter.sendMail({
      from: '"INEC" <no-reply@inec.com>',
      to: email,
      subject: '"Confirmación de pago exitoso - INEC"',
      html: htmlContent
    });

  } catch (error) {
    console.error("Error al enviar el email de confirmación de pago: ", error);
  }
}

export { sendMailOtp, sendPaymentConfirmationEmail };