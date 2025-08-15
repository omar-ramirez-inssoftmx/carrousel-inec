import { PrismaClient } from './src/generated/prisma/index.js';
const prisma = new PrismaClient();

async function investigarPedidosAltos() {
    try {
        // Investigar algunos pedidos específicos con montos altos
        const pedidosAltos = [7, 8, 16, 18, 19];
        
        for (const idPedido of pedidosAltos) {
            const pedido = await prisma.pedidos.findUnique({
                where: { id_pedido: idPedido },
                include: { alumno: true }
            });
            
            if (pedido) {
                console.log(`\n=== PEDIDO ${idPedido} ===`);
                console.log(`Alumno: ${pedido.alumno.nombre} ${pedido.alumno.apellido_paterno} (ID: ${pedido.id_alumno})`);
                console.log(`Mes: ${pedido.mes}/${pedido.anio}, Ciclo: ${pedido.ciclo}`);
                console.log(`Monto actual: $${parseFloat(pedido.pago || 0).toFixed(2)}`);
                console.log(`Estado: ${pedido.id_cat_estatus}`);
                
                // Buscar todos los pedidos de este alumno
                const todosPedidosAlumno = await prisma.pedidos.findMany({
                    where: {
                        id_alumno: pedido.id_alumno,
                        id_cat_estatus: 3
                    },
                    orderBy: [
                        { anio: 'asc' },
                        { ciclo: 'asc' },
                        { mes: 'asc' }
                    ]
                });
                
                console.log(`Total pedidos del alumno: ${todosPedidosAlumno.length}`);
                console.log('Secuencia de pedidos:');
                todosPedidosAlumno.forEach((p, index) => {
                    console.log(`  ${index + 1}. Pedido ${p.id_pedido}: Mes ${p.mes}/${p.anio} - $${parseFloat(p.pago || 0).toFixed(2)}`);
                });
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

investigarPedidosAltos();