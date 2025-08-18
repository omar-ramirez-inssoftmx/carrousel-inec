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

    // Generar lista de pedidos con estilo minimalista
    const pedidosList = pedidos.map(pedido => {
        const mesNombre = meses[pedido.mes - 1];
        const monto = pedido.pago || pedido.monto || 0;
        return `
        <div style="border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 8px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 500; color: #111827; font-size: 14px; margin-bottom: 2px;">Mensualidad</div>
                    <div style="color: #6b7280; font-size: 13px;">Pago de ${mesNombre} ${pedido.anio}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 600; color: #111827; font-size: 14px;">$${parseFloat(String(monto)).toFixed(2)}</div>
                    <div style="color: #9ca3af; font-size: 11px;">MXN</div>
                </div>
            </div>
        </div>
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
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                line-height: 1.5;
                color: #111827;
                margin: 0;
                padding: 0;
                background-color: #f9fafb;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #e5e7eb;
            }
            .header {
                background: #ffffff;
                padding: 32px 24px 24px 24px;
                text-align: center;
                border-bottom: 1px solid #e5e7eb;
            }
            .logo {
                margin-bottom: 16px;
            }
            .logo img {
                height: 48px;
                width: auto;
            }
            .success-icon {
                font-size: 24px;
                margin-bottom: 12px;
                display: block;
                color: #111827;
            }
            .header-title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 4px;
                color: #111827;
            }
            .header-subtitle {
                font-size: 14px;
                color: #6b7280;
                font-weight: 400;
            }
            .content {
                padding: 24px;
            }
            .greeting {
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 16px;
                color: #111827;
            }
            .description {
                color: #6b7280;
                margin-bottom: 24px;
                font-size: 14px;
                line-height: 1.5;
            }
            .status-badge {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                color: #111827;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 500;
                display: inline-block;
                margin-bottom: 20px;
            }
            .info-grid {
                margin: 20px 0;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                padding: 16px;
            }
            .info-title {
                font-size: 14px;
                font-weight: 500;
                color: #111827;
                margin-bottom: 12px;
            }
            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #f3f4f6;
            }
            .info-item:last-child {
                border-bottom: none;
            }
            .info-label {
                font-weight: 400;
                color: #6b7280;
                font-size: 13px;
            }
            .info-value {
                font-weight: 500;
                color: #111827;
                font-size: 13px;
                text-align: right;
            }
            .section-title {
                font-size: 16px;
                font-weight: 500;
                color: #111827;
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                padding-bottom: 8px;
                border-bottom: 1px solid #e5e7eb;
            }
            .payment-items {
                margin: 16px 0;
            }
            .total-card {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                color: #111827;
                padding: 16px;
                border-radius: 6px;
                text-align: center;
                margin: 16px 0;
            }
            .total-label {
                font-size: 14px;
                font-weight: 400;
                margin-bottom: 4px;
                color: #6b7280;
            }
            .total-amount {
                font-size: 20px;
                font-weight: 600;
                margin: 0;
                color: #111827;
            }
            .total-currency {
                font-size: 12px;
                color: #6b7280;
                font-weight: 400;
            }
            .success-message {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                color: #111827;
                padding: 16px;
                border-radius: 6px;
                text-align: center;
                margin: 20px 0;
            }
            .success-title {
                font-size: 16px;
                font-weight: 500;
                margin-bottom: 4px;
                color: #111827;
            }
            .footer {
                background: #f9fafb;
                padding: 20px 24px;
                border-top: 1px solid #e5e7eb;
            }
            .contact-info {
                display: grid;
                gap: 16px;
                margin-top: 16px;
            }
            .contact-item {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                margin: 6px 0;
                color: #6b7280;
                font-size: 13px;
            }
            .contact-item a {
                color: #3b82f6;
                text-decoration: none;
            }
            .contact-item a:hover {
                text-decoration: underline;
            }
            .footer-note {
                text-align: center;
                color: #9ca3af;
                font-size: 11px;
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid #e5e7eb;
                line-height: 1.4;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 8px;
                    border-radius: 6px;
                }
                .header {
                    padding: 24px 16px 16px 16px;
                }
                .content {
                    padding: 16px;
                }
                .footer {
                    padding: 16px;
                }
                .total-amount {
                    font-size: 18px;
                }
                .info-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 4px;
                }
                .info-value {
                    text-align: left;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header con logo y confirmación -->
            <div class="header">
                <div class="logo">
                    <img src="https://res.cloudinary.com/dgxdwxi37/image/upload/v1755553359/logo_u831nb.png" alt="INEC CAPPMEX" />
                </div>
                <div class="success-icon">✓</div>
                <div class="header-title">Pago Confirmado</div>
            </div>

            <div class="content">
                <div class="greeting">Confirmación de Pago</div>
                
                <div class="description">
                    Tu pago ha sido procesado exitosamente. A continuación encontrarás todos los detalles de tu transacción.
                </div>

                <!-- Estado del pago -->
                <div class="status-badge">
                    PAGO CONFIRMADO
                </div>

                <!-- Información del pago -->
                <div class="info-grid">
                    <div class="info-title">
                        Detalles de la Transacción
                    </div>
                    <div class="info-item">
                        <span class="info-label">Matrícula</span>
                        <span class="info-value">${matricula}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">ID de Transacción</span>
                        <span class="info-value">${transactionId}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Fecha y Hora</span>
                        <span class="info-value">${new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Estado</span>
                        <span class="info-value" style="color: #059669; font-weight: 600;">PAGADO</span>
                    </div>
                </div>

                <!-- Conceptos pagados -->
                <div class="payment-items">
                    <div class="section-title">
                        Conceptos Pagados
                    </div>
                    ${pedidosList}
                </div>

                <!-- Total pagado -->
                <div class="total-card">
                    <div class="total-label">Total Pagado</div>
                    <div class="total-amount">$${parseFloat(String(totalAmount)).toFixed(2)}</div>
                    <div class="total-currency">Pesos Mexicanos (MXN)</div>
                </div>

                <!-- Mensaje de éxito -->
                <div class="success-message">
                    <div class="success-title">
                        Gracias por tu pago
                    </div>
                    <div>
                        Tu pago ha sido registrado correctamente en nuestro sistema. 
                        Conserva este correo como comprobante de tu transacción.
                    </div>
                </div>
            </div>

            <!-- Footer con información de contacto -->
            <div class="footer">
                <div class="contact-info">
                    <div class="contact-item">
                        Email: <a href="mailto:caja@inec.org.mx">caja@inec.org.mx</a>
                    </div>
                    <div class="contact-item">
                        Teléfono: <a href="tel:+525591118400">+52 (55) 91118400</a>
                    </div>
                    <div class="contact-item">
                        Dirección: Calle pitágoras #931, Colonia Narvarte Poniente, Alcaldía de Benito Juárez, CDMX, C.P. 03020, México
                    </div>
                </div>
                
                <div class="footer-note">
                    Este es un email automático, por favor no respondas a este mensaje.<br>
                    © ${new Date().getFullYear()}. Todos los derechos reservados.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export default paymentConfirmationTemplate;