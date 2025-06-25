import axios from 'axios';

//const API_URL = 'http://localhost:3000/api';
const API_URL = 'http://10.38.2.135:3000/api';

//const API_URL = 'http://52.23.252.184:3000/api';

export const loginWithMatricula = async (matricula) => {
  const response = await axios.post(`${API_URL}/student/selectStudent`, { matricula });
  return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
};

export const createCard = async (
  card_number,
  holder_name,
  expiration_year,
  expiration_month,
  cvv2,
  device_session_id,
  customer_id,
  id_alumno,
  nombre_tarjeta,
  telefono,
  ciudad,
  postal
) => {
  const response = await axios.post(`${API_URL}/payment/method/create`, {
    card_number,
    holder_name,
    expiration_year,
    expiration_month,
    cvv2,
    device_session_id,
    customer_id,
    id_alumno,
    nombre_tarjeta,
    telefono,
    ciudad,
    postal
  });
  return response.data;
};

export const listMatriculaStudentCard = async (customer_id, matricula) => {
  const response = await axios.post(`${API_URL}/payment/method/list`, { customer_id, matricula });
  return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
};

export const listMatriculaStudentOrders = async (matricula) => {
  try {
    const response = await axios.post(`${API_URL}/orders/activity`, { matricula });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const listMatriculaStudentCardActive = async (customer_id, matricula) => {
  const response = await axios.post(`${API_URL}/payment/method/activateCard`, { customer_id, matricula });
  return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
};


export const activateCard = async (id_tarjeta, id_alumno) => {
  const response = await axios.post(`${API_URL}/payment/method/activate`, { id_tarjeta, id_alumno });
  return response.data;
};

export const deleteCard = async (id_tarjeta, customer_id, id_alumno) => {
  const response = await axios.post(`${API_URL}/payment/method/delete`, { id_tarjeta, customer_id, id_alumno });
  return response.data;
};

export const loginWithMatriculaStudent = async (matricula) => {
  const response = await axios.post(`${API_URL}/student/selectStudentMatricula`, { matricula });
  return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
};

export const createOrder = async (openPayId, description, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados) => {
  try {
    // Asegúrate de que la URL es correcta
    const response = await axios.post(`${API_URL}/orders/createOrderStudent`, {
      customer_id: openPayId,
      description,
      amount: totalAmount,
      pedidoIds,
      fechaVigencia,
      pedidosSeleccionados// Pasamos los IDs de los pedidos seleccionados
    });

    return response.data;  // Regresa la respuesta del servidor, que debe contener el link o la información necesaria
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al generar el link de pago');
  }
};


export const pay = async (openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados, deviceSessionId, token, tokenGuardar, isCard, telefono, ciudad, postal, idAlumno, nombreTarjeta) => {
  try {
    // Asegúrate de que la URL es correcta
    const response = await axios.post(`${API_URL}/orders/pay`, {
      customer_id: openPayId,
      description,
      orderId,
      amount: totalAmount,
      pedidoIds,
      fechaVigencia,
      pedidosSeleccionados,
      deviceSessionId,
      token,
      tokenGuardar,
      saveCard: isCard,
      telefono,
      ciudad,
      postal,
      idAlumno,
      nombreTarjeta
    });

    return response.data;  // Regresa la respuesta del servidor, que debe contener el link o la información necesaria
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al generar el link de pago');
  }
};

export const cancelOrder = async (pedidosConLinks, pedidosComp) => {
  try {
    // Asegúrate de que la URL es correcta
    const response = await axios.post(`${API_URL}/cancel/cancel`, {
      pedidosConLinks,
      pedidosComp
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al cancelar el link de pago');
  }
};
