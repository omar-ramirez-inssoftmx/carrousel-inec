const pool = require('../config/conexionAsync');

async function createProduct(producto, precio_base, concepto, vencimiento) {
    // Verificar si el concepto ya existe
    const checkConceptQuery = 'SELECT sku FROM productos WHERE concepto = ?';
    const [existingProducts] = await pool.query(checkConceptQuery, [concepto]);

    let sku;
    if (existingProducts.length < 1) {
        // Si el concepto no existe, usar un SKU proporcionado o generar uno
        sku = await generateUniqueSku(); // O puedes usar un SKU proporcionado si lo prefieres

          // Insertar el nuevo producto
            const insertQuery = `
            INSERT INTO productos (sku, producto, precio_base, concepto, vencimiento)
            VALUES (?, ?, ?, ?, ?);
        `;

        try {
            const [result] = await pool.query(insertQuery, [sku, producto, precio_base, concepto, vencimiento]);
            return result.sku
            /*return { 
                id_producto: result.insertId, 
                sku, 
                producto, 
                precio_base, 
                concepto, 
                vencimiento 
            };*/
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }else{
        const skuExist = existingProducts[0].sku;
        return skuExist;
    }
  
}

// Función para generar un SKU único de 10 dígitos
// Función para generar un SKU único que quepa en un INT
async function generateUniqueSku() {
    let sku;
    let isUnique = false;

    while (!isUnique) {
        // Generar un número aleatorio que quepa en un INT
        sku = Math.floor(Math.random() * 2147483648);

        // Verificar si el SKU ya existe en la base de datos
        const checkSkuQuery = 'SELECT sku FROM productos WHERE sku = ?';
        const [existingSku] = await pool.query(checkSkuQuery, [sku]);

        if (existingSku.length === 0) {
            isUnique = true; // El SKU es único
        }
    }

    return sku;
}



async function createAlumno(matricula, nombre, apellido_paterno, apellido_materno, email, celular, openPayId) {
    // Verificar si el alumno ya existe por matrícula
    const checkQuery = 'SELECT id_alumno FROM alumno WHERE matricula = ?';
    const [existingAlumno] = await pool.query(checkQuery, [matricula]);

    console.log("existingAlumno ", existingAlumno)

    if (existingAlumno.length < 1) {

        // Si el alumno no existe, insertarlo
        const insertQuery = `
            INSERT INTO alumno (matricula, nombre, apellido_paterno, apellido_materno, email, celular, open_pay_id, fecha_alta, fecha_modificacion)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
        `;

        try {
            const [result] = await pool.query(insertQuery, [matricula, nombre, apellido_paterno, apellido_materno, email, celular,openPayId]);
            return result.insertId;
            /*return { 
                id_alumno: result.insertId, 
                matricula, 
                nombre, 
                apellido_paterno, 
                apellido_materno, 
                email, 
                celular 
            };*/
        } catch (error) {
            console.error("Error al crear el alumno:", error);
            throw error;
        }

    }else{
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
    pago_descuento, 
    fecha_vigenica_descuento, 
    pago, 
    fecha_vigencia_pago, 
    pago_recargo, 
    fecha_vigencia_recargo,
    link_de_pago,
    concepto,
    transaccion_Id
) {
    console.log("concepto ", concepto)
    const query = `
        INSERT INTO pedidos (
            id_alumno, 
            identificador_pago, 
            identificador_pedido, 
            sku, 
            id_cat_estatus, 
            pago_descuento, 
            fecha_vigenica_descuento, 
            pago, 
            fecha_vigencia_pago, 
            pago_recargo, 
            fecha_vigencia_recargo, 
            link_de_pago,
            concepto,
            transaccion_Id,
            fecha_carga
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,NOW());
    `;

    try {
        const [result] = await pool.query(query, [
            id_alumno, 
            identificador_pago, 
            identificador_pedido, 
            sku, 
            id_cat_estatus, 
            pago_descuento, 
            fecha_vigenica_descuento, 
            pago, 
            fecha_vigencia_pago, 
            pago_recargo, 
            fecha_vigencia_recargo,
            link_de_pago,
            concepto,
            transaccion_Id
        ]);

        return { 
            id_pedido: result.insertId, 
            id_alumno, 
            identificador_pago, 
            identificador_pedido, 
            sku, 
            id_cat_estatus, 
            pago_descuento, 
            fecha_vigenica_descuento, 
            pago, 
            fecha_vigencia_pago, 
            pago_recargo, 
            fecha_vigencia_recargo,
            link_de_pago,
            concepto,
            transaccion_Id
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

async function updatePedidosTransaccion(transaccion_Id) {

    console.log("transaccion_Id", transaccion_Id)
    
    const updateQuery = `
        UPDATE pedidos
        SET 
            identificador_pago = ?,
            id_cat_estatus = ?,
            link_de_pago = ?,
            transaccion_Id = ?
        WHERE transaccion_Id = ?`;  // Corregido: eliminada la coma extra
    
    try {
        // Ejecutar la consulta
        const [result] = await pool.query(updateQuery, [null, 3, null, null, transaccion_Id]);
        console.log('Registros actualizados cancelar:', result.affectedRows);
        return result;
    } catch (error) {
        console.error('Error al cancelar update los pedidos:', error);
        throw error;
    }
}

async function updateStatus(id, status, pedido) {
    console.log("updateStatus ===>", pedido.operation_date);

    // Determinar si es un pago completado
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
    createProduct,
    createAlumno,
    createPedido,
    updatePedidos,
    getTempleteEmail,
    updateStatus,
    updatePedidosTransaccion
};