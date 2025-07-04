const express = require('express');
const { createDirectChargeHandler } = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createDirectChargeHandler);

module.exports = router;
