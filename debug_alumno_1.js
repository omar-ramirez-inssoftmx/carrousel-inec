import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function debugAlumno1() {
    try {
        // Obtener todos los pedidos del alumno 1
        const pedidos = await prisma.pedidos.findMany({
            where: {
                id_alumno: 1,
                id_cat_estatus: 3
            },
            include: {
                alumno: true
            },
            orderBy: [
                { anio: 'asc' },
                { ciclo: 'asc' },
                { mes: 'asc' }
            ]
        });

        console.log(`=== DEBUG ALUMNO 1 (${pedidos[0]?.alumno.nombre} ${pedidos[0]?.alumno.apellido_paterno}) ===`);
        console.log(`Total pedidos: ${pedidos.length}\n`);
        
        const fechaActual = new Date();
        console.log(`Fecha actual: ${fechaActual.toLocaleDateString()}\n`);
        
        // Simular el cálculo paso a paso
        for (let i = 0; i < pedidos.length; i++) {
            const pedido = pedidos[i];
            let montoCalculado = 1500.00;
            let recargosAplicados = 0;
            
            console.log(`\n--- PEDIDO ${pedido.id_pedido} (Posición ${i + 1}) ---`);
            console.log(`Mes: ${pedido.mes}/${pedido.anio}, Ciclo: ${pedido.ciclo}`);
            console.log(`Monto actual: $${parseFloat(pedido.pago || 0).toFixed(2)}`);
            
            if (i === 0) {
                console.log('✓ Es el primer mes - Base: $1500.00');
            } else {
                console.log('Calculando recargos...');
                
                for (let j = 0; j < i; j++) {
                    const pedidoAnterior = pedidos[j];
                    const fechaVencimiento = new Date(pedidoAnterior.anio, pedidoAnterior.mes - 1, 15);
                    const fechaPedidoActual = new Date(pedido.anio, pedido.mes - 1, 15);
                    
                    console.log(`  Verificando pedido anterior ${pedidoAnterior.id_pedido} (${pedidoAnterior.mes}/${pedidoAnterior.anio}):`);
                    console.log(`    Fecha vencimiento: ${fechaVencimiento.toLocaleDateString()}`);
                    console.log(`    Fecha pedido actual: ${fechaPedidoActual.toLocaleDateString()}`);
                    
                    if (fechaPedidoActual <= fechaActual) {
                        console.log(`    Pedido del pasado/presente`);
                        if (fechaVencimiento < fechaPedidoActual && pedidoAnterior.id_cat_estatus === 3) {
                            recargosAplicados++;
                            console.log(`    ✓ Recargo aplicado (${recargosAplicados})`);
                        } else {
                            console.log(`    ✗ No aplica recargo`);
                        }
                    } else {
                        console.log(`    Pedido futuro`);
                        if (fechaActual > fechaVencimiento && pedidoAnterior.id_cat_estatus === 3) {
                            recargosAplicados++;
                            console.log(`    ✓ Recargo aplicado (${recargosAplicados})`);
                        } else {
                            console.log(`    ✗ No aplica recargo`);
                        }
                    }
                }
                
                montoCalculado = 1500.00 * Math.pow(1.10, recargosAplicados);
                console.log(`Total recargos: ${recargosAplicados}`);
            }
            
            console.log(`Monto calculado: $${montoCalculado.toFixed(2)}`);
            
            const diferencia = Math.abs(montoCalculado - parseFloat(pedido.pago || 0));
            if (diferencia > 0.01) {
                console.log(`❌ DIFERENCIA: $${diferencia.toFixed(2)}`);
            } else {
                console.log(`✅ CORRECTO`);
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

debugAlumno1();