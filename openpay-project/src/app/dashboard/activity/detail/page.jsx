import { useParams, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import PlatformLayout from "../../layout";
import { getTemporaryData, findPaymentById } from "../../../../utils/GeneralMethods";

const DetailActivity = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primero intentar obtener desde localStorage directo
    const currentPayment = getTemporaryData('current_payment');

    if (currentPayment) {
      setPaymentData(currentPayment);
      setLoading(false);
    } else {
      // Si no está en localStorage directo, buscar en los orders por el ID
      const orders = getTemporaryData('orders');
      if (orders && paymentId) {
        const foundPayment = findPaymentById(paymentId, orders);
        if (foundPayment) {
          setPaymentData(foundPayment);
        }
      }
      setLoading(false);
    }
  }, [paymentId]);

  if (loading) {
    return (
      <PlatformLayout>
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </PlatformLayout>
    );
  }

  if (!paymentData) {
    return (
      <PlatformLayout>
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h4 className="text-secondary mb-3">Pago no encontrado</h4>
          <p className="text-muted mb-4">No se pudo cargar la información del pago.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/dashboard/activity')}
          >
            Volver a Actividad
          </button>
        </div>
      </PlatformLayout>
    );
  }

  const { detail = [], orderData = {} } = paymentData;
  const total = detail[0]?.monto;

  return (
    <PlatformLayout>
      {/* Header */}
      <section className="d-flex justify-content-center align-items-center px-3 pb-2 border-bottom">
        <button
          onClick={() => navigate('/dashboard/activity')}
          className="me-4 btn btn-link text-decoration-none d-flex align-items-center"
        >
          <svg style={{ height: 24 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <i className="bi bi-arrow-left"></i>
          <h3 className="m-0 ms-2"><b>Detalles de pago</b></h3>
        </button>
        <h5 className="text-secondary m-0">
          {orderData.numero || 'N/A'}
        </h5>
      </section>

      {/* Sección de información del pago */}
      <section className="d-flex flex-column gap32 pt-4 pb-2 px-3 border-bottom">
        {/* Datos generales del pago */}
        <div className="d-flex flex-wrap gap-4 mb-4">
          <div className="flex-fill">
            <div className="d-flex flex-column">
              <span className="text-secondary">Fecha de pago</span>
              <span>{orderData.fecha || 'No disponible'}</span>
            </div>
          </div>

          <div className="flex-fill">
            <div className="d-flex flex-column">
              <span className="text-secondary">Método de pago</span>
              <span>
                {orderData.card
                  ? `${orderData.card.card_brand} - ${orderData.card.card_number}`
                  : 'No disponible'}
              </span>
            </div>
          </div>

          <div className="flex-fill">
            <div className="d-flex flex-column">
              <span className="text-secondary">Estatus de pago</span>
              <span className="text-success">Procesado correctamente</span>
            </div>
          </div>
        </div>

        <hr className="my-2" />

        {/* Lista de conceptos */}
        {detail.map((item, index) => (
          <Fragment key={index}>
            <div className="mb-3">
              <h6 className="fw-bold">{item.pago}</h6>
              <div className="d-flex justify-content-between">
                <span>{item.fecha}</span>
              </div>
            </div>
            {index < detail.length - 1 && <hr className="my-2" />}
          </Fragment>
        ))}

        <hr className="my-2" />

        <div className="d-flex justify-content-between fw-bold">
          <h3 className="m-0 ms-2">
            <span>Total a pagar</span>
          </h3>
          <h3 className="m-0 ms-2">
            <span>{total}</span>
          </h3>
        </div>

        <div className="mt-4">
          <small className="text-muted">
            Los pagos en nuestra plataforma se procesan a través de nuestro proveedor Openpay,
            por lo que nos acogemos a sus términos y condiciones.
          </small>
        </div>
      </section>
    </PlatformLayout>
  );
};

export default DetailActivity;