/**
 * Template para email de confirmación de pago
 */
const paymentConfirmationTemplate = (matricula, pedidos, transactionId, totalAmount) => {
    // Array de nombres de meses en español
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Generar lista de pedidos
    const pedidosList = pedidos.map(pedido => {
        const mesNombre = meses[pedido.mes - 1];
        // Usar la propiedad correcta: pago en lugar de monto
        const monto = pedido.pago || pedido.monto || 0;
        return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>Pago de ${mesNombre} ${pedido.anio}</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          $${parseFloat(monto).toFixed(2)} MXN
        </td>
      </tr>
    `;
    }).join('');

    const fechaActual = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Pago</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                overflow: hidden;
            }
            .header {
                color: black;
                border: 2px solid #F0F0F0;
                border-radius: 10px;
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
                font-weight: bold;
                font-size: 16px;
                color: #28a745;
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
            .orders-table th {
                background-color: #28a745;
                color: white;
                padding: 15px;
                text-align: left;
            }
            .orders-table td {
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
            .total-amount {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                color: #155724;
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
                <h1>¡Pago Confirmado!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Tu pago ha sido procesado exitosamente</p>
            </div>
            
            <div class="content">
                <h2 style="color: #333; margin-bottom: 20px;">Detalles del Pago</h2>
                
                <div class="payment-details">
                    <div class="detail-row">
                        <span><strong>Matrícula:</strong></span>
                        <span>${matricula}</span>
                    </div>
                    <div class="detail-row">
                        <span><strong>Fecha y Hora:</strong></span>
                        <span>${fechaActual}</span>
                    </div>
                    <div class="detail-row">
                        <span><strong>ID de Transacción:</strong></span>
                        <span>${transactionId}</span>
                    </div>
                    <div class="detail-row">
                        <span><strong>Total Pagado:</strong></span>
                        <span>$${totalAmount.toFixed(2)} MXN</span>
                    </div>
                </div>

                <h3 style="color: #333; margin: 30px 0 15px 0;">Conceptos Pagados</h3>
                
                <table class="orders-table">
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th style="text-align: right;">Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pedidosList}
                    </tbody>
                </table>

                <div class="total-amount">
                    Total Pagado: $${totalAmount.toFixed(2)} MXN
                </div>
            </div>
            
            <div class="footer">
                <p><strong>¡Gracias por tu pago!</strong></p>
                <p>Este es un mensaje automático, por favor no respondas a este email.</p>
                <p>© 2025 Sistema de Pagos INEC</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = paymentConfirmationTemplate;