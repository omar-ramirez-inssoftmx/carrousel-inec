const { openpay } = require('../utils/openPay');

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