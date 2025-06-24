import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createCard } from "../api";
import PlatformLayout from "../layouts/PlatfomLayout";

const EditCard = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const students = location.state?.student || [];

	const [cardData, setCardData] = useState({
		holder_name: "",
		card_number: "",
		expiration_month: "",
		expiration_year: "",
		cvv2: "",
		isCard: false,
		nombre_tarjeta: ""
	});

	// Estado para los demás campos del formulario
	const [formData, setFormData] = useState({
		telefono: "",
		ciudad: "",
		postal: "",
	});


	const [deviceSessionId, setDeviceSessionId] = useState("");

	useEffect(() => {
		window.OpenPay.setId(process.env.REACT_APP_OPENPAY_ID);
		window.OpenPay.setApiKey(process.env.REACT_APP_OPENPAY_API_KEY);
		window.OpenPay.setSandboxMode(process.env.REACT_APP_OPENPAY_SANDBOX_MODE === 'true');
		setDeviceSessionId(window.OpenPay.deviceData.setup());
	}, []);

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (name in cardData) {
			setCardData({
				...cardData,
				[name]: type === 'checkbox' ? checked : value
			});
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const mutation = useMutation({

		mutationFn: ({
			card_number,
			holder_name,
			expiration_year,
			expiration_month,
			cvv2,
			device_session_id,
			customer_id,
			id_alumno,
			nombre_tarjeta,
			telefono,
			ciudad,
			postal

		}) => createCard(
			card_number,
			holder_name,
			expiration_year,
			expiration_month,
			cvv2,
			device_session_id,
			customer_id,
			id_alumno,
			nombre_tarjeta,
			telefono,
			ciudad,
			postal
		),
		onSuccess: (data) => {
			if (data) {
				alert('Tarjeta registrada correctamente.');
			} else {
				alert('Error al guardar la tarjeta.');
			}
		},
		onError: (error) => {
			alert("Error: " + (error.response?.data?.message || "Intente de nuevo"));
		}
	});


	const handleCreateCard = () => {
		console.log("cardData ", cardData);

		if (
			!cardData.holder_name ||
			!cardData.nombre_tarjeta ||
			!cardData.card_number ||
			!cardData.expiration_month ||
			!cardData.expiration_year ||
			!cardData.cvv2 ||
			!deviceSessionId ||
			!formData.telefono ||
			!formData.ciudad ||
			!formData.postal
		) {
			alert("Todos los campos son obligatorios");
			return;
		}

		mutation.mutate({
			card_number: cardData.card_number,
			holder_name: cardData.holder_name,
			expiration_year: cardData.expiration_year,
			expiration_month: cardData.expiration_month,
			cvv2: cardData.cvv2,
			deviceSessionId: deviceSessionId,
			customer_id: students[0].open_pay_id,
			id_alumno: students[0].id_alumno,
			nombre_tarjeta: cardData.nombre_tarjeta,
			telefono: formData.telefono,
			ciudad: formData.ciudad,
			postal: formData.postal
		});
	};

	return (
		<PlatformLayout>
			<section className="d-flex justify-content-center align-items-center px-3 pb-2 border-bottom">
				<button
					onClick={() => navigate("/")}
					className="me-4 btn btn-link text-decoration-none d-flex align-items-center"
				>
					<h3 className="m-0 ms-2"><b>Tarjetas</b></h3>
				</button>
				<h5 className="text-secondary m-0">Editar tarjeta</h5>
			</section>

			<section className="d-flex flex-column gap32 pt-4 pb-2 px-3 border-bottom">
				<div className="d-flex flex-column mt-3 mb-2">
					<label htmlFor="nombre_tarjeta" className="mb-1"><strong>Nombre de la tarjeta</strong></label>
					<input
						name="nombre_tarjeta"
						placeholder="Ingresa nombre del metodo de pago"
						className="inputCustom p-3"
						value={cardData.nombre_tarjeta}
						onChange={handleInputChange}
					/>
				</div>
				<div className="d-flex flex-column mt-3 mb-2">
					<label htmlFor="holder_name" className="mb-1"><strong>Nombre del dueño de la tarjeta</strong></label>
					<input
						name="holder_name"
						placeholder="Ingresa nombre completo del dueño"
						className="inputCustom p-3"
						value={cardData.holder_name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="d-flex flex-column mt-3 mb-2">
					<label htmlFor="card_number" className="mb-1"><strong>Números de la tarjeta</strong></label>
					<input
						name="card_number"
						placeholder="Ingresa los 16 dígitos de tu tarjeta"
						className="inputCustom p-3"
						value={cardData.card_number}
						onChange={handleInputChange}
						maxLength="16"
					/>
				</div>
				<div className="d-flex flex-wrap gap-3">
					<div className="flex-fill d-flex flex-column mt-3 mb-2">
						<label htmlFor="expiration_month" className="mb-1"><strong>Fecha de vencimiento</strong></label>
						<div className="d-flex gap-2">
							<input
								name="expiration_month"
								placeholder="Mes"
								className="inputCustom p-3 flex-fill"
								value={cardData.expiration_month}
								onChange={handleInputChange}
							/>
							<input
								name="expiration_year"
								placeholder="Año"
								className="inputCustom p-3 flex-fill"
								value={cardData.expiration_year}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex-fill d-flex flex-column mt-3 mb-2">
						<label htmlFor="cvv2" className="mb-1"><strong>Código de Seguridad</strong></label>
						<input
							name="cvv2"
							placeholder="Ingresa código de seguridad"
							className="inputCustom p-3"
							value={cardData.cvv2}
							onChange={handleInputChange}
							maxLength="4"
						/>
					</div>
				</div>

				<h4 className="mt-4"><strong>Datos personales</strong></h4>

				<div className="d-flex flex-column mt-3 mb-2">
					<label htmlFor="telefono" className="mb-1"><strong>Teléfono celular</strong></label>
					<input
						name="telefono"
						placeholder="Ingresa tu teléfono celular"
						className="inputCustom p-3"
						value={formData.telefono}
						onChange={handleInputChange}
					/>
				</div>
				<div className="d-flex flex-column mt-3 mb-2">
					<label htmlFor="ciudad" className="mb-1"><strong>Ciudad</strong></label>
					<input
						name="ciudad"
						placeholder="Ingresa tu ciudad"
						className="inputCustom p-3"
						value={formData.ciudad}
						onChange={handleInputChange}
					/>
				</div>
				<div className="d-flex flex-column mt-3 mb-2">
					<label htmlFor="postal" className="mb-1"><strong>Código postal</strong></label>
					<input
						name="postal"
						placeholder="Ingresa tu código postal"
						className="inputCustom p-3"
						value={formData.postal}
						onChange={handleInputChange}
					/>
				</div>

				<div className="d-flex justify-content-center mt-4">
					<button
						className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
						onClick={handleCreateCard}
						disabled={mutation.isLoading}
					>
						<h5 className="m-0">
							<b className="secontFont text-light">
								{mutation.isLoading ? "Guardando..." : "Actualizar tarjeta"}
							</b>
						</h5>
					</button>
				</div>
			</section>
		</PlatformLayout>
	);
};

export default EditCard;