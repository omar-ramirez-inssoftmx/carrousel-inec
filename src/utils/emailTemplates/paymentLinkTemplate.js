/**
 * Template para email de link de pago
 */
const paymentLinkTemplate = (matricula, creaFecha, vigeniaFecha, pedidos, total, link) => {
  // Array de nombres de meses en español
  const meses = [
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
                <p style="margin: 5px 0;">${conceptoEmail}</p>
                <p style="margin: 5px 0;">Cant. 1</p>
              </td>
              <td style="text-align: right;">
                <h4 style="font-size: 20px; font-weight: bold; margin: 0;">
                  $${parseFloat(monto).toFixed(2)} MXN
                </h4>
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
        <title>Link de Pago - INEC</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .header {
                border: 2px solid #F0F0F0;
                border-radius: 10px;
                color: black;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 30px;
            }
            .payment-details {
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                padding: 5px 0;
                border-bottom: 1px solid #dee2e6;
            }
            .detail-row:last-child {
                border-bottom: none;
            }
            .orders-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .orders-table td {
                padding: 20px;
                border-bottom: 2px solid #F0F0F0;
            }
            .total-amount {
                border-radius: 5px;
                margin: 20px 0;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #004085;
            }
            .pay-button {
                display: inline-block;
                background: #28a745;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            .info-box {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                color: #856404;
            }
            .footer {
                background-color: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Link de Pago Listo</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Tu enlace de pago ha sido generado</p>
            </div>
            
            <div class="content">
                <h2 style="color: #333; margin-bottom: 20px;">Detalles del Pago</h2>
                
                <div class="payment-details">
                    <div class="detail-row">
                        <span><strong>Matrícula:</strong></span>
                        <span>${matricula}</span>
                    </div>
                    <div class="detail-row">
                        <span><strong>Fecha de creación:</strong></span>
                        <span>${creaFecha}</span>
                    </div>
                    <div class="detail-row">
                        <span><strong>Fecha de vigencia:</strong></span>
                        <span>${vigeniaFecha}</span>
                    </div>
                </div>

                <h3 style="color: #333; margin: 30px 0 15px 0;">Conceptos a Pagar</h3>
                
                <table class="orders-table">
                    <tbody>
                        ${pedidosList}
                    </tbody>
                </table>

                <div class="total-amount">
                    Total: $${parseFloat(total).toFixed(2)} MXN
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" class="pay-button">
                        Pagar Ahora
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>¡Gracias por usar nuestro sistema de pagos!</strong></p>
                <p>Este es un mensaje automático, por favor no respondas a este email.</p>
                <p>© 2025 Sistema de Pagos INEC</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = paymentLinkTemplate;