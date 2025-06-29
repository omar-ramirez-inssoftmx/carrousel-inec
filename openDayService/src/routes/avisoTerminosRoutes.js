const express = require('express');
const { aviso, terminos,  contacto} = require('../controllers/avisoTerminosController');

const router = express.Router();

router.get('/aviso', aviso);
router.get('/terminos', terminos);
router.get('/contacto', contacto);

module.exports = router;