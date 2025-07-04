const { getChargeStatusByOrderId } = require('./openpayService');

/**
 * Servicio de charges - Wrapper para compatibilidad
 * @deprecated Usar directamente openpayService.getChargeStatusByOrderId
 */

// Función para obtener el estado de un pedido a partir de los cargos de un cliente
const getCustomerChargesStatus = async (customer_id, order_id) => {
  return await getChargeStatusByOrderId(customer_id, order_id);
};

module.exports = {
  getCustomerChargesStatus,
};
