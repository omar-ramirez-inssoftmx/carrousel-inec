const formatCurrencyMX = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }

  const numericAmount = parseFloat(amount);
  return `$${numericAmount.toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

const formatMonthYear = (mes, anio) => {
  if (!mes || !anio) return 'Sin mes';
  return `${mes.toString().padStart(2, '0')}/${anio}`;
};

const getCurrentFormattedDate = (locale = 'es-ES', options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString(locale, options);
};

/**
 * Crear ISO date para vencimiento (1 hora desde ahora)
 */
const createDueDateISO = (hoursFromNow = 1) => {
  const dueDate = new Date();
  dueDate.setHours(dueDate.getHours() + hoursFromNow);
  return dueDate.toISOString();
};

const formatPaymentDate = (fechaPago) => {
  if (!fechaPago) return "Sin fecha";

  try {
    const fecha = new Date(fechaPago);
    const opcionesFecha = { day: '2-digit', month: 'short', year: '2-digit' };
    return fecha.toLocaleDateString('es-MX', opcionesFecha);
  } catch (err) {
    console.warn("Fecha inválida en el pedido:", fechaPago);
    return "Sin fecha";
  }
};

const processOrderDates = (pedido) => {
  return {
    ...pedido,
    fecha_vigenica_descuento: pedido.fecha_vigenica_descuento || null,
    fecha_vigencia_pago: pedido.fecha_vigencia_pago || null,
    fecha_vigencia_recargo: pedido.fecha_vigencia_recargo || null,
  };
};

const generateUniqueOrderId = (prefix = '') => {
  const timestamp = new Date().getTime();
  return prefix ? `${prefix}-${timestamp}` : timestamp.toString();
};

export {
  formatCurrencyMX,
  formatMonthYear,
  getCurrentFormattedDate,
  createDueDateISO,
  formatPaymentDate,
  processOrderDates,
  generateUniqueOrderId
};