const { configuracionGeneral } = require('../models/ConfiguracionGeneralModel copy');

const aviso = async (req, res, next) => {
  try {
    const aviso = await configuracionGeneral("aviso");
    if (!aviso) {
      return res.status(404).json({ error: "Aviso de privacidad no encontrado" });
    }
    return res.status(200).json(aviso);
  } catch (error) {
    console.error("Error aviso:", error);
    return res.status(500).json({ error: error.message });
  }
};

const terminos = async (req, res, next) => {
  try {
    const terminos = await configuracionGeneral("terminos");
    if (!terminos) {
      return res.status(404).json({ error: "Términos y condiciones no encontrados" });
    }
    return res.status(200).json(terminos);
  } catch (error) {
    console.error("Error terminos:", error);
    return res.status(500).json({ error: error.message });
  }
};

const contacto = async (req, res, next) => {
  try {
    const contacto = await configuracionGeneral("contacto");
    if (!contacto) {
      return res.status(404).json({ error: "Información de contacto no encontrada" });
    }
    return res.status(200).json(contacto);
  } catch (error) {
    console.error("Error contacto:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  aviso,
  terminos,
  contacto
};