const express = require('express');
const {
  createCustomerWithPayment,
  listCustomer,
  editCustomer,
  getStudentData,
  getStudentByMatriculaData
} = require('../controllers/studentController');

const router = express.Router();

router.post('/create', createCustomerWithPayment);
router.post('/list', listCustomer);
router.post('/edit', editCustomer);
router.post('/select', getStudentData);
router.post('/profile', getStudentByMatriculaData);

module.exports = router;