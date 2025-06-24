const { getPedidosByMatricula, getMyMatricula } = require('../models/selectStudentSataModel');

const selectStudentData = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const pedidos = await getPedidosByMatricula(matricula);

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    // Procesar los pedidos para garantizar que las fechas sean correctas
    const pedidosProcesados = pedidos.map((pedido) => ({
      ...pedido,
      fecha_vigencia_pago: pedido.fecha_vigencia_pago || null,
    }));

    res.json(pedidosProcesados);
  } catch (error) {
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
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

module.exports = {
  selectStudentData,
  selectMyMatricula
};