import { listMatriculaStudentCard, listMatriculaStudentCardActive, listMatriculaStudentOrders } from '../api';

export const fetchStudentCards = async (openPayId, matricula) => {
  try {
    const tarjetas = await listMatriculaStudentCard(openPayId, matricula);
    return tarjetas;
  } catch (error) {
    throw error;
  }
};

export const fetchStudentCardsActive = async (openPayId, matricula) => {
  try {
    const tarjetas = await listMatriculaStudentCardActive(openPayId, matricula);
    return tarjetas;
  } catch (error) {
    throw error;
  }
};

export const fetchStudentActivity = async (matricula) => {
  try {
    const response = await listMatriculaStudentOrders(matricula);
    return response;
  } catch (error) {
    throw error;
  }
};

// Funciones para manejar datos temporales en localStorage
export const setTemporaryData = (key, data) => {
  localStorage.setItem(`temp_${key}`, JSON.stringify(data));
};

export const getTemporaryData = (key) => {
  try {
    const data = localStorage.getItem(`temp_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing temporary data:', error);
    return null;
  }
};

export const clearTemporaryData = (key) => {
  localStorage.removeItem(`temp_${key}`);
};

// Función para generar un ID único para pago basado en los datos del pago
export const generatePaymentId = (paymentDetail) => {
  if (!paymentDetail || !paymentDetail.length) return null;

  const firstItem = paymentDetail[0];
  // Crear un ID basado en número, fecha y monto para identificar únicamente el pago
  const baseData = `${firstItem.numero}_${firstItem.fecha}_${firstItem.monto}`;
  return btoa(baseData).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
};

// Función para encontrar un pago por ID
export const findPaymentById = (paymentId, orders) => {
  if (!orders || !orders.pedidos) return null;

  for (const pago of orders.pedidos) {
    const generatedId = generatePaymentId(pago.pedidosDetail);
    if (generatedId === paymentId) {
      return {
        detail: pago.pedidosDetail,
        orderData: {
          numero: pago.pedidosDetail[0]?.numero,
          fecha: pago.pedidosDetail[0]?.fecha,
          card: pago.pedidosDetail[0]?.card
        }
      };
    }
  }
  return null;
};





