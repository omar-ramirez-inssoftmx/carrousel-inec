import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginWithMatricula } from "../api";
import logo from "../styles/image/logo.png";
import fondo from "../styles/image/fondo.svg";

const CheckLinks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pedidos } = location.state || { pedidos: [] };
  const { todosLosPedidos } = location.state || { todosLosPedidos: [] };
  const students = location.state?.student || [];

  const getPagoActual = (pedido) => {
    const fechaActual = new Date();

    // Verifica si la fecha de descuento existe y si aplica
    if (pedido.fecha_vigenica_descuento && fechaActual <= new Date(pedido.fecha_vigenica_descuento)) {
      return pedido.pago_descuento || "0";
    }

    // Verifica si la fecha de recargo existe y si aplica
    if (pedido.fecha_vigencia_recargo && fechaActual >= new Date(pedido.fecha_vigencia_pago)) {
      return pedido.pago_recargo || "0";
    }

    // Verifica si la fecha de pago existe y si aplica
    if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
      return pedido.pago || "0";
    }

    // Si no hay fechas o no aplica ninguna, se considera "normal"
    return "0";
  };

  const getTotalPagos = (pedidos) => {
    return pedidos.reduce((total, pedido) => {
      return total + parseFloat(getPagoActual(pedido));
    }, 0);
  };

  return (
    <main className="container-fluid p-0">
      <section className="d-flex flex-column justify-content-center align-items-center">
        <div className="border-bottom px-md-3 px-lg-5 py-4 container-fluid bg-white fixed-top">
          <img width="120px" src={logo} alt="Logo" />
        </div>

        <div className="container-fluid backgroundMain minHeight100vh pt-5">
          <section className="d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded py-4 px-3 mt-4">
              <section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
                <button
                  onClick={() => navigate(-1)}
                  className="col-auto me-4 btn btn-link text-decoration-none d-flex align-items-center"
                >
                  <svg style={{ height: 24 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                  <h3 className="m-0 ms-2">
                    <b>Link de pago</b>
                  </h3>
                </button>
                <h5 className="col-auto text-secondary m-0">Detalle de pago</h5>
              </section>

              {students.length > 0 ? (
                pedidos.map((grupo) => (
                  <div key={grupo.transaccion}>
                    {grupo.pedidos.map((pedido) => (
                      <div key={pedido.id_pedido} className="mt-3 border rounded px-3 py-4 bg-white">
                        <div className="container-fluid d-flex">
                          <div className="col-8 d-flex flex-wrap">
                            <h6 className="col-12 m-0">
                              <strong>Mensualidad</strong>
                            </h6>
                            <p className="col-12 mb-2">{pedido.concepto_pedido}</p>
                            <p className="m-0">Cant. 1</p>
                          </div>
                          <div className="col-4 d-flex align-items-center justify-content-end">
                            <strong className="m-0 me-1">$</strong>
                            <h4 className="m-0">
                              <strong>{getPagoActual(pedido)}</strong>
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-3 border rounded px-3 py-4 bg-white">
                      <div className="container-fluid d-flex">
                        <div className="col-8 d-flex flex-wrap">
                          <h6 className="col-12 m-0">
                            <strong>Total a pagar</strong>
                          </h6>
                        </div>
                        <div className="col-4 d-flex align-items-center justify-content-end">
                          <strong className="m-0 me-1">$</strong>
                          <h4 className="m-0">
                            <strong>{getTotalPagos(grupo.pedidos).toFixed(2)}</strong>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div>
                        <div className="mt-5 w-100 d-flex justify-content-center">
                                <button className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0" >
                                    <h5 className="m-0"><b className="secontFont text-light">Pagar LinK</b></h5>
                                </button>
                            </div>
                            <div className="container-fluid py-3 text-center">
                                <span>Los pagos en nuestra plataforma se procesan a través de nuestro proveedor <strong>Openpay</strong>, por lo que nos acogemos a sus términos y condiciones.</span>
                            </div>
                        </div>
                  
                  </div>
                ))
              ) : (
                <p className="text-secondary mt-3">No hay estudiantes disponibles.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default CheckLinks;