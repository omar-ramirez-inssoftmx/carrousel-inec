const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Definir la ruta para subir archivos
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;