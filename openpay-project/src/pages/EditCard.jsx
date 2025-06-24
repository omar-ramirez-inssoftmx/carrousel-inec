import { useLocation } from "react-router-dom";
import CardForm from "../components/CardForm";

const EditCard = () => {
	const location = useLocation();
	const students = location.state?.student || [];
	const cardData = location.state?.card || {};

	return <CardForm students={students} isEditMode={true} initialCardData={cardData} />;
};

export default EditCard;