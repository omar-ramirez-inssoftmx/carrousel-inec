import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCard } from "../../../api";
import { useOpenPayConfig, validateCardData } from '../../../utils/openPayConfig';
import useStudentStore from '../../../store/studentStore';
import PlatformLayout from "../layout";

const CreateCard = ({ initialCardData = null }) => {
	const { getCurrentStudent } = useStudentStore();
	const navigate = useNavigate();
	const deviceSessionId = useOpenPayConfig();

	const [cardData, setCardData] = useState({
		holder_name: initialCardData?.holder_name || "",
		card_number: initialCardData?.card_number || "",
		expiration_month: initialCardData?.expiration_month || "",
		expiration_year: initialCardData?.expiration_year || "",
		cvv2: "",
		isCard: false,
		nombre_tarjeta: initialCardData?.nombre_tarjeta || ""
	});

	const [formData, setFormData] = useState({
		telefono: initialCardData?.telefono || "",
		ciudad: initialCardData?.ciudad || "",
		postal: initialCardData?.postal || "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		const validationError = validateCardData(cardData, formData);
		if (validationError) {
			alert(validationError);
			return;
		}

		if (!deviceSessionId) {
			alert("Error de configuración. Intente de nuevo.");
			return;
		}

		const currentStudent = getCurrentStudent();
		if (!currentStudent) {
			alert("No hay estudiante seleccionado");
			return;
		}

		setIsLoading(true);

		try {
			await createCard(
				cardData.card_number,
				cardData.holder_name,
				cardData.expiration_year,
				cardData.expiration_month,
				cardData.cvv2,
				deviceSessionId,
				currentStudent.open_pay_id,
				currentStudent.id_alumno,
				cardData.nombre_tarjeta,
				formData.telefono,
				formData.ciudad,
				formData.postal
			);

			alert("Tarjeta creada exitosamente");
			// Navegar a tarjetas, donde se hará el fetching automático
			navigate("/dashboard/cards");

		} catch (error) {
			console.error("Error al crear tarjeta:", error);
			alert("Error: " + (error.response?.data?.message || "Intente de nuevo"));
		} finally {
			setIsLoading(false);
		}
	};

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
						<h3 className="m-0 ms-2"><b>Agregar nueva tarjeta</b></h3>
					</button>
				</div>
			</section>

			<section className="p-4">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<div className="card">
							<div className="card-header">
								<h5 className="mb-0">Información de la tarjeta</h5>
							</div>
							<div className="card-body">
								<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
									<div className="mb-3">
										<label htmlFor="nombre_tarjeta" className="form-label">Nombre de la tarjeta</label>
										<input
											type="text"
											className="form-control"
											id="nombre_tarjeta"
											name="nombre_tarjeta"
											value={cardData.nombre_tarjeta}
											onChange={handleInputChange}
											placeholder="Ej: Mi tarjeta principal"
											required
										/>
									</div>

									<div className="mb-3">
										<label htmlFor="holder_name" className="form-label">Nombre del titular</label>
										<input
											type="text"
											className="form-control"
											id="holder_name"
											name="holder_name"
											value={cardData.holder_name}
											onChange={handleInputChange}
											placeholder="Nombre completo como aparece en la tarjeta"
											required
										/>
									</div>

									<div className="mb-3">
										<label htmlFor="card_number" className="form-label">Número de tarjeta</label>
										<input
											type="text"
											className="form-control"
											id="card_number"
											name="card_number"
											value={cardData.card_number}
											onChange={handleInputChange}
											placeholder="1234 5678 9012 3456"
											maxLength="19"
											required
										/>
									</div>

									<div className="row">
										<div className="col-md-4 mb-3">
											<label htmlFor="expiration_month" className="form-label">Mes</label>
											<select
												className="form-select"
												id="expiration_month"
												name="expiration_month"
												value={cardData.expiration_month}
												onChange={handleInputChange}
												required
											>
												<option value="">Mes</option>
												{Array.from({ length: 12 }, (_, i) => (
													<option key={i + 1} value={String(i + 1).padStart(2, '0')}>
														{String(i + 1).padStart(2, '0')}
													</option>
												))}
											</select>
										</div>
										<div className="col-md-4 mb-3">
											<label htmlFor="expiration_year" className="form-label">Año</label>
											<select
												className="form-select"
												id="expiration_year"
												name="expiration_year"
												value={cardData.expiration_year}
												onChange={handleInputChange}
												required
											>
												<option value="">Año</option>
												{Array.from({ length: 10 }, (_, i) => {
													const year = new Date().getFullYear() + i;
													return (
														<option key={year} value={String(year).slice(-2)}>
															{year}
														</option>
													);
												})}
											</select>
										</div>
										<div className="col-md-4 mb-3">
											<label htmlFor="cvv2" className="form-label">CVV</label>
											<input
												type="text"
												className="form-control"
												id="cvv2"
												name="cvv2"
												value={cardData.cvv2}
												onChange={handleInputChange}
												placeholder="123"
												maxLength="4"
												required
											/>
										</div>
									</div>

									<hr />

									<h6 className="mb-3">Información de contacto</h6>

									<div className="mb-3">
										<label htmlFor="telefono" className="form-label">Teléfono</label>
										<input
											type="tel"
											className="form-control"
											id="telefono"
											name="telefono"
											value={formData.telefono}
											onChange={handleInputChange}
											placeholder="5551234567"
											required
										/>
									</div>

									<div className="mb-3">
										<label htmlFor="ciudad" className="form-label">Ciudad</label>
										<input
											type="text"
											className="form-control"
											id="ciudad"
											name="ciudad"
											value={formData.ciudad}
											onChange={handleInputChange}
											placeholder="Ciudad de México"
											required
										/>
									</div>

									<div className="mb-3">
										<label htmlFor="postal" className="form-label">Código postal</label>
										<input
											type="text"
											className="form-control"
											id="postal"
											name="postal"
											value={formData.postal}
											onChange={handleInputChange}
											placeholder="12345"
											maxLength="5"
											required
										/>
									</div>

									<div className="form-check mb-3">
										<input
											className="form-check-input"
											type="checkbox"
											id="isCard"
											name="isCard"
											checked={cardData.isCard}
											onChange={handleInputChange}
										/>
										<label className="form-check-label" htmlFor="isCard">
											Guardar tarjeta para futuros pagos
										</label>
									</div>

									<div className="d-grid gap-2">
										<button
											type="submit"
											className="btn btn-primary"
											disabled={isLoading}
										>
											{isLoading ? (
												<>
													<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
													Guardando...
												</>
											) : (
												"Guardar tarjeta"
											)}
										</button>
										<button
											type="button"
											className="btn btn-outline-secondary"
											onClick={() => navigate("/dashboard/cards")}
											disabled={isLoading}
										>
											Cancelar
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PlatformLayout>
	);
};

export default CreateCard; 