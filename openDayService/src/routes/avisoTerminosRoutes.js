const express = require('express');
const router = express.Router();
const { aviso, terminos,  contacto} = require('../controllers/avisoTerminosController');

router.get('/aviso', aviso);

router.get('/terminos', terminos);

router.get('/contacto', contacto);

module.exports = router;