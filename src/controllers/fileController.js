import xlsx from 'xlsx';
import fs from 'fs';
import { createStudent } from '../models/studentModel.ts';
import { createOrder, getAllOrdersForSurcharge, updateOrderSurcharge } from '../models/orderModel.ts';

import { openpay } from '../utils/openPay.ts';

const columnMapping = {
  "Matrícula *": "matricula",
  "Nombre(s) *": "nombre",
  "Apellido Paterno*": "apellido_paterno",
  "Apellido Materno": "apellido_materno",
  "Celular": "celular",
  "Correo *": "correo",
  "Pago": "pago",//[6]
  "Fecha de Vencimiento Pago": "fecha_vencimiento_pago",//[7]
  "Tipo de Pago": "tipo_pago", // [8]
  "Producto / Servicio Motivo de pago": "producto_servicio_motivo_pago", // NO [9]
  "Concepto de pago *": "concepto_pago", // NO [10]
  "Ciclo": "ciclo",
  "Mes": "mes",
  "Año": "anio"
};

// Controlador para manejar la carga y lectura del archivo
const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }

  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = 'Alumnos - Carga Masiva';
    const worksheet = workbook.Sheets[sheetName];

    // Convertimos la hoja a un array de arrays
    let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Filtramos la primera fila con encabezados reales (ignorando comentarios)
    let headerRowIndex = data.findIndex(row => row.some(cell => {
      if (typeof cell !== 'string') return false;
      return Object.keys(columnMapping).some(key => cell.includes(key));
    }));

    const filteredData = data
      .slice(headerRowIndex + 1)
      .filter(row => row.some(cell => cell !== null && cell !== ''));

    for (const row of filteredData) {
      try {
        const customerData = {
          external_id: row[0],
          name: row[1],
          last_name: row[2] + ' ' + row[3],
          email: row[5].trim(),
          phone_number: String(row[4] || '')
        };

        const customer = await findOrCreateCustomer(customerData);
        const resultAlumno = await createStudent(row[0], row[1], row[2], row[3], row[5].trim(), String(row[4] || ''), customer.id);

        const ciclo = parseInt(row[11]) || 0;
        const mesInicial = parseInt(row[12]) || 1;
        const anio = parseInt(row[13]) || new Date().getFullYear();

        for (let i = 0; i < ciclo; i++) {
          const mesActual = mesInicial + i;
          let mes = mesActual;
          let anioActual = anio;

          // Si el mes supera 12, ajustamos al año siguiente
          if (mesActual > 12) {
            mes = mesActual % 12 || 12;
            anioActual += Math.floor((mesActual - 1) / 12);
          }

          const fechaVigencia = excelSerialToDate(row[7], mes, anioActual);
          const fechaVigenciaDate = fechaVigencia ? new Date(fechaVigencia) : null;
          
          // Calcular el monto con recargos si la fecha ya venció
          let montoFinal = parseFloat(row[6]) || 0;
          let fechaFinal = fechaVigenciaDate;
          
          if (fechaVigenciaDate) {
            const { monto, fecha } = calculateSurchargeIfNeeded(montoFinal, fechaVigenciaDate);
            montoFinal = monto;
            fechaFinal = fecha;
          }

          await createOrder(
            resultAlumno,  //id_alumno
            null,//identificador_pago
            3,//id_cat_estatus
            row[8],//tipo_pago
            ciclo,// ciclo
            mes,// mes
            anioActual,// anio
            montoFinal,//pago
            fechaFinal,//fecha_vigencia_pago
            null,//link_pago
            null,//transaction_id
            new Date(),//fecha_carga
            null,//fecha_pago
            0.00//monto_real_pago
          );
        }
      } catch (error) {
        console.error(`Error al insertar el alumno con matrícula ${row[0]}:`, error.message);
      }
    }

    // Actualizar pedidos existentes con recargos si es necesario
    await updateExistingOrdersSurcharges();

    res.json({ message: "Proceso de carga completado" });
    fs.unlinkSync(filePath);

  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ error: 'Error al procesar el archivo', details: error.message });
  }
};

// Función para actualizar pedidos existentes con recargos acumulativos
async function updateExistingOrdersSurcharges() {
  try {
    const pedidos = await getAllOrdersForSurcharge();
    const currentDate = new Date();
    let pedidosActualizados = 0;

    for (const pedido of pedidos) {
      try {
        const dueDate = new Date(pedido.fecha_vigencia_pago);

        // Solo procesar si la fecha de vencimiento ya pasó
        if (dueDate < currentDate) {
          const { monto, fecha } = calculateSurchargeIfNeeded(pedido.pago, dueDate);
          
          // Solo actualizar si hay cambios en el monto o fecha
          if (monto !== pedido.pago || fecha.getTime() !== dueDate.getTime()) {
            const formattedDate = fecha.toISOString().split('T')[0];
            await updateOrderSurcharge(pedido.id_pedido, monto, formattedDate);
            pedidosActualizados++;
            console.log(`Pedido ${pedido.id_pedido} actualizado - Monto anterior: ${pedido.pago}, Nuevo monto: ${monto}`);
          }
        }
      } catch (error) {
        console.error(`Error actualizando pedido ${pedido.id_pedido}:`, error);
      }
    }

    console.log(`Se actualizaron ${pedidosActualizados} pedidos con recargos acumulativos`);
  } catch (error) {
    console.error('Error al actualizar pedidos existentes:', error);
  }
}

function excelSerialToDate(excelSerialDate, mes, anio) {
  if (typeof excelSerialDate === 'undefined' || !excelSerialDate || isNaN(parseFloat(excelSerialDate))) {
    return null;
  }

  const date = new Date(Math.round((excelSerialDate - 25569) * 86400 * 1000));
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  const adjustedDate = new Date(date.getTime() + timezoneOffset);

  const day = adjustedDate.getDate();

  // Formatear con ceros a la izquierda para cumplir con ISO-8601
  const mesFormatted = mes.toString().padStart(2, '0');
  const dayFormatted = day.toString().padStart(2, '0');

  return `${anio}-${mesFormatted}-${dayFormatted}`;
}

// Función para calcular recargos acumulativos si la fecha ya venció
function calculateSurchargeIfNeeded(montoOriginal, fechaVencimiento) {
  const hoy = new Date();
  const fechaVenc = new Date(fechaVencimiento);
  
  // Si la fecha no ha vencido, no hay recargo
  if (fechaVenc >= hoy) {
    return { monto: montoOriginal, fecha: fechaVencimiento };
  }
  
  let montoActual = montoOriginal;
  let fechaActual = new Date(fechaVenc);
  
  // Calcular cuántos períodos de recargo han pasado
  while (fechaActual < hoy) {
    // Aplicar recargo del 10%
    montoActual = Math.round((montoActual * 1.10) * 100) / 100;
    
    // Mover la fecha al 15 del siguiente mes
    const siguienteMes = fechaActual.getMonth() + 1;
    const siguienteAnio = fechaActual.getFullYear() + (siguienteMes > 11 ? 1 : 0);
    const mesAjustado = siguienteMes > 11 ? 0 : siguienteMes;
    
    fechaActual = new Date(siguienteAnio, mesAjustado, 15);
  }
  
  return { monto: montoActual, fecha: fechaActual };
}

const findOrCreateCustomer = async (customerData) => {
  const { external_id, name, last_name, email, phone_number } = customerData;

  try {
    const customers = await new Promise((resolve, reject) => {
      openpay.customers.list({ external_id }, (error, customers) => {
        if (error) return reject(error);
        resolve(customers);
      });
    });

    if (customers.length > 0) {
      return customers[0];
    }

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

export { uploadFile };