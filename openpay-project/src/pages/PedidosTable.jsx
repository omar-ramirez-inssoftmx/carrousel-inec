import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../api';
import logo from '../styles/image/logo.png';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import PaymentForm from '../components/PaymentForm';
import Navbar from "../components/Navbar";

const PaymentLinkModal = ({ show, onHide, modalDate, currentDate, dayDate }) => {
	const location = useLocation();
	const students = location.state?.student || [];

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
						{/* Icono de éxito */}
						<div style={{ height: '120px', width: '120px' }} className="bg-success p-4 rounded-circle mb-4">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path fill="#FFF" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
							</svg>
						</div>

						{/* Título y descripción */}
						<div className="text-center border-bottom px-5 pb-3">
							<h3 className="m-0"><strong>Enlace de pago creado correctamente</strong></h3>
							<h5 className="text-secondary mt-1 mx-md-3">
								Se ha enviado el enlace de pago a través de los medios de contacto (Correo electrónico y Teléfono celular).
							</h5>
						</div>

						{/* Detalles del enlace */}
						<div className="d-flex align-items-center justify-content-between flex-wrap mt-4 mb-3 px-5 gap32">
							<div className="d-flex flex-column">
								<p className="m-0 text-secondary">Creación de enlace</p>
								<h5><strong>{currentDate}</strong></h5>
							</div>
							<div className="d-flex flex-column">
								<p className="m-0 text-secondary">Enlace válido hasta</p>
								<h5><strong>{modalDate}</strong></h5>
							</div>
							<div className="d-flex flex-column">
								<p className="m-0 text-secondary">Estatus de enlace</p>
								<h6 className="alertCorrect rounded-2 px-3 py-1"><b>Activo durante {dayDate} días</b></h6>
							</div>
						</div>

						{/* Información de contacto */}
						<div className="d-flex flex-column mt-4 mb-3 px-5 gap32">
							<div className="d-flex flex-column">
								<p className="m-0 text-secondary">Correo electrónico</p>
								<h5><strong>{students[0].email}</strong></h5>
							</div>
							<div className="d-flex flex-column">
								<p className="m-0 text-secondary">Teléfono celular</p>
								<h5><strong>{students[0].celular}</strong></h5>
							</div>
						</div>

						{/* Botón de enlace de pago */}
						<div className="d-flex justify-content-center my-4">
							<Button
								variant="primary"
								className="px-5 py-3 rounded backgroundMainColor border-0"
								onClick={onHide}
							>
								<h5 className="m-0"><strong className="secontFont text-light">Aceptar</strong></h5>
							</Button>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const PayModal = ({ show, onHide, totalPagos, pedidos, seleccionados, getPedidosOrdenadosPorAntiguedad, getVigencia }) => {
	const location = useLocation();
	const students = location.state?.student || [];

	// Filtrar los pedidos seleccionados
	const pedidosSeleccionados = pedidos.filter((pedido) => seleccionados[pedido.id_pedido]);

	// Extraer los IDs de los pedidos seleccionados
	const idsSeleccionados = pedidos
		.filter((pedido) => seleccionados[pedido.id_pedido])
		.map((pedido) => pedido.id_pedido);

	// Obtener el pedido más viejo seleccionado
	const pedidoMasViejoSeleccionado = getPedidosOrdenadosPorAntiguedad(
		pedidos.filter((pedido) => seleccionados[pedido.id_pedido])
	)[0];

	return (
		<Modal show={show} onHide={onHide} centered size="xl">
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
					<div className="mt-4 mb-3 px-5">
						<PaymentForm
							students={students}
							totalPagos={totalPagos}
							pedidosSeleccionados={pedidosSeleccionados}
							getVigencia={getVigencia}
							pedidoMasViejoSeleccionado={pedidoMasViejoSeleccionado}
						/>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};


const PedidosTable = () => {
	const [modalShow, setModalShow] = useState(false);
	const [paymentUrl, setPaymentUrl] = useState('');
	const [modalDate, setModalDate] = useState('');
	const [currentDate, setCurrentDate] = useState('');
	const [dayDate, setDayDate] = useState('');
	const location = useLocation();
	const { pedidos } = location.state || { pedidos: [] };
	const students = location.state?.student || [];
	// Inicializa el estado 'seleccionados' como un objeto vacío
	const [seleccionados, setSeleccionados] = useState({});

	const [totalPagos, setTotalPagos] = useState(0);
	const description = "Prueba desde sistema react"
	const [showPaymentForm, setShowPaymentForm] = useState(false);

	const navigate = useNavigate();

	const getPedidosOrdenadosPorAntiguedad = (pedidos) => {
		return pedidos.slice().sort((a, b) => {
			if (a.fecha_vigencia_pago < b.fecha_vigencia_pago) return -1;
			if (a.fecha_vigencia_pago > b.fecha_vigencia_pago) return 1;
			return 0;
		});
	};

	const handleModalClose = () => {
		setModalShow(false);
		navigate('/'); // Redirecciona a la página de login
	};

	const proceedPayment = () => {
		setShowPaymentForm(true)
	};

	// Función para obtener la colegiatura más antigua
	const getColegiaturaMasAntigua = (pedidos) => {
		if (pedidos.length === 0) {
			return null;
		}

		return pedidos.reduce((masAntigua, pedido) => {
			if (
				new Date(pedido.fecha_vigencia_pago) <
				new Date(masAntigua.fecha_vigencia_pago)
			) {
				return pedido;
			}
			return masAntigua;
		});
	};

	const colegiaturaMasAntigua = getColegiaturaMasAntigua(pedidos);

	useEffect(() => {
		if (colegiaturaMasAntigua) {
			const inicialSeleccionados = {
				[colegiaturaMasAntigua.id_pedido]: true,
			};
			setSeleccionados(inicialSeleccionados);
			calcularTotal(inicialSeleccionados);
		}
	}, [colegiaturaMasAntigua]);

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
		onError: (error) => {
			alert("Error: " + (error.response?.data?.message || "Intente de nuevo"));
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
			? getVigencia(pedidoMasViejoSeleccionado, pedidosSeleccionados)
			: null;

		const vigeniaFechaDate = new Date(fechaVigenciaMasViejo); // Crear un objeto Date a partir de la fecha ajustada
		const fechaAcual = new Date();

		const vigent = dateFormatCurrent(vigeniaFechaDate);
		const current = dateFormatCurrent(fechaAcual);
		const diferenciaDias = dias(vigeniaFechaDate);
		console.log("diferenciaDias ", diferenciaDias)

		setCurrentDate(current)
		setModalDate(vigent)
		setDayDate(diferenciaDias)
		// Llamar a la mutación pasando los IDs de los pedidos seleccionados y la fecha de vigencia del más viejo
		mutation.mutate({ ids: idsSeleccionados, fechaVigencia: fechaVigenciaMasViejo, pedidosSeleccionados: pedidosSeleccionados });
	};

	const dateFormatCurrent = (date => {
		const opciones = {
			day: "numeric",
			month: "long",
			year: "numeric"
		};

		return date.toLocaleDateString("es-Mx", opciones); // Formatear la fecha
	})

	const dias = (vigencia) => {
		const fechaVigencia = moment(vigencia)
		const fechaActual = moment();

		return Math.abs(fechaActual.diff(fechaVigencia, 'days'));
	}

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
				(colegiaturaMasAntigua && colegiaturaMasAntigua.id_pedido === pedido.id_pedido)
			) {
				total += parseFloat(pedido.pago || "0");
			}
		});
		setTotalPagos(total);
	};

	const getVigencia = (pedido) => {
		if (!pedido) return "Desconocido";
		const fechaActual = new Date();

		// Ajustar la fecha sumando un día
		const fechaPago = new Date(pedido.fecha_vigencia_pago);
		fechaPago.setDate(fechaPago.getDate() + 1);
		return fechaPago.toISOString().split("T")[0];
	};

	const getTipoPago = (pedido) => {
		const fechaActual = new Date();

		if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
			return "normal";
		}

		return "normal";
	};

	const getNombreMes = (numeroMes) => {
		const meses = [
			"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
		];
		return meses[numeroMes - 1] || "";
	};

	// Obtener los pedidos seleccionados para mostrar en el resumen
	const pedidosSeleccionados = pedidos.filter(
		(pedido) =>
			seleccionados[pedido.id_pedido] ||
			(colegiaturaMasAntigua && colegiaturaMasAntigua.id_pedido === pedido.id_pedido)
	);
	const hayPedidosSeleccionados = Object.values(seleccionados).some((seleccionado) => seleccionado);
	return (
		<main className="container-fluid p-0">
			<section className="d-flex flex-column justify-content-center align-items-center">
				<Navbar students={students} logo={logo} />
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
											const isMasAntigua = colegiaturaMasAntigua && colegiaturaMasAntigua.id_pedido === pedido.id_pedido;
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
													className={`border d-flex px-3 py-3 rounded cardPago ${isMasAntigua ? 'colegiatura-mas-antigua' : ''
														}`}
												>
													<div className="col-7 d-flex flex-column">
														<div className="d-flex flex-column">
															<div className="d-flex align-items-center">
																<p className="m-0 me-2"><strong className="text-secondary">Mensualidad</strong></p>
																<p className="m-0"><strong>{getNombreMes(pedido.mes)}</strong></p>
															</div>
															<div className="d-flex align-items-center">
																<strong className="m-0 me-1">$</strong>
																<h2 className="m-0"><strong>{pedido.pago || "0"}</strong></h2>
															</div>
														</div>
														<div>
															<p className="m-0 mt-2 mb-1 text-secondary">
																{pedido.concepto_pago}
															</p>
														</div>
													</div>
													<div className="col-5 d-flex justify-content-end">
														<div className="d-flex flex-column align-items-end justify-content-between">
															<input
																checked={isChecked}
																onChange={() => handleCheckboxChange(pedido.id_pedido, pedido.pago)}
																className="form-check-input mb-1"
																id={`pago${pedido.id_pedido}`}
																type="checkbox"
																disabled={isDisabled}
															/>
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

							{pedidosSeleccionados.map((pedido) => (
								<div key={pedido.id_pedido} className="mt-3 border rounded px-3 py-4 bg-white">
									<div className="container-fluid d-flex">
										<div className="col-8 d-flex flex-wrap">
											<h6 className="col-12 m-0"><strong>Mensualidad</strong></h6>
											<p className="col-12 mb-2">{pedido.concepto_pago}</p>
											<p className="m-0">Cant. 1</p>
										</div>
										<div className="col-4 d-flex align-items-center justify-content-end">
											<strong className="m-0 me-1">$</strong>
											<h4 className="m-0"><strong>{pedido.pago || "0"}</strong></h4>
										</div>
									</div>
								</div>
							))}

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
								<button
									className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
									onClick={proceedPayment}
								>
									<h5 className="m-0">
										<b className="secontFont text-light">Proceder al pago</b>
									</h5>
								</button>
							</div>
							<div className="mt-5 w-100 d-flex justify-content-center">
								<button
									className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
									onClick={handleGenerateLink}
									disabled={!hayPedidosSeleccionados || mutation.isLoading}
								>
									<h5 className="m-0">
										<b className="secontFont text-light">
											{mutation.isLoading ? 'Generando...' : 'Generar Link'}
										</b>
									</h5>
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
				modalDate={modalDate}
				currentDate={currentDate}
				dayDate={dayDate}
			/>
			<PayModal
				show={showPaymentForm}
				onHide={() => setShowPaymentForm(false)}
				totalPagos={totalPagos.toFixed(2)}
				pedidos={pedidos}
				seleccionados={seleccionados}
				getPedidosOrdenadosPorAntiguedad={getPedidosOrdenadosPorAntiguedad}
				getVigencia={getVigencia}
			/>
		</main>
	);
};

export default PedidosTable;