const express = require('express');
const { selectStudentData } = require('../controllers/cancelController');

const router = express.Router();

router.post('/cancel', selectStudentData);

module.exports = router;