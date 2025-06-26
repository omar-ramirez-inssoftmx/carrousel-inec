const { getPedidosByMatricula } = require('../models/selectStudentSataModel');

const selectStudentData = async (req, res, next) => {
  const { pedidosConLinks } = req.body;

  try {
    const pedidos = await getPedidosByMatricula(pedidosConLinks[0].matricula);

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pedidos' });
    }

    const pedidosProcesados = pedidos.map((pedido) => ({
      ...pedido,
      fecha_vigenica_descuento: pedido.fecha_vigenica_descuento || null,
      fecha_vigencia_pago: pedido.fecha_vigencia_pago || null,
      fecha_vigencia_recargo: pedido.fecha_vigencia_recargo || null,
    }));

    res.json(pedidosProcesados);

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  selectStudentData
};
