const pool = require('../config/conexionAsync');

// Función para obtener la expresión CRON de la base de datos
const obtenerExpresionCron = async () => {
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
module.exports = {
    obtenerExpresionCron
};