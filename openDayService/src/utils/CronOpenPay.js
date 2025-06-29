const { getPedidosAllMatricula } = require('../models/selectStudentSataModel');
const { getCustomerChargesStatus } = require('.././controllers/chargesList');
const { updateStatus } = require('../models/customerModel');

async function procesoProgramadoUpdateStatus() {
  try {
    const pedidos = await getPedidosAllMatricula();

    await Promise.all(
      pedidos.map(async (pedido) => {

        const openpayStatus = await getCustomerChargesStatus(pedido.open_pay_id, pedido.identificador_pago);

        let estatus = null;
        if (openpayStatus != null) {
          if (openpayStatus.status === "charge_pending") {
            const dueDate = new Date(openpayStatus.due_date);
            const now = new Date();

            if (dueDate < now) {
              estatus = "CANCELLED"
            } else {
              estatus = openpayStatus.status;
            }
          } else {
            estatus = openpayStatus.status; // Retornar el estado del cargo
          }
        }

        const estado = mapOpenpayStatusToDBStatus(estatus);

        // Actualizar el estado del pedido en la base de datos si tiene identificador_pago y transaccion_Id
        if (pedido.identificador_pago && pedido.transaccion_Id && estado != 'Desconocido') {
          await updateStatus(pedido.id_pedido, estado, openpayStatus);
        }

        return {
          ...pedido,
          estado,
        };
      })
    );
  } catch (error) {
    console.error("Error proceso procesoProgramadoUpdateStatus: ", error);
  }
}

function mapOpenpayStatusToDBStatus(openpayStatus) {
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

module.exports = { procesoProgramadoUpdateStatus };