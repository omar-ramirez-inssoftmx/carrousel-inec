const pool = require('../config/conexionAsync');

// Función para obtener la expresión CRON de la base de datos update estatus
const obtenerExpresionCronUpdateStatus = async () => {
    try {
      const [rows] = await pool.query(
        "SELECT expresion_cron FROM configuracion_cron WHERE nombre = 'cron estatus' LIMIT 1"
      );
      
      if (rows.length > 0) {
        return rows[0].expresion_cron;
      } else {
        console.warn("No se encontró configuración CRON, usando '*/5 * * * *' por defecto.");
        return "*/5 * * * *"; // Valor por defecto
      }
    } catch (error) {
      console.error("Error obteniendo la expresión CRON:", error);
      return "*/5 * * * *"; // Valor por defecto en caso de error
    }
};


// Función para obtener la expresión CRON de la base de datos updare recargo
const obtenerExpresionCronRecargos = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT expresion_cron FROM configuracion_cron WHERE nombre = 'cron recargo' LIMIT 1"
    );
    
    if (rows.length > 0) {
      return rows[0].expresion_cron;
    } else {
      console.warn("No se encontró configuración CRON, usando '*/5 * * * *' por defecto.");
      return "*/5 * * * *"; // Valor por defecto
    }
  } catch (error) {
    console.error("Error obteniendo la expresión CRON:", error);
    return "*/5 * * * *"; // Valor por defecto en caso de error
  }
};


async function updateRecargo(id, pago, fecha) {
    
    
  const updateQuery = `
      UPDATE pedidos
      SET 
          pago = ?,
          fecha_vigencia_pago = ?
      WHERE id_pedido = ?`;
  
  try {
      // Ejecutar la consulta
      const [result] = await pool.query(updateQuery, [pago,fecha, id]);
      console.log('Registros actualizados recargo:', result.affectedRows);
      return result;
  } catch (error) {
      console.error('Error al actualizar los pedidos recargo:', error);
      throw error;
  }
}

module.exports = {
  obtenerExpresionCronUpdateStatus,
  obtenerExpresionCronRecargos,
  updateRecargo
};