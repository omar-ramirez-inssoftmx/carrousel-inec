import React from 'react';

function PaymentLink({ paymentLink }) {
  return (
    <div>
      <h3>Link de pago generado con éxito</h3>
      <p>Se ha generado con éxito el link de pago. Favor de revisar tu correo electrónico para proceder con el pago:</p>
      {/*<a href={paymentLink} target="_blank" className="btn-custom">Ir al pago</a>*/}
    </div>
  );
}

export default PaymentLink;
