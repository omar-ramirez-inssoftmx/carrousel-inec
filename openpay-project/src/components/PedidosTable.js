import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../api';
import logo from '../styles/image/logo.png';
import fondo from '../styles/image/fondo.svg';

const PedidosTable = () => {
    const location = useLocation();
    const { pedidos } = location.state || { pedidos: [] };
    const students = location.state?.student || [];
    const [seleccionados, setSeleccionados] = useState({});
    const [totalPagos, setTotalPagos] = useState(0);
    const description = "Prueba desde sistema react";

    const mutation = useMutation({
        mutationFn: (ids) => createOrder(students[0].open_pay_id, description, totalPagos.toFixed(2), ids),
        onSuccess: (data) => {
            if (data.payment_url) {
                alert('Link de pago generado con éxito.');
            } else {
                alert('Error al generar el pago.');
            }
        },
        onError: () => {
            alert('Ocurrió un problema, intenta de nuevo.');
        }
    });
    
    // Función para manejar la generación del link de pago
    const handleGenerateLink = () => {
        // Extraer los IDs de los pedidos seleccionados
        const idsSeleccionados = pedidos.filter((pedido) => seleccionados[pedido.id_pedido])
                                          .map((pedido) => pedido.id_pedido);
    
        // Llamar a la mutación pasando los IDs de los pedidos seleccionados
        mutation.mutate(idsSeleccionados);
    };

    const handleCheckboxChange = (idPedido, pago) => {
        setSeleccionados((prevSeleccionados) => {
            const nuevosSeleccionados = {
                ...prevSeleccionados,
                [idPedido]: !prevSeleccionados[idPedido],
            };
            calcularTotal(nuevosSeleccionados);
            return nuevosSeleccionados;
        });
    };

    const calcularTotal = (seleccionados) => {
        let total = 0;
        pedidos.forEach((pedido) => {
            if (seleccionados[pedido.id_pedido]) {
                total += parseFloat(getPagoActual(pedido));
            }
        });
        setTotalPagos(total);
    };

    const getPagoActual = (pedido) => {
        const fechaActual = new Date();
        const fechaDescuento = new Date(pedido.fecha_vigenica_descuento);
        const fechaPago = new Date(pedido.fecha_vigencia_pago);
        const fechaRecargo = new Date(pedido.fecha_vigencia_recargo);

        if (fechaActual <= fechaDescuento) {
            return pedido.pago_descuento;
        } else if (fechaActual <= fechaPago) {
            return pedido.pago;
        } else if (fechaActual <= fechaRecargo) {
            return pedido.pago_recargo;
        } else {
            return "0";
        }
    };

    const renderIconoPago = (tipo) => {
        if (tipo === "descuento") {
          return (
            <>
              <div class="position-relative">
                    <div class="descuento position-absolute text-center">
                        <h5 class="m-0"><strong class="text-light">10%</strong></h5>
                    </div>
                    <div class="descuentoTexto position-absolute text-center">
                        <span class="m-0"><strong class="text-light">Menos</strong></span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="71" viewBox="0 0 74 71"><path d="M34.025,3.309a4,4,0,0,1,5.95,0L45.22,9.144a4,4,0,0,0,3.571,1.281l7.864-1.184a4,4,0,0,1,4.595,3.869l.163,7.51a4,4,0,0,0,1.966,3.358l6.592,3.891a4,4,0,0,1,1.052,5.99l-4.773,5.786a4,4,0,0,0-.691,3.864l2.454,7.028a4,4,0,0,1-3.018,5.246L57.3,57.268a4,4,0,0,0-2.958,2.447l-2.838,7.125a4,4,0,0,1-5.6,2.046l-7.015-3.756a4,4,0,0,0-3.776,0L28.1,68.887a4,4,0,0,1-5.6-2.046l-2.838-7.125A4,4,0,0,0,16.7,57.268L9.006,55.783a4,4,0,0,1-3.018-5.246l2.454-7.028a4,4,0,0,0-.691-3.864L2.979,33.858a4,4,0,0,1,1.052-5.99l6.592-3.891a4,4,0,0,0,1.966-3.358l.163-7.51a4,4,0,0,1,4.595-3.869l7.864,1.184A4,4,0,0,0,28.78,9.144Z" fill="#1e4123"/></svg>
                </div>
            </>
          );
        } else if (tipo === "recargo") {
          return (
            <>
                <div class="position-relative">
                    <div class="descuento position-absolute text-center">
                        <h5 class="m-0"><strong class="text-light">10%</strong></h5>
                    </div>
                    <div class="descuentoTexto position-absolute text-center">
                         <span class="m-0"><strong class="text-light">Más</strong></span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="74" height="71" viewBox="0 0 74 71"><path d="M34.025,3.309a4,4,0,0,1,5.95,0L45.22,9.144a4,4,0,0,0,3.571,1.281l7.864-1.184a4,4,0,0,1,4.595,3.869l.163,7.51a4,4,0,0,0,1.966,3.358l6.592,3.891a4,4,0,0,1,1.052,5.99l-4.773,5.786a4,4,0,0,0-.691,3.864l2.454,7.028a4,4,0,0,1-3.018,5.246L57.3,57.268a4,4,0,0,0-2.958,2.447l-2.838,7.125a4,4,0,0,1-5.6,2.046l-7.015-3.756a4,4,0,0,0-3.776,0L28.1,68.887a4,4,0,0,1-5.6-2.046l-2.838-7.125A4,4,0,0,0,16.7,57.268L9.006,55.783a4,4,0,0,1-3.018-5.246l2.454-7.028a4,4,0,0,0-.691-3.864L2.979,33.858a4,4,0,0,1,1.052-5.99l6.592-3.891a4,4,0,0,0,1.966-3.358l.163-7.51a4,4,0,0,1,4.595-3.869l7.864,1.184A4,4,0,0,0,28.78,9.144Z" fill="#dc3545"/></svg>
                </div>
            </>
          );
        } else {
          return null; // No mostrar nada si no hay descuento ni recargo
        }
      };

      const getTipoPago = (pedido) => {
        const fechaActual = new Date();
      
        // Verifica si la fecha de descuento existe y si aplica
        if (pedido.fecha_vigenica_descuento && fechaActual <= new Date(pedido.fecha_vigenica_descuento)) {
          return "descuento";
        }
      
        // Verifica si la fecha de pago existe y si aplica
        if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
          return "normal";
        }
      
        // Verifica si la fecha de recargo existe y si aplica
        if (pedido.fecha_vigencia_recargo && fechaActual <= new Date(pedido.fecha_vigencia_recargo)) {
          return "recargo";
        }
      
        // Si no hay fechas o no aplica ninguna, se considera "normal"
        return "normal";
      };
    // Obtener los pedidos seleccionados para mostrar en el resumen
    const pedidosSeleccionados = pedidos.filter((pedido) => seleccionados[pedido.id_pedido]);

    return (
        <main className="container-fluid p-0">
            <section className="d-flex flex-column justify-content-center align-items-center">
                <div style={{ height: '90px' }} className="border-bottom px-md-3 px-lg-5 container-fluid bg-white fixed-top d-flex justify-content-center align-items-center">
                    <nav className="row w-100 justify-content-between">
                        <div className="col-auto d-flex align-items-center">
                            <img width="120px" src={logo} alt="Logo" />
                        </div>
                        <div className="col-auto">
                            <h5 className="m-0">
                                {`${students[0]?.nombre || 'Nombre no disponible'} ${students[0]?.apellido_paterno || ''} ${students[0]?.apellido_materno || ''}`}
                            </h5>
                            <p className="m-0 text-secondary">
                                Matricula - {students[0]?.matricula || 'N/A'}
                            </p>
                        </div>
                    </nav>
                </div>
                <div className="w-100 d-flex flex-wrap justify-content-center">
                    <section className="container-fluid col-12 col-lg-7 col-xl-9 bg-white pt-5">
                        <div className="accordion mt-5 mb-3 py-4" id="accordionPagos">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button d-flex flex-wrap align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <h3 className="m-0 ms-2"><strong>Pagos corrientes</strong></h3>
                                        <h5 className="text-secondary mt-1 m-0 mx-4">Selecciona las casillas que deseas pagar</h5>
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body d-flex justify-content-center justify-content-xl-start flex-wrap gap32">
                                    {pedidos.map((pedido) => {
                                        const tipoPago = getTipoPago(pedido); // Determina el tipo de pago
                                        return (
                                            <label key={pedido.id_pedido} htmlFor={`pago${pedido.id_pedido}`} className="border d-flex px-3 py-3 rounded cardPago">
                                            <div className="col-7 d-flex flex-column">
                                                <div className="d-flex flex-column">
                                                <p className="m-0"><strong className="text-secondary">Mensualidad</strong></p>
                                                <div className="d-flex align-items-center">
                                                    <strong className="m-0 me-1">$</strong>
                                                    <h2 className="m-0"><strong>{getPagoActual(pedido)}</strong></h2>
                                                </div>
                                                </div>
                                                <div>
                                                <p className="m-0 mt-2 mb-1 text-secondary">
                                                    Mes {tipoPago === "descuento" ? "con descuento" : tipoPago === "recargo" ? "con recargo" : "normal"} 2025
                                                </p>
                                                </div>
                                            </div>
                                            <div className="col-5 d-flex justify-content-end">
                                                <div className="d-flex flex-column align-items-end justify-content-between">
                                                <input
                                                    checked={seleccionados[pedido.id_pedido] || false}
                                                    onChange={() => handleCheckboxChange(pedido.id_pedido, getPagoActual(pedido))}
                                                    className="form-check-input mb-1"
                                                    id={`pago${pedido.id_pedido}`}
                                                    type="checkbox"
                                                />
                                                {renderIconoPago(tipoPago)}
                                                </div>
                                            </div>
                                            </label>
                                        );
                                        })}
                                    </div>
                                    <div className="container-fluid px-4 py-3">
                                        <p>*Todos los pagos obligatorios se aplicarán automáticamente al monto final y son imprescindibles para continuar con el proceso.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="container-fluid col-12 col-lg-5 col-xl-3 backgroundMain py-5 minHeight100vhLg d-flex flex-column justify-content-between">
                        <div>
                            <div className="mt-lg-5">
                                <h3 className="m-0 px-lg-3 pt-lg-4"><strong>Total a pagar</strong></h3>
                            </div>
                            {/* Resumen de pagos seleccionados */}
                            {pedidosSeleccionados.map((pedido) => (
                                <div key={pedido.id_pedido} className="mt-3 border rounded px-3 py-4 bg-white">
                                    <div className="container-fluid d-flex">
                                        <div className="col-8 d-flex flex-wrap">
                                            <h6 className="col-12 m-0"><strong>Mensualidad</strong></h6>
                                            <p className="col-12 mb-2">Febrero 2025</p>
                                            <p className="m-0">Cant. 1</p>
                                        </div>
                                        <div className="col-4 d-flex align-items-center justify-content-end">
                                            <strong className="m-0 me-1">$</strong>
                                            <h4 className="m-0"><strong>{getPagoActual(pedido)}</strong></h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Total a pagar */}
                            <div className="mt-3 border rounded px-3 py-4 bg-white">
                                <div className="container-fluid d-flex">
                                    <div className="col-8 d-flex flex-wrap">
                                        <h6 className="col-12 m-0"><strong>Total a pagar</strong></h6>
                                    </div>
                                    <div className="col-4 d-flex align-items-center justify-content-end">
                                        <strong className="m-0 me-1">$</strong>
                                        <h4 className="m-0"><strong>{totalPagos.toFixed(2)}</strong></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-5 w-100 d-flex justify-content-center">
                                <button className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0" onClick={handleGenerateLink} disabled={mutation.isLoading}>
                                    <h5 className="m-0"><b className="secontFont text-light">{mutation.isLoading ? 'Generando...' : 'Generar Link'}</b></h5>
                                </button>
                            </div>
                            <div className="container-fluid py-3 text-center">
                                <span>Los pagos en nuestra plataforma se procesan a través de nuestro proveedor <strong>Openpay</strong>, por lo que nos acogemos a sus términos y condiciones.</span>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default PedidosTable;