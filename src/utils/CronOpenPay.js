import { getChargeStatusByOrderId, mapOpenpayStatusToDBStatus } from '../services/openpayService.js';
import { getAllOrdersForSurcharge, updateOrderStatus } from '../models/orderModel.js';

async function procesoProgramadoUpdateStatus() {
  try {
    const pedidos = await getAllOrdersForSurcharge();

    await Promise.all(
      pedidos.map(async (pedido) => {

        const openpayStatus = await getChargeStatusByOrderId(pedido.open_pay_id, pedido.identificador_pago);

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
          await updateOrderStatus(pedido.id_pedido, estado, openpayStatus);
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

export { procesoProgramadoUpdateStatus };