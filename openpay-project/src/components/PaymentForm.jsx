import { useState, useEffect } from "react";
import { pay } from '../api';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchStudentCardsActive } from '../utils/GeneralMethods';
import { useOpenPayConfig, getPagoActual } from '../utils/openPayConfig';
import useStudentStore from '../store/studentStore';

const PaymentForm = ({ totalPagos, pedidosSeleccionados, getVigencia, pedidoMasViejoSeleccionado, onHide }) => {
  const { getCurrentStudent } = useStudentStore();

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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();

  // Cargar tarjetas al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        // Obtener tarjetas activas
        const currentStudent = getCurrentStudent();
        if (currentStudent?.open_pay_id && currentStudent?.matricula) {
          const tarjetas = await fetchStudentCardsActive(
            currentStudent.open_pay_id,
            currentStudent.matricula
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
  }, [deviceSessionId, getCurrentStudent]);

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
      setIsProcessingPayment(true);

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

      // Preparar datos para el pago
      const currentStudent = getCurrentStudent();
      if (!currentStudent) {
        alert("No hay estudiante seleccionado");
        return;
      }

      const openPayId = currentStudent.open_pay_id;
      const description = "Pago de pedidos seleccionados";
      const totalAmount = totalPagos;
      const pedidoIds = pedidosSeleccionados.map((pedido) => pedido.id_pedido);
      const fechaVigencia = getVigencia(pedidoMasViejoSeleccionado);
      const pedidosSeleccionadosData = pedidosSeleccionados;
      const orderId = currentStudent.matricula;
      const telefono = formData.telefono;
      const ciudad = formData.ciudad;
      const postal = formData.postal;
      const idAlumno = currentStudent.id_alumno;
      const nombreTarjeta = cardData.nombre_tarjeta;

      console.log("cardData  ", cardData);
      console.log("nombreTarjeta ", nombreTarjeta);

      // Ejecutar el pago
      const response = await pay(
        openPayId,
        description,
        orderId,
        totalAmount,
        pedidoIds,
        fechaVigencia,
        pedidosSeleccionadosData,
        deviceSessionId,
        tokenPago,
        tokenGuardar,
        cardData.isCard,
        telefono,
        ciudad,
        postal,
        idAlumno,
        nombreTarjeta
      );

      console.log("Pago exitoso:", response.charge);
      setPaymentResponse(response);
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Error en el pago:", error);
      alert("Error al procesar el pago: " + (error.response?.data?.message || "Intente de nuevo"));
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Funciones de manejo de cambios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
  };

  const getNombreMes = (numeroMes) => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return meses[numeroMes - 1] || "";
  };

  const renderPaymentSection = () => {
    if (loadingCards) {
      return (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando tarjetas...</span>
          </div>
          <p className="mt-2">Cargando información de tarjetas...</p>
        </div>
      );
    }

    return (
      <div>
        {activeCard ? (
          // Mostrar tarjeta guardada
          <div className="card border">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center">
                <span>Tarjeta guardada</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleUseDifferentCard}
                >
                  Usar otra tarjeta
                </button>
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Nombre:</strong> {activeCard.holder_name}</p>
                  <p><strong>Número:</strong> **** **** **** {activeCard.card_number}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Expiración:</strong> {activeCard.expiration_month}/{activeCard.expiration_year}</p>
                  <p><strong>Nombre de tarjeta:</strong> {activeCard.nombre_tarjeta}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Formulario para nueva tarjeta
          <div className="card border">
            <div className="card-body">
              <h5 className="card-title">Datos de la tarjeta</h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre del titular</label>
                  <input
                    type="text"
                    className="form-control"
                    name="holder_name"
                    value={cardData.holder_name}
                    onChange={handleCardInputChange}
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nombre de la tarjeta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre_tarjeta"
                    value={cardData.nombre_tarjeta}
                    onChange={handleCardInputChange}
                    placeholder="Ej: Mi tarjeta principal"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-8">
                  <label className="form-label">Número de tarjeta</label>
                  <input
                    type="text"
                    className="form-control"
                    name="card_number"
                    value={cardData.card_number}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cvv2"
                    value={cardData.cvv2}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Mes de expiración</label>
                  <select
                    className="form-select"
                    name="expiration_month"
                    value={cardData.expiration_month}
                    onChange={handleCardInputChange}
                  >
                    <option value="">Seleccionar mes</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')} - {getNombreMes(month)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Año de expiración</label>
                  <select
                    className="form-select"
                    name="expiration_year"
                    value={cardData.expiration_year}
                    onChange={handleCardInputChange}
                  >
                    <option value="">Seleccionar año</option>
                    {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                      <option key={year} value={year.toString().slice(-2)}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="saveCard"
                  name="isCard"
                  checked={cardData.isCard}
                  onChange={(e) => setCardData(prev => ({ ...prev, isCard: e.target.checked }))}
                />
                <label className="form-check-label" htmlFor="saveCard">
                  Guardar esta tarjeta para futuros pagos
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Información personal */}
        <div className="card border mt-3">
          <div className="card-body">
            <h5 className="card-title">Información personal</h5>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="55 1234 5678"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Ciudad</label>
                <input
                  type="text"
                  className="form-control"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                  placeholder="Ciudad de México"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Código postal</label>
                <input
                  type="text"
                  className="form-control"
                  name="postal"
                  value={formData.postal}
                  onChange={handleInputChange}
                  placeholder="12345"
                  maxLength="5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">Procesar Pago</h3>

          {/* Resumen de pedidos */}
          <div className="card border mb-4">
            <div className="card-body">
              <h5 className="card-title">Resumen de pedidos</h5>
              {pedidosSeleccionados.map((pedido) => (
                <div key={pedido.id_pedido} className="d-flex justify-content-between py-2 border-bottom">
                  <div>
                    <strong>Mensualidad</strong> - {pedido.concepto_pago}
                  </div>
                  <div>
                    <strong>${getPagoActual(pedido)}</strong>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between py-3 fs-5">
                <strong>Total a pagar:</strong>
                <strong>${totalPagos.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Sección de pago */}
          {renderPaymentSection()}

          {/* Botones de acción */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
              disabled={isProcessingPayment}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={handlePayment}
              disabled={isProcessingPayment || loadingCards}
            >
              {isProcessingPayment ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Procesando...
                </>
              ) : (
                `Pagar $${totalPagos.toFixed(2)}`
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Pago Exitoso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            <div className="alert alert-success">
              <i className="bi bi-check-circle-fill fs-1 text-success mb-3"></i>
              <h4>Tu pago se procesó correctamente</h4>
              {paymentResponse && (
                <div className="mt-3">
                  <p><strong>ID de transacción:</strong> {paymentResponse.charge?.id}</p>
                  <p><strong>Monto:</strong> ${paymentResponse.charge?.amount}</p>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentForm;