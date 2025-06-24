import { useNavigate } from 'react-router-dom';
import { terminos } from '../../../api';
import PublicLayout from '../../../layouts/PublicLayout';
import ContentLoader from '../../../components/ContentLoader';

const TerminosCondiciones = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="p-4 w-100" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h2 className="m-0">Términos y Condiciones</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/')}
          >
            Volver
          </button>
        </div>

        <ContentLoader
          fetchFunction={terminos}
          renderContent={(terminosData) => (
            <div className="text-justify">
              {terminosData ? (
                <div dangerouslySetInnerHTML={{ __html: terminosData.descripcion || terminosData.valor || 'Contenido no disponible' }} />
              ) : (
                <p>No hay información disponible en este momento.</p>
              )}
            </div>
          )}
        />
      </div>
    </PublicLayout>
  );
};

export default TerminosCondiciones;