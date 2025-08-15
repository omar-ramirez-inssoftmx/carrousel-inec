// Test para verificar que el cron no aplique recargos duplicados
// cuando se ejecuta múltiples veces consecutivas

function calculateSurchargeForCycle(pedidos, fechaActual) {
  const pedidosAgrupados = {};
  
  // Convertir fechaActual a horario de México (GMT-6)
  const fechaActualMexico = new Date(fechaActual.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
  
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
    
    // Ordenar por año y mes cronológicamente
    ciclo.sort((a, b) => {
      if (a.anio !== b.anio) return a.anio - b.anio;
      return a.mes - b.mes;
    });

    // Identificar el primer mes del ciclo (el mes más temprano en la secuencia)
    // Este será el mes base que debe mantener $1500
    const primerMesCiclo = ciclo[0].mes;
    const primerAnioCiclo = ciclo[0].anio;

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
      
      // Convertir fecha de vencimiento a horario de México
      const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
      
      // El recargo se aplica el día 16 del mes de vencimiento del pedido anterior a primera hora (00:00:01)
      // Por lo tanto, el día 15 completo (hasta 23:59:59) es válido para pagar sin recargos
      const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
      
      if (fechaActualMexico >= fechaLimiteRecargo) {
        // El mes anterior está vencido (ya pasó el día 15 de su mes de vencimiento), aplicar 10% al monto del mes anterior
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
      const montoFinal = montos[index];
      
      // Determinar si ya tenía recargo comparando con el monto base
      const yaTieneRecargo = montoActual > baseAmount;
      
      // Contar recargos aplicados
      let recargosAplicados = 0;
      for (let i = 0; i < index; i++) {
        const pedidoAnterior = ciclo[i];
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

console.log('=== TEST CRON - PREVENCIÓN DE RECARGOS DUPLICADOS ===\n');

// Simular un ciclo con montos incorrectos (como el ejemplo del usuario)
const cicloConRecargosIncorrectos = [
  {
    id_pedido: 1,
    ciclo: 'MAR_A',
    mes: 3, // Marzo - PRIMER MES (debería ser $1500)
    anio: 2024,
    pago: '1996.5', // Monto incorrecto actual
    fecha_vigencia_pago: '2024-03-15T23:59:59.000Z'
  },
  {
    id_pedido: 2,
    ciclo: 'MAR_A',
    mes: 4, // Abril
    anio: 2024,
    pago: '2657.35', // Monto incorrecto actual
    fecha_vigencia_pago: '2024-04-15T23:59:59.000Z'
  },
  {
    id_pedido: 3,
    ciclo: 'MAR_A',
    mes: 5, // Mayo
    anio: 2024,
    pago: '3536.94', // Monto incorrecto actual
    fecha_vigencia_pago: '2024-05-15T23:59:59.000Z'
  },
  {
    id_pedido: 4,
    ciclo: 'MAR_A',
    mes: 6, // Junio
    anio: 2024,
    pago: '4707.66', // Monto incorrecto actual
    fecha_vigencia_pago: '2024-06-15T23:59:59.000Z'
  }
];

// Primera ejecución del cron (simular fecha actual: 20 de junio)
const fechaJunio20 = new Date('2024-06-20T18:00:00.000Z');
console.log('=== PRIMERA EJECUCIÓN DEL CRON ===');
console.log('Fecha actual simulada: 20 de junio 2024');
console.log('Montos actuales en BD (incorrectos):');
cicloConRecargosIncorrectos.forEach(pedido => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'];
  console.log(`  ${meses[pedido.mes]}: $${pedido.pago}`);
});

const resultadoPrimeraEjecucion = calculateSurchargeForCycle(cicloConRecargosIncorrectos, fechaJunio20);

console.log('\nResultados de la primera ejecución:');
resultadoPrimeraEjecucion.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.mes === 3 ? 1500 : // Marzo es el primer mes
                   resultado.mes === 4 ? 1650 : // Abril con recargo de marzo
                   resultado.mes === 5 ? 1815 : // Mayo con recargo de abril
                   resultado.mes === 6 ? 1996.5 : 1500; // Junio con recargo de mayo
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const actualizacion = resultado.necesitaActualizacion ? ' (NECESITA ACTUALIZACIÓN)' : ' (YA CORRECTO)';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  
  console.log(`  ${mesNombre}: $${resultado.montoOriginal} → $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${actualizacion}${primerMes}`);
});

// Simular que se actualizaron los montos en la BD
const cicloCorregido = cicloConRecargosIncorrectos.map((pedido, index) => {
  const resultado = resultadoPrimeraEjecucion[index];
  return {
    ...pedido,
    pago: resultado.montoConRecargo.toString()
  };
});

// Segunda ejecución del cron (mismo día)
console.log('\n=== SEGUNDA EJECUCIÓN DEL CRON (MISMO DÍA) ===');
console.log('Montos actuales en BD (ya corregidos):');
cicloCorregido.forEach(pedido => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'];
  console.log(`  ${meses[pedido.mes]}: $${pedido.pago}`);
});

