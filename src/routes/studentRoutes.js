import express from 'express';
import {
  createCustomerWithPayment,
  listCustomer,
  editCustomer,
  getStudentData,
  getStudentByMatriculaData
} from '../controllers/studentController.js';

const router = express.Router();

router.post('/create', createCustomerWithPayment);
router.post('/list', listCustomer);
router.post('/edit', editCustomer);
router.post('/select', getStudentData);
router.post('/profile', getStudentByMatriculaData);

export default router;