import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateCard, deleteCard } from "../../../api";
import PlatformLayout from "../layout";
import useStudentStore from "../../../store/studentStore";
import { setTemporaryData, getTemporaryData } from "../../../utils/GeneralMethods";

const ListCard = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { getCurrentStudent } = useStudentStore();

	// Obtener tarjetas del state o localStorage
	const stateTarjetas = location.state?.tarjetas;
	const storedTarjetas = getTemporaryData('tarjetas');
	const tarjetas = stateTarjetas || storedTarjetas || [];

	// Inicializa el estado con isPrimary basado en activa=1
	const [cards, setCards] = useState(
		tarjetas.map(card => ({
			...card,
			isPrimary: card.activa === 1
		}))
	);

	// Actualiza las tarjetas cuando cambia location.state o localStorage
	useEffect(() => {
		if (stateTarjetas) {
			// Guardar en localStorage si viene del state
			setTemporaryData('tarjetas', stateTarjetas);
		}

		setCards(
			tarjetas.map(card => ({
				...card,
				isPrimary: card.activa === 1
			}))
		);
	}, [tarjetas, stateTarjetas]);

	const { mutate: activateCardMutation, isLoading: isActivating } = useMutation({
		mutationFn: ({ id_tarjeta, id_alumno }) => activateCard(id_tarjeta, id_alumno),
		onSuccess: () => {
			queryClient.invalidateQueries(['tarjetas']); // Revalida los datos
			alert("Tarjeta principal actualizada correctamente");
		},
		onError: (error) => {
			console.error("Error al activar la tarjeta:", error);
			alert("Error al actualizar la tarjeta principal");
		},
	});

	// Mutación para eliminar tarjeta
	const { mutate: deleteCardMutation, isLoading: isDeleting } = useMutation({
		mutationFn: ({ token, open_pay_id, id_alumno }) => deleteCard(token, open_pay_id, id_alumno),
		onSuccess: () => {
			const currentStudent = getCurrentStudent();
			// Actualizar la caché de tarjetas después de eliminar
			queryClient.invalidateQueries(['tarjetas', currentStudent?.id_alumno]);
			alert("Tarjeta eliminada correctamente");
		},
		onError: (error) => {
			console.error("Error al eliminar tarjeta:", error);
			alert("Error al eliminar la tarjeta");
		}
	});

	const handleSetPrimary = (id_tarjeta) => {
		const currentStudent = getCurrentStudent();
		const id_alumno = currentStudent?.id_alumno;
		if (!id_alumno) {
			alert("No se encontró el ID del alumno");
			return;
		}

		// Optimistic update
		setCards(cards.map(card => ({
			...card,
			isPrimary: card.id_tarjeta === id_tarjeta
		})));

		activateCardMutation({ id_tarjeta, id_alumno });
	};

	const handleDeleteCard = (card) => {
		if (window.confirm("¿Estás seguro de que deseas eliminar esta tarjeta?")) {
			const currentStudent = getCurrentStudent();
			deleteCardMutation({
				token: card.token,
				open_pay_id: currentStudent?.open_pay_id,
				id_alumno: currentStudent?.id_alumno
			});
		}
	};

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