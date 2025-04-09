const Openpay = require('openpay');
const axios = require('axios');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);


const {getOrdersStudent} = require('../models/OrdersModel')

const selectStudentOrders = async (req, res, next) => {
    const { matricula } = req.body;

    try {
      
        const pedidos = await getOrdersStudent(matricula);

        console.log("pedidos ====>", pedidos);
      
        res.json(pedidos);
    } catch (error) {
        console.error("Error en la obtencion de ordenes:", error);
        return res.status(400).json({ error: error.message });
    }
};



module.exports = {
    selectStudentOrders

};
  