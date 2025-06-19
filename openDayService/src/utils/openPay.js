const Openpay = require('openpay');
const isProduction = process.env.OPENPAY_PRIVATE_TYPE === 'true';

const openpay = new Openpay(
  process.env.OPENPAY_MERCHANT_ID,
  process.env.OPENPAY_PRIVATE_KEY,
  isProduction
);

module.exports = { openpay };
