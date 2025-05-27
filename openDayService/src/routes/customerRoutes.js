const express = require('express');
const router = express.Router();
const { createCustomer, listCustomer, editCustomer, createCard } = require('../controllers/customerController');

// Ruta para crear un cliente
router.post('/create', createCustomer);

router.post('/list', listCustomer);

router.post('/edit', editCustomer);

module.exports = router;