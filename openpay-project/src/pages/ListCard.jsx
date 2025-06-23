import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateCard } from "../api";
import PlatformLayout from "../layouts/PlatfomLayout";

const ListCard = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const students = location.state?.student || [];
	const tarjetas = location.state?.tarjetas || [];

	// Inicializa el estado con isPrimary basado en activa=1
	const [cards, setCards] = useState(
		tarjetas.map(card => ({
			...card,
			isPrimary: card.activa === 1
		}))
	);

	// Actualiza las tarjetas cuando cambia location.state
	useEffect(() => {
		setCards(
			tarjetas.map(card => ({
				...card,
				isPrimary: card.activa === 1
			}))
		);
	}, [tarjetas]);

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

	const handleSetPrimary = (id_tarjeta) => {
		const id_alumno = students[0]?.id_alumno;
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

	return (
		<PlatformLayout>
			<section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
				<div className="d-flex flex-wrap align-items-center col-auto">
					<h3 className="m-0 mb-3"><strong>Tarjetas</strong></h3>
					{cards.length > 0 && (
						<h5 className="mt-1 ms-3 ms-md-5 text-secondary m-0 mb-3 me-lg-5">
							Selecciona una tarjeta para ver su detalle
						</h5>
					)}
				</div>
				<button
					type="button"
					className="btn col-auto borderMainColor mb-3 ms-lg-5"
					onClick={() => navigate("/dashboard/CreateCard", { state: { student: students } })}
				>
					<h5 className="m-0 colorMain px-3 py-2">Agregar nueva tarjeta</h5>
				</button>
			</section>

			{cards.length === 0 ? (
				<div className="d-flex flex-column align-items-center justify-content-center py-5 w-100">
					<h4 className="text-secondary mb-4">No se encontraron tarjetas registradas</h4>

				</div>
			) : (
				<section className="d-flex flex-column w-100 gap32 pt-4 pb-2 px-3 border-bottom">
					{cards.map((card) => (
						<div
							onClick={(e) => {
								if (!e.target.closest('input[type="radio"]')) {
									navigate("/dashboard/DetailCard", { state: { card: card, student: students, tarjetas } });
								}
							}}
							key={card.id_tarjeta}
							className={`d-flex justify-content-between align-items-center p-3 border rounded ${card.isPrimary ? 'bg-primary-light' : 'bg-light'}`}
						>
							<div className="d-flex align-items-center">
								<label className={`d-flex align-items-center gap-3 border py-3 px-3 rounded cardPago w-100`}>
									<input
										type="radio"
										name="primaryCard"
										checked={card.isPrimary}
										onChange={() => handleSetPrimary(card.id_tarjeta)}
										className="flex-shrink-0"
										disabled={isActivating}
									/>
									<div className="pointer-events-none">
										<strong className={card.isPrimary ? 'colorMain' : ''}>
											{card.nombre_tarjeta}
										</strong>
										<p className={`m-0 ${card.isPrimary ? 'colorMain' : 'text-secondary'}`}>
											{card.isPrimary ? "Principal" : "Selecciona como principal"}
										</p>
									</div>
								</label>
							</div>
							<div className="d-flex align-items-center">
								<span className={`me-2 ${card.isPrimary ? 'colorMain' : ''}`}>
									{card.numero_tarjeta ? `**** ${card.numero_tarjeta.slice(-4)}` : '**** ****'}
								</span>
								<img
									src={card.tipo.toLowerCase() === "visa" ? "/visa.png" : "/mastercard.png"}
									alt={card.tipo}
									style={{ width: "40px", height: "auto" }}
								/>
							</div>
						</div>
					))}
				</section>
			)}
		</PlatformLayout>
	);
};

export default ListCard;