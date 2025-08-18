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

    // Generar lista de pedidos con estilo minimalista
    const pedidosList = pedidos.map(pedido => {
        const mesNombre = meses[pedido.mes - 1] || 'Mes desconocido';
        const conceptoEmail = `Pago de ${mesNombre} ${pedido.anio}`;
        const monto = pedido.pago || "0";

        return `
        <div style="border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin-bottom: 8px; background: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 500; color: #111827; font-size: 14px; margin-bottom: 2px;">Mensualidad</div>
                    <div style="color: #6b7280; font-size: 13px;">${conceptoEmail}</div>
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
        <title>Enlace de Pago - INEC</title>
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
            .info-card {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                padding: 16px;
                margin: 16px 0;
            }
            .info-title {
                font-size: 14px;
                font-weight: 500;
                color: #111827;
                margin-bottom: 12px;
            }
            .info-item {
                margin: 6px 0;
                font-size: 13px;
                color: #6b7280;
            }
            .info-label {
                font-weight: 500;
                color: #111827;
            }
            .section-title {
                font-size: 16px;
                font-weight: 500;
                color: #111827;
                margin-bottom: 16px;
            }
            .payment-items {
                margin: 24px 0;
            }
            .total-card {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                padding: 20px;
                border-radius: 6px;
                text-align: center;
                margin: 24px 0;
            }
            .total-label {
                font-size: 13px;
                color: #6b7280;
                margin-bottom: 4px;
                font-weight: 400;
            }
            .total-amount {
                font-size: 24px;
                font-weight: 600;
                margin: 8px 0;
                color: #111827;
            }
            .total-currency {
                font-size: 12px;
                color: #9ca3af;
                font-weight: 400;
            }
            .cta-section {
                text-align: center;
                margin: 24px 0;
            }
            .payment-button {
                background: #D9D9D9;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
                border: 1px solid #111827;
            }
            .payment-button:hover {
                background: #374151;
                border-color: #374151;
            }
            .warning-card {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                padding: 16px;
                border-radius: 6px;
                margin: 24px 0;
            }
            .warning-title {
                font-weight: 500;
                margin-bottom: 8px;
                color: #111827;
                font-size: 14px;
            }
            .footer {
                background: #f9fafb;
                padding: 24px;
                border-top: 1px solid #e5e7eb;
            }
            .contact-info {
                margin-bottom: 16px;
            }
            .contact-item {
                margin: 8px 0;
                color: #6b7280;
                font-size: 13px;
            }
            .contact-item a {
                color: #111827;
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
            }
            @media only screen and (max-width: 600px) {
                .container {
                    margin: 8px;
                    border-radius: 6px;
                }
                .header, .content, .footer {
                    padding: 16px;
                }
                .total-amount {
                    font-size: 20px;
                }
                .payment-button {
                    width: 100%;
                    text-align: center;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header con logo -->
            <div class="header">
                <div class="logo">
                    <img src="https://res.cloudinary.com/dgxdwxi37/image/upload/v1755553359/logo_u831nb.png" alt="INEC CAPPMEX" />
                </div>
            </div>

            <div class="content">
                <div class="greeting">¡Hola!</div>
                
                <div class="description">
                    Te enviamos tu enlace de pago personalizado para que puedas realizar el pago de tus mensualidades de forma segura y rápida.
                </div>

                <!-- Información de la cuenta -->
                <div class="info-card">
                    <div class="info-title">
                        Información de tu Cuenta
                    </div>
                    <div class="info-item">
                        <span class="info-label">Matrícula:</span> ${matricula}
                    </div>
                </div>

                <!-- Conceptos a pagar -->
                <div class="payment-items">
                    <div class="section-title">
                        Conceptos a Pagar
                    </div>
                    ${pedidosList}
                </div>

                <!-- Total -->
                <div class="total-card">
                    <div class="total-label">Total a Pagar</div>
                    <div class="total-amount">$${total}</div>
                    <div class="total-currency">Pesos Mexicanos (MXN)</div>
                </div>

                <!-- Botón de pago -->
                <div class="cta-section">
                    <a href="${link}" class="payment-button">
                        Pagar Ahora
                    </a>
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

export default paymentLinkTemplate;