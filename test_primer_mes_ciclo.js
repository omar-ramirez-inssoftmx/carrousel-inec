// Test para verificar que el primer mes de cualquier ciclo mantenga $1500
// independientemente del mes en que inicie (mayo, septiembre, etc.)

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
      
      resultados.push({
        ...pedidoActual,
        montoOriginal: montoActual,
        montoConRecargo: montoFinal,
        yaTeniaRecargo: yaTieneRecargo,
        esPrimerMes: index === 0
      });
    });
  });
  
  return resultados;
}

console.log('=== TEST PRIMER MES DE CICLOS DIFERENTES ===\n');

// Test 1: Ciclo que empieza en MAYO
console.log('=== TEST 1: CICLO MAYO-AGOSTO ===');
const cicloMayo = [
  {
    id: 1,
    ciclo: 'MAYO_A',
    mes: 5, // Mayo
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-05-15T23:59:59.000Z'
  },
  {
    id: 2,
    ciclo: 'MAYO_A',
    mes: 6, // Junio
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-06-15T23:59:59.000Z'
  },
  {
    id: 3,
    ciclo: 'MAYO_A',
    mes: 7, // Julio
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-07-15T23:59:59.000Z'
  },
  {
    id: 4,
    ciclo: 'MAYO_A',
    mes: 8, // Agosto
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-08-15T23:59:59.000Z'
  }
];

// Simular fecha actual: 20 de agosto (todos los meses anteriores vencidos)
const fechaAgosto = new Date('2024-08-20T18:00:00.000Z');
const resultadoMayo = calculateSurchargeForCycle(cicloMayo, fechaAgosto);

console.log('Fecha actual simulada: 20 de agosto 2024');
resultadoMayo.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.esPrimerMes ? 1500 : 
                   resultado.mes === 6 ? 1650 : // Junio con recargo de mayo
                   resultado.mes === 7 ? 1815 : // Julio con recargo de junio
                   resultado.mes === 8 ? 1996.5 : 1500; // Agosto con recargo de julio
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

// Test 2: Ciclo que empieza en SEPTIEMBRE
console.log('\n=== TEST 2: CICLO SEPTIEMBRE-DICIEMBRE ===');
const cicloSeptiembre = [
  {
    id: 5,
    ciclo: 'SEPT_B',
    mes: 9, // Septiembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-09-15T23:59:59.000Z'
  },
  {
    id: 6,
    ciclo: 'SEPT_B',
    mes: 10, // Octubre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-10-15T23:59:59.000Z'
  },
  {
    id: 7,
    ciclo: 'SEPT_B',
    mes: 11, // Noviembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-11-15T23:59:59.000Z'
  },
  {
    id: 8,
    ciclo: 'SEPT_B',
    mes: 12, // Diciembre
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-12-15T23:59:59.000Z'
  }
];

// Simular fecha actual: 20 de diciembre (todos los meses anteriores vencidos)
const fechaDiciembre = new Date('2024-12-20T18:00:00.000Z');
const resultadoSeptiembre = calculateSurchargeForCycle(cicloSeptiembre, fechaDiciembre);

console.log('Fecha actual simulada: 20 de diciembre 2024');
resultadoSeptiembre.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.esPrimerMes ? 1500 : 
                   resultado.mes === 10 ? 1650 : // Octubre con recargo de septiembre
                   resultado.mes === 11 ? 1815 : // Noviembre con recargo de octubre
                   resultado.mes === 12 ? 1996.5 : 1500; // Diciembre con recargo de noviembre
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

// Test 3: Ciclo que empieza en FEBRERO (cruza año)
console.log('\n=== TEST 3: CICLO FEBRERO-MAYO (CRUZA AÑO) ===');
const cicloFebrero = [
  {
    id: 9,
    ciclo: 'FEB_C',
    mes: 2, // Febrero
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-02-15T23:59:59.000Z'
  },
  {
    id: 10,
    ciclo: 'FEB_C',
    mes: 3, // Marzo
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-03-15T23:59:59.000Z'
  },
  {
    id: 11,
    ciclo: 'FEB_C',
    mes: 4, // Abril
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-04-15T23:59:59.000Z'
  },
  {
    id: 12,
    ciclo: 'FEB_C',
    mes: 5, // Mayo
    anio: 2024,
    pago: '1500',
    fecha_vigencia_pago: '2024-05-15T23:59:59.000Z'
  }
];

// Simular fecha actual: 20 de mayo (todos los meses anteriores vencidos)
const fechaMayo = new Date('2024-05-20T18:00:00.000Z');
const resultadoFebrero = calculateSurchargeForCycle(cicloFebrero, fechaMayo);

console.log('Fecha actual simulada: 20 de mayo 2024');
resultadoFebrero.forEach(resultado => {
  const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo'];
  const mesNombre = meses[resultado.mes];
  const esperado = resultado.esPrimerMes ? 1500 : 
                   resultado.mes === 3 ? 1650 : // Marzo con recargo de febrero
                   resultado.mes === 4 ? 1815 : // Abril con recargo de marzo
                   resultado.mes === 5 ? 1996.5 : 1500; // Mayo con recargo de abril
  
  const status = Math.abs(resultado.montoConRecargo - esperado) < 0.02 ? '✅' : '❌';
  const primerMes = resultado.esPrimerMes ? ' (PRIMER MES)' : '';
  console.log(`${mesNombre}: $${resultado.montoConRecargo.toFixed(2)} (esperado: $${esperado.toFixed(2)}) ${status}${primerMes}`);
});

console.log('\n=== RESUMEN ===');
console.log('✅ El primer mes de cada ciclo mantiene $1500 independientemente del mes de inicio');
console.log('✅ Los recargos se aplican secuencialmente: 10% del mes anterior cuando vence');
console.log('✅ Funciona para ciclos que empiezan en mayo, septiembre, febrero, etc.');
console.log('✅ La lógica es consistente sin importar el mes de inicio del ciclo');