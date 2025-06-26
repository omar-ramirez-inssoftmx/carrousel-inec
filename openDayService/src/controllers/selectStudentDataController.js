const { getPedidosByMatricula, getMyMatricula } = require('../models/selectStudentSataModel');
const { getCustomerChargesStatus } = require('./chargesList');
const { updateStatus } = require('../models/customerModel');

const selectStudentData = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const pedidos = await getPedidosByMatricula(matricula);

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pagos para la matrícula' });
    }

    // Procesar los pedidos para obtener el estado de cada uno y actualizarlo en la base de datos
    const pedidosConEstado = await Promise.all(
      pedidos.map(async (pedido) => {

        const openpayStatus = await getCustomerChargesStatus(pedido.open_pay_id, pedido.identificador_pago);

        console.log("openpayStatus ", openpayStatus)
        let estatus = null;
        if (openpayStatus != null) {
          if (openpayStatus.status === "charge_pending") {
            const dueDate = new Date(openpayStatus.due_date);
            const now = new Date();

            if (dueDate < now) {
              console.log(`Cargo ${openpayStatus.id} vencido, marcando como CANCELLED`);
              estatus = "CANCELLED"
            } else {
              estatus = openpayStatus.status;
            }
          } else {
            estatus = openpayStatus.status; // Retornar el estado del cargo
          }
        }

        const estado = mapOpenpayStatusToDBStatus(estatus);

        console.log("estado ", estado)

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

    const pedidosAct = await getPedidosByMatricula(matricula);

    const pedidosProcesados = pedidosAct.map((pedido) => ({
      ...pedido,
      fecha_vigenica_descuento: pedido.fecha_vigenica_descuento || null,
      fecha_vigencia_pago: pedido.fecha_vigencia_pago || null,
      fecha_vigencia_recargo: pedido.fecha_vigencia_recargo || null,
    }));

    res.json(pedidosProcesados);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

const selectMyMatricula = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const student = await getMyMatricula(matricula);

    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    res.json(student);
  } catch (error) {
    console.error("Error al obtener alumno:", error);
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

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

module.exports = {
  selectStudentData,
  selectMyMatricula
};