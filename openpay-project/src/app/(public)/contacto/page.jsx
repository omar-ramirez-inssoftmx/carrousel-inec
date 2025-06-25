import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layout';

const Contacto = () => {
	const navigate = useNavigate();

	return (
		<PublicLayout>
			<div className="p-4 w-100" style={{ maxWidth: '600px' }}>
				<div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
					<h2 className="m-0">Información de Contacto</h2>
					<button
						className="btn btn-outline-secondary"
						onClick={() => navigate('/')}
					>
						Volver
					</button>
				</div>

				<div className="text-justify">
					<h4>¿Necesitas ayuda?</h4>
					<p>
						Estamos aquí para ayudarte. Si tienes alguna pregunta, sugerencia o necesitas soporte,
						no dudes en contactarnos a través de los siguientes medios:
					</p>

					<div className="row mt-4">
						<div className="col-md-6">
							<h5><i className="fas fa-envelope me-2"></i>Correo Electrónico</h5>
							<p>soporte@empresa.com</p>
							<p>info@empresa.com</p>
						</div>
						<div className="col-md-6">
							<h5><i className="fas fa-phone me-2"></i>Teléfono</h5>
							<p>+52 (55) 1234-5678</p>
							<p>+52 (55) 8765-4321</p>
						</div>
					</div>

					<div className="row mt-3">
						<div className="col-md-6">
							<h5><i className="fas fa-map-marker-alt me-2"></i>Dirección</h5>
							<p>
								Calle Principal #123<br />
								Colonia Centro<br />
								Ciudad, Estado, C.P. 12345<br />
								México
							</p>
						</div>
						<div className="col-md-6">
							<h5><i className="fas fa-clock me-2"></i>Horarios de Atención</h5>
							<p>
								Lunes a Viernes: 9:00 AM - 6:00 PM<br />
								Sábados: 9:00 AM - 2:00 PM<br />
								Domingos: Cerrado
							</p>
						</div>
					</div>

					<div className="mt-4">
						<h5>Soporte Técnico</h5>
						<p>
							Para asistencia técnica inmediata, puedes contactarnos las 24 horas del día,
							los 7 días de la semana a través de nuestro correo de soporte técnico.
						</p>
					</div>
				</div>
			</div>
		</PublicLayout>
	);
};

export default Contacto;