const Openpay = require('openpay');
const axios = require('axios');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);
const {cancelOrder} = require('./cancelOrder');

const selectStudentData = async (req, res, next) => {
    const { customerId, transactionId } = req.body;


    try {

        const payout = cancelOrder(customerId, transactionId);
        console.log("payout ", payout)
    } catch (error) {
        console.error("Error en la creación del link de pago:", error);
        return res.status(400).json({ error: error.message });
    }
};



module.exports = {
    selectStudentData

};
  