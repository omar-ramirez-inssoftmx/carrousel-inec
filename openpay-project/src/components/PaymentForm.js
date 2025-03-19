import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const PaymentForm = () => {
  const [cardData, setCardData] = useState({
    holder_name: "",
    card_number: "",
    expiration_month: "",
    expiration_year: "",
    cvv2: "",
  });

  const [deviceSessionId, setDeviceSessionId] = useState("");

  useEffect(() => {
    window.OpenPay.setId("TU_MERCHANT_ID"); // Reemplázalo
    window.OpenPay.setApiKey("TU_PUBLIC_API_KEY"); // Reemplázalo
    window.OpenPay.setSandboxMode(true);
    setDeviceSessionId(window.OpenPay.deviceData.setup());
  }, []);

  // Mutación para procesar el pago
  const mutation = useMutation({
    mutationFn: async (token) => {
      const response = await axios.post("http://localhost:3001/charge", {
        token,
        amount: 100.0,
        deviceSessionId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Pago exitoso:", data);
      alert("Pago realizado con éxito");
    },
    onError: (error) => {
      console.error("Error en el pago:", error);
      alert("Error al procesar el pago");
    },
  });

  const handlePayment = () => {
    window.OpenPay.token.create(cardData, (response) => {
      console.log("Token generado:", response.data.id);
      mutation.mutate(response.data.id); // Enviar el token a la mutación
    }, (error) => {
      console.error("Error al generar token:", error);
      alert("Error al generar el token");
    });
  };

  return (
    <div>
      <input type="text" placeholder="Nombre del titular" onChange={(e) => setCardData({...cardData, holder_name: e.target.value})} />
      <input type="text" placeholder="Número de tarjeta" onChange={(e) => setCardData({...cardData, card_number: e.target.value})} />
      <input type="text" placeholder="Mes de expiración" onChange={(e) => setCardData({...cardData, expiration_month: e.target.value})} />
      <input type="text" placeholder="Año de expiración" onChange={(e) => setCardData({...cardData, expiration_year: e.target.value})} />
      <input type="text" placeholder="CVV" onChange={(e) => setCardData({...cardData, cvv2: e.target.value})} />
      <button onClick={handlePayment} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Procesando..." : "Pagar"}
      </button>
    </div>
  );
};

export default PaymentForm;
