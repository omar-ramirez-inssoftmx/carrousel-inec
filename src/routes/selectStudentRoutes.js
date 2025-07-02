const express = require('express');
const { selectStudentData, selectMyMatricula } = require('../controllers/selectStudentDataController');

const router = express.Router();

router.post('/selectStudent', selectStudentData);
router.post('/selectStudentMatricula', selectMyMatricula);

module.exports = router;