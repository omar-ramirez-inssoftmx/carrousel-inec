const express = require('express');
const router = express.Router();
const { createCustomer, listCustomer } = require('../controllers/customerController');

// Ruta para crear un cliente
router.post('/create', createCustomer);

router.post('/list', listCustomer);

module.exports = router;