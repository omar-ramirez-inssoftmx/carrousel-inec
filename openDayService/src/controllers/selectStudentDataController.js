const xlsx = require('xlsx');
const fs = require('fs');
const { getPedidosByMatricula, getMyMatricula } = require('../models/selectStudentSataModel');
const Openpay = require('openpay');
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, false);

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
        console.error("Error al obtener pedidos:", error);
        res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
    }
};

module.exports = { 
    selectStudentData,
    selectMyMatricula
};