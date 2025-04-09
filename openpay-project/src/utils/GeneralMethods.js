import { useNavigate } from "react-router-dom";
import { listMatriculaStudentCard, listMatriculaStudentCardActive, listMatriculaStudentOrders  } from '../api';

//Tarjetas del alumno
export const fetchStudentCards = async (openPayId, matricula) => {
    try {
        const tarjetas = await listMatriculaStudentCard(openPayId, matricula);

        console.log("tarjetas -->", tarjetas)
        return tarjetas;
    } catch (error) {
        console.error("Error al obtener tarjetas:", error);
        throw error; // Relanzamos el error para manejarlo en el componente
    }
};

export const fetchStudentCardsActive = async (openPayId, matricula) => {
    try {
        const tarjetas = await listMatriculaStudentCardActive(openPayId, matricula);

        console.log("tarjetas Active-->", tarjetas)
        return tarjetas;
    } catch (error) {
        console.error("Error al obtener tarjetas:", error);
        throw error; // Relanzamos el error para manejarlo en el componente
    }
};


export const fetchStudentActivity = async (matricula) => {
    try {
        const response = await listMatriculaStudentOrders(matricula);
        return {
            payments: response.payments || [],
            availableMonths: response.availableMonths || []
        };
    } catch (error) {
        console.error("Error en fetchStudentActivity:", error);
        throw error;
    }
};





