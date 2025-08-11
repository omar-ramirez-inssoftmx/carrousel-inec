import { getStudentByMatricula } from '../models/studentModel.ts';
import { updateOrderStatus, getOrdersByMatricula } from '../models/orderModel.ts';
import {
  mapOpenpayStatusToDBStatus,
  createChargeRequestWithSurcharge,
  createCharge,
  getChargeStatusByOrderId
} from '../services/openpayService.js';
import {
  sendOrderConfirmationMessage,
  formatMexicanPhoneNumber
} from '../services/whatsappService.js';
import { processOrderDates } from '../services/formatService.js';
import { openpay } from '../utils/openPay.ts';

export const getStudentData = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const pedidos = await getOrdersByMatricula(matricula, 'pending');

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pagos para la matrícula' });
    }

    // Procesar los pedidos para obtener el estado de cada uno y actualizarlo en la base de datos
    const pedidosConEstado = await Promise.all(
      pedidos.map(async (pedido) => {
        const openpayStatus = await getChargeStatusByOrderId(pedido.open_pay_id, pedido.identificador_pago);

        let estatus = null;
        if (openpayStatus != null) {
          if (openpayStatus.status === "charge_pending") {
            const dueDate = new Date(openpayStatus.due_date);
            const now = new Date();

            if (dueDate < now) {
              estatus = "CANCELLED";
            } else {
              estatus = openpayStatus.status;
            }
          } else {
            estatus = openpayStatus.status;
          }
        }

        const estado = mapOpenpayStatusToDBStatus(estatus);

        if (pedido.identificador_pago && pedido.transaccion_Id && estado !== 'Desconocido') {
          await updateOrderStatus(pedido.id_pedido, estado, openpayStatus);
        }

        return { ...pedido, estado };
      })
    );

    const pedidosActualizados = await getOrdersByMatricula(matricula, 'pending');
    const pedidosProcesados = pedidosActualizados.map(processOrderDates);

    res.json(pedidosProcesados);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

export const getStudentByMatriculaData = async (req, res) => {
  try {
    const { matricula } = req.body;

    if (!matricula) {
      return res.status(400).json({ error: 'Es necesario colocar una matrícula.' });
    }

    const student = await getStudentByMatricula(matricula);

    if (!student || student.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos de la matrícula' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud', details: error.message });
  }
};

export const createCustomerWithPayment = async (req, res) => {
  try {
    const { name, last_name, email, phone_number, external_id } = req.body;

    const customerData = {
      name,
      last_name,
      email,
      phone_number,
      external_id,
    };

    // Crear customer en OpenPay
    const customer = await new Promise((resolve, reject) => {
      openpay.customers.create(customerData, (error, customer) => {
        if (error) reject(error);
        else resolve(customer);
      });
    });

    // Crear charge request con recargo si aplica
    const baseAmount = 1500;
    const description = "Pago creando cliente y generando link de pago";
    const orderId = `oid-${new Date().getTime()}`;

    const chargeRequest = createChargeRequestWithSurcharge(
      baseAmount,
      description,
      orderId,
      null // sin due_date específico
    );

    // Crear la orden de pago
    const order = await createCharge(customer.id, chargeRequest);

    res.json({
      success: true,
      message: 'Cliente y orden de pago creados exitosamente',
      payment_url: order.payment_method?.url || "No se generó un link de pago",
    });

    // Enviar WhatsApp si tiene teléfono
    const paymentUrl = order.payment_method?.url || "No se generó un link de pago";
    const customerPhone = formatMexicanPhoneNumber(customerData.phone_number);

    if (customerPhone && paymentUrl !== "No se generó un link de pago") {
      try {
        await sendOrderConfirmationMessage(customerPhone, paymentUrl);
      } catch (whatsappError) {
        console.error("Error enviando WhatsApp:", whatsappError);
        // No fallar la request por error de WhatsApp
      }
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Hubo un error al crear el cliente y la orden de pago',
      error: error.message || error.description || error,
    });
  }
};

export const listCustomer = async (req, res) => {
  const { external_id } = req.body;
  const searchParams = { external_id };

  openpay.customers.list(searchParams, (error, customers) => {
    if (error) {
      return res.status(400).json({ error: error.description });
    }
    res.json(customers);
  });
};
