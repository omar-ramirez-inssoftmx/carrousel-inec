import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

// Script para diagnosticar pedidos con montos incorrectos
async function diagnosticarPedidosIncorrectos() {
  try {
    console.log('=== DIAGNÓSTICO DE PEDIDOS CON MONTOS INCORRECTOS ===\n');
    
    // Obtener todos los pedidos pendientes (estatus 3)
    const pedidosRaw = await prisma.pedidos.findMany({
      where: {
        id_cat_estatus: 3
      },
      include: {
        alumno: true,
        cat_estatus: true
      }
    });
    
    // Mapear a la estructura esperada
    const pedidos = pedidosRaw.map(pedido => ({
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
    console.log(`Total de pedidos pendientes encontrados: ${pedidos.length}\n`);
    
    // Agrupar por ciclo
    const pedidosAgrupados = {};
    pedidos.forEach(pedido => {
      if (!pedidosAgrupados[pedido.ciclo]) {
        pedidosAgrupados[pedido.ciclo] = [];
      }
      pedidosAgrupados[pedido.ciclo].push(pedido);
    });
    
    console.log(`Ciclos encontrados: ${Object.keys(pedidosAgrupados).length}\n`);
    
    // Analizar cada ciclo
    Object.keys(pedidosAgrupados).forEach(cicloKey => {
      const ciclo = pedidosAgrupados[cicloKey];
      
      // Ordenar por año y mes
      ciclo.sort((a, b) => {
        if (a.anio !== b.anio) return a.anio - b.anio;
        return a.mes - b.mes;
      });
      
      console.log(`\n=== CICLO: ${cicloKey} ===`);
      console.log(`Pedidos en el ciclo: ${ciclo.length}`);
      
      // Identificar el primer mes del ciclo
      const primerMes = ciclo[0].mes;
      const primerAnio = ciclo[0].anio;
      console.log(`Primer mes del ciclo: ${primerMes}/${primerAnio}`);
      
      // Mostrar todos los pedidos del ciclo
      ciclo.forEach((pedido, index) => {
        const monto = parseFloat(pedido.pago);
        const esPrimerMes = index === 0;
        const tieneMontoIncorrecto = monto > 1500 && esPrimerMes;
        const tieneMontoExcesivo = monto > 2500; // Montos muy altos
        
        const meses = ['', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const mesNombre = meses[pedido.mes] || `mes_${pedido.mes}`;
        
        let status = '✅';
        let observacion = '';
        
        if (tieneMontoIncorrecto) {
          status = '❌';
          observacion = ' - PRIMER MES CON MONTO INCORRECTO';
        } else if (tieneMontoExcesivo) {
          status = '⚠️';
          observacion = ' - MONTO EXCESIVAMENTE ALTO';
        } else if (esPrimerMes && monto === 1500) {
          observacion = ' - PRIMER MES CORRECTO';
        }
        
        console.log(`  ${index + 1}. ${mesNombre} ${pedido.anio}: $${monto.toFixed(2)} (ID: ${pedido.id_pedido}) ${status}${observacion}`);
        console.log(`     Fecha vencimiento: ${pedido.fecha_vigencia_pago}`);
        console.log(`     Matrícula: ${pedido.matricula}`);
      });
      
      // Buscar específicamente los meses que reportaste como problemáticos
      const mesesProblematicos = [
        { mes: 3, anio: 2024, montoReportado: 4394.55 },
        { mes: 4, anio: 2024, montoReportado: 5834.07 },
        { mes: 5, anio: 2024, montoReportado: 7750.40 },
        { mes: 6, anio: 2024, montoReportado: 10300.53 },
        { mes: 7, anio: 2024, montoReportado: 13690.70 },
        { mes: 8, anio: 2024, montoReportado: 18178.93 }
      ];
      
      const pedidosProblematicos = ciclo.filter(pedido => 
        mesesProblematicos.some(mp => mp.mes === pedido.mes && mp.anio === pedido.anio)
      );
      
      if (pedidosProblematicos.length > 0) {
        console.log(`\n  🔍 PEDIDOS PROBLEMÁTICOS ENCONTRADOS EN ESTE CICLO:`);
        pedidosProblematicos.forEach(pedido => {
          const mesProblematico = mesesProblematicos.find(mp => mp.mes === pedido.mes && mp.anio === pedido.anio);
          const monto = parseFloat(pedido.pago);
          const coincide = Math.abs(monto - mesProblematico.montoReportado) < 0.01;
          
          console.log(`    - ${pedido.mes}/${pedido.anio}: $${monto.toFixed(2)} (reportado: $${mesProblematico.montoReportado}) ${coincide ? '✅ COINCIDE' : '❌ NO COINCIDE'}`);
          console.log(`      ID: ${pedido.id_pedido}, Matrícula: ${pedido.matricula}`);
        });
      }
    });
    
    // Resumen final
    console.log('\n=== RESUMEN FINAL ===');
    const pedidosConMontosAltos = pedidos.filter(p => parseFloat(p.pago) > 2500);
    console.log(`Pedidos con montos excesivamente altos (>$2500): ${pedidosConMontosAltos.length}`);
    
    if (pedidosConMontosAltos.length > 0) {
      console.log('\nDetalle de pedidos con montos altos:');
      pedidosConMontosAltos.forEach(pedido => {
        console.log(`  - ID ${pedido.id_pedido}: $${parseFloat(pedido.pago).toFixed(2)} (${pedido.mes}/${pedido.anio}, Ciclo: ${pedido.ciclo})`);
      });
    }
    
  } catch (error) {
    console.error('Error en el diagnóstico:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar diagnóstico
diagnosticarPedidosIncorrectos();