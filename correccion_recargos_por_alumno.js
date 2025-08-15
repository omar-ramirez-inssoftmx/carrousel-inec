import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient();

// Función para calcular recargos por alumno individual
async function calcularRecargosPorAlumno() {
    try {
        console.log('=== INICIANDO CORRECCIÓN DE RECARGOS POR ALUMNO ===\n');
        
        // Obtener todos los pedidos pendientes agrupados por alumno
        const pedidos = await prisma.pedidos.findMany({
            where: {
                id_cat_estatus: 3 // PENDIENTE
            },
            include: {
                alumno: true
            },
            orderBy: [
                { id_alumno: 'asc' },
                { anio: 'asc' },
                { ciclo: 'asc' },
                { mes: 'asc' }
            ]
        });

        console.log(`Total de pedidos pendientes encontrados: ${pedidos.length}\n`);

        // Agrupar pedidos por alumno
        const pedidosPorAlumno = {};
        pedidos.forEach(pedido => {
            if (!pedidosPorAlumno[pedido.id_alumno]) {
                pedidosPorAlumno[pedido.id_alumno] = [];
            }
            pedidosPorAlumno[pedido.id_alumno].push(pedido);
        });

        let totalAlumnos = Object.keys(pedidosPorAlumno).length;
        let alumnosActualizados = 0;
        let pedidosActualizados = 0;

        console.log(`Procesando ${totalAlumnos} alumnos...\n`);

        // Procesar cada alumno individualmente
        for (const [idAlumno, pedidosAlumno] of Object.entries(pedidosPorAlumno)) {
            console.log(`--- ALUMNO ${idAlumno} (${pedidosAlumno[0].alumno.nombre} ${pedidosAlumno[0].alumno.apellido_paterno}) ---`);
            console.log(`Pedidos del alumno: ${pedidosAlumno.length}`);
            
            // Identificar el primer mes del alumno
            const primerPedido = pedidosAlumno[0];
            const primerMes = primerPedido.mes;
            const primerCiclo = primerPedido.ciclo;
            const primerAnio = primerPedido.anio;
            
            console.log(`Primer mes del alumno: Mes ${primerMes}, Ciclo ${primerCiclo}, Año ${primerAnio}`);
            
            let alumnoTuvoActualizaciones = false;
            
            // Procesar cada pedido del alumno
            for (let i = 0; i < pedidosAlumno.length; i++) {
                const pedido = pedidosAlumno[i];
                let montoCalculado = 1500.00; // Base para el primer mes
                let recargosAplicados = 0;
                
                // Si no es el primer mes, calcular recargos
                if (i > 0) {
                    // Para cada mes después del primero, verificar si los meses anteriores están vencidos
                    const fechaActual = new Date();
                    
                    for (let j = 0; j < i; j++) {
                        const pedidoAnterior = pedidosAlumno[j];
                        
                        // Crear fecha de vencimiento (día 15 del mes)
                        const fechaVencimiento = new Date(pedidoAnterior.anio, pedidoAnterior.mes - 1, 15);
                        
                        // Para pedidos actuales (futuros), verificar si están vencidos respecto a hoy
                        // Para pedidos pasados, aplicar recargo si el mes anterior estaba vencido en su momento
                        const fechaPedidoActual = new Date(pedido.anio, pedido.mes - 1, 15);
                        
                        if (fechaPedidoActual <= fechaActual) {
                            // Pedido del pasado o presente - aplicar recargo si el anterior estaba vencido
                            if (fechaVencimiento < fechaPedidoActual && pedidoAnterior.id_cat_estatus === 3) {
                                recargosAplicados++;
                            }
                        } else {
                            // Pedido futuro - aplicar recargo solo si el anterior está vencido hoy
                            if (fechaActual > fechaVencimiento && pedidoAnterior.id_cat_estatus === 3) {
                                recargosAplicados++;
                            }
                        }
                    }
                    
                    // Calcular monto con recargos (10% por cada mes vencido)
                    montoCalculado = 1500.00 * Math.pow(1.10, recargosAplicados);
                }
                
                const montoActual = parseFloat(pedido.pago || 0);
                const diferencia = Math.abs(montoCalculado - montoActual);
                
                console.log(`  Pedido ${pedido.id_pedido}: Mes ${pedido.mes}/${pedido.anio} - Actual: $${montoActual.toFixed(2)} - Calculado: $${montoCalculado.toFixed(2)} - Recargos: ${recargosAplicados}`);
                
                // Si hay diferencia significativa, actualizar
                if (diferencia > 0.01) {
                    await prisma.pedidos.update({
                        where: { id_pedido: pedido.id_pedido },
                        data: { pago: montoCalculado }
                    });
                    
                    console.log(`    ✅ ACTUALIZADO: $${montoActual.toFixed(2)} → $${montoCalculado.toFixed(2)}`);
                    pedidosActualizados++;
                    alumnoTuvoActualizaciones = true;
                } else {
                    console.log(`    ✓ Correcto`);
                }
            }
            
            if (alumnoTuvoActualizaciones) {
                alumnosActualizados++;
            }
            
            console.log('');
        }
        
        console.log('=== RESUMEN FINAL ===');
        console.log(`Total de alumnos procesados: ${totalAlumnos}`);
        console.log(`Alumnos con actualizaciones: ${alumnosActualizados}`);
        console.log(`Total de pedidos actualizados: ${pedidosActualizados}`);
        
    } catch (error) {
        console.error('Error al calcular recargos por alumno:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar la función
calcularRecargosPorAlumno();