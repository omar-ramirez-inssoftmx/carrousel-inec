import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../../../../api";
import PlatformLayout from "../../layout";
import useStudentStore from "../../../../store/studentStore";
import { getTemporaryData } from "../../../../utils/GeneralMethods";
import { useEffect, useState } from "react";

const DetailCard = () => {
	const { cardId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { getCurrentStudent } = useStudentStore();
	const [card, setCard] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Intentar obtener la tarjeta específica de localStorage
		const cardData = getTemporaryData(`card_${cardId}`);

		if (cardData) {
			setCard(cardData);
		} else {
			// Si no está disponible, buscar en la lista de tarjetas
			const tarjetas = getTemporaryData('tarjetas');
			if (tarjetas) {
				const foundCard = tarjetas.find(t => t.id_tarjeta.toString() === cardId);
				if (foundCard) {
					setCard(foundCard);
				}
			}
		}
		setLoading(false);
	}, [cardId]);

	// Mutación para eliminar la tarjeta
	const { mutate: deleteCardMutation, isLoading: isDeleting } = useMutation({
		mutationFn: () => {
			const currentStudent = getCurrentStudent();
			return deleteCard(card.token, currentStudent?.open_pay_id, currentStudent?.id_alumno);
		},
		onSuccess: () => {
			const currentStudent = getCurrentStudent();
			// Actualizar la caché de tarjetas después de eliminar
			queryClient.invalidateQueries(['tarjetas', currentStudent?.id_alumno]);

			// Redirigir a la lista de tarjetas
			navigate("/dashboard/cards");
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

	if (loading) {
		return (
			<PlatformLayout>
				<div className="d-flex justify-content-center align-items-center py-5">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Cargando...</span>
					</div>
				</div>
			</PlatformLayout>
		);
	}

	if (!card) {
		return (
			<PlatformLayout>
				<div className="d-flex flex-column align-items-center justify-content-center py-5">
					<i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
					<h4 className="text-secondary mb-3">Tarjeta no encontrada</h4>
					<p className="text-muted mb-4">No se pudo cargar la información de la tarjeta.</p>
					<button
						className="btn btn-primary"
						onClick={() => navigate('/dashboard/cards')}
					>
						Volver a Tarjetas
					</button>
				</div>
			</PlatformLayout>
		);
	}

	return (
		<PlatformLayout>
			<section className="d-flex justify-content-between align-items-center flex-wrap px-3 pb-2 border-bottom">
				<div className="d-flex align-items-center">
					<button
						onClick={() => navigate("/dashboard/cards")}
						className="me-4 btn btn-link text-decoration-none d-flex align-items-center"
					>
						<svg style={{ height: 24 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
							<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
						</svg>
						<h3 className="m-0 ms-2"><b>**** {card.numero_tarjeta?.slice(-4)}</b></h3>
					</button>
					<h5 className="text-secondary m-0">
						Detalles de la tarjeta
					</h5>
				</div>
				<button
					type="button"
					className="btn borderMainColor"
					onClick={() => navigate(`/dashboard/cards/edit/${cardId}`)}
				>
					<h5 className="m-0 colorMain px-3 py-2">Editar tarjeta</h5>
				</button>
			</section>

			{/* Sección de Detalles de la Tarjeta */}
			<section className="p-4 border rounded mt-4">
				<div className="d-flex flex-wrap gap-4 pt-3">
					<div className="flex-fill">
						<p><strong>Nombre de la tarjeta:</strong> {card.nombre_tarjeta}</p>
						<p><strong>Número de la tarjeta:</strong> {card.tipo} - **** {card.numero_tarjeta?.slice(-4)}</p>
						<p><strong>Teléfono celular:</strong> {card.telefono}</p>
						<p><strong>Código postal:</strong> {card.postal}</p>
					</div>
					<div className="flex-fill">
						<p><strong>Nombre del dueño:</strong> {card.titular}</p>
						<p><strong>Fecha de vencimiento:</strong> {card.vencimiento}</p>
						<p><strong>Ciudad:</strong> {card.ciudad}</p>
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