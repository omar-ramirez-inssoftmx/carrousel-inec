import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../api";
import PlatformLayout from "../layouts/PlatfomLayout";

const DetailCard = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const students = location.state?.student || [];
	const tarjetas = location.state?.tarjetas || [];
	const card = location.state?.card || {};

	// Mutación para eliminar la tarjeta
	const { mutate: deleteCardMutation, isLoading: isDeleting } = useMutation({
		mutationFn: () => deleteCard(card.token, students[0]?.open_pay_id, students[0]?.id_alumno),
		onSuccess: () => {
			// Actualizar la caché de tarjetas después de eliminar
			queryClient.invalidateQueries(['tarjetas', students[0]?.id_alumno]);

			// Redirigir a la lista de tarjetas con estado actualizado
			const updatedCards = tarjetas.filter(t => t.id_tarjeta !== card.id_tarjeta);
			navigate("/dashboard/ListCard", {
				state: {
					student: students,
					tarjetas: updatedCards
				}
			});
		},
		onError: (error) => {
			console.error("Error al eliminar tarjeta:", error);
			alert("Error al eliminar la tarjeta");
		}
	});

	const handleDeleteCard = () => {
		if (window.confirm("¿Estás seguro de que deseas eliminar esta tarjeta?")) {
			deleteCardMutation();
		}
	};

	return (
		<PlatformLayout>
			<section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
				<div className="d-flex flex-wrap align-items-center col-auto">

					<button
						onClick={() => navigate("/dashboard/ListCard", { state: { student: students, tarjetas } })}
						className="col-auto me-4 btn btn-link text-decoration-none d-flex align-items-center"
					>
						<svg style={{ height: 24 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
							<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
						</svg>
						<h3 className="m-0 ms-2"><b>**** {card.numero_tarjeta?.slice(-4)}</b></h3>
					</button>
					<h5 className="mt-1 ms-3 ms-md-5 text-secondary m-0 mb-3 me-lg-5">
						Detalles de la tarjeta
					</h5>
				</div>
				<button
					type="button"
					className="btn col-auto borderMainColor mb-3 ms-lg-5"
					onClick={() => navigate("/dashboard/CreateCard", { state: { student: students } })}
				>
					<h5 className="m-0 colorMain px-3 py-2">Editar tarjeta</h5>
				</button>
			</section>

			{/* Sección de Detalles de la Tarjeta */}
			<section className="card-details w-100 p-4 border rounded mt-4">
				<div className="row pt-3">
					<div className="col-md-6">
						<p><strong>Nombre de la tarjeta:</strong> {card.nombre_tarjeta}</p>
						<p><strong>Número de la tarjeta:</strong> {card.tipo} - **** {card.numero_tarjeta?.slice(-4)}</p>
						<p><strong>Teléfono celular:</strong> {card.telefono}</p>
						<p><strong>Código postal:</strong> {card.postal}</p>
					</div>
					<div className="col-md-6">
						<p><strong>Nombre del dueño:</strong> {card.titular}</p>
						<p><strong>Fecha de vencimiento:</strong> {card.vencimiento}</p>
						<p><strong>Ciudad:</strong>{card.ciudad}</p>
					</div>
				</div>
				<div className="text-center mt-3">
					<button
						className="btn btn-danger"
						onClick={handleDeleteCard}
						disabled={isDeleting}
					>
						{isDeleting ? (
							<>
								<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
								Eliminando...
							</>
						) : (
							"Eliminar tarjeta de wallet"
						)}
					</button>
				</div>
			</section>
		</PlatformLayout>
	);
};

export default DetailCard;