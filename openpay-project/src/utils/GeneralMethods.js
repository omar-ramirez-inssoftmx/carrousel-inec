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





