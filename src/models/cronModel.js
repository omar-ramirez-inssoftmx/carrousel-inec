const pool = require('../config/conexionAsync');

async function updateRecargo(id, pago, fecha) {
  const updateQuery = `UPDATE pedidos SET pago = ?, fecha_vigencia_pago = ? WHERE id_pedido = ?`;

  try {
    const [result] = await pool.query(updateQuery, [pago, fecha, id]);
    console.log('Registros actualizados recargo:', result.affectedRows);
    return result;
  } catch (error) {
    console.error('Error al actualizar los pedidos recargo:', error);
    throw error;
  }
}

module.exports = {
  updateRecargo
};