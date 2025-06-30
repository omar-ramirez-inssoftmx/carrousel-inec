const express = require('express');
const { createPaymentLink } = require('../controllers/ordersController');
const {
  createPaymentLinkIdCustomer,
  createPaymentLinkStudent,
  createCharge
} = require('../controllers/ordersIdController');
const { selectStudentOrders } = require('../controllers/actividadController');

const router = express.Router();

router.post('/create', createPaymentLink);
router.post('/createId', createPaymentLinkIdCustomer);
router.post('/createOrderStudent', createPaymentLinkStudent);
router.post('/activity', selectStudentOrders);

// Función para mapear status de OpenPay y determinar si es exitoso
function mapOpenpayStatusToDBStatus(openpayStatus) {
  switch (openpayStatus && openpayStatus.toUpperCase()) {
    case 'COMPLETED':
      return { dbStatus: 1, isSuccess: true, message: 'Pago completado exitosamente' };
    case 'IN_PROGRESS':
    case 'CHARGE_PENDING':
      return { dbStatus: 3, isSuccess: false, message: 'Pago en proceso, verificar en unos minutos' };
    case 'CANCELLED':
      return { dbStatus: 2, isSuccess: false, message: 'Pago cancelado' };
    case 'FAILED':
      return { dbStatus: 2, isSuccess: false, message: 'Pago fallido. Verifique los datos de la tarjeta o fondos disponibles' };
    case 'REFUNDED':
      return { dbStatus: 2, isSuccess: false, message: 'Pago reembolsado' };
    case 'CHARGEBACK_PENDING':
    case 'CHARGEBACK_ACCEPTED':
    case 'CHARGEBACK_ADJUSTMENT':
      return { dbStatus: 2, isSuccess: false, message: 'Problema con el pago - Contracargo' };
    default:
      return { dbStatus: 'Desconocido', isSuccess: false, message: 'Estado de pago desconocido' };
  }
}

router.post('/pay', async (req, res) => {
  try {
    const {
      customer_id,
      token,
      amount,
      description,
      orderId,
      deviceSessionId,
      pedidoIds,
      fechaVigencia,
      pedidosSeleccionados,
      saveCard,
      tokenGuardar,
      telefono,
      ciudad,
      postal,
      idAlumno,
      nombreTarjeta
    } = req.body;

    if (!customer_id || !token || !amount || !description || !orderId || !deviceSessionId) {
      return res.status(400).json({ success: false, error: 'Faltan parámetros requeridos' });
    }

    const result = await createCharge(customer_id, token, amount, description, orderId, deviceSessionId, pedidoIds, fechaVigencia, pedidosSeleccionados, saveCard, tokenGuardar, telefono, ciudad, postal, idAlumno, nombreTarjeta);

    // Verificar el status del charge
    const charge = result.charge;
    if (!charge || !charge.status) {
      return res.status(500).json({
        success: false,
        error: 'Respuesta inválida del sistema de pagos'
      });
    }

    const statusInfo = mapOpenpayStatusToDBStatus(charge.status);

    // Log para debugging
    console.log('Payment Status Info:', {
      charge_id: charge.id,
      status: charge.status,
      statusInfo: statusInfo,
      amount: charge.amount
    });

    if (statusInfo.isSuccess) {
      // Pago exitoso
      res.status(200).json({
        success: true,
        charge: charge,
        message: statusInfo.message,
        payment_status: charge.status
      });
    } else {
      // Pago falló o está pendiente
      const statusCode = charge.status === 'FAILED' ? 400 : 202; // 400 for failed, 202 for pending
      res.status(statusCode).json({
        success: false,
        charge: charge,
        error: statusInfo.message,
        payment_status: charge.status,
        error_code: charge.error_code || 'PAYMENT_' + charge.status.toUpperCase()
      });
    }

  } catch (error) {
    console.error('Payment Error:', error);

    // Mejorar el manejo de errores de OpenPay
    let errorMessage = 'Error interno del servidor';
    let errorCode = 'INTERNAL_ERROR';

    if (error.description) {
      // Error de OpenPay
      errorMessage = error.description;
      errorCode = error.error_code || 'OPENPAY_ERROR';
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      error_code: errorCode,
      details: error.error_code ? 'Error del sistema de pagos' : 'Error interno'
    });
  }
});

module.exports = router;
