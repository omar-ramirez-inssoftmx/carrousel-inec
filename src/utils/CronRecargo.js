import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

// Función para obtener todos los pedidos para recargo
async function getAllOrdersForSurcharge() {
  try {
    const pedidos = await prisma.pedidos.findMany({
      where: {
        id_cat_estatus: 3
      },
      include: {
        alumno: true,
        cat_estatus: true
      }
    });

    return pedidos.map(pedido => ({
      id_pedido: pedido.id_pedido,
      identificador_pago: pedido.identificador_pago,
      id_cat_estatus: pedido.id_cat_estatus,
      estatus: pedido.cat_estatus.descripcion,
      pago: pedido.pago,
      fecha_vigencia_pago: pedido.fecha_vigencia_pago,
      link_de_pago: pedido.link_de_pago,
      transaccion_Id: pedido.transaccion_Id,
      ciclo: pedido.ciclo,
      mes: pedido.mes,
      anio: pedido.anio,
      matricula: pedido.alumno.matricula,
      open_pay_id: pedido.alumno.open_pay_id,
      nombre_alumno: pedido.alumno.nombre,
      apellido_paterno: pedido.alumno.apellido_paterno,
      apellido_materno: pedido.alumno.apellido_materno,
      email: pedido.alumno.email,
      celular: pedido.alumno.celular
    }));
  } catch {
    throw new Error("Error al obtener todos los pedidos por matrícula");
  }
}

// Función para actualizar el recargo de un pedido
async function updateOrderSurcharge(id, pago) {
  try {
    const result = await prisma.pedidos.update({
      where: {
        id_pedido: id
      },
      data: {
        pago: pago
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

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
        // Solo actualizar si realmente necesita actualización
        if (resultado.necesitaActualizacion) {
          await updateOrderSurcharge(resultado.id_pedido, resultado.montoConRecargo);
          
          recargosAplicados++;
          
          if (resultado.esPrimerMes) {
            console.log(`Primer mes corregido en pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo} (debe ser $1500)`);
          } else if (resultado.yaTeniaRecargo) {
            console.log(`Recargo corregido en pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo}, Recargos aplicados: ${resultado.recargosAplicados}`);
          } else {
            console.log(`Recargo aplicado al pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo}, Recargos aplicados: ${resultado.recargosAplicados}`);
          }
        } else {
          console.log(`Pedido ${resultado.id_pedido} ya tiene el monto correcto - Monto: ${resultado.montoOriginal}, Recargos: ${resultado.recargosAplicados}`);
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

// Nueva función que calcula recargos considerando cada alumno individualmente
// Esta es la implementación correcta de la lógica de negocio
function calculateSurchargeForCycle(pedidos, fechaActual) {
  const pedidosAgrupados = {};
  
  // Convertir fechaActual a horario de México (GMT-6)
  const fechaActualMexico = new Date(fechaActual.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
  
  // Agrupar pedidos por alumno
  pedidos.forEach(pedido => {
    if (!pedidosAgrupados[pedido.matricula]) {
      pedidosAgrupados[pedido.matricula] = [];
    }
    pedidosAgrupados[pedido.matricula].push(pedido);
  });

  const resultados = [];

  Object.keys(pedidosAgrupados).forEach(matriculaKey => {
    const pedidosAlumno = pedidosAgrupados[matriculaKey];
    
    // Ordenar por año, ciclo y mes cronológicamente
    pedidosAlumno.sort((a, b) => {
      if (a.anio !== b.anio) return a.anio - b.anio;
      if (a.ciclo !== b.ciclo) return a.ciclo - b.ciclo;
      return a.mes - b.mes;
    });

    // Identificar el primer mes del alumno (el mes más temprano en la secuencia)
    // Este será el mes base que debe mantener $1500
    const primerMesAlumno = pedidosAlumno[0].mes;
    const primerAnioAlumno = pedidosAlumno[0].anio;

    // Calcular montos acumulativos para cada pedido del alumno
    const baseAmount = 1500;
    const surchargeRate = 0.10;
    const montos = [];
    
    // El primer mes del alumno siempre mantiene el monto base
    montos.push(baseAmount);
    
    // Calcular secuencialmente cada mes del alumno
    for (let i = 1; i < pedidosAlumno.length; i++) {
      let recargosAplicados = 0;
      
      // Contar cuántos meses anteriores están vencidos
      for (let j = 0; j < i; j++) {
        const pedidoAnterior = pedidosAlumno[j];
        const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
        
        // Convertir fecha de vencimiento a horario de México
        const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        
        // El recargo se aplica el día 16 del mes de vencimiento del pedido anterior a primera hora (00:00:01)
        const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
        
        if (fechaActualMexico >= fechaLimiteRecargo) {
          recargosAplicados++;
        }
      }
      
      // Calcular monto con recargos acumulativos (10% por cada mes vencido)
      const montoConRecargos = baseAmount * Math.pow(1 + surchargeRate, recargosAplicados);
      montos.push(Math.round(montoConRecargos * 100) / 100);
    }

    // Asignar montos calculados a cada pedido del alumno
    pedidosAlumno.forEach((pedidoActual, index) => {
      const montoActual = parseFloat(pedidoActual.pago);
      const montoFinal = montos[index];
      
      // Determinar si ya tenía recargo comparando con el monto base
      const yaTieneRecargo = montoActual > baseAmount;
      
      // Contar recargos aplicados para este pedido específico
      let recargosAplicados = 0;
      for (let i = 0; i < index; i++) {
        const pedidoAnterior = pedidosAlumno[i];
        const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
        const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
        
        if (fechaActualMexico >= fechaLimiteRecargo) {
          recargosAplicados++;
        }
      }
      
      // Solo incluir en resultados si el monto calculado es diferente al actual
      // Esto evita actualizaciones innecesarias y recargos duplicados
      const necesitaActualizacion = Math.abs(montoActual - montoFinal) > 0.01;
      
      resultados.push({
        ...pedidoActual,
        montoOriginal: montoActual,
        montoConRecargo: montoFinal,
        recargosAplicados,
        yaTeniaRecargo: yaTieneRecargo,
        necesitaActualizacion: necesitaActualizacion,
        esPrimerMes: index === 0
      });
    });
  });
  
  return resultados;
}

export { procesoProgramadoRecargo };