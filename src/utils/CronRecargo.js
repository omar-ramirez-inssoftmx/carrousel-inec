import { getAllOrdersForSurcharge, updateOrderSurcharge } from '../models/orderModel.ts';

async function procesoProgramadoRecargo() {
  try {
    const pedidos = await getAllOrdersForSurcharge();

    if (!pedidos || pedidos.length === 0) {
      return { success: true, message: 'No hay pedidos para procesar' };
    }

    const currentDate = new Date();
    let recargosAplicados = 0;
    let pedidosActualizados = 0;

    for (const pedido of pedidos) {
      try {
        const dueDate = new Date(pedido.fecha_vigencia_pago);

        // Solo aplicar recargo si la fecha de vencimiento ya pasó
        if (dueDate < currentDate) {
          const { monto, fecha } = calculateSurchargeForOrder(pedido.pago, dueDate, currentDate);
          
          // Solo actualizar si hay cambios en el monto o fecha
          if (monto !== pedido.pago || fecha.getTime() !== dueDate.getTime()) {
            const formattedDate = fecha.toISOString().split('T')[0];
            await updateOrderSurcharge(pedido.id_pedido, monto, formattedDate);
            
            recargosAplicados++;
            console.log(`Recargo aplicado al pedido ${pedido.id_pedido} - Monto anterior: ${pedido.pago}, Nuevo monto: ${monto}`);
          }
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

// Función para calcular recargos acumulativos desde la fecha de vencimiento hasta hoy
function calculateSurchargeForOrder(montoOriginal, fechaVencimiento, fechaActual) {
  let montoActual = montoOriginal;
  let fechaProximaVigencia = new Date(fechaVencimiento);
  
  // Calcular cuántos períodos de recargo han pasado
  while (fechaProximaVigencia < fechaActual) {
    // Aplicar recargo del 10%
    montoActual = Math.round((montoActual * 1.10) * 100) / 100;
    
    // Mover la fecha al 15 del siguiente mes
    const siguienteMes = fechaProximaVigencia.getMonth() + 1;
    const siguienteAnio = fechaProximaVigencia.getFullYear() + (siguienteMes > 11 ? 1 : 0);
    const mesAjustado = siguienteMes > 11 ? 0 : siguienteMes;
    
    fechaProximaVigencia = new Date(siguienteAnio, mesAjustado, 15);
  }
  
  return { monto: montoActual, fecha: fechaProximaVigencia };
}

export { procesoProgramadoRecargo };