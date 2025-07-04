const express = require('express');
const { createCustomerWithPayment, listCustomer, editCustomer } = require('../controllers/studentController');

const router = express.Router();

router.post('/create', createCustomerWithPayment);
router.post('/list', listCustomer);
router.post('/edit', editCustomer);

module.exports = router;