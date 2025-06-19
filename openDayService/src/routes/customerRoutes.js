const express = require('express');
const { createCustomer, listCustomer, editCustomer } = require('../controllers/customerController');

const router = express.Router();

router.post('/create', createCustomer);
router.post('/list', listCustomer);
router.post('/edit', editCustomer);

module.exports = router;