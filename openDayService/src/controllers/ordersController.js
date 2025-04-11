const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, process.env.OPENPAY_PRIVATE_TYPR);
exports.createPaymentLink = (req, res, next) => {
    const { customer, description, enrollment } = req.body;

    /*var chargeRequest = {
        'method' : 'card',
        'amount' : 1500,
        'description' : 'Cargo inicial a mi cuenta',
        'order_id' : 'oid-00053',
        'customer' : {
             'name' : 'angel',
             'last_name' : 'dominguez cruz',
             'phone_number' : '4423456723',
             'email' : 'angel.dominguez@inssoftmx.com'
        },
       'send_email' : true,
       'confirm' : false,
       'redirect_url' : 'http://www.openpay.mx/index.html'
     }*/
       var chargeRequest = {
        method: "card",
        amount: 1500,
        description,
        order_id: enrollment, // ID único por pedido
        customer,
        send_email: true,
        confirm: false,
        redirect_url: "http://localhost:3000/payment-success" // Página de éxito en el frontend
      };
    // Crear la orden de pago (Cargo)
    openpay.charges.create(chargeRequest, (error, order) => {
        if (error) {
          console.error("Error al crear el pedido:", error);
          return res.status(400).json({ error: error.description });
        }
        res.json({ payment_url: order.payment_method.url || "No se generó un link de pago" });

    });
};