const express = require('express');
const router = express.Router();
const { selectStudentData, selectMyMatricula } = require('../controllers/selectStudentDataController');

// Definir la ruta para subir archivos
router.post('/selectStudent', selectStudentData);

router.post('/selectStudentMatricula', selectMyMatricula);

module.exports = router;