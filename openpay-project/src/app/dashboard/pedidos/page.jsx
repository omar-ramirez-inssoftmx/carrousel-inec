import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, loginWithMatricula } from "../../../api";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PaymentForm from '../../../components/PaymentForm';
import PlatformLayout from '../layout';
import useStudentStore from '../../../store/studentStore';
import moment from 'moment';

// Componente Modal para mostrar el link de pago
const PaymentLinkModal = ({ show, onHide, modalDate, currentDate, dayDate }) => {
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Link de pago generado</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="text-center py-3">
					<div className="alert alert-success">
						<i className="bi bi-check-circle-fill fs-1 text-success mb-3"></i>
						<h4>¡Link generado exitosamente!</h4>
						<p className="mb-0">El link de pago ha sido creado correctamente.</p>
					</div>
					<div className="mt-3">
						<p><strong>Fecha actual:</strong> {currentDate}</p>
						<p><strong>Fecha de vigencia:</strong> {modalDate}</p>
						<p><strong>Días para el vencimiento:</strong> {dayDate}</p>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={onHide}>
					Entendido
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

// Componente Modal para el formulario de pago
const PayModal = ({ show, onHide, totalPagos, pedidos, seleccionados, getPedidosOrdenadosPorAntiguedad, getVigencia }) => {
	// Filtrar los pedidos seleccionados
	const pedidosSeleccionados = pedidos.filter((pedido) => seleccionados[pedido.id_pedido]);

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
							totalPagos={totalPagos}
							pedidosSeleccionados={pedidosSeleccionados}
							getVigencia={getVigencia}
							pedidoMasViejoSeleccionado={pedidoMasViejoSeleccionado}
							onHide={onHide}
						/>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

const PedidosTable = () => {
	const navigate = useNavigate();
	const { getCurrentStudent } = useStudentStore();

	// Estados principales
	const [pedidos, setPedidos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [seleccionados, setSeleccionados] = useState({});
	const [totalPagos, setTotalPagos] = useState(0);
	const [showPaymentForm, setShowPaymentForm] = useState(false);
	const [isCreatingOrder, setIsCreatingOrder] = useState(false);

	// Estados para modales
	const [modalShow, setModalShow] = useState(false);
	const [modalDate, setModalDate] = useState('');
	const [currentDate, setCurrentDate] = useState('');
	const [dayDate, setDayDate] = useState('');

	const description = "Prueba desde sistema react";

	// Cargar datos al montar el componente
	useEffect(() => {
		const fetchPedidos = async () => {
			try {
				const currentStudent = getCurrentStudent();
				if (!currentStudent?.matricula) {
					alert("No hay estudiante seleccionado");
					navigate('/dashboard');
					return;
				}

				const data = await loginWithMatricula(currentStudent.matricula);

				if (data && data.length > 0) {
					// Filtrar solo pedidos sin open_pay_id (pedidos normales)
					const pedidosNormales = data.filter(pedido => !pedido.open_pay_id || !pedido.identificador_pago);
					setPedidos(pedidosNormales);
				} else {
					setPedidos([]);
				}
			} catch (error) {
				console.error("Error al cargar pedidos:", error);
				alert("Error al cargar pedidos: " + (error.response?.data?.message || "Intente de nuevo"));
			} finally {
				setLoading(false);
			}
		};

		fetchPedidos();
	}, [getCurrentStudent, navigate]);

	const getPedidosOrdenadosPorAntiguedad = (pedidos) => {
		return pedidos.slice().sort((a, b) => {
			if (a.fecha_vigencia_pago < b.fecha_vigencia_pago) return -1;
			if (a.fecha_vigencia_pago > b.fecha_vigencia_pago) return 1;
			return 0;
		});
	};

	const handleModalClose = () => {
		setModalShow(false);
		navigate('/');
	};

	const proceedPayment = () => {
		setShowPaymentForm(true);
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
			// Calcular total inline para evitar dependencia
			let total = 0;
			pedidos.forEach((pedido) => {
				if (inicialSeleccionados[pedido.id_pedido]) {
					total += parseFloat(pedido.pago || "0");
				}
			});
			setTotalPagos(total);
		}
	}, [colegiaturaMasAntigua, pedidos]);

	const handleGenerateLink = async () => {
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

		const vigeniaFechaDate = new Date(fechaVigenciaMasViejo);
		const fechaAcual = new Date();

		const vigent = dateFormatCurrent(vigeniaFechaDate);
		const current = dateFormatCurrent(fechaAcual);
		const diferenciaDias = dias(vigeniaFechaDate);
		console.log("diferenciaDias ", diferenciaDias);

		setCurrentDate(current);
		setModalDate(vigent);
		setDayDate(diferenciaDias);

		setIsCreatingOrder(true);

		try {
			const currentStudent = getCurrentStudent();
			const data = await createOrder(
				currentStudent.open_pay_id,
				description,
				totalPagos.toFixed(2),
				idsSeleccionados,
				fechaVigenciaMasViejo,
				pedidosSeleccionados
			);

			if (data.payment_url) {
				setModalShow(true);
			} else {
				alert('Error al generar el pago.');
			}
		} catch (error) {
			console.error("Error al crear orden:", error);
			alert("Error: " + (error.response?.data?.message || "Intente de nuevo"));
		} finally {
			setIsCreatingOrder(false);
		}
	};

	const dateFormatCurrent = (date => {
		const opciones = {
			day: "numeric",
			month: "long",
			year: "numeric"
		};

		return date.toLocaleDateString("es-Mx", opciones);
	});

	const dias = (vigencia) => {
		const fechaVigencia = moment(vigencia);
		const fechaActual = moment();

		return Math.abs(fechaActual.diff(fechaVigencia, 'days'));
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
				(colegiaturaMasAntigua && colegiaturaMasAntigua.id_pedido === pedido.id_pedido)
			) {
				total += parseFloat(pedido.pago || "0");
			}
		});
		setTotalPagos(total);
	};

	const getVigencia = (pedido) => {
		if (!pedido) return "Desconocido";

		// Ajustar la fecha sumando un día
		const fechaPago = new Date(pedido.fecha_vigencia_pago);
		fechaPago.setDate(fechaPago.getDate() + 1);
		return fechaPago.toISOString().split("T")[0];
	};

	const getNombreMes = (numeroMes) => {
		const meses = [
			"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
		];
		return meses[numeroMes - 1] || "";
	};

	// Estados de loading y error
	if (loading) {
		return (
			<PlatformLayout>
				<div className="d-flex justify-content-center align-items-center py-5">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Cargando pedidos...</span>
					</div>
				</div>
			</PlatformLayout>
		);
	}

	if (!pedidos.length) {
		return (
			<PlatformLayout>
				<div className="d-flex flex-column align-items-center justify-content-center py-5">
					<i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
					<h4 className="text-secondary mb-3">No se encontraron pedidos</h4>
					<p className="text-muted mb-4">No hay información de pedidos disponible.</p>
					<button
						className="btn btn-primary"
						onClick={() => navigate('/dashboard')}
					>
						Volver al Dashboard
					</button>
				</div>
			</PlatformLayout>
		);
	}

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
								<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionPagos">
									<div className="accordion-body">
										{getPedidosOrdenadosPorAntiguedad(pedidos).map((pedido) => {
											const isMasAntigua = colegiaturaMasAntigua && colegiaturaMasAntigua.id_pedido === pedido.id_pedido;
											const isChecked = isMasAntigua || seleccionados[pedido.id_pedido] || false;
											const isDisabled = isMasAntigua;

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

						<div className="mt-4">
							<div className="d-flex flex-column align-items-center">
								<button
									className="my-2 py-3 px-lg-5 rounded btn btn-warning backgroundYellowColor border-0 w-100"
									onClick={handleGenerateLink}
									disabled={!hayPedidosSeleccionados || isCreatingOrder}
								>
									<h5 className="m-0">
										<b className="secontFont text-light">
											{isCreatingOrder ? "Generando..." : "Generar link"}
										</b>
									</h5>
								</button>
								<button
									onClick={proceedPayment}
									className="my-2 py-3 px-lg-5 rounded btn btn-primary backgroundMainColor border-0 w-100"
									disabled={!hayPedidosSeleccionados}
								>
									<h5 className="m-0">
										<b className="secontFont text-light">Pagar ahora</b>
									</h5>
								</button>
							</div>
						</div>
					</section>
				</div>
			</section>

			{/* Modales */}
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
				totalPagos={totalPagos}
				pedidos={pedidos}
				seleccionados={seleccionados}
				getPedidosOrdenadosPorAntiguedad={getPedidosOrdenadosPorAntiguedad}
				getVigencia={getVigencia}
			/>
		</main>
	);
};

export default PedidosTable;