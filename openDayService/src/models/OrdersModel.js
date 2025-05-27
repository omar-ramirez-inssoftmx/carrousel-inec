const pool = require('../config/conexionAsync');


async function getOrdersStudent(matricula) {

    console.log("matricula ===>", matricula)

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
    JOIN productos pr ON p.sku = pr.sku
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
    return [{month_display: 'Todos', month_value: 'Todos'}, ...months];
  };

module.exports = {
    getOrdersStudent,
    getAvailableMonths
};