const express = require('express');
const { createCharge } = require('../controllers/chargeController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/create', validateRequest, createCharge);

module.exports = router;
