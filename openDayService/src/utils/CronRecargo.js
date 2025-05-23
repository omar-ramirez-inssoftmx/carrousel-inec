const xlsx = require('xlsx');
const fs = require('fs');
const { getPedidosAllMatricula } = require('../models/selectStudentSataModel');
const { updateRecargo } = require('../models/cronModel'); // Asegúrate de que la ruta sea correcta

async function procesoProgramadoRecargo() {
    try {
        // Obtener todos los pedidos de matrícula
        const pedidos = await getPedidosAllMatricula();
        console.log("Total de pedidos encontrados:", pedidos.length);

        if (!pedidos || pedidos.length === 0) {
            console.log('No se encontraron pagos para el proceso programado');
            return { success: true, message: 'No hay pedidos para procesar' };
        }

        // Fecha actual y fecha de corte (15 del mes actual)
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const cutoffDate = new Date(currentYear, currentMonth, 15);
        
        // Contadores para estadísticas
        let recargosAplicados = 0;
        let pedidosActualizados = 0;
        
        // Procesar cada pedido
        for (const pedido of pedidos) {
            try {
                const dueDate = new Date(pedido.fecha_vigencia_pago);
                
                if (dueDate <= cutoffDate) {
                    // Calcular nuevo monto con 10% de recargo
                    const nuevoMonto = Math.round((pedido.pago * 1.10) * 100) / 100; // Redondear a 2 decimales
                    
                    // Calcular nueva fecha (15 del siguiente mes)
                    let nextMonth = currentMonth + 1;
                    let nextYear = currentYear;
                    if (nextMonth > 11) {
                        nextMonth = 0;
                        nextYear++;
                    }
                    const nuevaFechaVigencia = new Date(nextYear, nextMonth, 15);
                    const formattedDate = nuevaFechaVigencia.toISOString().split('T')[0];
                    
                    // Actualizar en base de datos
                    await updateRecargo(pedido.id_pedido, nuevoMonto, formattedDate);
                    
                    recargosAplicados++;
                    console.log(`Recargo aplicado al pedido ${pedido.id_pedido} - Nuevo monto: ${nuevoMonto}`);
                } else {
                    console.log(`Pedido ${pedido.id_pedido} no requiere recargo (fecha vigente)`);
                }
                
                pedidosActualizados++;
            } catch (error) {
                console.error(`Error procesando pedido ${pedido.id_pedido}:`, error);
                // Continuar con el siguiente pedido a pesar del error
            }
        }

        console.log(`Proceso completado. Pedidos actualizados: ${pedidosActualizados}, Recargos aplicados: ${recargosAplicados}`);
        return {
            success: true,
            totalPedidos: pedidos.length,
            pedidosActualizados,
            recargosAplicados
        };
      
    } catch (error) {
        console.error("Error en procesoProgramadoRecargo: ", error);
        throw error;
    }
}

module.exports = { procesoProgramadoRecargo };