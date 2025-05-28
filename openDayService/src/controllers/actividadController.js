const Openpay = require('openpay');
const axios = require('axios');
const isProduction = process.env.OPENPAY_PRIVATE_TYPE === 'true'; // Solo será `true` si la variable es "true"
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, isProduction);
const { getCustomerChargesStatus } = require('./chargesList');
const { getOrdersStudent, getAvailableMonths } = require('../models/ordersStudenModel');

const selectStudentOrders = async (req, res, next) => {
  const { matricula } = req.body;

  try {
      const pedidos = await getOrdersStudent(matricula);
      const meses = await getAvailableMonths(matricula);
      const pedidosFormateados = await formatOrders(pedidos);
      const pedidosAgrupados = agruparPedidos(pedidosFormateados);

      res.json({
          pedidos: pedidosAgrupados, // Ya incluye los detalles internos
          mesesDisponibles: meses
      });
  } catch (error) {
      console.error("Error en la obtención de órdenes:", error);
      res.status(400).json({ error: error.message });
  }
};
// Función para agrupar pedidos por identificador_pago
const agruparPedidos = (pedidos) => {
    const grupos = {};

    // 1. Primero agrupamos los pedidos por su identificador
    pedidos.forEach(pedido => {
        if (!grupos[pedido.numero]) {
            grupos[pedido.numero] = {
                numero: pedido.numero,
                conceptos: [],
                fecha: pedido.fecha,
                montoTotal: 0,
                factura: pedido.factura,
                card: pedido.card,
                detalles: [] // Nuevo array para guardar los detalles completos
            };
        }
        
        grupos[pedido.numero].conceptos.push(pedido.pago);
        grupos[pedido.numero].montoTotal = pedido.monto.replace('$', '').replace(/,/g, '');
        grupos[pedido.numero].detalles.push(pedido); // Guardamos el pedido completo
    });

    // 2. Formateamos el resultado final
    return Object.values(grupos).map(grupo => ({
        numero: grupo.numero,
        pago: grupo.conceptos.join(', '),
        fecha: grupo.fecha,
        monto: `$${grupo.montoTotal.toLocaleString('es-MX')}`,
        factura: grupo.factura,
        card: grupo.card,
        cantidadConceptos: grupo.conceptos.length,
        pedidosDetail: grupo.detalles // Incluimos los detalles completos
    }));
};

const formatOrders = async (orders) => {
    // Usamos Promise.all para esperar a que todas las promesas del map se resuelvan
    return Promise.all(orders.map(async (order) => {
        console.log("order formatOrders", order);
        const monto = order.monto_real_pago;
    
        let fechaFormateada = "Sin fecha";
        if (order.fecha_pago) {
            try {
                const fecha = new Date(order.fecha_pago);
                const opcionesFecha = { day: '2-digit', month: 'short', year: '2-digit' };
                fechaFormateada = fecha.toLocaleDateString('es-MX', opcionesFecha);
            } catch (err) {
                console.warn("Fecha inválida en el pedido:", order);
            }
        }
    
        if (!order.fecha_pago) {
            fechaFormateada = "Sin fecha";
        }

        const openpayStatus = await getCustomerChargesStatus(order.open_pay_id, order.identificador_pago);
        console.log("openpayStatus ", openpayStatus);
    
        return {
            numero: order.identificador_pago || 'N/A',
            pago: order.concepto_pedido || 'Sin concepto',
            fecha: fechaFormateada,
            monto: `$${monto.toLocaleString('es-MX')}`,
            factura: order.transaccion_Id ? 'Descargar' : 'Sin factura',            
            card: {card_brand: openpayStatus.card.brand || 'N/A',
            card_number: openpayStatus.card.card_number	 || 'N/A',
            card_id: openpayStatus.card.id	 || 'N/A'}
        };
    }));
};
  
module.exports = {
    selectStudentOrders
};