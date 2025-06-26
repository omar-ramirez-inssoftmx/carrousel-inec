const { openpay } = require('../utils/openPay');

exports.createCharge = (req, res, next) => {
  const {
    token_id,
    device_session_id,
    customer,
    amount,
    description,
    currency
  } = req.body;

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
