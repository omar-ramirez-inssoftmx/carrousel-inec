import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api";

export const searchCustomer = (externalId) => {
    return axios.post(`${API_BASE_URL}/customers/list`, { external_id: externalId });
};

export const createCustomer = (customerData) => {
    return axios.post(`${API_BASE_URL}/customers/create`, customerData);
};

export const generatePaymentId = (customerId) => {
    return axios.post(`${API_BASE_URL}/orders/createId`, { customer_id: customerId, description: "Pago de matrícula" });
};
