const Openpay = require('openpay');
const axios = require('axios');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);
const {cancelOrder} = require('./cancelOrder');
const { getPedidosByMatricula, getMyMatricula } = require('../models/selectStudentSataModel');

const {updatePedidosTransaccion} = require('../models/customerModel')

const selectStudentData = async (req, res, next) => {
    const { pedidosConLinks, pedidosComp } = req.body;

    try {
        /*console.log("pedidosConLinks ", pedidosConLinks)
        console.log("pedidosComp ", pedidosComp)
        console.log("pedidosComp ", pedidosConLinks[0].matricula)*/
       // const payout = cancelOrder(pedidosConLinks[0].open_pay_id, pedidosConLinks[0].transaccion);
       

        const updateCancel = updatePedidosTransaccion(pedidosConLinks[0].transaccion)

        console.log("pedidosComp ", updateCancel)

        const pedidos = await getPedidosByMatricula(pedidosConLinks[0].matricula);
  
        if (!pedidos || pedidos.length === 0) {
          return res.status(404).json({ message: 'No se encontraron pedidos' });
        }
  
        const pedidosProcesados = pedidos.map((pedido) => ({
          ...pedido,
          fecha_vigenica_descuento: pedido.fecha_vigenica_descuento || null,
          fecha_vigencia_pago: pedido.fecha_vigencia_pago || null,
          fecha_vigencia_recargo: pedido.fecha_vigencia_recargo || null,
        }));
    
        res.json(pedidosProcesados);

    } catch (error) {
        console.error("Error en la creación del link de pago:", error);
        return res.status(400).json({ error: error.message });
    }
};



module.exports = {
    selectStudentData

};
  