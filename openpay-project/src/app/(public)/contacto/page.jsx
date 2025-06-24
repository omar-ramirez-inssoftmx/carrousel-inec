import { useNavigate } from 'react-router-dom';
import { contacto } from '../../../api';
import PublicLayout from '../../../layouts/PublicLayout';
import ContentLoader from '../../../components/ContentLoader';

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

				<ContentLoader
					fetchFunction={contacto}
					renderContent={(contactoData) => (
						<div className="text-justify">
							{contactoData ? (
								<div dangerouslySetInnerHTML={{ __html: contactoData.descripcion || contactoData.valor || 'Información no disponible' }} />
							) : (
								<p>No hay información de contacto disponible.</p>
							)}
						</div>
					)}
				/>
			</div>
		</PublicLayout>
	);
};

export default Contacto;