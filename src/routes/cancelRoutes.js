const express = require('express');
const { getCancelOrdersData } = require('../controllers/orderController');

const router = express.Router();

router.post('/cancel', getCancelOrdersData);

module.exports = router;