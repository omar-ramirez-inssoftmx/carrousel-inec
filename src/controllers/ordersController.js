const { openpay } = require('../utils/openPay');

exports.createPaymentLink = (req, res, next) => {
  const { customer, description, enrollment } = req.body;

  var chargeRequest = {
    method: "card",
    amount: 1500,
    description,
    order_id: enrollment, // ID único por pedido
    customer,
    send_email: true,
    confirm: false,
    redirect_url: "http://localhost:3000/payment-success"
  };

  openpay.charges.create(chargeRequest, (error, order) => {
    if (error) {
      console.error("Error al crear el pedido:", error);
      return res.status(400).json({ error: error.description });
    }

    res.json({ payment_url: order.payment_method.url || "No se generó un link de pago" });
  });
};