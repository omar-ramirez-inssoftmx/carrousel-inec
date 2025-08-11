import express from 'express';
import {
  createPaymentLink,
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  processCharge,
  getStudentOrdersActivity,
  getCancelOrdersData,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createPaymentLink);
router.post('/createId', createPaymentLinkIdCustomer);
router.post('/createStudent', createPaymentLinkStudent);
router.post('/activity', getStudentOrdersActivity);
router.post('/pay', processCharge);
router.post('/cancel', getCancelOrdersData);

export default router;
