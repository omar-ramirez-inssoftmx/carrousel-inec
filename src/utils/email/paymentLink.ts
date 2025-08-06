interface Pedido {
  mes: number;
  anio: number;
  pago?: string | number;
  [key: string]: any;
}

const paymentLinkTemplate = (
  matricula: string,
  creaFecha: string,
  vigeniaFecha: string,
  pedidos: Pedido[],
  total: string,
  link: string
): string => {
  // Array de nombres de meses en español
  const meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Generar lista de pedidos
  const pedidosList = pedidos.map(pedido => {
    const mesNombre = meses[pedido.mes - 1] || 'Mes desconocido';
    const conceptoEmail = `Pago de ${mesNombre} ${pedido.anio}`;
    const monto = pedido.pago || "0";

    return `
      <tr>
        <td style="border-bottom: 2px solid #F0F0F0; padding: 20px;">
          <table role="presentation" width="100%">
            <tr>
              <td style="text-align: left;">
                <h4 style="font-size: 20px; font-weight: bold; margin: 0;">Mensualidad</h4>
                <p style="font-size: 16px; color: #666; margin: 5px 0;">${conceptoEmail}</p>
              </td>
              <td style="text-align: right;">
                <h4 style="font-size: 20px; font-weight: bold; margin: 0; color: #007bff;">$${parseFloat(String(monto)).toFixed(2)}</h4>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enlace de Pago - INEC</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                color: white;
                padding: 40px 30px;
                text-align: center;
            }
            .logo {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .header-subtitle {
                font-size: 18px;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 18px;
                margin-bottom: 20px;
                color: #333;
            }
            .info-section {
                background-color: #f8f9fa;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #007bff;
            }
            .info-title {
                font-size: 18px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 15px;
            }
            .info-item {
                margin: 10px 0;
                font-size: 16px;
            }
            .info-label {
                font-weight: bold;
                color: #555;
            }
            .payment-items {
                margin: 30px 0;
            }
            .payment-table {
                width: 100%;
                border-collapse: collapse;
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .total-section {
                background-color: #e8f4fd;
                padding: 25px;
                border-radius: 8px;
                margin: 25px 0;
                text-align: center;
                border: 2px solid #007bff;
            }
            .total-amount {
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                margin: 10px 0;
            }
            .payment-button {
                display: inline-block;
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
                padding: 18px 40px;
                text-decoration: none;
                border-radius: 50px;
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0;
                box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
                transition: all 0.3s ease;
            }
            .payment-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
            }
            .expiry-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
                text-align: center;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #dee2e6;
            }
            .contact-info {
                margin: 20px 0;
                font-size: 14px;
                color: #666;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                color: #007bff;
                text-decoration: none;
                margin: 0 10px;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 0;
                    box-shadow: none;
                }
                .header, .content, .footer {
                    padding: 20px;
                }
                .payment-button {
                    display: block;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">INEC</div>
                <div class="header-subtitle">Instituto Nacional de Estudios Contables</div>
            </div>

            <div class="content">
                <div class="greeting">
                    Estimado estudiante,
                </div>

                <p>Esperamos que te encuentres bien. Te enviamos este correo para informarte sobre tus pagos pendientes y facilitarte el proceso de pago en línea.</p>

                <div class="info-section">
                    <div class="info-title">📋 Información de tu Cuenta</div>
                    <div class="info-item">
                        <span class="info-label">Matrícula:</span> ${matricula}
                    </div>
                    <div class="info-item">
                        <span class="info-label">Fecha de emisión:</span> ${creaFecha}
                    </div>
                    <div class="info-item">
                        <span class="info-label">Fecha de vencimiento:</span> ${vigeniaFecha}
                    </div>
                </div>

                <div class="payment-items">
                    <h3 style="color: #007bff; margin-bottom: 20px;">💳 Conceptos a Pagar</h3>
                    <table class="payment-table">
                        ${pedidosList}
                    </table>
                </div>

                <div class="total-section">
                    <h3 style="margin: 0; color: #007bff;">Total a Pagar</h3>
                    <div class="total-amount">$${total}</div>
                    <p style="margin: 10px 0; color: #666;">Pesos Mexicanos (MXN)</p>
                </div>

                <div style="text-align: center; margin: 40px 0;">
                    <a href="${link}" class="payment-button">
                        💳 Pagar Ahora
                    </a>
                </div>

                <div class="expiry-warning">
                    <strong>⚠️ Importante:</strong> Este enlace de pago tiene una vigencia hasta el <strong>${vigeniaFecha}</strong>. 
                    Después de esta fecha, deberás solicitar un nuevo enlace de pago.
                </div>

                <div class="info-section">
                    <div class="info-title">🔒 Seguridad en tu Pago</div>
                    <ul style="margin: 15px 0; padding-left: 20px;">
                        <li>Todos los pagos son procesados de forma segura</li>
                        <li>Tus datos están protegidos con encriptación SSL</li>
                        <li>Recibirás una confirmación inmediata por email</li>
                        <li>Puedes pagar con tarjeta de débito o crédito</li>
                    </ul>
                </div>

                <div class="info-section">
                    <div class="info-title">❓ ¿Necesitas Ayuda?</div>
                    <p>Si tienes alguna duda sobre tu pago o necesitas asistencia, no dudes en contactarnos:</p>
                    <ul style="margin: 15px 0; padding-left: 20px;">
                        <li>📧 Email: pagos@inec.edu.mx</li>
                        <li>📱 WhatsApp: (55) 1234-5678</li>
                        <li>📞 Teléfono: (55) 8765-4321</li>
                        <li>🕒 Horario: Lunes a Viernes de 9:00 AM a 6:00 PM</li>
                    </ul>
                </div>
            </div>

            <div class="footer">
                <div class="contact-info">
                    <strong>Instituto Nacional de Estudios Contables (INEC)</strong><br>
                    Formando profesionales contables de excelencia<br>
                    🌐 www.inec.edu.mx
                </div>

                <div class="social-links">
                    <a href="#">Facebook</a> |
                    <a href="#">Twitter</a> |
                    <a href="#">LinkedIn</a> |
                    <a href="#">Instagram</a>
                </div>

                <p style="font-size: 12px; color: #999; margin-top: 20px;">
                    Este es un email automático, por favor no respondas a este mensaje.<br>
                    © ${new Date().getFullYear()} Instituto Nacional de Estudios Contables. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default paymentLinkTemplate;