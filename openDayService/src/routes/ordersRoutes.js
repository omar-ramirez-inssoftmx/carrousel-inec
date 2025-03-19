const express = require('express');
const { createPaymentLink } = require('../controllers/ordersController');
const { createPaymentLinkIdCustomer,createPaymentLinkStudent, createCharge } = require('../controllers/ordersIdController');
const validateRequest = require('../middlewares/validateRequest');
const router = express.Router();

router.post('/create', createPaymentLink);

router.post('/createId', createPaymentLinkIdCustomer);

router.post('/createOrderStudent', createPaymentLinkStudent);

router.post('/pay', async (req, res) => {
    try {
      const { customer_id, token, amount, description, orderId, deviceSessionId, pedidoIds, fechaVigencia, pedidosSeleccionados } = req.body;
        console.log("customerId ",  customer_id)
        console.log("token", token)
        console.log("amount", amount)
        console.log("description", description)
        console.log("orderId", orderId)
        console.log("deviceSessionId", deviceSessionId)


      if (!customer_id	 || !token || !amount || !description || !orderId || !deviceSessionId) {
        return res.status(400).json({ error: 'Faltan parámetros' });
      }
  
      const charge = await createCharge(customer_id	, token, amount, description, orderId, deviceSessionId, pedidoIds, fechaVigencia, pedidosSeleccionados);

      console.log("charge  ", charge);
      res.status(200).json({ success: true, charge });
  
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
