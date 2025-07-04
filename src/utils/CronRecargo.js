const { getAllOrdersForSurcharge } = require('../models/orderModel');
const { updateOrderSurcharge } = require('../models/orderModel');

async function procesoProgramadoRecargo() {
  try {
    const pedidos = await getAllOrdersForSurcharge();

    if (!pedidos || pedidos.length === 0) {
      return { success: true, message: 'No hay pedidos para procesar' };
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const cutoffDate = new Date(currentYear, currentMonth, 15);

    let recargosAplicados = 0;
    let pedidosActualizados = 0;

    for (const pedido of pedidos) {
      try {
        const dueDate = new Date(pedido.fecha_vigencia_pago);

        if (dueDate <= cutoffDate) {
          // Calcular nuevo monto con 10% de recargo
          const nuevoMonto = Math.round((pedido.pago * 1.10) * 100) / 100;

          // Calcular nueva fecha (15 del siguiente mes)
          let nextMonth = currentMonth + 1;
          let nextYear = currentYear;
          if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
          }
          const nuevaFechaVigencia = new Date(nextYear, nextMonth, 15);
          const formattedDate = nuevaFechaVigencia.toISOString().split('T')[0];

          await updateOrderSurcharge(pedido.id_pedido, nuevoMonto, formattedDate);

          recargosAplicados++;
          console.log(`Recargo aplicado al pedido ${pedido.id_pedido} - Nuevo monto: ${nuevoMonto}`);
        }

        pedidosActualizados++;
      } catch (error) {
        console.error(`Error procesando pedido ${pedido.id_pedido}:`, error);
      }
    }

    return {
      success: true,
      totalPedidos: pedidos.length,
      pedidosActualizados,
      recargosAplicados
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { procesoProgramadoRecargo };