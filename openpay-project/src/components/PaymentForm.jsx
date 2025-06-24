import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { pay } from '../api';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchStudentCardsActive } from '../utils/GeneralMethods';
import { useOpenPayConfig, getPagoActual } from '../utils/openPayConfig';

const PaymentForm = ({ students, totalPagos, pedidosSeleccionados, getVigencia, pedidoMasViejoSeleccionado, onHide }) => {
  // Estados
  const [cardData, setCardData] = useState({
    holder_name: "",
    card_number: "",
    expiration_month: "",
    expiration_year: "",
    cvv2: "",
    isCard: false,
    nombre_tarjeta: ""
  });

  const [formData, setFormData] = useState({
    telefono: "",
    ciudad: "",
    postal: "",
  });

  const deviceSessionId = useOpenPayConfig();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [loadingCards, setLoadingCards] = useState(true);

  const navigate = useNavigate();

  // Cargar tarjetas al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {

        // Obtener tarjetas activas
        if (students[0]?.open_pay_id && students[0]?.matricula) {
          const tarjetas = await fetchStudentCardsActive(
            students[0].open_pay_id,
            students[0].matricula
          );

          if (tarjetas.length > 0) {
            setActiveCard(tarjetas[0]);
            setFormData({
              telefono: tarjetas[0].telefono || "",
              ciudad: tarjetas[0].ciudad || "",
              postal: tarjetas[0].postal || "",
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar tarjetas:", error);
      } finally {
        setLoadingCards(false);
      }
    };

    if (deviceSessionId) {
      loadData();
    }
  }, [students, deviceSessionId]);

  // Mutación para procesar el pago
  const mutation = useMutation({
    mutationFn: async ({ openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados, deviceSessionId, tokenPago, tokenGuardar, telefono, ciudad, postal, idAlumno, nombreTarjeta }) => {
      const response = await pay(openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados, deviceSessionId, tokenPago, tokenGuardar, cardData.isCard, telefono, ciudad, postal, idAlumno, nombreTarjeta);
      return response;
    },
    onSuccess: (response) => {
      console.log("Pago exitoso:", response.charge);
      setPaymentResponse(response);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      console.error("Error en el pago:", error);
      alert("Error al procesar el pago");
    },
  });

  // Función para manejar el cierre del modal
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  // Función para generar tokens
  const generarTokenOpenPay = (cardData) => {
    return new Promise((resolve, reject) => {
      window.OpenPay.token.create(cardData,
        (response) => {
          if (response.data && response.data.id) {
            resolve(response.data.id);
          } else {
            reject({
              error_code: 'invalid_response',
              description: 'La respuesta de OpenPay no contiene token válido',
              http_code: 500
            });
          }
        },
        (error) => {
          // Extrae el objeto de error completo que envía OpenPay
          const errorData = error.data || error;
          reject({
            error_code: errorData.error_code,
            description: errorData.description,
            http_code: errorData.http_code,
            request_id: errorData.request_id,
            category: errorData.category,
            raw: errorData // Mantenemos el error original por si acaso
          });
        }
      );
    });
  };
  // Función para manejar el pago
  const handlePayment = async () => {
    try {
      // Validaciones iniciales
      if (!activeCard && (!cardData.card_number || !cardData.cvv2 || !cardData.expiration_month || !cardData.expiration_year)) {
        alert("Por favor complete todos los datos de la tarjeta");
        return;
      }

      if (!formData.telefono || !formData.ciudad || !formData.postal) {
        alert("Por favor complete todos los datos personales");
        return;
      }

      let tokenPago, tokenGuardar = null;

      if (activeCard) {
        // Usar la tarjeta activa
        tokenPago = activeCard.token;
      } else {
        // Generar tokens para nueva tarjeta
        try {
          tokenPago = await generarTokenOpenPay(cardData);

        } catch (error) {
          const errorMap = {
            2001: "El número de tarjeta es inválido (Error 2001)",
            2005: "La fecha de expiración de tu tarjeta ha caducado. Por favor usa una tarjeta vigente (Error 2005)",
            2006: "El mes de expiración es inválido (Error 2006)",
            3001: "Tarjeta declinada por el banco emisor (Error 3001)",
            default: `Error al procesar el pago: ${error.description || 'Contacta con soporte'}`
          };

          const userMessage = errorMap[error.error_code] || errorMap.default;

          console.error("Error completo de OpenPay:", {
            code: error.error_code,
            httpStatus: error.http_code,
            description: error.description,
            requestId: error.request_id,
            category: error.category,
            rawError: error.raw
          });

          alert(userMessage);
          return;
        }


      }

      // Preparar datos para la mutación
      const openPayId = students[0].open_pay_id;
      const description = "Pago de pedidos seleccionados";
      const totalAmount = totalPagos;
      const pedidoIds = pedidosSeleccionados.map((pedido) => pedido.id_pedido);
      const fechaVigencia = getVigencia(pedidoMasViejoSeleccionado);
      const pedidosSeleccionadosData = pedidosSeleccionados;
      const orderId = students[0].matricula;
      const telefono = formData.telefono;
      const ciudad = formData.ciudad;
      const postal = formData.postal;
      const idAlumno = students[0].id_alumno;
      const nombreTarjeta = cardData.nombre_tarjeta;

      console.log("cardData  ", cardData)
      console.log("nombreTarjeta ", nombreTarjeta)

      // Ejecutar la mutación
      mutation.mutate({
        openPayId,
        description,
        orderId,
        totalAmount,
        pedidoIds,
        fechaVigencia,
        pedidosSeleccionados: pedidosSeleccionadosData,
        deviceSessionId,
        tokenPago,
        tokenGuardar,
        saveCard: cardData.isCard,
        telefono,
        ciudad,
        postal,
        idAlumno,
        nombreTarjeta
      });

    } catch (error) {
      console.error("Error general:", error);
      alert("Ocurrió un error inesperado. Por favor intenta nuevamente.");
    }
  };
  // Función para manejar cambios en los campos del formulario
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

  // Función para permitir cambiar de tarjeta
  const handleUseDifferentCard = () => {
    setActiveCard(null);
    setCardData({
      holder_name: "",
      card_number: "",
      expiration_month: "",
      expiration_year: "",
      cvv2: "",
      isCard: false,
      nombre_tarjeta: ""
    });

    setFormData({
      telefono: "",
      ciudad: "",
      postal: "",
    });
  };

  // Función getPagoActual ya importada de utils

  const getNombreMes = (numeroMes) => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return meses[numeroMes - 1] || "";
  };

  // Render condicional de la sección de pago
  const renderPaymentSection = () => {
    if (loadingCards) {
      return (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando información de pago...</p>
        </div>
      );
    }

    if (activeCard) {
      return (
        <div className="border rounded p-4 mb-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="m-0"><strong>Información de pago guardada</strong></h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={handleUseDifferentCard}
            >
              Usar otro método
            </button>
          </div>

          {/* Sección de Tarjeta */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p className="m-0"><strong>{activeCard.nombre_tarjeta}</strong></p>
              <p className="m-0 text-muted">•••• {activeCard.numero_tarjeta?.slice(-4)}</p>
              <p className="m-0 text-muted">Vence: {activeCard.vencimiento}</p>
            </div>
            <img
              src={activeCard.tipo?.toLowerCase() === "visa" ? "/visa.png" : "/mastercard.png"}
              alt={activeCard.tipo}
              style={{ width: "50px" }}
            />
          </div>

          {/* Sección de Datos Personales */}
          <div className="row mt-3">
            <div className="col-12 col-md-6 mb-2">
              <p className="m-0"><strong>Teléfono:</strong></p>
              <p className="m-0 text-muted">{formData.telefono || "No proporcionado"}</p>
            </div>

            <div className="col-12 col-md-6 mb-2">
              <p className="m-0"><strong>Ciudad:</strong></p>
              <p className="m-0 text-muted">{formData.ciudad || "No proporcionada"}</p>
            </div>

            <div className="col-12 col-md-6 mb-2">
              <p className="m-0"><strong>Código postal:</strong></p>
              <p className="m-0 text-muted">{formData.postal || "No proporcionado"}</p>
            </div>
          </div>
        </div>
      );
    }

    // Formulario completo cuando no hay tarjeta guardada
    return (
      <div className="border rounded p-4 mb-4 bg-light">
        <h5 className="mb-4"><strong>Información de pago</strong></h5>

        {/* Sección de Tarjeta */}
        <div className="row mb-4">
          <div className="col-12 mb-3">
            <label htmlFor="nombre_tarjeta" className="form-label"><strong>Nombre de la tarjeta</strong></label>
            <input
              type="text"
              className="form-control"
              name="nombre_tarjeta"
              value={cardData.nombre_tarjeta}
              onChange={handleInputChange}
              placeholder="Nombre de la tarjeta"
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="holder_name" className="form-label"><strong>Nombre del titular</strong></label>
            <input
              type="text"
              className="form-control"
              name="holder_name"
              value={cardData.holder_name}
              onChange={handleInputChange}
              placeholder="Como aparece en la tarjeta"
            />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="card_number" className="form-label"><strong>Número de tarjeta</strong></label>
            <input
              type="text"
              className="form-control"
              name="card_number"
              value={cardData.card_number}
              onChange={handleInputChange}
              placeholder="0000 0000 0000 0000"
              maxLength="16"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label"><strong>Fecha de expiración</strong></label>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  name="expiration_month"
                  value={cardData.expiration_month}
                  onChange={handleInputChange}
                  placeholder="MM"
                  maxLength="2"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  name="expiration_year"
                  value={cardData.expiration_year}
                  onChange={handleInputChange}
                  placeholder="AA"
                  maxLength="2"
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="cvv2" className="form-label"><strong>Código de seguridad</strong></label>
            <input
              type="text"
              className="form-control"
              name="cvv2"
              value={cardData.cvv2}
              onChange={handleInputChange}
              placeholder="CVC"
              maxLength="4"
            />
          </div>
        </div>

        {/* Sección de Datos Personales */}
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="telefono" className="form-label"><strong>Teléfono celular</strong></label>
            <input
              type="tel"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="10 dígitos"
            />
          </div>

          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="ciudad" className="form-label"><strong>Ciudad</strong></label>
            <select
              className="form-select"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
            >
              <option value="">Selecciona tu ciudad</option>
              <option value="Ciudad de México">Ciudad de México</option>
              <option value="Monterrey">Monterrey</option>
              <option value="Guadalajara">Guadalajara</option>
            </select>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="postal" className="form-label"><strong>Código postal</strong></label>
            <input
              type="text"
              className="form-control"
              name="postal"
              value={formData.postal}
              onChange={handleInputChange}
              placeholder="5 dígitos"
            />
          </div>

          <div className="col-12 col-md-6 mb-3 d-flex align-items-end">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isCard"
                checked={cardData.isCard}
                onChange={handleInputChange}
                id="saveCardCheck"
              />
              <label className="form-check-label" htmlFor="saveCardCheck">
                <strong>Guardar tarjeta para futuros pagos</strong>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-wrap justify-content-center position-relative">
      <section className="flex-fill bg-white pt-5 pb-4">
        <div className="px-1 px-md-3 px-lg-5">
          <div className="mb-4">
            <h3 className="m-0"><strong>Método de pago</strong></h3>
            <p className="text-secondary m-0">
              {activeCard ? "Estás usando tu método de pago guardado" : "Completa la información de pago"}
            </p>
          </div>

          {renderPaymentSection()}
        </div>
      </section>

      <section className="flex-fill backgroundMain pt-5 pb-3 minHeight90vhLg d-flex flex-column justify-content-between" style={{ maxWidth: '400px' }}>
        <div>
          <div className="mt-3 border rounded px-3 py-4 bg-white">
            <div className="d-flex flex-column">
              {pedidosSeleccionados.map((pedido) => (
                <div key={pedido.id_pedido} className="d-flex justify-content-between mt-3">
                  <h6 className="m-0"><strong>Mensualidad {getNombreMes(pedido.mes)}</strong></h6>
                  <div className="d-flex align-items-center">
                    <strong className="m-0 me-1">$</strong>
                    <h6 className="m-0"><strong>{getPagoActual(pedido)}</strong></h6>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "2px solid" }} className="d-flex justify-content-between mt-4 pt-4">
                <h6 className="m-0"><strong>Total a pagar</strong></h6>
                <div className="d-flex align-items-center">
                  <strong className="m-0 me-1">$</strong>
                  <h4 className="m-0"><strong>{totalPagos}</strong></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-5 d-flex justify-content-center">
            <button
              type="button"
              className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
              onClick={handlePayment}
              disabled={mutation.isLoading}
            >
              <h5 className="m-0">
                <b className="secontFont text-light">
                  {mutation.isLoading ? "Procesando..." : "Realizar el pago"}
                </b>
              </h5>
            </button>
          </div>
          <div className="py-3 text-center">
            <span>
              Los pagos en nuestra plataforma se procesan a través de nuestro proveedor <strong>Openpay</strong>, por lo que nos acogemos a sus términos y condiciones.
            </span>
          </div>
        </div>
      </section>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            Comprobante de Pago
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 className="mb-4">¡Pago exitoso!</h5>
            {paymentResponse?.charge?.charge ? (
              <div className="text-start ps-4">
                <div className="mb-3 p-3 bg-light rounded">
                  <h6 className="text-center mb-3"><strong>Resumen de Transacción</strong></h6>
                  <p><strong>ID Transacción:</strong> {paymentResponse.charge.charge.id}</p>
                  <p><strong>Monto:</strong> ${(paymentResponse.charge.charge.amount).toFixed(2)} MXN</p>
                  <p><strong>Referencia:</strong> {paymentResponse.charge.charge.order_id}</p>
                  <p><strong>Autorización:</strong> {paymentResponse.charge.charge.authorization}</p>
                  <p><strong>Estado:</strong>
                    <span className={`badge bg-${paymentResponse.charge.charge.status === 'completed' ? 'success' : 'warning'} ms-2`}>
                      {paymentResponse.charge.charge.status}
                    </span>
                  </p>
                </div>

                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="text-center mb-3"><strong>Detalles de Tarjeta</strong></h6>
                  <p><strong>Tipo:</strong> {paymentResponse.charge.charge.card.type === 'credit' ? 'Crédito' : 'Débito'}</p>
                  <p><strong>Marca:</strong> {paymentResponse.charge.charge.card.brand.toUpperCase()}</p>
                  <p><strong>Terminación:</strong> •••• {paymentResponse.charge.charge.card.card_number.slice(-4)}</p>
                  <p><strong>Titular:</strong> {paymentResponse.charge.charge.card.holder_name}</p>
                </div>
              </div>
            ) : (
              <p className="text-danger">No se encontraron detalles del pago</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="success"
            onClick={handleCloseSuccessModal}
            className="px-5"
          >
            <i className="bi bi-check-circle me-2"></i>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentForm;