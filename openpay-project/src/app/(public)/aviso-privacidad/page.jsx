import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layout';

const AvisoPrivacidad = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="p-4 w-100" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <h2 className="m-0">Aviso de Privacidad</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/')}
          >
            Volver
          </button>
        </div>

        <div className="text-justify">
          <h4>Responsable del Tratamiento de Datos</h4>
          <p>
            Nuestra organización se compromete a proteger la privacidad y confidencialidad de la información personal
            que nos proporcionen nuestros usuarios y clientes.
          </p>

          <h4>Datos Personales que Recabamos</h4>
          <p>
            Los datos personales que recabamos pueden incluir: nombre completo, dirección de correo electrónico,
            número telefónico, información de pago y cualquier otra información necesaria para brindar nuestros servicios.
          </p>

          <h4>Finalidades del Tratamiento</h4>
          <p>
            Sus datos personales serán utilizados para las siguientes finalidades:
          </p>
          <ul>
            <li>Procesamiento de pagos y transacciones</li>
            <li>Comunicación con nuestros usuarios</li>
            <li>Mejora de nuestros servicios</li>
            <li>Cumplimiento de obligaciones legales</li>
          </ul>

          <h4>Derechos del Titular</h4>
          <p>
            Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales.
            Para ejercer estos derechos, puede contactarnos a través de los medios proporcionados en nuestra sección de contacto.
          </p>

          <h4>Seguridad de la Información</h4>
          <p>
            Implementamos medidas de seguridad físicas, técnicas y administrativas para proteger sus datos personales
            contra el acceso no autorizado, alteración, divulgación o destrucción.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AvisoPrivacidad;