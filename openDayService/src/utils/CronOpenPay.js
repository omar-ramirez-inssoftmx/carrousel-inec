
const xlsx = require('xlsx');
const fs = require('fs');
const { getPedidosByMatricula, getPedidosAllMatricula } = require('../models/selectStudentSataModel');
const Openpay = require('openpay');
const { getCustomerChargesStatus } = require('.././controllers/chargesList');
const { updateStatus } = require('../models/customerModel');

async function procesoProgramado() {
    try {
 
        const pedidos = await getPedidosAllMatricula();

        console.log("pedidos ", pedidos)
  
        if (!pedidos || pedidos.length === 0) {
            console.log('No se encontraron pagos para el proceso programado');
        }else{
            // Procesar los pedidos para obtener el estado de cada uno y actualizarlo en la base de datos
            const pedidosConEstado = await Promise.all(
                pedidos.map(async (pedido) => {
                    const openpayStatus = await getCustomerChargesStatus(pedido.open_pay_id, pedido.identificador_pago);
                    const estado = mapOpenpayStatusToDBStatus(openpayStatus);

                    // Actualizar el estado del pedido en la base de datos si tiene identificador_pago y transaccion_Id
                    if (pedido.identificador_pago && pedido.transaccion_Id && estado != 'Desconocido') {
                        await updateStatus(pedido.id_pedido, estado);
                    }

                    return {
                        ...pedido,
                        estado,
                    };
                })
            );

            console.log("pedidosConEstado ", pedidosConEstado)
        }
    
       

    } catch (error) {
        console.error("Error proceso programado: ", error);
    }

}

function mapOpenpayStatusToDBStatus(openpayStatus) {
    console.log("openpayStatus", openpayStatus)
    switch (openpayStatus && openpayStatus.toUpperCase()) {
      case 'COMPLETED':
        return 1;
      case 'IN_PROGRESS':
      case 'CHARGE_PENDING':
        return 3;
      case 'CANCELLED':
        return 2;
      case 'FAILED':
      case 'REFUNDED':
      case 'CHARGEBACK_PENDING':
      case 'CHARGEBACK_ACCEPTED':
      case 'CHARGEBACK_ADJUSTMENT':
        return 2;
      default:
        return 'Desconocido';
    }
  }
  
module.exports = { procesoProgramado };