import { useLocation } from "react-router-dom";
import CardForm from "../../../../components/CardForm";

const EditCard = () => {
	const location = useLocation();
	const cardData = location.state?.card || {};

	return <CardForm isEditMode={true} initialCardData={cardData} />;
};

export default EditCard;