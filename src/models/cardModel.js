const pool = require('../utils/pool');

async function createCardForStudent(id_alumno, numero_tarjeta, token, nombre_tarjeta, tipo, titular, vencimiento, telefono, ciudad, postal) {
  const query = `
        INSERT INTO tarjetas (
            id_alumno, 
            numero_tarjeta, 
            token,
            nombre_tarjeta,
            tipo,
            titular,
            vencimiento,
            telefono,
            ciudad, 
            postal     
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

  try {
    const [result] = await pool.query(query, [id_alumno, numero_tarjeta, token, nombre_tarjeta, tipo, titular, vencimiento, telefono, ciudad, postal]);

    return {
      id_tarjeta: result.insertId,
      id_alumno,
      numero_tarjeta,
      token,
      nombre_tarjeta,
      tipo,
      titular,
      vencimiento,
      telefono,
      ciudad,
      postal
    };
  } catch (error) {
    throw error;
  }
}

async function getStudentCardsByMatricula(matricula) {
  const query = `
            SELECT 
            a.id_alumno,
            a.nombre,
            a.matricula,
            t.id AS id_tarjeta,
            t.numero_tarjeta,
            t.titular,
            t.vencimiento,
            t.nombre_tarjeta,
            t.tipo,
            t.activa,
            t.token,
            t.telefono,
            t.ciudad,
            t.postal
        FROM alumno a
        LEFT JOIN tarjetas t ON a.id_alumno = t.id_alumno
        WHERE a.matricula = ? and t.eliminada = false;
    `;

  try {
    const [rows] = await pool.query(query, [matricula]);
    return rows;
  } catch {
    throw new Error("Error al obtener tarjetas del alumno");
  }
}

async function getStudentCardsByMatriculaActive(matricula) {
  const query = `
        SELECT 
            a.id_alumno,
            a.nombre,
            a.matricula,
            t.id AS id_tarjeta,
            t.numero_tarjeta,
            t.titular,
            t.vencimiento,
            t.nombre_tarjeta,
            t.tipo,
            t.activa,
            t.token,
            t.telefono,
            t.ciudad,
            t.postal
        FROM alumno a
        LEFT JOIN tarjetas t ON a.id_alumno = t.id_alumno
        WHERE a.matricula = ? 
          AND t.eliminada = false
          AND t.activa = true
          AND (
            -- Verificar que el vencimiento sea válido (formato MM/YY)
            t.vencimiento IS NOT NULL
            AND STR_TO_DATE(CONCAT('01/', t.vencimiento), '%d/%m/%y') >= LAST_DAY(CURDATE()) + INTERVAL 1 DAY - INTERVAL 1 MONTH
          );
    `;

  try {
    const [rows] = await pool.query(query, [matricula]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function activateStudentCard(id_tarjeta, id_alumno) {
  const disableQuery = `
        UPDATE tarjetas 
        SET activa = false 
        WHERE id_alumno = ?;
    `;

  const activateQuery = `
        UPDATE tarjetas 
        SET activa = true 
        WHERE id = ? AND id_alumno = ?;
    `;

  try {
    await pool.query(disableQuery, [id_alumno]);

    const [result] = await pool.query(activateQuery, [id_tarjeta, id_alumno]);

    return {
      success: true,
      affectedRows: result.affectedRows,
      message: `Tarjeta ${id_tarjeta} activada y demás tarjetas desactivadas`
    };
  } catch (error) {
    throw error;
  }
}


async function deleteStudentCard(id_tarjeta, id_alumno) {
  const query = `
        UPDATE tarjetas 
        SET activa = 0, eliminada = 1 
        WHERE token = ? AND id_alumno = ?;
    `;

  try {
    const [result] = await pool.query(query, [id_tarjeta, id_alumno]);

    if (result.affectedRows === 0) {
      throw new Error('No se encontró la tarjeta o no pertenece al alumno');
    }

    return {
      success: true,
      affectedRows: result.affectedRows,
      message: `Tarjeta ${id_tarjeta} desactivada y marcada como eliminada`
    };
  } catch {
    throw new Error("Error al desactivar la tarjeta");
  }
}

module.exports = {
  createCardForStudent,
  getStudentCardsByMatricula,
  activateStudentCard,
  deleteStudentCard,
  getStudentCardsByMatriculaActive
};