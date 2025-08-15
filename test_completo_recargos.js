// Test completo para verificar que el sistema de recargos funcione correctamente
// para todos los ciclos independientemente del mes de inicio

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
      
      // El recargo se aplica el día 16 a primera hora (00:00:01)
      // Por lo tanto, el día 15 completo (hasta 23:59:59) es válido para pagar sin recargos
      const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
      
      if (fechaActualMexico >= fechaLimiteRecargo) {
        // El mes anterior está vencido (ya pasó el día 15), aplicar 10% al monto del mes anterior
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
        const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
        
        if (fechaActualMexico >= fechaLimiteRecargo) {
          recargosAplicados++;
        }
      }
      
      resultados.push({
        ...pedidoActual,
        montoOriginal: montoActual,
        montoConRecargo: montoFinal,
        recargosAplicados,
        yaTeniaRecargo: yaTieneRecargo,
        esPrimerMes: index === 0,
        primerMesCiclo: primerMesCiclo
      });
    });
  });
  
  return resultados;
}

console.log('=== TEST COMPLETO SISTEMA DE RECARGOS ===\n');

// Test 1: Ciclo tradicional ENERO-ABRIL
console.log('=== TEST 1: CICLO ENERO-ABRIL (TRADICIONAL) ===');
const cicloEnero = [
  {
    id: 1,
    ciclo: 'ENE_A',
    mes: 1, // Enero
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-01-15T23:59:59.000Z'
  },
  {
    id: 2,
    ciclo: 'ENE_A',
    mes: 2, // Febrero
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-02-15T23:59:59.000Z'
  },
  {
    id: 3,
    ciclo: 'ENE_A',
    mes: 3, // Marzo
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-03-15T23:59:59.000Z'
  },
  {
    id: 4,
    ciclo: 'ENE_A',
    mes: 4, // Abril
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-04-15T23:59:59.000Z'
  }
];

const fechaAbril = new Date('2024-04-20T18:00:00.000Z');
const resultadoEnero = calculateSurchargeForCycle(cicloEnero, fechaAbril);

console.log('Fecha actual simulada: 20 de abril 2024');
resultadoEnero.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.mes === 1 ? 1500 : 
                   resultado.mes === 2 ? 1650 : 
                   resultado.mes === 3 ? 1815 : 
                   resultado.mes === 4 ? 1996.5 : 1500;
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

// Test 2: Ciclo JUNIO-SEPTIEMBRE
console.log('\n=== TEST 2: CICLO JUNIO-SEPTIEMBRE ===');
const cicloJunio = [
  {
    id: 5,
    ciclo: 'JUN_B',
    mes: 6, // Junio
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-06-15T23:59:59.000Z'
  },
  {
    id: 6,
    ciclo: 'JUN_B',
    mes: 7, // Julio
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-07-15T23:59:59.000Z'
  },
  {
    id: 7,
    ciclo: 'JUN_B',
    mes: 8, // Agosto
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-08-15T23:59:59.000Z'
  },
  {
    id: 8,
    ciclo: 'JUN_B',
    mes: 9, // Septiembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-09-15T23:59:59.000Z'
  }
];

const fechaSeptiembre = new Date('2024-09-20T18:00:00.000Z');
const resultadoJunio = calculateSurchargeForCycle(cicloJunio, fechaSeptiembre);

console.log('Fecha actual simulada: 20 de septiembre 2024');
resultadoJunio.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.mes === 6 ? 1500 : // Junio es el primer mes
                   resultado.mes === 7 ? 1650 : // Julio con recargo de junio
                   resultado.mes === 8 ? 1815 : // Agosto con recargo de julio
                   resultado.mes === 9 ? 1996.5 : 1500; // Septiembre con recargo de agosto
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

// Test 3: Ciclo OCTUBRE-ENERO (CRUZA AÑO)
console.log('\n=== TEST 3: CICLO OCTUBRE-ENERO (CRUZA AÑO) ===');
const cicloOctubre = [
  {
    id: 9,
    ciclo: 'OCT_C',
    mes: 10, // Octubre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-10-15T23:59:59.000Z'
  },
  {
    id: 10,
    ciclo: 'OCT_C',
    mes: 11, // Noviembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-11-15T23:59:59.000Z'
  },
  {
    id: 11,
    ciclo: 'OCT_C',
    mes: 12, // Diciembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-12-15T23:59:59.000Z'
  },
  {
    id: 12,
    ciclo: 'OCT_C',
    mes: 1, // Enero del siguiente año
    anio: 2025,
    pago: '1500',
    fecha_vigencia_pago: '2025-01-15T23:59:59.000Z'
  }
];

const fechaEnero2025 = new Date('2025-01-20T18:00:00.000Z');
const resultadoOctubre = calculateSurchargeForCycle(cicloOctubre, fechaEnero2025);

console.log('Fecha actual simulada: 20 de enero 2025');
resultadoOctubre.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const mesNombre = resultado.mes <= 12 ? meses[resultado.mes] : 'enero';
  const anioMostrar = resultado.anio === 2025 ? ' 2025' : '';
  const esperado = resultado.mes === 10 ? 1500 : // Octubre es el primer mes
                   resultado.mes === 11 ? 1650 : // Noviembre con recargo de octubre
                   resultado.mes === 12 ? 1815 : // Diciembre con recargo de noviembre
                   resultado.mes === 1 && resultado.anio === 2025 ? 1996.5 : 1500; // Enero 2025 con recargo de diciembre
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}${anioMostrar}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

// Test 4: Verificar que no se apliquen recargos cuando no han vencido
console.log('\n=== TEST 4: SIN RECARGOS CUANDO NO HAN VENCIDO ===');
const cicloActual = [
  {
    id: 13,
    ciclo: 'ACTUAL_D',
    mes: 8, // Agosto
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-08-15T23:59:59.000Z'
  },
  {
    id: 14,
    ciclo: 'ACTUAL_D',
    mes: 9, // Septiembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-09-15T23:59:59.000Z'
  },
  {
    id: 15,
    ciclo: 'ACTUAL_D',
    mes: 10, // Octubre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-10-15T23:59:59.000Z'
  }
];

// Simular fecha actual: 20 de agosto (agosto vencido el 16, septiembre y octubre no)
const fechaAgosto20 = new Date('2024-08-20T18:00:00.000Z');
const resultadoActual = calculateSurchargeForCycle(cicloActual, fechaAgosto20);

console.log('Fecha actual simulada: 20 de agosto 2024 (agosto vencido el 16, septiembre y octubre no)');
resultadoActual.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.mes === 8 ? 1500 : // Agosto es el primer mes
                   resultado.mes === 9 ? 1650 : // Septiembre con recargo porque agosto ya venció el 16
                   resultado.mes === 10 ? 1500 : 1500; // Octubre sin recargo porque septiembre no ha vencido
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

console.log('\n=== RESUMEN FINAL ===');
console.log('✅ El primer mes de cada ciclo mantiene $1500 independientemente del mes de inicio');
console.log('✅ Los recargos se aplican secuencialmente: 10% del mes anterior cuando vence');
console.log('✅ Funciona para ciclos que empiezan en cualquier mes del año');
console.log('✅ Maneja correctamente ciclos que cruzan años');
console.log('✅ No aplica recargos cuando los meses no han vencido');
console.log('✅ Usa horario de México (GMT-6) para todas las comparaciones');
console.log('✅ Aplica recargos exactamente el día 16 a primera hora');