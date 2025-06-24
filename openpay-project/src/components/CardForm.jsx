import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createCard } from "../api";
import { fetchStudentCards } from '../utils/GeneralMethods';
import { useOpenPayConfig, validateCardData } from '../utils/openPayConfig';
import useStudentStore from '../store/studentStore';
import PlatformLayout from "../layouts/PlatfomLayout";

const CardForm = ({ isEditMode = false, initialCardData = null }) => {
  const { getCurrentStudent } = useStudentStore();
  const navigate = useNavigate();
  const deviceSessionId = useOpenPayConfig();

  const [cardData, setCardData] = useState({
    holder_name: initialCardData?.holder_name || "",
    card_number: initialCardData?.card_number || "",
    expiration_month: initialCardData?.expiration_month || "",
    expiration_year: initialCardData?.expiration_year || "",
    cvv2: "",
    isCard: false,
    nombre_tarjeta: initialCardData?.nombre_tarjeta || ""
  });

  const [formData, setFormData] = useState({
    telefono: initialCardData?.telefono || "",
    ciudad: initialCardData?.ciudad || "",
    postal: initialCardData?.postal || "",
  });

  const mutation = useMutation({
    mutationFn: (data) => createCard(
      data.card_number,
      data.holder_name,
      data.expiration_year,
      data.expiration_month,
      data.cvv2,
      data.device_session_id,
      data.customer_id,
      data.id_alumno,
      data.nombre_tarjeta,
      data.telefono,
      data.ciudad,
      data.postal
    ),
    onSuccess: async () => {
      const currentStudent = getCurrentStudent();
      if (!currentStudent?.matricula) {
        alert("Matrícula no disponible");
        return;
      }

      try {
        const tarjetas = await fetchStudentCards(
          currentStudent.open_pay_id,
          currentStudent.matricula
        );

        navigate("/dashboard/ListCard", {
          state: { tarjetas }
        });
      } catch (error) {
        console.error("Error al obtener tarjetas:", error);
        alert("No se pudieron cargar las tarjetas.");
      }
    },
    onError: (error) => {
      alert("Error: " + (error.response?.data?.message || "Intente de nuevo"));
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in cardData) {
      setCardData({
        ...cardData,
        [name]: type === 'checkbox' ? checked : value
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const validationError = validateCardData(cardData, formData);
    if (validationError) {
      alert(validationError);
      return;
    }

    if (!deviceSessionId) {
      alert("Error de configuración. Intente de nuevo.");
      return;
    }

    const currentStudent = getCurrentStudent();
    if (!currentStudent) {
      alert("No hay estudiante seleccionado");
      return;
    }

    mutation.mutate({
      card_number: cardData.card_number,
      holder_name: cardData.holder_name,
      expiration_year: cardData.expiration_year,
      expiration_month: cardData.expiration_month,
      cvv2: cardData.cvv2,
      device_session_id: deviceSessionId,
      customer_id: currentStudent.open_pay_id,
      id_alumno: currentStudent.id_alumno,
      nombre_tarjeta: cardData.nombre_tarjeta,
      telefono: formData.telefono,
      ciudad: formData.ciudad,
      postal: formData.postal
    });
  };

  return (
    <PlatformLayout>
      <section className="d-flex justify-content-center align-items-center px-3 pb-2 border-bottom">
        <button
          onClick={() => navigate("/")}
          className="me-4 btn btn-link text-decoration-none d-flex align-items-center"
        >
          <h3 className="m-0 ms-2"><b>Tarjetas</b></h3>
        </button>
        <h5 className="text-secondary m-0">
          {isEditMode ? "Editar tarjeta" : "Selecciona una tarjeta para ver su detalle"}
        </h5>
      </section>

      <section className="d-flex flex-column gap32 pt-4 pb-2 px-3 border-bottom">
        <div className="d-flex flex-column mt-3 mb-2">
          <label htmlFor="nombre_tarjeta" className="mb-1"><strong>Nombre de la tarjeta</strong></label>
          <input
            name="nombre_tarjeta"
            placeholder="Ingresa nombre del metodo de pago"
            className="inputCustom p-3"
            value={cardData.nombre_tarjeta}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex flex-column mt-3 mb-2">
          <label htmlFor="holder_name" className="mb-1"><strong>Nombre del dueño de la tarjeta</strong></label>
          <input
            name="holder_name"
            placeholder="Ingresa nombre completo del dueño"
            className="inputCustom p-3"
            value={cardData.holder_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex flex-column mt-3 mb-2">
          <label htmlFor="card_number" className="mb-1"><strong>Números de la tarjeta</strong></label>
          <input
            name="card_number"
            placeholder="Ingresa los 16 dígitos de tu tarjeta"
            className="inputCustom p-3"
            value={cardData.card_number}
            onChange={handleInputChange}
            maxLength="16"
          />
        </div>

        <div className="d-flex flex-wrap gap-3">
          <div className="flex-fill d-flex flex-column mt-3 mb-2">
            <label htmlFor="expiration_month" className="mb-1"><strong>Fecha de vencimiento</strong></label>
            <div className="d-flex gap-2">
              <input
                name="expiration_month"
                placeholder="MM"
                className="inputCustom p-3"
                value={cardData.expiration_month}
                onChange={handleInputChange}
                maxLength="2"
              />
              <input
                name="expiration_year"
                placeholder="YY"
                className="inputCustom p-3"
                value={cardData.expiration_year}
                onChange={handleInputChange}
                maxLength="2"
              />
            </div>
          </div>

          <div className="flex-fill d-flex flex-column mt-3 mb-2">
            <label htmlFor="cvv2" className="mb-1"><strong>CVV</strong></label>
            <input
              name="cvv2"
              placeholder="Ingresa el CVV de tu tarjeta"
              className="inputCustom p-3"
              value={cardData.cvv2}
              onChange={handleInputChange}
              maxLength="4"
            />
          </div>
        </div>

        <div className="d-flex flex-column mt-3 mb-2">
          <label htmlFor="telefono" className="mb-1"><strong>Teléfono</strong></label>
          <input
            name="telefono"
            placeholder="Ingresa tu teléfono"
            className="inputCustom p-3"
            value={formData.telefono}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex flex-column mt-3 mb-2">
          <label htmlFor="ciudad" className="mb-1"><strong>Ciudad</strong></label>
          <input
            name="ciudad"
            placeholder="Ingresa tu ciudad"
            className="inputCustom p-3"
            value={formData.ciudad}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex flex-column mt-3 mb-2">
          <label htmlFor="postal" className="mb-1"><strong>Código postal</strong></label>
          <input
            name="postal"
            placeholder="Ingresa tu código postal"
            className="inputCustom p-3"
            value={formData.postal}
            onChange={handleInputChange}
          />
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
            onClick={handleSubmit}
            disabled={mutation.isLoading}
          >
            <h5 className="m-0">
              <b className="secontFont text-light">
                {mutation.isLoading ? "Guardando..." : isEditMode ? "Actualizar tarjeta" : "Crear tarjeta"}
              </b>
            </h5>
          </button>
        </div>
      </section>
    </PlatformLayout>
  );
};

export default CardForm; 