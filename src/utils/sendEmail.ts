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
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] 📧 INICIANDO ENVÍO DE EMAIL CON ENLACE DE PAGO`);
  console.log(`[${timestamp}] 📋 Detalles del envío:`);
  console.log(`[${timestamp}]    - Matrícula: ${matricula}`);
  console.log(`[${timestamp}]    - Email destino: ${email}`);
  console.log(`[${timestamp}]    - Fecha creación: ${creaFecha}`);
  console.log(`[${timestamp}]    - Fecha vigencia: ${vigeniaFecha}`);
  console.log(`[${timestamp}]    - Número de pedidos: ${pedidos.length}`);
  console.log(`[${timestamp}]    - Link de pago: ${link}`);
  
  try {
    console.log(`[${timestamp}] 🔄 Procesando fecha de vigencia...`);
    const vigeniaFechaDate = new Date(vigeniaFecha);
    const opciones: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const vigeniaFechaFormateada = vigeniaFechaDate.toLocaleDateString("es-Mx", opciones);

    console.log(`[${timestamp}] 🔄 Calculando total de pedidos...`);
    const total = calcularTotal(pedidos);
    console.log(`[${timestamp}] 💰 Total calculado: $${total}`);
    
    console.log(`[${timestamp}] 🔄 Generando contenido HTML del email...`);
    const htmlContent = paymentLinkTemplate(matricula, creaFecha, vigeniaFechaFormateada, pedidos, total, link);

    console.log(`[${timestamp}] 🔄 Creando transporter de email...`);
    const transporter = createTransporter();

    console.log(`[${timestamp}] 🔄 Enviando email con enlace de pago...`);
    const emailResult = await transporter.sendMail({
      from: '"INEC" <no-reply@inec.com>',
      to: email,
      subject: '"Enlace de pago - INEC"',
      html: htmlContent
    });
    
    console.log(`[${timestamp}] ✅ EMAIL CON ENLACE DE PAGO ENVIADO EXITOSAMENTE`);
    console.log(`[${timestamp}] 📧 Message ID: ${emailResult.messageId}`);
    console.log(`[${timestamp}] 📧 Response: ${emailResult.response}`);
    
  } catch (error) {
    console.error(`[${timestamp}] ❌ ERROR AL ENVIAR EMAIL CON ENLACE DE PAGO:`);
    console.error(`[${timestamp}] 📧 Matrícula: ${matricula}`);
    console.error(`[${timestamp}] 📧 Email: ${email}`);
    console.error(`[${timestamp}] 📧 Link: ${link}`);
    console.error(`[${timestamp}] 📧 Error details:`, error);
    
    // Re-lanzar el error para que el código que llama pueda manejarlo
    throw error;
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
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] 📧 INICIANDO ENVÍO DE EMAIL DE CONFIRMACIÓN DE PAGO`);
  console.log(`[${timestamp}] 📋 Detalles del envío:`);
  console.log(`[${timestamp}]    - Matrícula: ${matricula}`);
  console.log(`[${timestamp}]    - Email destino: ${email}`);
  console.log(`[${timestamp}]    - Transaction ID: ${transactionId}`);
  console.log(`[${timestamp}]    - Monto: $${amount}`);
  console.log(`[${timestamp}]    - Número de pedidos: ${pedidos.length}`);
  
  try {
    console.log(`[${timestamp}] 🔄 Generando contenido HTML del email...`);
    const htmlContent = paymentConfirmationTemplate(matricula, pedidos, transactionId, amount);
    
    console.log(`[${timestamp}] 🔄 Creando transporter de email...`);
    const transporter = createTransporter();

    console.log(`[${timestamp}] 🔄 Enviando email de confirmación...`);
    const emailResult = await transporter.sendMail({
      from: '"INEC" <no-reply@inec.com>',
      to: email,
      subject: '"Confirmación de pago exitoso - INEC"',
      html: htmlContent
    });

    console.log(`[${timestamp}] ✅ EMAIL DE CONFIRMACIÓN ENVIADO EXITOSAMENTE`);
    console.log(`[${timestamp}] 📧 Message ID: ${emailResult.messageId}`);
    console.log(`[${timestamp}] 📧 Response: ${emailResult.response}`);
    
  } catch (error) {
    console.error(`[${timestamp}] ❌ ERROR AL ENVIAR EMAIL DE CONFIRMACIÓN DE PAGO:`);
    console.error(`[${timestamp}] 📧 Matrícula: ${matricula}`);
    console.error(`[${timestamp}] 📧 Email: ${email}`);
    console.error(`[${timestamp}] 📧 Transaction ID: ${transactionId}`);
    console.error(`[${timestamp}] 📧 Error details:`, error);
    
    // Re-lanzar el error para que el código que llama pueda manejarlo
    throw error;
  }
}

export { sendMailOtp, sendPaymentConfirmationEmail };