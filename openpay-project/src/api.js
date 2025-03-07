import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Reemplaza con la URL real de tu backend
//const API_URL = 'http://52.23.252.184:3000/api';

export const loginWithMatricula = async (matricula) => {
    const response = await axios.post(`${API_URL}/student/selectStudent`, { matricula });
    return response.data; // Suponiendo que el backend devuelve un objeto con la info del usuario
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