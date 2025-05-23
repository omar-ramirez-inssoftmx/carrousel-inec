
const pool = require('../config/conexionAsync');

async function getPedidosByMatricula(matricula) {
    const checkQuery = 'SELECT * FROM alumno WHERE matricula = ?';
    const [existingAlumno] = await pool.query(checkQuery, [matricula]);

    if (existingAlumno.length < 1) {
        return null;
    } else {
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
        } catch (error) {
            console.error("Error al obtener pedidos por matrícula:", error);
            throw new Error("Error al obtener pedidos por matrícula");
        }
    }
}

async function getPedidosAllMatricula() {
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
    WHERE p.id_cat_estatus = 3
    ;
    `;
   
    try {
        const [result] = await pool.query(query);
         
        if (!result || result.length === 0) {
            console.log("No se encontraron pedidos con matrícula.");
            return [];
        }

        return result;
    } catch (error) {
        console.error("Error al obtener todos los pedidos por matrícula:", error);
        throw new Error("Error al obtener todos los pedidos por matrícula");
    }
}

async function getMyMatricula(matricula) {
   
        const query = `
        SELECT * FROM alumno WHERE matricula = ?;
        `;
        try {
            const [result] = await pool.query(query, [matricula]);
           
            if (result.length < 1) {
                return null;
            } else {
                return result;
            }
        } catch (error) {
            console.error("Error al obtener la matrícula:", error);
            throw new Error("Error al obtener la matrícula");
        }
    
}

async function getMyOpenPay(customer_id) {
    const query = `
    SELECT * FROM alumno WHERE open_pay_id = ?;
    `;

    try {
        const [result] = await pool.query(query, [customer_id]);
       
        if (result.length < 1) {
            return null;
        } else {
            return result[0];
        }
    } catch (error) {
        console.error("Error al obtener la matrícula:", error);
        throw new Error("Error al obtener la matrícula");
    }
}

module.exports = {
    getPedidosByMatricula,
    getMyMatricula,
    getMyOpenPay,
    getPedidosAllMatricula
};

