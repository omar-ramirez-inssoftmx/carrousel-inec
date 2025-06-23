import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlatformLayout from "../layouts/PlatfomLayout";

const DetailActivity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos los datos del estado
  const { detail = [], orderData = {} } = location.state || {};

  const total = detail[0].monto;

  return (
    <PlatformLayout>
      {/* Header */}
      <section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
        <button
          onClick={() => navigate(-1)} // Regresa a la página anterior
          className="col-auto me-4 btn btn-link text-decoration-none d-flex align-items-center"
        >
          <svg style={{ height: 24 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <i className="bi bi-arrow-left"></i>
          <h3 className="m-0 ms-2"><b>Detalles de pago</b></h3>
        </button>
        <h5 className="col-auto text-secondary m-0">
          {orderData.numero || 'N/A'}
        </h5>
      </section>

      {/* Sección de información del pago */}
      <section className="d-flex flex-column w-100 gap32 pt-4 pb-2 px-3 border-bottom">
        {/* Datos generales del pago */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="d-flex flex-column">
              <span className="text-secondary">Fecha de pago</span>
              <span>{orderData.fecha || 'No disponible'}</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex flex-column">
              <span className="text-secondary">Método de pago</span>
              <span>
                {orderData.card
                  ? `${orderData.card.card_brand} - ${orderData.card.card_number}`
                  : 'No disponible'}
              </span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="d-flex flex-column">
              <span className="text-secondary">Estatus de pago</span>
              <span className="text-success">Procesado correctamente</span>
            </div>
          </div>
        </div>

        <hr className="my-2" />

        {/* Lista de conceptos */}
        {detail.map((item, index) => (
          <React.Fragment key={index}>
            <div className="mb-3">
              <h6 className="fw-bold">{item.pago}</h6>
              <div className="d-flex justify-content-between">
                <span>{item.fecha}</span>

              </div>
              <div className="text-end">

              </div>
            </div>
            {index < detail.length - 1 && <hr className="my-2" />}
          </React.Fragment>
        ))}

        <hr className="my-2" />

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