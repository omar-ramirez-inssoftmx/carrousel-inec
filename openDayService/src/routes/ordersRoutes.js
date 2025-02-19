const express = require('express');
const { createPaymentLink } = require('../controllers/ordersController');
const { createPaymentLinkIdCustomer } = require('../controllers/ordersIdController');
const validateRequest = require('../middlewares/validateRequest');
const router = express.Router();

router.post('/create', createPaymentLink);

router.post('/createId', createPaymentLinkIdCustomer);

module.exports = router;
