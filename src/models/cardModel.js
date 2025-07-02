const pool = require('../config/conexionAsync');

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
        console.error("Error al guardar la tarjeta:", error);
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
    } catch (error) {
        console.error("Error al obtener tarjetas del alumno:", error);
        throw error;
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
        console.error("Error al obtener tarjetas del alumno:", error);
        throw error;
    }
}

async function activateStudentCard(id_tarjeta, id_alumno) {
    // Primero desactivamos todas las tarjetas del alumno
    const disableQuery = `
        UPDATE tarjetas 
        SET activa = false 
        WHERE id_alumno = ?;
    `;
    
    // Luego activamos la tarjeta específica
    const activateQuery = `
        UPDATE tarjetas 
        SET activa = true 
        WHERE id = ? AND id_alumno = ?;
    `;

    try {
        // Iniciamos una transacción para asegurar la atomicidad
        await pool.query('START TRANSACTION');
        
        // Desactivamos todas las tarjetas del alumno
        await pool.query(disableQuery, [id_alumno]);
        
        // Activamos la tarjeta específica
        const [result] = await pool.query(activateQuery, [id_tarjeta, id_alumno]);
        
        // Confirmamos la transacción
        await pool.query('COMMIT');
        
        return { 
            success: true,
            affectedRows: result.affectedRows,
            message: `Tarjeta ${id_tarjeta} activada y demás tarjetas desactivadas`
        };
    } catch (error) {
        // Si hay error, hacemos rollback
        await pool.query('ROLLBACK');
        console.error("Error al activar/desactivar tarjetas:", error);
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
    } catch (error) {
        console.error("Error en deleteStudentCard:", error);
        throw error;
    }
}

module.exports = {
    createCardForStudent,
    getStudentCardsByMatricula,
    activateStudentCard,
    deleteStudentCard,
    getStudentCardsByMatriculaActive
};