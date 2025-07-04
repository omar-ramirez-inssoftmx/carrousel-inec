const express = require('express');
const { createCharge } = require('../controllers/chargeController');

const router = express.Router();

router.post('/create', createCharge);

module.exports = router;
