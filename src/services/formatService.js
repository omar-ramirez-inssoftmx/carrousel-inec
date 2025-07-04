/**
 * Servicio para formateo de datos
 * Consolida funciones de formateo dispersas en los controladores
 */

/**
 * Formatear fecha en español mexicano
 */
const formatDateToSpanish = (date, options = { day: 'numeric', month: 'long', year: 'numeric' }) => {
  if (!date) return 'Sin fecha';

  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-MX', options);
  } catch (error) {
    console.warn("Fecha inválida:", date);
    return 'Sin fecha';
  }
};

/**
 * Formatear fecha desde Excel serial
 */
const formatExcelSerialToDate = (excelSerialDate, mes, anio) => {
  if (typeof excelSerialDate === 'undefined' || !excelSerialDate || isNaN(parseFloat(excelSerialDate))) {
    return null;
  }

  const date = new Date(Math.round((excelSerialDate - 25569) * 86400 * 1000));
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + timezoneOffset);

  const day = adjustedDate.getDate();

  return `${anio}-${mes}-${day}`;
};

/**
 * Formatear monto en moneda mexicana
 */
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

/**
 * Formatear mes y año para display
 */
const formatMonthYear = (mes, anio) => {
  if (!mes || !anio) return 'Sin mes';
  return `${mes.toString().padStart(2, '0')}/${anio}`;
};

/**
 * Obtener fecha actual formateada
 */
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

/**
 * Formatear fecha de pago para display
 */
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

/**
 * Validar y formatear datos de fecha con default values
 */
const processOrderDates = (pedido) => {
  return {
    ...pedido,
    fecha_vigenica_descuento: pedido.fecha_vigenica_descuento || null,
    fecha_vigencia_pago: pedido.fecha_vigencia_pago || null,
    fecha_vigencia_recargo: pedido.fecha_vigencia_recargo || null,
  };
};

/**
 * Generar orden ID único
 */
const generateUniqueOrderId = (prefix = '') => {
  const timestamp = new Date().getTime();
  return prefix ? `${prefix}-${timestamp}` : timestamp.toString();
};

module.exports = {
  formatDateToSpanish,
  formatExcelSerialToDate,
  formatCurrencyMX,
  formatMonthYear,
  getCurrentFormattedDate,
  createDueDateISO,
  formatPaymentDate,
  processOrderDates,
  generateUniqueOrderId
}; 