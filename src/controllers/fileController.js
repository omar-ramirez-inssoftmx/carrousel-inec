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
          
          // Para nuevos pedidos, usar el monto base sin recargos
          // Los recargos se calcularán después con la lógica de ciclo completo
          let montoFinal = parseFloat(row[6]) || 0;
          let fechaFinal = fechaVigenciaDate;

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
// Usa la lógica correcta de ciclo completo
async function updateExistingOrdersSurcharges() {
  try {
    const pedidos = await getAllOrdersForSurcharge();
    const currentDate = new Date();
    let pedidosActualizados = 0;
    let recargosAplicados = 0;

    // Usar la nueva lógica de ciclo completo
    const resultados = calculateSurchargeForCycle(pedidos, currentDate);
    
    for (const resultado of resultados) {
      try {
        // Actualizar SIEMPRE si hay cambios en el monto (para corregir recargos incorrectos)
        if (resultado.montoConRecargo !== resultado.montoOriginal) {
          await updateOrderSurcharge(resultado.id_pedido, resultado.montoConRecargo);
          
          recargosAplicados++;
          if (resultado.yaTeniaRecargo) {
            console.log(`Recargo corregido en pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo}, Recargos aplicados: ${resultado.recargosAplicados}`);
          } else {
            console.log(`Recargo aplicado al pedido ${resultado.id_pedido} - Monto anterior: ${resultado.montoOriginal}, Nuevo monto: ${resultado.montoConRecargo}, Recargos aplicados: ${resultado.recargosAplicados}`);
          }
        } else {
          console.log(`Pedido ${resultado.id_pedido} mantiene monto correcto - Monto: ${resultado.montoOriginal}, Recargos: ${resultado.recargosAplicados}`);
        }

        pedidosActualizados++;
      } catch (error) {
        console.error(`Error procesando pedido ${resultado.id_pedido}:`, error);
      }
    }

    console.log(`Se procesaron ${pedidosActualizados} pedidos, se aplicaron ${recargosAplicados} recargos`);
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

// Nueva función que calcula recargos considerando todo el ciclo
// Esta es la implementación correcta de la lógica de negocio
function calculateSurchargeForCycle(pedidos, fechaActual) {
  const pedidosAgrupados = {};
  
  // Convertir fechaActual a horario de México (GMT-6)
  const fechaActualMexico = new Date(fechaActual.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
  
  // Agrupar pedidos por ciclo
  pedidos.forEach(pedido => {
    if (!pedidosAgrupados[pedido.ciclo]) {
      pedidosAgrupados[pedido.ciclo] = [];
    }
    pedidosAgrupados[pedido.ciclo].push(pedido);
  });

  const resultados = [];

  Object.keys(pedidosAgrupados).forEach(cicloKey => {
    const ciclo = pedidosAgrupados[cicloKey];
    
    // Ordenar por año y mes
    ciclo.sort((a, b) => {
      if (a.anio !== b.anio) return a.anio - b.anio;
      return a.mes - b.mes;
    });
    
    // Calcular montos acumulativos para todo el ciclo
    const baseAmount = 1500;
    const surchargeRate = 0.10;
    const montos = [];
    
    // El primer mes del ciclo siempre mantiene el monto base
    montos.push(baseAmount);
    
    // Calcular secuencialmente cada mes del ciclo
    for (let i = 1; i < ciclo.length; i++) {
      const pedidoAnterior = ciclo[i - 1];
      const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
      
      // Convertir fecha de vencimiento a horario de México
      const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
      
      // El recargo se aplica el día 16 a primera hora (00:00:01)
      // Por lo tanto, el día 15 completo (hasta 23:59:59) es válido para pagar sin recargos
      const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
      
      if (fechaActualMexico >= fechaLimiteRecargo) {
        // El mes anterior está vencido (ya pasó el día 15), aplicar 10% al monto del mes anterior
        const montoAnterior = montos[i - 1];
        const nuevoMonto = montoAnterior * (1 + surchargeRate);
        montos.push(Math.round(nuevoMonto * 100) / 100);
      } else {
        // El mes anterior no está vencido, mantener monto base
        montos.push(baseAmount);
      }
    }

    // Asignar montos calculados a cada pedido
    ciclo.forEach((pedidoActual, index) => {
      const montoActual = parseFloat(pedidoActual.pago);
      const yaTieneRecargo = montoActual > baseAmount;
      const montoFinal = montos[index];
      
      // Contar recargos aplicados
      let recargosAplicados = 0;
      for (let i = 0; i < index; i++) {
        const pedidoAnterior = ciclo[i];
        const fechaVencimientoAnterior = new Date(pedidoAnterior.fecha_vigencia_pago);
        const fechaVencimientoMexico = new Date(fechaVencimientoAnterior.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
        const fechaLimiteRecargo = new Date(fechaVencimientoMexico.getFullYear(), fechaVencimientoMexico.getMonth(), 16, 0, 0, 1);
        
        if (fechaActualMexico >= fechaLimiteRecargo) {
          recargosAplicados++;
        }
      }
      
      resultados.push({
        ...pedidoActual,
        montoOriginal: montoActual,
        montoConRecargo: montoFinal,
        recargosAplicados,
        yaTeniaRecargo: yaTieneRecargo
      });
    });
  });
  
  return resultados;
}

// Función legacy - mantener para compatibilidad pero ya no se usa
function calculateSurchargeIfNeeded(montoOriginal, fechaVencimiento) {
  const hoy = new Date();
  const fechaVenc = new Date(fechaVencimiento);
  
  // Si la fecha no ha vencido, no hay recargo
  if (fechaVenc >= hoy) {
    return { monto: montoOriginal, fecha: fechaVencimiento };
  }
  
  // NOTA: Esta función ahora requiere contexto del ciclo completo para funcionar correctamente
  // Por ahora, mantenemos la lógica anterior como fallback
  // TODO: Implementar calculateSurchargeForCycle que considere todos los meses del ciclo
  
  let montoFinal = montoOriginal;
  let fechaActual = new Date(fechaVenc);
  
  // Mover inmediatamente al siguiente mes para aplicar el primer recargo
  const primerMesRecargo = fechaActual.getMonth() + 1;
  const primerAnioRecargo = fechaActual.getFullYear() + (primerMesRecargo > 11 ? 1 : 0);
  const primerMesAjustado = primerMesRecargo > 11 ? 0 : primerMesRecargo;
  
  fechaActual = new Date(primerAnioRecargo, primerMesAjustado, 15);
  
  // Calcular cuántos períodos de recargo han pasado desde el mes siguiente
  while (fechaActual < hoy) {
    // Aplicar recargo del 10%
    montoFinal = Math.round((montoFinal * 1.10) * 100) / 100;
    
    // Mover la fecha al 15 del siguiente mes
    const siguienteMes = fechaActual.getMonth() + 1;
    const siguienteAnio = fechaActual.getFullYear() + (siguienteMes > 11 ? 1 : 0);
    const mesAjustado = siguienteMes > 11 ? 0 : siguienteMes;
    
    fechaActual = new Date(siguienteAnio, mesAjustado, 15);
  }
  
  return { monto: montoFinal, fecha: fechaActual };
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