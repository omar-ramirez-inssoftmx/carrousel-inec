
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../api';
import logo from '../styles/image/logo.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';



const PaymentLinkModal = ({ show, onHide, paymentUrl }) => {
    
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Link de Pago Generado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>El link de pago se ha generado con éxito.</p>
          <p>Se ha generado con éxito el link de pago. Favor de revisar tu correo electrónico para proceder con el pagos </p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            {paymentUrl}
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

const PedidosTable = () => {
    const [modalShow, setModalShow] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');
    const location = useLocation();
    const { pedidos } = location.state || { pedidos: [] };
    const students = location.state?.student || [];
    // Inicializa el estado 'seleccionados' como un objeto vacío
    const [seleccionados, setSeleccionados] = useState({});

    const [totalPagos, setTotalPagos] = useState(0);
    const description = "Prueba desde sistema react"

    const navigate = useNavigate();
   
  

    const getPedidosOrdenadosPorAntiguedad = (pedidos) => {
        return pedidos.slice().sort((a, b) => {
          if (a.fecha_vigencia_recargo < b.fecha_vigencia_recargo) return -1;
          if (a.fecha_vigencia_recargo > b.fecha_vigencia_recargo) return 1;
          return 0;
        });
    };
      
    const handleModalClose = () => {
        setModalShow(false);
        navigate('/'); // Redirecciona a la página de login
    };

    // Función para obtener la colegiatura más antigua con recargo
    const getColegiaturaMasAntiguaConRecargo = (pedidos) => {

        const pedidosConRecargo = pedidos.filter((pedido) => {
            console.log("pedido ",pedido);
            const fechaActual = new Date();

            console.log("fecha_vigencia_recargo ",pedido.fecha_vigencia_recargo);
            console.log("fechaActual ",fechaActual); 
            console.log("pedido.fecha_vigencia_recargo ",new Date(pedido.fecha_vigencia_recargo));
            return (
                pedido.fecha_vigencia_recargo && fechaActual >= new Date(pedido.fecha_vigencia_recargo)
            );
        });
         console.log("pedidosConRecargo", pedidosConRecargo)
            
        if (pedidosConRecargo.length === 0) {
            return null;
        }

        console.log("pedidosConRecargo", pedidosConRecargo)
    
        return pedidosConRecargo.reduce((masAntigua, pedido) => {
            if (
                new Date(pedido.fecha_vigencia_recargo) <
                new Date(masAntigua.fecha_vigencia_recargo)
            ) {
                return pedido;
            }
            return masAntigua;
        });
    };
    
    const colegiaturaMasAntiguaConRecargo = getColegiaturaMasAntiguaConRecargo(pedidos);

    console.log("colegiaturaMasAntiguaConRecargo",  colegiaturaMasAntiguaConRecargo)

    useEffect(() => {
        if (colegiaturaMasAntiguaConRecargo) {
          const inicialSeleccionados = {
            [colegiaturaMasAntiguaConRecargo.id_pedido]: true,
          };
          setSeleccionados(inicialSeleccionados);
          calcularTotal(inicialSeleccionados);
        }
      }, [colegiaturaMasAntiguaConRecargo]);

    const mutation = useMutation({
   
        mutationFn: ({ ids, fechaVigencia, pedidosSeleccionados }) => createOrder(students[0].open_pay_id, description, totalPagos.toFixed(2), ids, fechaVigencia, pedidosSeleccionados),
        onSuccess: (data) => {
            if (data.payment_url) {
                setPaymentUrl(data.payment_url)
                setModalShow(true);
            } else {
                alert('Error al generar el pago.');
            }
        },
        onError: () => {
            alert('Ocurrió un problema, intenta de nuevo.');
        }
    });
    
    const handleGenerateLink = () => {
        const pedidosSeleccionados = pedidos.filter((pedido) => seleccionados[pedido.id_pedido]);
      
        console.log("pedidosSeleccionados ", pedidosSeleccionados);
      
        // Extraer los IDs de los pedidos seleccionados
        const idsSeleccionados = pedidos
          .filter((pedido) => seleccionados[pedido.id_pedido])
          .map((pedido) => pedido.id_pedido);
        
        // Obtener el pedido más viejo seleccionado
        const pedidoMasViejoSeleccionado = getPedidosOrdenadosPorAntiguedad(
          pedidos.filter((pedido) => seleccionados[pedido.id_pedido])
        )[0];
        
        // Obtener la fecha de vigencia del pedido más viejo seleccionado
        const fechaVigenciaMasViejo = pedidoMasViejoSeleccionado
          ? getVigencia(pedidoMasViejoSeleccionado, getTipoPago(pedidoMasViejoSeleccionado), pedidosSeleccionados)
          : null;
        
        // Llamar a la mutación pasando los IDs de los pedidos seleccionados y la fecha de vigencia del más viejo
        mutation.mutate({ ids: idsSeleccionados, fechaVigencia: fechaVigenciaMasViejo, pedidosSeleccionados: pedidosSeleccionados });
      };
      
      
    const handleCheckboxChange = (idPedido, pago) => {
        setSeleccionados((prevSeleccionados) => {
          const nuevosSeleccionados = { ...prevSeleccionados };
          const isChecked = !prevSeleccionados[idPedido];
          nuevosSeleccionados[idPedido] = isChecked;
      
          const pedidosOrdenados = getPedidosOrdenadosPorAntiguedad(pedidos);
          const indicePedidoActual = pedidosOrdenados.findIndex(
            (pedido) => pedido.id_pedido === idPedido
          );
      
          if (indicePedidoActual === 0) {
            // Si es la colegiatura más vieja, se desbloquea la siguiente
            if (pedidosOrdenados.length > 1) {
              nuevosSeleccionados[pedidosOrdenados[1].id_pedido] = false;
            }
          } else {
            // Si no es la colegiatura más vieja, se bloquea la anterior
            nuevosSeleccionados[pedidosOrdenados[indicePedidoActual - 1].id_pedido] = true;
          }
      
          // Si se desmarca una colegiatura, se desmarcan automáticamente las posteriores
          if (!isChecked) {
            for (let i = indicePedidoActual + 1; i < pedidosOrdenados.length; i++) {
              nuevosSeleccionados[pedidosOrdenados[i].id_pedido] = false;
            }
          }
      
          calcularTotal(nuevosSeleccionados);
          return nuevosSeleccionados;
        });
    };
      


    const calcularTotal = (seleccionados) => {
        let total = 0;
        pedidos.forEach((pedido) => {
          if (
            seleccionados[pedido.id_pedido] ||
            (colegiaturaMasAntiguaConRecargo && colegiaturaMasAntiguaConRecargo.id_pedido === pedido.id_pedido)
          ) {
            total += parseFloat(getPagoActual(pedido));
          }
        });
        setTotalPagos(total);
    };

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
      

    const getMesDesdeFecha = (pedido, tipoPago) => {
        
        console.log("tipoPago ", tipoPago)
        if (!pedido) return "Desconocido"; // En caso de que no haya datos
        
        let fecha;
        if (tipoPago === "descuento") {
            fecha = pedido.fecha_vigenica_descuento;
           
        } else if (tipoPago === "recargo") {
            fecha = pedido.fecha_vigencia_recargo;
             console.log("fecha ", pedido)
        } else {
            fecha = pedido.fecha_vigencia_pago;
        }
        console.log("fecha ", fecha)
        if (!fecha) return "Desconocido"; // Si no hay fecha válida
    
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const fechaObj = new Date(fecha);
        return meses[fechaObj.getMonth()]; // Obtiene el mes en texto
    };
    
    const getVigencia = (pedido, tipoPago, pedidosSeleccionados) => {
        if (!pedido) return "Desconocido"; // En caso de que no haya datos
      
        // Verifica si al menos un pedido seleccionado tiene recargo
        const tienePedidoRecargo = pedidosSeleccionados.some((p) => {
          const fechaActual = new Date();
          return p.fecha_vigencia_recargo && fechaActual >= new Date(p.fecha_vigencia_recargo);
        });
      
        // Verifica si al menos un pedido seleccionado tiene descuento
        const tienePedidoDescuento = pedidosSeleccionados.some((p) => {
          const fechaActual = new Date();
          return p.fecha_vigenica_descuento && fechaActual <= new Date(p.fecha_vigenica_descuento);
        });
      
        // Verifica si al menos un pedido seleccionado es un pago normal
        const tienePedidoNormal = pedidosSeleccionados.some((p) => {
          const fechaActual = new Date();
          return p.fecha_vigencia_pago && fechaActual <= new Date(p.fecha_vigencia_pago);
        });
      
        if (tienePedidoRecargo && !tienePedidoDescuento && !tienePedidoNormal) {
            // Si solo hay pedidos con recargo seleccionados, se usa el día 15 del mes actual
            const fechaActual = new Date();
            const diaQuince = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 15);
            
            // Ajustar la fecha sumando un día
            diaQuince.setDate(diaQuince.getDate() + 1);
            return diaQuince.toISOString().split("T")[0];
          } else if (tienePedidoDescuento) {
            // Si hay al menos un pedido con descuento seleccionado, se usa la fecha de vigencia de descuento del primer pedido con descuento
            const pedidoDescuento = pedidosSeleccionados.find((p) => {
              const fechaActual = new Date();
              return p.fecha_vigenica_descuento && fechaActual <= new Date(p.fecha_vigenica_descuento);
            });
            
            // Ajustar la fecha sumando un día
            const fechaDescuento = new Date(pedidoDescuento.fecha_vigenica_descuento);
            fechaDescuento.setDate(fechaDescuento.getDate() + 1);
            return fechaDescuento.toISOString().split("T")[0];
          } else if (tienePedidoNormal) {
            // Si hay al menos un pedido normal seleccionado, se usa la fecha de vigencia de pago del primer pedido normal
            const pedidoNormal = pedidosSeleccionados.find((p) => {
              const fechaActual = new Date();
              return p.fecha_vigencia_pago && fechaActual <= new Date(p.fecha_vigencia_pago);
            });
            
            // Ajustar la fecha sumando un día
            const fechaNormal = new Date(pedidoNormal.fecha_vigencia_pago);
            fechaNormal.setDate(fechaNormal.getDate() + 1);
            return fechaNormal.toISOString().split("T")[0];
          } else {
            // Si no hay pedidos seleccionados, se usa la fecha de vigencia correspondiente al tipo de pago del primer pedido
            if (tipoPago === "descuento") {
              const fechaDescuento = new Date(pedido.fecha_vigenica_descuento);
              fechaDescuento.setDate(fechaDescuento.getDate() + 1);
              return fechaDescuento.toISOString().split("T")[0];
            } else {
              const fechaPago = new Date(pedido.fecha_vigencia_pago);
              fechaPago.setDate(fechaPago.getDate() + 1);
              return fechaPago.toISOString().split("T")[0];
            }
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
    
        // Verifica si la fecha de recargo existe y si aplica
        if (pedido.fecha_vigencia_recargo && fechaActual >= new Date(pedido.fecha_vigencia_pago)) {
            return "recargo";
        }
    
        // Verifica si la fecha de pago existe y si aplica
        if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
            return "normal";
        }
    
        // Si no hay fechas o no aplica ninguna, se considera "normal"
        return "normal";
    };
    
    // Obtener los pedidos seleccionados para mostrar en el resumen
    const pedidosSeleccionados = pedidos.filter(
        (pedido) =>
          seleccionados[pedido.id_pedido] ||
          (colegiaturaMasAntiguaConRecargo && colegiaturaMasAntiguaConRecargo.id_pedido === pedido.id_pedido)
      );

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
                                        const tipoPago = getTipoPago(pedido);
                                        const isMasAntigua = colegiaturaMasAntiguaConRecargo && colegiaturaMasAntiguaConRecargo.id_pedido === pedido.id_pedido;
                                        const pedidosOrdenados = getPedidosOrdenadosPorAntiguedad(pedidos);
                                        const indicePedidoActual = pedidosOrdenados.findIndex(
                                          (p) => p.id_pedido === pedido.id_pedido
                                        );
                                        const isChecked = seleccionados[pedido.id_pedido] || isMasAntigua;
                                        const isDisabled = isMasAntigua || (indicePedidoActual !== 0 && !seleccionados[pedidosOrdenados[indicePedidoActual - 1].id_pedido]);
                                 
                                        return (
                                            <label
                                                key={pedido.id_pedido}
                                                htmlFor={`pago${pedido.id_pedido}`}
                                                className={`border d-flex px-3 py-3 rounded cardPago ${
                                                isMasAntigua ? 'colegiatura-mas-antigua-con-recargo' : ''
                                                }`}
                                            > 
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
                                                    {pedido.concepto_pedido} {tipoPago === "descuento" ? "con descuento" : tipoPago === "recargo" ? "con recargo" : "normal"}
                                                </p>
                                    
                                                </div>
                                            </div>
                                            <div className="col-5 d-flex justify-content-end">
                                                <div className="d-flex flex-column align-items-end justify-content-between">
                                                <input
                                                    checked={isChecked}
                                                    onChange={() => handleCheckboxChange(pedido.id_pedido, getPagoActual(pedido))}
                                                    className="form-check-input mb-1"
                                                    id={`pago${pedido.id_pedido}`}
                                                    type="checkbox"
                                                    disabled={isDisabled}
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
                           
                            {pedidosSeleccionados.map((pedido) => {
                            const tipoPago = getTipoPago(pedido);

                            return (
                                <div key={pedido.id_pedido} className="mt-3 border rounded px-3 py-4 bg-white">
                                <div className="container-fluid d-flex">
                                    <div className="col-8 d-flex flex-wrap">
                                    <h6 className="col-12 m-0"><strong>Mensualidad</strong></h6>
                                    <p className="col-12 mb-2">{pedido.concepto_pedido}</p>
                                    <p className="m-0">Cant. 1</p>
                                    </div>
                                    <div className="col-4 d-flex align-items-center justify-content-end">
                                    <strong className="m-0 me-1">$</strong>
                                    <h4 className="m-0"><strong>{getPagoActual(pedido)}</strong></h4>
                                    </div>
                                </div>
                                </div>
                            );
                            })}


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
            <PaymentLinkModal
                show={modalShow}
                onHide={handleModalClose}
             
            />
        </main>
        
    );
};

export default PedidosTable;