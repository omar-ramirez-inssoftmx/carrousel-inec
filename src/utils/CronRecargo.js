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

    // Usar la nueva lógica de ciclo completo
    const resultados = calculateSurchargeForCycle(pedidos, currentDate);
    
    for (const resultado of resultados) {
      try {
        // Actualizar SIEMPRE si hay cambios en el monto (para corregir recargos incorrectos)
        if (resultado.montoConRecargo !== resultado.montoOriginal) {
          await updateOrderSurcharge(resultado.id_pedido, resultado.montoConRecargo);
          
          recargosAplicados++;
          if (resultado.yaTeniaRecargo) {
            console.log(`Recargo corregido en pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo}, Recargos aplicados: ${resultado.recargosAplicados}`);
          } else {
            console.log(`Recargo aplicado al pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo}, Recargos aplicados: ${resultado.recargosAplicados}`);
          }
        } else {
          console.log(`Pedido ${resultado.id_pedido} mantiene monto correcto - Monto: ${resultado.montoOriginal}, Recargos: ${resultado.recargosAplicados}`);
        }

        pedidosActualizados++;
      } catch (error) {
        console.error(`Error procesando pedido ${resultado.id_pedido}:`, error);
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

// Nueva función para calcular recargos correctamente
// Lógica: cada mes mantiene su monto base, cuando se vence un mes se aplica 10% a los siguientes
// Ejemplo: mayo-1500, junio-1650, julio-1815, agosto-1996.5
function calculateSurchargeForOrder(montoOriginal, fechaVencimiento, fechaActual) {
  // El monto base siempre se mantiene para el mes actual
  let montoFinal = montoOriginal;
  
  // Si la fecha de vencimiento aún no ha pasado, no hay recargo
  if (fechaVencimiento >= fechaActual) {
    return { monto: montoFinal, fecha: fechaVencimiento };
  }
  
  // NOTA: Esta función ahora requiere contexto del ciclo completo para funcionar correctamente
  // Por ahora, mantenemos la lógica anterior como fallback
  // TODO: Implementar calculateSurchargeForCycle que considere todos los meses del ciclo
  
  let fechaProximaVigencia = new Date(fechaVencimiento);
  
  // Mover inmediatamente al siguiente mes para aplicar el primer recargo
  const primerMesRecargo = fechaProximaVigencia.getMonth() + 1;
  const primerAnioRecargo = fechaProximaVigencia.getFullYear() + (primerMesRecargo > 11 ? 1 : 0);
  const primerMesAjustado = primerMesRecargo > 11 ? 0 : primerMesRecargo;
  
  fechaProximaVigencia = new Date(primerAnioRecargo, primerMesAjustado, 15);
  
  // Calcular cuántos períodos de recargo han pasado desde el mes siguiente
  while (fechaProximaVigencia < fechaActual) {
    // Aplicar recargo del 10%
    montoFinal = Math.round((montoFinal * 1.10) * 100) / 100;
    
    // Mover la fecha al 15 del siguiente mes
    const siguienteMes = fechaProximaVigencia.getMonth() + 1;
    const siguienteAnio = fechaProximaVigencia.getFullYear() + (siguienteMes > 11 ? 1 : 0);
    const mesAjustado = siguienteMes > 11 ? 0 : siguienteMes;
    
    fechaProximaVigencia = new Date(siguienteAnio, mesAjustado, 15);
  }
  
  return { monto: montoFinal, fecha: fechaProximaVigencia };
}

// Nueva función que calcula recargos considerando todo el ciclo
// Esta es la implementación correcta de la lógica de negocio
function calculateSurchargeForCycle(pedidos, fechaActual) {
  const pedidosAgrupados = {};
  
  // Agrupar pedidos por ciclo
  pedidos.forEach(pedido => {
    if (!pedidosAgrupados[pedido.ciclo]) {
      pedidosAgrupados[pedido.ciclo] = [];
    }
    pedidosAgrupados[pedido.ciclo].push(pedido);
  });

  const resultados = [];

  Object.keys(pedidosAgrupados).forEach(cicloKey => {
    const ciclo = pedidosAgrupados[cicloKey];
    
    // Ordenar por año y mes
    ciclo.sort((a, b) => {
      if (a.anio !== b.anio) return a.anio - b.anio;
      return a.mes - b.mes;
    });

    // Calcular montos acumulativos para todo el ciclo
    const baseAmount = 1500;
    const surchargeRate = 0.10;
    const montos = [];
    
    // El primer mes del ciclo siempre mantiene el monto base
    montos.push(baseAmount);
    
    // Calcular secuencialmente cada mes del ciclo
    for (let i = 1; i < ciclo.length; i++) {
      const pedidoAnterior = ciclo[i - 1];
      const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
      
      if (fechaVencimientoAnterior < fechaActual) {
        // El mes anterior está vencido, aplicar 10% al monto del mes anterior
        const montoAnterior = montos[i - 1];
        const nuevoMonto = montoAnterior * (1 + surchargeRate);
        montos.push(Math.round(nuevoMonto * 100) / 100);
      } else {
        // El mes anterior no está vencido, mantener monto base
        montos.push(baseAmount);
      }
    }

    // Asignar montos calculados a cada pedido
    ciclo.forEach((pedidoActual, index) => {
      const montoActual = parseFloat(pedidoActual.pago);
      const yaTieneRecargo = montoActual > baseAmount;
      const montoFinal = montos[index];
      
      // Contar recargos aplicados
      let recargosAplicados = 0;
      for (let i = 0; i < index; i++) {
        const pedidoAnterior = ciclo[i];
        const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
        if (fechaVencimientoAnterior < fechaActual) {
          recargosAplicados++;
        }
      }
      
      resultados.push({
        ...pedidoActual,
        montoOriginal: montoActual, // Usar el monto actual como original
        montoConRecargo: montoFinal,
        recargosAplicados,
        yaTeniaRecargo: yaTieneRecargo
      });
    });
  });
  
  return resultados;
}

export { procesoProgramadoRecargo };