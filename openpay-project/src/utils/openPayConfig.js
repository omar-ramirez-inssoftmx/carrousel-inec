import { useEffect, useState } from 'react';

export const useOpenPayConfig = () => {
  const [deviceSessionId, setDeviceSessionId] = useState("");

  useEffect(() => {
    if (window.OpenPay) {
      window.OpenPay.setId(process.env.REACT_APP_OPENPAY_ID);
      window.OpenPay.setApiKey(process.env.REACT_APP_OPENPAY_API_KEY);
      window.OpenPay.setSandboxMode(process.env.REACT_APP_OPENPAY_SANDBOX_MODE === 'true');
      setDeviceSessionId(window.OpenPay.deviceData.setup());
    }
  }, []);

  return deviceSessionId;
};

// Función utilitaria común para obtener pago actual
export const getPagoActual = (pedido) => {
  return pedido.pago || "0";
};

// Función para validar campos de tarjeta
export const validateCardData = (cardData, formData) => {
  const requiredCardFields = ['holder_name', 'card_number', 'expiration_month', 'expiration_year', 'cvv2'];
  const requiredFormFields = ['telefono', 'ciudad', 'postal'];

  const missingCardFields = requiredCardFields.filter(field => !cardData[field]);
  const missingFormFields = requiredFormFields.filter(field => !formData[field]);

  if (missingCardFields.length > 0 || missingFormFields.length > 0) {
    return "Todos los campos son obligatorios";
  }

  return null;
}; 