const pool = require('../config/conexionAsync');

async function getOrdersStudent(matricula) {
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
  } catch (error) {
    console.error("Error al obtener pedidos por matrícula:", error);
    throw new Error("Error al obtener pedidos por matrícula");
  }
}


const getAvailableMonths = async (matricula) => {
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
};

async function getStudentOrdersSummary(filters = {}) {
  // Construir la consulta base
  let query = `
        SELECT 
            a.id_alumno,
            a.matricula,
            CONCAT(a.nombre, ' ', a.apellido_paterno, ' ', a.apellido_materno) AS nombre_completo,
            COUNT(p.id_pedido) AS total_pedidos,
            SUM(CASE WHEN p.id_cat_estatus = 1 THEN 1 ELSE 0 END) AS pedidos_pagados,
            SUM(CASE WHEN p.id_cat_estatus = 3 THEN 1 ELSE 0 END) AS pedidos_pendientes,
            SUM(p.pago) AS monto_total,
            SUM(CASE WHEN p.id_cat_estatus = 1 THEN p.pago ELSE 0 END) AS monto_pagado,
            SUM(CASE WHEN p.id_cat_estatus = 3 THEN p.pago ELSE 0 END) AS monto_pendiente
        FROM 
            alumno a
        LEFT JOIN 
            pedidos p ON a.id_alumno = p.id_alumno
            AND p.id_cat_estatus IN (1, 3)  -- Solo pagados(1) y pendientes(3)
    `;

  // Array para almacenar los valores de los parámetros
  const params = [];

  // Agregar condiciones WHERE según los filtros proporcionados
  const conditions = [];

  if (filters.matricula) {
    conditions.push('a.matricula = ?');
    params.push(filters.matricula);
  }

  if (filters.month && filters.month !== 'Todos') {
    conditions.push('DATE_FORMAT(p.fecha_pago, "%Y-%m") = ?');
    params.push(filters.month);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Continuación de la consulta
  query += `
        GROUP BY 
            a.id_alumno, a.matricula, a.nombre, a.apellido_paterno, a.apellido_materno
        HAVING 
            COUNT(p.id_pedido) > 0  -- Solo alumnos con pedidos
        ORDER BY 
            a.apellido_paterno, a.apellido_materno, a.nombre;
    `;

  try {
    const [result] = await pool.query(query, params);
    return result;
  } catch (error) {
    console.error("Error al obtener resumen de pedidos:", error);
    throw new Error("Error al obtener resumen de pedidos");
  }
}


module.exports = {
  getOrdersStudent,
  getAvailableMonths,
  getStudentOrdersSummary
};