const resultadoSegundaEjecucion = calculateSurchargeForCycle(cicloCorregido, fechaJunio20);

console.log('\nResultados de la segunda ejecución:');
let actualizacionesNecesarias = 0;
resultadoSegundaEjecucion.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'];
  const mesNombre = meses[resultado.mes];
  const actualizacion = resultado.necesitaActualizacion ? ' (NECESITA ACTUALIZACIÓN)' : ' (YA CORRECTO)';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  
  if (resultado.necesitaActualizacion) {
    actualizacionesNecesarias++;
  }
  
  console.log(`  ${mesNombre}: $${resultado.montoOriginal} → $${resultado.montoConRecargo.toFixed(2)}${actualizacion}${primerMes}`);
});

// Tercera ejecución del cron (día siguiente)
const fechaJunio21 = new Date('2024-06-21T18:00:00.000Z');
console.log('\n=== TERCERA EJECUCIÓN DEL CRON (DÍA SIGUIENTE) ===');
console.log('Fecha actual simulada: 21 de junio 2024');

const resultadoTerceraEjecucion = calculateSurchargeForCycle(cicloCorregido, fechaJunio21);

console.log('\nResultados de la tercera ejecución:');
let actualizacionesNecesariasTercera = 0;
resultadoTerceraEjecucion.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'];
  const mesNombre = meses[resultado.mes];
  const actualizacion = resultado.necesitaActualizacion ? ' (NECESITA ACTUALIZACIÓN)' : ' (YA CORRECTO)';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  
  if (resultado.necesitaActualizacion) {
    actualizacionesNecesariasTercera++;
  }
  
  console.log(`  ${mesNombre}: $${resultado.montoOriginal} → $${resultado.montoConRecargo.toFixed(2)}${actualizacion}${primerMes}`);
});

console.log('\n=== RESUMEN DE VALIDACIÓN ===');
const primeraEjecucionCorrecta = resultadoPrimeraEjecucion.every(r => {
  const esperado = r.mes === 3 ? 1500 : r.mes === 4 ? 1650 : r.mes === 5 ? 1815 : r.mes === 6 ? 1996.5 : 1500;
  return Math.abs(r.montoConRecargo - esperado) < 0.02;
});

const segundaEjecucionSinCambios = actualizacionesNecesarias === 0;
const terceraEjecucionSinCambios = actualizacionesNecesariasTercera === 0;

console.log(`✅ Primera ejecución corrige montos incorrectos: ${primeraEjecucionCorrecta ? 'SÍ' : 'NO'}`);
console.log(`✅ Segunda ejecución no hace cambios innecesarios: ${segundaEjecucionSinCambios ? 'SÍ' : 'NO'}`);
console.log(`✅ Tercera ejecución no hace cambios innecesarios: ${terceraEjecucionSinCambios ? 'SÍ' : 'NO'}`);
console.log(`✅ Prevención de recargos duplicados: ${segundaEjecucionSinCambios && terceraEjecucionSinCambios ? 'FUNCIONA' : 'FALLA'}`);

if (primeraEjecucionCorrecta && segundaEjecucionSinCambios && terceraEjecucionSinCambios) {
  console.log('\n🎉 TODAS LAS VALIDACIONES PASARON - EL CRON FUNCIONA CORRECTAMENTE');
} else {
  console.log('\n❌ ALGUNAS VALIDACIONES FALLARON - REVISAR LÓGICA DEL CRON');
}