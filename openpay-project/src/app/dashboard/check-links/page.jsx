import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { cancelOrder } from "../../../api";
import logo from "../../../styles/image/logo.png";
import { Modal, Button } from 'react-bootstrap';
import Navbar from "../../../components/Navbar";
import { getPagoActual } from '../../../utils/openPayConfig';
import useStudentStore from '../../../store/studentStore';
import { getTemporaryData, setTemporaryData } from "../../../utils/GeneralMethods";

const ConfirmLinkModal = ({ show, onHide, pedidos, pedidosCompletos }) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ pedidosConLinks, pedidosComp }) => cancelOrder(pedidosConLinks, pedidosComp),
    onSuccess: (data) => {
      if (data && data.length > 0) {
        // Guardar en localStorage y navegar
        setTemporaryData('pedidos_data', { pedidos: data });
        navigate('/dashboard/pedidos');
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
        <div className="d-flex flex-column">
          {/* Botón de cierre */}
          <div className="d-flex justify-content-end px-3">
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Close"
            ></button>
          </div>

          {/* Contenido del modal */}
          <div className="d-flex flex-column align-items-center">
            {/* Icono de advertencia */}
            <div style={{ height: '120px', width: '120px' }} className="bg-warning p-4 rounded-circle mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 121.5 120.7">
                <path d="M68.7,12.1c0-4.4-3.6-8-8-8s-8,3.6-8,8v64c0,4.4,3.6,8,8,8s8-3.6,8-8V12.1ZM60.7,116.1c5.5,0,10-4.5,10-10s-4.5-10-10-10-10,4.5-10,10,4.5,10,10,10Z" />
              </svg>
            </div>

            {/* Título y descripción */}
            <div className="text-center border-bottom px-5 pb-3">
              <h3 className="m-0"><strong>Atención: Al crear un nuevo link de pago</strong></h3>
              <h5 className="text-secondary mt-1 mx-md-3">
                Para garantizar la seguridad y eficiencia de sus transacciones, cada vez que genere un nuevo link de pago, los anteriores serán cancelados de forma permanente.
              </h5>
            </div>

            {/* Botones de acción */}
            <div className="d-flex justify-content-evenly flex-wrap my-4">
              <Button
                variant="outline-secondary"
                className="border px-5 py-3 my-2"
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
  const { students } = useStudentStore();
  const [modalShow, setModalShow] = useState(false);
  const [checkLinksData, setCheckLinksData] = useState({ pedidos: [], todosLosPedidos: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener datos desde localStorage
    const storedData = getTemporaryData('check_links_data');
    if (storedData) {
      setCheckLinksData(storedData);
    }
    setLoading(false);
  }, []);

  const { pedidos, todosLosPedidos } = checkLinksData;

  // Función getPagoActual ya importada de utils

  const getTotalPagos = (pedidos) => {
    return pedidos.reduce((total, pedido) => {
      return total + parseFloat(getPagoActual(pedido));
    }, 0);
  };

  if (loading) {
    return (
      <main className="container-fluid p-0">
        <Navbar students={students} logo={logo} />
        <div className="backgroundMain minHeight100vh pt-5 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </main>
    );
  }

  if (!pedidos.length) {
    return (
      <main className="container-fluid p-0">
        <Navbar students={students} logo={logo} />
        <div className="backgroundMain minHeight100vh pt-5 d-flex justify-content-center align-items-center">
          <div className="bg-white rounded py-4 px-3 mt-4">
            <div className="text-center">
              <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
              <h4 className="text-secondary mb-3">No se encontraron datos</h4>
              <p className="text-muted">No hay información de pedidos disponible.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container-fluid p-0">
      <Navbar students={students} logo={logo} />
      <div className="backgroundMain minHeight100vh pt-5">
        <section className="d-flex justify-content-center align-items-center mt-5">
          <div className="bg-white rounded py-4 px-3 mt-4">
            <section className="d-flex justify-content-between align-items-center flex-wrap px-3 pb-2 border-bottom">
              <div className="d-flex flex-column">
                <h3 className="m-0 mb-3"><strong>Link de pago</strong></h3>
                <h5 className="text-secondary m-0 mb-3">Detalles de pago</h5>
              </div>
              <button
                type="button"
                className="btn borderMainColor mb-3"
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