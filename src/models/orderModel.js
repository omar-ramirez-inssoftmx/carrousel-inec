const pool = require('../utils/pool');

/**
 * Crear un nuevo pedido
 */
async function createOrder(
  id_alumno,
  identificador_pago,
  identificador_pedido,
  sku,
  id_cat_estatus,
  tipo_pago,
  producto_servicio_motivo_pago,
  concepto_pago,
  ciclo,
  mes,
  anio,
  pago,
  fecha_vigencia_pago,
  link_de_pago,
  concepto,
  transaccion_Id,
  fecha_carga = null,
  fecha_pago = null,
  monto_real_pago = 0.00
) {
  const query = `
    INSERT INTO pedidos (
      id_alumno, 
      identificador_pago, 
      identificador_pedido, 
      sku, 
      id_cat_estatus, 
      tipo_pago,
      producto_servicio_motivo_pago,
      concepto_pago,
      ciclo,
      mes,
      anio,
      pago, 
      fecha_vigencia_pago, 
      link_de_pago,
      concepto,
      transaccion_Id,
      fecha_carga,
      fecha_pago,
      monto_real_pago
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  try {
    const [result] = await pool.query(query, [
      id_alumno,
      identificador_pago,
      identificador_pedido,
      sku,
      id_cat_estatus,
      tipo_pago,
      producto_servicio_motivo_pago,
      concepto_pago,
      ciclo,
      mes,
      anio,
      pago,
      fecha_vigencia_pago,
      link_de_pago,
      concepto,
      transaccion_Id,
      fecha_carga || new Date().toISOString().split('T')[0],
      fecha_pago,
      monto_real_pago
    ]);

    return {
      id_pedido: result.insertId,
      id_alumno,
      identificador_pago,
      identificador_pedido,
      sku,
      id_cat_estatus,
      tipo_pago,
      producto_servicio_motivo_pago,
      concepto_pago,
      ciclo,
      mes,
      anio,
      pago,
      fecha_vigencia_pago,
      link_de_pago,
      concepto,
      transaccion_Id,
      fecha_carga,
      fecha_pago,
      monto_real_pago
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Obtener pedidos pendientes por matrícula (estatus != 1)
 */
async function getPendingOrdersByMatricula(matricula) {
  const checkQuery = 'SELECT * FROM alumno WHERE matricula = ?';
  const [existingAlumno] = await pool.query(checkQuery, [matricula]);

  if (existingAlumno.length < 1) {
    return null;
  }

  const query = `
    SELECT p.id_pedido,
        p.identificador_pago,
        p.identificador_pedido,         
        p.producto_servicio_motivo_pago AS nombre_producto,
        p.concepto_pago AS concepto,
        p.id_cat_estatus,
        ce.descripcion AS estatus,
        p.pago,
        p.fecha_vigencia_pago,
        p.link_de_pago,
        p.concepto_pago AS concepto_pedido,
        p.transaccion_Id,
        p.mes,
        p.anio,
        a.matricula,
        a.open_pay_id,
        a.nombre AS nombre_alumno,
        a.apellido_paterno,
        a.apellido_materno,
        a.email,
        a.celular
    FROM pedidos p
    JOIN alumno a ON p.id_alumno = a.id_alumno       
    JOIN cat_estatus ce ON p.id_cat_estatus = ce.id_cat_estatus
    WHERE a.matricula = ? AND p.id_cat_estatus != 1;
  `;

  try {
    const [result] = await pool.query(query, [matricula]);
    return result;
  } catch {
    throw new Error("Error al obtener pedidos por matrícula");
  }
}

/**
 * Obtener pedidos completados por matrícula (estatus = 1)
 */
async function getCompletedOrdersByMatricula(matricula) {
  const query = `
    SELECT p.id_pedido,
        p.identificador_pago,
        p.identificador_pedido,        
        p.producto_servicio_motivo_pago AS nombre_producto,
        p.concepto_pago AS concepto,
        p.id_cat_estatus,
        ce.descripcion AS estatus,
        p.pago,
        p.fecha_vigencia_pago,
        p.link_de_pago,
        p.concepto_pago AS concepto_pedido,
        p.transaccion_Id,
        p.monto_real_pago,
        p.mes,
        p.anio,
        p.fecha_pago,
        a.matricula,
        a.open_pay_id,
        a.nombre AS nombre_alumno,
        a.apellido_paterno,
        a.apellido_materno,
        a.email,
        a.celular
    FROM pedidos p
    JOIN alumno a ON p.id_alumno = a.id_alumno    
    JOIN cat_estatus ce ON p.id_cat_estatus = ce.id_cat_estatus
    WHERE a.matricula = ? AND p.id_cat_estatus = 1;
  `;

  try {
    const [result] = await pool.query(query, [matricula]);
    return result;
  } catch {
    throw new Error("Error al obtener pedidos por matrícula");
  }
}

/**
 * Obtener todos los pedidos para recargo (estatus = 3)
 */
async function getAllOrdersForSurcharge() {
  const query = `
    SELECT p.id_pedido,
        p.identificador_pago,
        p.identificador_pedido,        
        p.producto_servicio_motivo_pago AS nombre_producto,
        p.concepto_pago AS concepto,
        p.id_cat_estatus,
        ce.descripcion AS estatus,
        p.pago,
        p.fecha_vigencia_pago,
        p.link_de_pago,
        p.concepto_pago AS concepto_pedido,
        p.transaccion_Id,
        a.matricula,
        a.open_pay_id,
        a.nombre AS nombre_alumno,
        a.apellido_paterno,
        a.apellido_materno,
        a.email,
        a.celular
    FROM pedidos p
    JOIN alumno a ON p.id_alumno = a.id_alumno        
    JOIN cat_estatus ce ON p.id_cat_estatus = ce.id_cat_estatus
    WHERE p.id_cat_estatus = 3;
  `;

  try {
    const [result] = await pool.query(query);

    if (!result || result.length === 0) {
      console.log("No se encontraron pedidos con matrícula.");
      return [];
    }

    return result;
  } catch {
    throw new Error("Error al obtener todos los pedidos por matrícula");
  }
}

/**
 * Obtener meses disponibles para un estudiante
 */
async function getAvailableMonths(matricula) {
  const query = `
    SELECT 
      DISTINCT DATE_FORMAT(fecha_pago, '%b-%y') AS month_display,
      DATE_FORMAT(fecha_pago, '%Y-%m') AS month_value
    FROM pedidos p
    JOIN alumno a ON p.id_alumno = a.id_alumno
    WHERE a.matricula = ? AND p.id_cat_estatus = 1 
    ORDER BY month_value DESC
  `;

  const [months] = await pool.query(query, [matricula]);
  return [{ month_display: 'Todos', month_value: 'Todos' }, ...months];
}

/**
 * Actualizar múltiples pedidos
 */
async function updateOrders(ids, actualizar) {
  const { identificador_pago, link_de_pago, transaccion_Id } = actualizar;

  const updateQuery = `
    UPDATE pedidos
    SET 
        identificador_pago = ?,
        link_de_pago = ?,
        transaccion_Id = ?
    WHERE id_pedido IN (?)`;

  try {
    const [result] = await pool.query(updateQuery, [identificador_pago, link_de_pago, transaccion_Id, ids]);
    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Actualizar estatus de un pedido
 */
async function updateOrderStatus(id, status, pedido) {
  const isCompleted = status === 1;

  const fechaPago = isCompleted && pedido.operation_date
    ? new Date(pedido.operation_date).toISOString().slice(0, 19).replace('T', ' ')
    : null;

  const updateQuery = `
    UPDATE pedidos
    SET 
        id_cat_estatus = ?,
        fecha_pago = ${isCompleted ? '?' : 'fecha_pago'},
        monto_real_pago = ?,
        transaccion_Id = ?
    WHERE id_pedido = ?`;

  const queryParams = [
    status,
    ...(isCompleted ? [fechaPago] : []),
    pedido.amount,
    pedido.id,
    id
  ];

  try {
    const [result] = await pool.query(updateQuery, queryParams);
    return result;
  } catch {
    throw new Error("Error al actualizar el pedido");
  }
}

/**
 * Actualizar recargo de un pedido
 */
async function updateOrderSurcharge(id, pago, fecha) {
  const updateQuery = `UPDATE pedidos SET pago = ?, fecha_vigencia_pago = ? WHERE id_pedido = ?`;

  try {
    const [result] = await pool.query(updateQuery, [pago, fecha, id]);
    return result;
  } catch {
    throw new Error("Error al actualizar los pedidos recargo");
  }
}

/**
 * Cancelar pedidos eliminando datos de pago
 */
async function cancelOrdersPaymentData(ids) {
  const updateQuery = `
    UPDATE pedidos
    SET 
        identificador_pago = NULL,
        link_de_pago = NULL,
        transaccion_Id = NULL
    WHERE id_pedido IN (?)`;

  try {
    const [result] = await pool.query(updateQuery, [ids]);
    return result;
  } catch (error) {
    throw new Error("Error al cancelar los datos de pago de los pedidos");
  }
}

module.exports = {
  createOrder,
  getPendingOrdersByMatricula,
  getCompletedOrdersByMatricula,
  getAllOrdersForSurcharge,
  getAvailableMonths,
  updateOrders,
  updateOrderStatus,
  updateOrderSurcharge,
  cancelOrdersPaymentData
};