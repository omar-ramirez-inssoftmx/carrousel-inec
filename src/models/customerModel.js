const pool = require('../config/conexionAsync');

async function createAlumno(matricula, nombre, apellido_paterno, apellido_materno, email, celular, openPayId) {
  // Verificar si el alumno ya existe por matrícula
  const checkQuery = 'SELECT id_alumno FROM alumno WHERE matricula = ?';
  const [existingAlumno] = await pool.query(checkQuery, [matricula]);

  if (existingAlumno.length < 1) {

    // Si el alumno no existe, insertarlo
    const insertQuery = `
            INSERT INTO alumno (matricula, nombre, apellido_paterno, apellido_materno, email, celular, open_pay_id, fecha_alta, fecha_modificacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
        `;

    try {
      const [result] = await pool.query(insertQuery, [matricula, nombre, apellido_paterno, apellido_materno, email, celular, openPayId]);

      return result.insertId;
    } catch (error) {
      console.error("Error al crear el alumno:", error);
      throw error;
    }

  } else {
    const idAlumno = existingAlumno[0].id_alumno;
    return idAlumno;
  }
}

async function createPedido(
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
      fecha_carga || new Date().toISOString().split('T')[0], // Fecha actual si no se proporciona
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
    console.error("Error al crear el pedido:", error);
    throw error;
  }
}


async function updatePedidos(ids, actualizar) {
  const { identificador_pago, link_de_pago, transaccion_Id } = actualizar;

  const updateQuery = `
        UPDATE pedidos
        SET 
            identificador_pago = ?,
            link_de_pago = ?,
            transaccion_Id = ?
        WHERE id_pedido IN (?)`;  // Corregido: eliminada la coma extra

  try {
    // Ejecutar la consulta
    const [result] = await pool.query(updateQuery, [identificador_pago, link_de_pago, transaccion_Id, ids]);
    console.log('Registros actualizados:', result.affectedRows);
    return result;
  } catch (error) {
    console.error('Error al actualizar los pedidos:', error);
    throw error;
  }
}

async function updateStatus(id, status, pedido) {
  const isCompleted = status === 1;

  // Preparar la fecha de pago (usar operation_date si está completado, de lo contrario mantener el valor actual)
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

    if (result.affectedRows === 0) {
      console.log('No se encontró el pedido con ID:', id);
    } else {
      console.log(`Pedido ${id} actualizado - Estatus: ${status} | 
                        ${isCompleted ? `Fecha pago: ${fechaPago}` : 'Sin cambio de fecha'}`);
    }

    return result;
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    throw error;
  }
}

async function getTempleteEmail(clave) {
  const query = `
    SELECT * FROM templates WHERE clave = ?;
    `;

  try {
    const [result] = await pool.query(query, [clave]);

    if (result.length < 1) {
      return null;
    } else {
      return result[0];
    }
  } catch (error) {
    console.error("Error al obtener el template:", error);
    throw new Error("Error al obtener la template");
  }
}

module.exports = {
  createAlumno,
  createPedido,
  updatePedidos,
  getTempleteEmail,
  updateStatus,
};