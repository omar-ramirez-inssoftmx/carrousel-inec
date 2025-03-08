const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);


const cancelOrder = (customerId, transactionId) => {

 console.log("customerId ", customerId);
 console.log("transactionId ", transactionId);
  return new Promise((resolve, reject) => {
    openpay.customers.charges.delete(customerId, transactionId, (error, payout) => {
      if (error) {
        reject(error);
      } else {
        resolve(payout);
      }
    });
  });
};

module.exports = {
  cancelOrder
};