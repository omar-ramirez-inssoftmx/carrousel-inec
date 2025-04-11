const Openpay = require('openpay');
const axios = require('axios');
const { createCardForStudent, getStudentCardsByMatricula, activateStudentCard, deleteStudentCard, getStudentCardsByMatriculaActive } = require('../models/cardModel');
// Configuración de Openpay
const openpay = new Openpay(process.env.OPENPAY_MERCHANT_ID, process.env.OPENPAY_PRIVATE_KEY, process.env.OPENPAY_PRIVATE_TYPR);


const createCard = async (req, res) => {
  const { card_number, holder_name, expiration_year, expiration_month, cvv2, device_session_id, customer_id, id_alumno, nombre_tarjeta, telefono, ciudad, postal } = req.body;

  const cardRequest = {
    card_number,
    holder_name, 
    expiration_year,
    expiration_month,
    cvv2,
    device_session_id
  };

  openpay.customers.cards.create(customer_id, cardRequest, async function(error, card) {
    try {
      if (error) {
        console.error("Error al crear tarjeta del alumno:", error);
        return res.status(400).json({ error: error.description });
      }
      
      const vencimiento = expiration_month + "/" + expiration_year;
      // Agregar await para esperar la resolución de la promesa
      const saveCard = await createCardForStudent(id_alumno, card.card_number, card.id, nombre_tarjeta, card.brand, holder_name, vencimiento, telefono, ciudad, postal);
      console.log("saveCard ", saveCard);

      // Devolver ambos objetos si necesitas la información de la tarjeta guardada
      res.json({ openpayCard: card, savedCard: saveCard });
      
    } catch (error) {
      console.error("Error al guardar la tarjeta en la base de datos:", error);
      return res.status(500).json({ error: "Error al guardar la tarjeta" });
    }
  });
};


const listCard = async (req, res) => {
  const { customer_id, matricula } = req.body;

  try {
      // Esperamos a que la promesa se resuelva
      const saveCard = await getStudentCardsByMatricula(matricula);      
      
      // Enviar la respuesta correctamente con los datos
      res.json(saveCard);
  } catch (error) {
      console.error("Error al obtener las tarjetas:", error);
      res.status(500).json({ error: "Error al obtener las tarjetas del alumno" });
  }
};

const activeCard = async (req, res) => {
  const { customer_id, matricula } = req.body;

  try {
      // Esperamos a que la promesa se resuelva
      const saveCard = await getStudentCardsByMatriculaActive(matricula);      
      
      // Enviar la respuesta correctamente con los datos
      res.json(saveCard);
  } catch (error) {
      console.error("Error al obtener las tarjetas:", error);
      res.status(500).json({ error: "Error al obtener las tarjetas del alumno" });
  }
};

const activateCard = async (req, res) => {

  const { id_tarjeta, id_alumno } = req.body;

  try {
   
    const result = await activateStudentCard(id_tarjeta, id_alumno);
    res.json(result);

  } catch (error) {
      console.error("Error al activar la tarjeta:", error);
      res.status(500).json({ error: "Error al activar la tarjeta" });
  }
};


const deleteCard = async (req, res) => {
  const { id_tarjeta, customer_id, id_alumno } = req.body;

  // Validación de parámetros
  if (!id_tarjeta || !customer_id || !id_alumno) {
    return res.status(400).json({ 
      error: "Parámetros faltantes",
      required: ["id_tarjeta", "customer_id", "id_alumno"]
    });
  }

  try {
    // Eliminar en Openpay (API asíncrona)
    const openpayDelete = await new Promise((resolve, reject) => {
      openpay.customers.cards.delete(customer_id, id_tarjeta, (error) => {
        if (error) return reject(error);
        resolve(true);
      });
    });

    // Eliminar en nuestra base de datos
    const dbResult = await deleteStudentCard(id_tarjeta, id_alumno);

    res.json({
      success: true,
      message: "Tarjeta eliminada exitosamente",
      systems: {
        openpay: "success",
        database: "success"
      },
      details: dbResult
    });

  } catch (error) {
    console.error("Error en deleteCard:", error);
    
    // Determinar dónde falló
    const errorResponse = {
      success: false,
      error: error.description || error.message,
      systems: {
        openpay: error.description ? "failed" : "success",
        database: error.description ? "not attempted" : "failed"
      }
    };

    const statusCode = error.description ? 400 : 500;
    res.status(statusCode).json(errorResponse);
  }
};



module.exports = {  
  createCard,
  listCard,
  activateCard,
  deleteCard,
  activeCard
};
