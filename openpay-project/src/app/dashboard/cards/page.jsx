import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { listMatriculaStudentCard, activateCard, deleteCard } from "../../../api";
import PlatformLayout from "../layout";
import useStudentStore from "../../../store/studentStore";

const ListCard = () => {
	const navigate = useNavigate();
	const { getCurrentStudent } = useStudentStore();

	const [cards, setCards] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isActivating, setIsActivating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	// Cargar tarjetas al montar el componente
	useEffect(() => {
		const fetchCards = async () => {
			const currentStudent = getCurrentStudent();
			if (!currentStudent?.open_pay_id || !currentStudent?.matricula) {
				setLoading(false);
				return;
			}

			try {
				const tarjetas = await listMatriculaStudentCard(
					currentStudent.open_pay_id,
					currentStudent.matricula
				);

				const cardsWithPrimary = tarjetas.map(card => ({
					...card,
					isPrimary: card.activa === 1
				}));

				setCards(cardsWithPrimary);
			} catch (error) {
				console.error("Error al cargar tarjetas:", error);
				alert("No se pudieron cargar las tarjetas.");
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, [getCurrentStudent]);

	const handleSetPrimary = async (id_tarjeta) => {
		const currentStudent = getCurrentStudent();
		const id_alumno = currentStudent?.id_alumno;
		if (!id_alumno) {
			alert("No se encontró el ID del alumno");
			return;
		}

		setIsActivating(true);

		try {
			// Optimistic update
			setCards(cards.map(card => ({
				...card,
				isPrimary: card.id_tarjeta === id_tarjeta
			})));

			await activateCard(id_tarjeta, id_alumno);
			alert("Tarjeta principal actualizada correctamente");
		} catch (error) {
			console.error("Error al activar la tarjeta:", error);
			alert("Error al actualizar la tarjeta principal");

			// Revertir optimistic update
			setCards(cards.map(card => ({
				...card,
				isPrimary: card.activa === 1
			})));
		} finally {
			setIsActivating(false);
		}
	};

	const handleDeleteCard = async (card) => {
		if (!window.confirm("¿Estás seguro de que deseas eliminar esta tarjeta?")) {
			return;
		}

		const currentStudent = getCurrentStudent();
		if (!currentStudent?.open_pay_id || !currentStudent?.id_alumno) {
			alert("No se encontraron los datos del estudiante");
			return;
		}

		setIsDeleting(true);

		try {
			await deleteCard(card.token, currentStudent.open_pay_id, currentStudent.id_alumno);

			// Actualizar el estado local removiendo la tarjeta eliminada
			setCards(cards.filter(c => c.id_tarjeta !== card.id_tarjeta));
			alert("Tarjeta eliminada correctamente");
		} catch (error) {
			console.error("Error al eliminar tarjeta:", error);
			alert("Error al eliminar la tarjeta");
		} finally {
			setIsDeleting(false);
		}
	};

	if (loading) {
		return (
			<PlatformLayout>
				<div className="d-flex justify-content-center align-items-center py-5">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Cargando tarjetas...</span>
					</div>
				</div>
			</PlatformLayout>
		);
	}

	return (
		<PlatformLayout>
			<section className="d-flex justify-content-between align-items-center flex-wrap px-3 pb-2 border-bottom">
				<div className="d-flex flex-column">
					<h3 className="m-0 mb-3"><strong>Tarjetas</strong></h3>
					{cards.length > 0 && (
						<h5 className="text-secondary m-0 mb-3">
							Administra tus tarjetas registradas
						</h5>
					)}
				</div>
				<button
					type="button"
					className="btn borderMainColor mb-3"
					onClick={() => navigate("/dashboard/create-card")}
				>
					<h5 className="m-0 colorMain px-3 py-2">Agregar nueva tarjeta</h5>
				</button>
			</section>

			{cards.length === 0 ? (
				<div className="d-flex flex-column align-items-center justify-content-center py-5">
					<h4 className="text-secondary mb-4">No se encontraron tarjetas registradas</h4>
				</div>
			) : (
				<section className="d-flex flex-column gap-3 pt-4 pb-2 px-3">
					{cards.map((card) => (
						<div
							key={card.id_tarjeta}
							className={`p-4 border rounded-3 ${card.isPrimary ? 'border-primary bg-primary bg-opacity-10' : 'bg-light'}`}
						>
							{/* Header de la tarjeta */}
							<div className="d-flex justify-content-between align-items-center mb-3">
								<div className="d-flex align-items-center">
									<label className="d-flex align-items-center gap-3">
										<input
											type="radio"
											name="primaryCard"
											checked={card.isPrimary}
											onChange={() => handleSetPrimary(card.id_tarjeta)}
											className="flex-shrink-0"
											disabled={isActivating}
										/>
										<div>
											<strong className={`fs-5 ${card.isPrimary ? 'text-primary' : ''}`}>
												{card.nombre_tarjeta}
											</strong>
											<p className={`m-0 small ${card.isPrimary ? 'text-primary' : 'text-secondary'}`}>
												{card.isPrimary ? "Tarjeta Principal" : "Seleccionar como principal"}
											</p>
										</div>
									</label>
								</div>
								<div className="d-flex align-items-center gap-3">
									<span className={`fs-6 fw-medium ${card.isPrimary ? 'text-primary' : ''}`}>
										{card.numero_tarjeta ? `**** ${card.numero_tarjeta.slice(-4)}` : '**** ****'}
									</span>
									<img
										src={card.tipo.toLowerCase() === "visa" ? "/visa.png" : "/mastercard.png"}
										alt={card.tipo}
										style={{ width: "40px", height: "auto" }}
									/>
								</div>
							</div>

							{/* Detalles de la tarjeta */}
							<div className="row g-3 mb-3">
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Nombre de la tarjeta</small>
										<span className="fw-medium">{card.nombre_tarjeta}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Nombre del titular</small>
										<span className="fw-medium">{card.titular}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Número de tarjeta</small>
										<span className="fw-medium">{card.tipo} - **** {card.numero_tarjeta?.slice(-4)}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Fecha de vencimiento</small>
										<span className="fw-medium">{card.vencimiento}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Teléfono</small>
										<span className="fw-medium">{card.telefono}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Ciudad</small>
										<span className="fw-medium">{card.ciudad}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="d-flex flex-column">
										<small className="text-muted fw-medium">Código postal</small>
										<span className="fw-medium">{card.postal}</span>
									</div>
								</div>
							</div>

							{/* Botón de eliminar */}
							<div className="d-flex justify-content-end">
								<button
									className="btn btn-outline-danger btn-sm"
									onClick={() => handleDeleteCard(card)}
									disabled={isDeleting}
								>
									{isDeleting ? (
										<>
											<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
											Eliminando...
										</>
									) : (
										<>
											<i className="bi bi-trash me-2"></i>
											Eliminar tarjeta
										</>
									)}
								</button>
							</div>
						</div>
					))}
				</section>
			)}
		</PlatformLayout>
	);
};

export default ListCard;