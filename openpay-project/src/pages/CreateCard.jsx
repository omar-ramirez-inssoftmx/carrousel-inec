import { useLocation } from "react-router-dom";
import CardForm from "../components/CardForm";

const CreateCard = () => {
	const location = useLocation();
	const students = location.state?.student || [];

	return <CardForm students={students} isEditMode={false} />;
};

export default CreateCard;