const nodemailer = require("nodemailer");

async function sendMailOtp(otp, link, email) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: "desarrollo.movil@inssoftmx.com",
                pass: "6wVcjd7W0kFyEHhp"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: '"Test" <test@test.com>',
            to: email,
            subject: "Link de pago colegiatura",
            html: `<p>Hola: <b>${otp}</b><br> Te compartimos tu link de pago ${link} </p>`
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Correo enviado: ", info.messageId);
    } catch (error) {
        console.error("Error al enviar el correo: ", error);
    }
}

module.exports = { sendMailOtp };