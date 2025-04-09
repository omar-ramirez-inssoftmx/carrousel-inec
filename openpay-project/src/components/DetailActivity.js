import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../styles/image/logo.png";
import Navbar from "../components/Navbar";

const Activity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos el estado desde el navigate
  const { student = [], orders = {} } = location.state || {};
  const pedidos = orders.pedidos || [];
  const mesesDisponibles = orders.mesesDisponibles || [];
  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");

  return (
    <main className="container-fluid p-0">
      <section className="d-flex flex-column justify-content-center align-items-center">
        {/* Navbar */}
        <Navbar students={student} logo={logo} />

        <div className="container-fluid backgroundMain minHeight100vh pt-5">
          <section className="d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded py-4 px-3 mt-4">
              {/* Header */}
              <section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
                <button
                  onClick={() => navigate("/")}
                  className="col-auto me-4 btn btn-link text-decoration-none d-flex align-items-center"
                >
                  <h3 className="m-0 ms-2"><b>ID de pago</b></h3>
                </button>
                <h5 className="col-auto text-secondary m-0">
                  Detalles de pago
                </h5>
              </section>

              {/* Botones de Meses */}
              <section
                    key={student.id_alumno}
                    className="d-flex flex-column w-100 gap32 pt-4 pb-2 px-3 border-bottom"
                    >
                    {/* Sección horizontal de detalles de pago */}
                    <div className="row mb-4">
                        {/* Fecha de pago */}
                        <div className="col-md-4">
                        <div className="d-flex flex-column">
                            <span className="text-secondary">Fecha de pago</span>
                            <span>18 febrero 2025</span>
                        </div>
                        </div>
                        
                        {/* Método de pago */}
                        <div className="col-md-4">
                        <div className="d-flex flex-column">
                            <span className="text-secondary">Método de pago</span>
                            <span>Visa - 1345</span>
                        </div>
                        </div>
                        
                        {/* Estatus de pago */}
                        <div className="col-md-4">
                        <div className="d-flex flex-column">
                            <span className="text-secondary">Estatus de pago</span>
                            <span className="text-success">Procesado correctamente</span>
                        </div>
                        </div>
                    </div>

                    {/* Resto del contenido permanece igual */}
                    <hr className="my-2" />

                    <div className="mb-3">
                        <h6 className="fw-bold">Inscripción</h6>
                        <div className="d-flex justify-content-between">
                        <span>Primer Semestre 2025</span>
                        <span>$ 12,000</span>
                        </div>
                        <div className="text-end">
                        <small className="text-muted">Cant. 1</small>
                        </div>
                    </div>

                    <hr className="my-2" />

                    <div className="mb-2">
                        <div className="d-flex justify-content-between">
                        <span className="text-secondary">Subtotal</span>
                        <span>$ 12,000</span>
                        </div>
                        <div className="d-flex justify-content-between">
                        <span className="text-secondary">Impuestos</span>
                        <span>$ 1,920</span>
                        </div>
                    </div>

                    <hr className="my-2" />

                    <div className="d-flex justify-content-between fw-bold">
                        <span>Total a pagar</span>
                        <span>$ 13,920</span>
                    </div>

                    <div className="mt-4">
                        <small className="text-muted">
                        Los pagos en nuestra plataforma se procesan a través de nuestro proveedor Openpay, 
                        por lo que nos acogemos a sus términos y condiciones.
                        </small>
                    </div>
                </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Activity;
