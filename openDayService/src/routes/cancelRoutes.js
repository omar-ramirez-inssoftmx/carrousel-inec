const express = require('express');
const router = express.Router();
const { selectStudentData } = require('../controllers/cancelController');

router.post('/cancel', selectStudentData);

module.exports = router;