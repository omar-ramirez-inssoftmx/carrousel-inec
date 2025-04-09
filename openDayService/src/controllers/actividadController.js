const Openpay = require('openpay');
const axios = require('axios');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);


const {getOrdersStudent, getAvailableMonths} = require('../models/ordersModel')

const selectStudentOrders = async (req, res, next) => {
    const { matricula } = req.body;

    try {
        const pedidos = await getOrdersStudent(matricula);
        const meses = await getAvailableMonths(matricula); // función que tú defines

        // Si quieres, puedes formatear los pedidos aquí también
        const pedidosFormateados = formatOrders(pedidos); // (como vimos antes)

        res.json({
            pedidos: pedidosFormateados,
            mesesDisponibles: meses
        });
    } catch (error) {
        console.error("Error en la obtención de órdenes:", error);
        res.status(400).json({ error: error.message });
    }
};
const formatOrders = (orders) => {
    return orders.map(order => {
      console.log("order formatOrders", order);
      const monto = order.monto_real_pago;
  
      let fechaFormateada = "Sin fecha";
      if (order.fecha_pago) {
        try {
          const fecha = new Date(order.fecha_pago);  // No hace falta el replace
          const opcionesFecha = { day: '2-digit', month: 'short', year: '2-digit' };
          fechaFormateada = fecha.toLocaleDateString('es-MX', opcionesFecha);
        } catch (err) {
          console.warn("Fecha inválida en el pedido:", order);
        }
      }
  
      if (!order.fecha_pago) {
        fechaFormateada = "Sin fecha"; // Asegura que si no hay fecha de pago, se manda "Sin fecha"
      }
  
      return {
        numero: order.identificador_pago || 'N/A',
        pago: order.concepto_pedido || 'Sin concepto',
        fecha: fechaFormateada,
        monto: `$${monto.toLocaleString('es-MX')}`,
        factura: order.transaccion_Id ? 'Descargar' : 'Sin factura'
      };
    });
  };
  
  
  

module.exports = {
    selectStudentOrders

};
  