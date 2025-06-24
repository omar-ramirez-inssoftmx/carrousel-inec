import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardForm from "../../../../components/CardForm";
import { getTemporaryData } from "../../../../utils/GeneralMethods";
import PlatformLayout from "../../layout";

const EditCard = () => {
	const { cardId } = useParams();
	const [cardData, setCardData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Intentar obtener la tarjeta específica de localStorage
		const cardInfo = getTemporaryData(`card_${cardId}`);

		if (cardInfo) {
			setCardData(cardInfo);
		} else {
			// Si no está disponible, buscar en la lista de tarjetas
			const tarjetas = getTemporaryData('tarjetas');
			if (tarjetas) {
				const foundCard = tarjetas.find(t => t.id_tarjeta.toString() === cardId);
				if (foundCard) {
					setCardData(foundCard);
				}
			}
		}
		setLoading(false);
	}, [cardId]);

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

	if (!cardData) {
		return (
			<PlatformLayout>
				<div className="d-flex flex-column align-items-center justify-content-center py-5">
					<i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
					<h4 className="text-secondary mb-3">Tarjeta no encontrada</h4>
					<p className="text-muted mb-4">No se pudo cargar la información de la tarjeta para editar.</p>
					<button
						className="btn btn-primary"
						onClick={() => window.history.back()}
					>
						Volver
					</button>
				</div>
			</PlatformLayout>
		);
	}

	return <CardForm isEditMode={true} initialCardData={cardData} />;
};

export default EditCard;