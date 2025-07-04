const express = require('express');
const {
  createPaymentLink,
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  processCharge,
  getStudentOrdersActivity,
  getCancelOrdersData
} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', createPaymentLink);
router.post('/createId', createPaymentLinkIdCustomer);
router.post('/createStudent', createPaymentLinkStudent);
router.post('/activity', getStudentOrdersActivity);
router.post('/pay', processCharge);
router.post('/cancel', getCancelOrdersData);

module.exports = router;
