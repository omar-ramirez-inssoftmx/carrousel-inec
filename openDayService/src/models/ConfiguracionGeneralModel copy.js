const pool = require('../config/conexionAsync');


async function configuracionGeneral(clave) {
  const query = `
  SELECT * FROM configuracion_general WHERE nombre = ?;
  `;

  try {
      const [result] = await pool.query(query, [clave]);
     
      if (result.length < 1) {
          return null;
      } else {
          return result[0];
      }
  } catch (error) {
      console.error("Error al obtener configuracionGeneral:", error);
      throw new Error("Error al obtener configuracionGeneral");
  }
}

module.exports = {
  configuracionGeneral
};