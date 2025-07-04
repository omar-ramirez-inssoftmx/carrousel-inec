// emailTemplates.js

const emailTemplates = {
  email: {
    subject: "Link de pago INEC",
    body: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hola, tu link de pago está listo</h2>
        <p>Matrícula: <b>${'${matricula}'}</b></p>
        <p>Fecha de creación: <b>${'${creaFecha}'}</b></p>
        <p>Fecha de vigencia: <b>${'${vigeniaFecha}'}</b></p>
        <table width="100%" style="border-collapse: collapse;">
          <tbody>
            ${'${pedidos}'}
          </tbody>
        </table>
        <h3>Total: ${'${total}'}</h3>
        <p><a href="${'${link}'}" style="background: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Pagar ahora</a></p>
      </div>
    `
  }
};

module.exports = emailTemplates; 