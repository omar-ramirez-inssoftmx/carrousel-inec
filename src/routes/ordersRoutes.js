const express = require('express');
const {
  createPaymentLink,
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  processCharge,
  getStudentOrdersActivity
} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createPaymentLink);
router.post('/createId', createPaymentLinkIdCustomer);
router.post('/createOrderStudent', createPaymentLinkStudent);
router.post('/activity', getStudentOrdersActivity);

router.post('/pay', processCharge);

module.exports = router;
