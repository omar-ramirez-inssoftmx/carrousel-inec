import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { cancelOrder } from "../api";
import logo from "../styles/image/logo.png";
import fondo from "../styles/image/fondo.svg";
import { Modal, Button } from 'react-bootstrap';
import Navbar from "../components/Navbar";

const ConfirmLinkModal = ({ show, onHide, pedidos, pedidosCompletos }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const students = location.state?.student || [];

    const mutation = useMutation({
        mutationFn: ({ pedidosConLinks, pedidosComp }) => cancelOrder(pedidosConLinks, pedidosComp),
        onSuccess: (data) => {
            if (data && data.length > 0) {
                navigate('/dashboard/pedidos', { state: { pedidos: data, student: students } });
            } else {
                alert("No se encontraron pedidos para esta matrícula.");
            }
        },
        onError: () => {
            alert('Ocurrió un problema, intenta de nuevo.');
        },
    });

    const handleGenerateLink = (pedidosConLinks, pedidosComp) => {
        mutation.mutate({ pedidosConLinks, pedidosComp });
    };

    return (
      <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body className="px-0">
              <div className="d-flex flex-column justify-content-center align-items-center">
                  {/* Botón de cierre */}
                  <div className="w-100 d-flex justify-content-end px-3">
                      <button
                          type="button"
                          className="btn-close"
                          onClick={onHide}
                          aria-label="Close"
                      ></button>
                  </div>

                  {/* Contenido del modal */}
                  <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                      {/* Icono de advertencia */}
                      <div style={{ height: '120px', width: '120px' }} className="bg-warning p-4 rounded-circle mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 121.5 120.7">
                              <path d="M68.7,12.1c0-4.4-3.6-8-8-8s-8,3.6-8,8v64c0,4.4,3.6,8,8,8s8-3.6,8-8V12.1ZM60.7,116.1c5.5,0,10-4.5,10-10s-4.5-10-10-10-10,4.5-10,10,4.5,10,10,10Z"/>
                          </svg>
                      </div>

                      {/* Título y descripción */}
                      <div className="w-100 text-center border-bottom px-5 pb-3">
                          <h3 className="m-0"><strong>Atención: Al crear un nuevo link de pago</strong></h3>
                          <h5 className="text-secondary mt-1 mx-md-3">
                              Para garantizar la seguridad y eficiencia de sus transacciones, cada vez que genere un nuevo link de pago, los anteriores serán cancelados de forma permanente.
                          </h5>
                      </div>

                      {/* Botones de acción */}
                      <div className="w-100 d-flex justify-content-evenly flex-wrap my-4">
                          <Button
                              variant="outline-secondary"
                              className="col-auto border px-5 py-3 my-2"
                              onClick={onHide}
                          >
                              <h5 className="m-0"><strong>Cerrar, y no crear link</strong></h5>
                          </Button>
                          <Button
                              variant="primary"
                              className="px-5 py-3 rounded my-2"
                              onClick={() => handleGenerateLink(pedidos, pedidosCompletos)}
                          >
                              <h5 className="m-0"><strong className="text-light">Crear nuevo link</strong></h5>
                          </Button>
                      </div>
                  </div>
              </div>
          </Modal.Body>
      </Modal>
  );
};

const CheckLinks = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pedidos } = location.state || { pedidos: [] };
    const { todosLosPedidos } = location.state || { todosLosPedidos: [] };
    const students = location.state?.student || [];
    const [modalShow, setModalShow] = useState(false);

    const getPagoActual = (pedido) => {
        const fechaActual = new Date();

        if (pedido.fecha_vigenica_descuento && fechaActual <= new Date(pedido.fecha_vigenica_descuento)) {
            return pedido.pago_descuento || "0";
        }

        if (pedido.fecha_vigencia_recargo && fechaActual >= new Date(pedido.fecha_vigencia_pago)) {
            return pedido.pago_recargo || "0";
        }

        if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
            return pedido.pago || "0";
        }

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
                {/* Navbar */}
                <Navbar students={students} logo={logo} />


                <div className="container-fluid backgroundMain minHeight100vh pt-5">
                    <section className="d-flex justify-content-center align-items-center mt-5">
                        <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded py-4 px-3 mt-4">
                            <section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
                                <div className="d-flex flex-wrap align-items-center col-auto">
                                    <h3 className="m-0 mb-3"><strong>Link de pago</strong></h3>
                                    <h5 className="mt-1 ms-3 ms-md-5 text-secondary m-0 mb-3 me-lg-5">Detalles de pago</h5>
                                </div>
                                <button
                                    type="button"
                                    className="btn col-auto borderMainColor mb-3 ms-lg-5"
                                    onClick={() => setModalShow(true)}
                                >
                                    <h5 className="m-0 colorMain px-3 py-2">Crear nuevo link</h5>
                                </button>
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
                                                {grupo.estatus !== "Vencido" ? (
                                                <button
                                                    className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
                                                    onClick={() => window.open(grupo.link_de_pago, "_blank")}
                                                >
                                                    <h5 className="m-0">
                                                    <b className="secontFont text-light">Pagar Link</b>
                                                    </h5>
                                                </button>
                                                ) : (
                                                <h5 className="m-0">
                                                    <b className="secontFont text-danger">Link de pago: {grupo.estatus}</b>
                                                </h5>
                                                )}
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

            <ConfirmLinkModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                pedidos={pedidos}
                pedidosCompletos={todosLosPedidos}
            />
        </main>
    );
};

export default CheckLinks;