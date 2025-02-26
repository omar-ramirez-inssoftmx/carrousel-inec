const pool = require('../config/conexionAsync');

async function getAllCustomers() {
    const [rows] = await pool.query('SELECT * FROM customers');
    return rows;
}

async function getCustomerById(id) {
    const [rows] = await pool.query('SELECT * FROM customers WHERE id = ?', [id]);
    return rows[0] || null;
}

async function createCustomer(name, email) {
    const [result] = await pool.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email]);
    return { id: result.insertId, name, email };
}


async function getStudentPaymentDetails(matricula) {
    const query = `
        SELECT 
            a.matricula, 
            c.nombre_carrera, 
            g.nombre_generacion, 
            cat.nombre_categoria, 
            tp.descripcion, 
            tp.precio, 
            tp.fecha_inicio, 
            tp.fecha_fin
        FROM alumnos a
        JOIN carreras c ON a.id_carrera = c.id_carrera
        JOIN generaciones g ON a.id_generacion = g.id_generacion
        JOIN tabulador_de_pago tp ON a.id_carrera = tp.id_carrera 
            AND a.id_generacion = tp.id_generacion
        JOIN categorias cat ON tp.id_categoria = cat.id_categoria
        WHERE a.matricula = ?;
    `;

    const [rows] = await pool.query(query, [matricula]);
    return rows.length ? rows : null;
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    getStudentPaymentDetails
};