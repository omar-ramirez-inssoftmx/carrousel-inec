const pool = require('../utils/pool');

async function updateRecargo(id, pago, fecha) {
  const updateQuery = `UPDATE pedidos SET pago = ?, fecha_vigencia_pago = ? WHERE id_pedido = ?`;

  try {
    const [result] = await pool.query(updateQuery, [pago, fecha, id]);
    return result;
  } catch {
    throw new Error("Error al actualizar los pedidos recargo");
  }
}

module.exports = {
  updateRecargo
};