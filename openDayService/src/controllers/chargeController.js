const Openpay = require('openpay');
const isProduction = process.env.OPENPAY_PRIVATE_TYPE === 'true'; // Solo será `true` si la variable es "true"
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, isProduction);

exports.createCharge = (req, res, next) => {

  const { token_id, device_session_id, customer, amount, description, currency } = req.body;

  // Crear el cargo
  const chargeRequest = {
    source_id: token_id,
    method: 'card',
    amount,
    currency,
    description,
    device_session_id,
    customer,
  };

  openpay.charges.create(chargeRequest, (error, charge) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({ charge });
  });
};
