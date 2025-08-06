import Openpay from 'openpay';
import dotenv from 'dotenv';

dotenv.config();

const isProduction: boolean = process.env.OPENPAY_SANDBOX === 'false';

const config = {
  merchantId: process.env.OPENPAY_MERCHANT_ID,
  privateKey: process.env.OPENPAY_PRIVATE_KEY,
  isProduction
};

if (!config.merchantId || !config.privateKey) {
  throw new Error('OpenPay credentials are missing. Please check your environment variables.');
}

export const openpay = new Openpay(
  config.merchantId,
  config.privateKey,
  config.isProduction
);
