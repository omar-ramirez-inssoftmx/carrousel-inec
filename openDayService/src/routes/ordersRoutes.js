const express = require('express');
const { createPaymentLink } = require('../controllers/ordersController');
const { createPaymentLinkIdCustomer,createPaymentLinkStudent } = require('../controllers/ordersIdController');
const validateRequest = require('../middlewares/validateRequest');
const router = express.Router();

router.post('/create', createPaymentLink);

router.post('/createId', createPaymentLinkIdCustomer);

router.post('/createOrderStudent', createPaymentLinkStudent);

module.exports = router;
