import Openpay from 'openpay';

const isProduction: boolean = process.env.OPENPAY_SANDBOX === 'false';

const config = {
  merchantId: process.env.OPENPAY_MERCHANT_ID || '',
  privateKey: process.env.OPENPAY_PRIVATE_KEY || '',
  isProduction
};

export const openpay = new Openpay(
  config.merchantId,
  config.privateKey,
  config.isProduction
);
