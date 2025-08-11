import { openpay } from '../utils/openPay.ts';

export const findOrCreateCustomer = async (customerData) => {
  const { external_id, name, last_name, email, phone_number } = customerData;

  try {
    const customers = await new Promise((resolve, reject) => {
      openpay.customers.list({ external_id }, (error, customers) => {
        if (error) return reject(error);
        resolve(customers);
      });
    });

    if (customers.length > 0) return customers[0]

    const newCustomer = await new Promise((resolve, reject) => {
      openpay.customers.create({ name, last_name, email, phone_number, external_id }, (error, customer) => {
        if (error) return reject(error);
        resolve(customer);
      });
    });

    return newCustomer;
  } catch (error) {
    throw error;
  }
};

export const getCustomer = async (customer_id) => {
  return new Promise((resolve, reject) => {
    openpay.customers.get(customer_id, (error, customerData) => {
      if (error) return reject(error);
      resolve(customerData);
    });
  });
};

export const createCharge = (customer_id, chargeRequest) => {
  return new Promise((resolve, reject) => {
    openpay.customers.charges.create(customer_id, chargeRequest, (error, order) => {
      if (error) return reject(error);
      resolve(order);
    });
  });
};

export const createDirectCharge = (chargeRequest) => {
  return new Promise((resolve, reject) => {
    openpay.charges.create(chargeRequest, (error, charge) => {
      if (error) return reject(error);
      resolve(charge);
    });
  });
};

export const getCustomerCharges = (customer_id, searchParams = {}) => {
  return new Promise((resolve, reject) => {
    openpay.customers.charges.list(customer_id, searchParams, (error, charges) => {
      if (error) return reject(error);
      resolve(charges);
    });
  });
};

export const getChargeStatusByOrderId = async (customer_id, order_id) => {
  try {
    const charges = await getCustomerCharges(customer_id, { order_id });
    const charge = charges.find((charge) => charge.order_id === order_id);

    if (!charge) return null

    return charge;
  } catch (error) {
    throw error;
  }
};

export const createCustomerCard = (customer_id, cardRequest) => {
  return new Promise((resolve, reject) => {
    openpay.customers.cards.create(customer_id, cardRequest, (error, card) => {
      if (error) return reject(error);
      resolve(card);
    });
  });
};

export const mapOpenpayStatusToDBStatus = (openpayStatus) => {
  switch (openpayStatus && openpayStatus.toUpperCase()) {
    case 'COMPLETED':
      return 1;
    case 'IN_PROGRESS':
    case 'CHARGE_PENDING':
      return 3;
    case 'CANCELLED':
      return 2;
    case 'FAILED':
    case 'REFUNDED':
    case 'CHARGEBACK_PENDING':
    case 'CHARGEBACK_ACCEPTED':
    case 'CHARGEBACK_ADJUSTMENT':
      return 2;
    default:
      return 'Desconocido';
  }
};

export const createChargeRequestWithSurcharge = (baseAmount, description, orderId, dueDate) => {
  const fecha = new Date();
  const dia = fecha.getDate();
  let amount = baseAmount;

  // Si el día no es 1 ni 15, se agrega el 10%
  if (dia !== 1 && dia !== 15) {
    amount = amount + (amount * 0.10);
  }

  return {
    method: "card",
    amount: amount,
    description,
    order_id: orderId,
    send_email: true,
    confirm: false,
    redirect_url: "http://inecestudiantes.s3-website-us-east-1.amazonaws.com/",
    due_date: dueDate,
  };
};
