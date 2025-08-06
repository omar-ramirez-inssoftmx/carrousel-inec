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
                background-color: #C1FFB3;
                color: white;
                padding: 18px 40px;
                text-decoration: none;
                border-radius: 50px;
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0;
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

            <div class="content">
                <div class="greeting">
                    Estimado estudiante,
                </div>

                <p>Esperamos que te encuentres bien. Te enviamos este correo con el enlace de pago para tu cuenta de INEC.</p>

                <div class="info-section">
                    <div class="info-title">Información de tu Cuenta</div>
                    <div class="info-item">
                        <span class="info-label">Matrícula:</span> ${matricula}
                    </div>
                </div>

                <div class="payment-items">
                    <h3 style="color: #007bff; margin-bottom: 20px;">Conceptos a Pagar</h3>
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
            </div>

            <div class="footer">
                <p style="font-size: 12px; color: #999; margin-top: 20px;">
                    Este es un email automático, por favor no respondas a este mensaje.<br>
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default paymentLinkTemplate;