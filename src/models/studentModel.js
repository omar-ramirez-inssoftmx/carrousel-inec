import pool from '../utils/pool.ts';

async function createStudent(matricula, nombre, apellido_paterno, apellido_materno, email, celular, openPayId) {
  const checkQuery = 'SELECT id_alumno FROM alumno WHERE matricula = ?';

  const [existingAlumno] = await pool.query(checkQuery, [matricula]);

  if (existingAlumno.length < 1) {
    const insertQuery = `
      INSERT INTO alumno (matricula, nombre, apellido_paterno, apellido_materno, email, celular, open_pay_id, fecha_alta, fecha_modificacion)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;

    try {
      const [result] = await pool.query(
        insertQuery,
        [matricula, nombre, apellido_paterno, apellido_materno, email, celular, openPayId]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  } else {
    const idAlumno = existingAlumno[0].id_alumno;
    return idAlumno;
  }
}

async function getStudentByMatricula(matricula) {
  const query = 'SELECT * FROM alumno WHERE matricula = ?';

  try {
    const [result] = await pool.query(query, [matricula]);

    if (result.length < 1) return null

    return result;
  } catch (error) {
    console.error('Error en getStudentByMatricula:', error);
    throw new Error(`Error al obtener la matrícula: ${error.message}`);
  }
}

async function getStudentByOpenPayId(customer_id) {
  const query = 'SELECT * FROM alumno WHERE open_pay_id = ?';

  try {
    const [result] = await pool.query(query, [customer_id]);

    if (result.length < 1) return null
    
    return result[0];
  } catch (error) {
    console.error('Error en getStudentByOpenPayId:', error);
    throw new Error(`Error al obtener la matrícula por OpenPay ID: ${error.message}`);
  }
}

export {
  createStudent,
  getStudentByMatricula,
  getStudentByOpenPayId,
};