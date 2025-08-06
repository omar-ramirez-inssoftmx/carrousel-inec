interface Pedido {
    mes: number;
    anio: number;
    pago?: string | number;
    monto?: string | number;
    [key: string]: any;
}

const paymentConfirmationTemplate = (
    matricula: string,
    pedidos: Pedido[],
    transactionId: string,
    totalAmount: string | number
): string => {
    // Array de nombres de meses en español
    const meses: string[] = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const pedidosList = pedidos.map(pedido => {
        const mesNombre = meses[pedido.mes - 1];
        const monto = pedido.pago || pedido.monto || 0;
        return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>Pago de ${mesNombre} ${pedido.anio}</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          $${parseFloat(String(monto)).toFixed(2)}
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
        <title>Confirmación de Pago - INEC</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                padding: 30px;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
                margin-bottom: 10px;
            }
            .title {
                color: #007bff;
                margin-bottom: 20px;
            }
            .payment-details {
                padding: 20px;
                margin: 20px 0;
            }
            .table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .table th {
                background-color: #007bff;
                color: white;
                padding: 12px;
                text-align: left;
            }
            .table td {
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
            .total-row {
                background-color: #f8f9fa;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 class="title">INEC - ¡Pago Confirmado!</h1>
            </div>

            <div class="payment-details">
                <h3>📋 Detalles del Pago</h3>
                <p><strong>Matrícula:</strong> ${matricula}</p>
                <p><strong>ID de Transacción:</strong> ${transactionId}</p>
                <p><strong>Fecha de Pago:</strong> ${new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
                <p><strong>Estado:</strong> <span style="color: #28a745; font-weight: bold;">PAGADO</span></p>
            </div>

            <h3>Resumen de Pagos</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th style="text-align: right;">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    ${pedidosList}
                    <tr class="total-row">
                        <td><strong>TOTAL PAGADO</strong></td>
                        <td style="text-align: right;"><strong>$${parseFloat(String(totalAmount)).toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>

            <div class="footer">
                <p><em>Este es un email automático, por favor no respondas a este mensaje.</em></p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999;">
                    © ${new Date().getFullYear()} Instituto Nacional de Estudios Contables. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default paymentConfirmationTemplate;