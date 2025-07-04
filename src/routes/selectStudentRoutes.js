const express = require('express');
const { getStudentData, getStudentByMatriculaData } = require('../controllers/studentController');

const router = express.Router();

router.post('/selectStudent', getStudentData);
router.post('/selectStudentMatricula', getStudentByMatriculaData);

module.exports = router;