import { useNavigate } from 'react-router-dom';
import PublicLayout from '../layout';

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

        <div className="text-justify">
          <h4>1. Aceptación de los Términos</h4>
          <p>
            Al acceder y utilizar este servicio, usted acepta estar sujeto a estos términos y condiciones de uso.
            Si no está de acuerdo con alguno de estos términos, no debe utilizar este servicio.
          </p>

          <h4>2. Descripción del Servicio</h4>
          <p>
            Nuestro servicio proporciona una plataforma de pagos segura y confiable para procesar transacciones
            financieras. Nos comprometemos a mantener la seguridad y privacidad de todas las transacciones.
          </p>

          <h4>3. Responsabilidades del Usuario</h4>
          <p>Como usuario de nuestros servicios, usted se compromete a:</p>
          <ul>
            <li>Proporcionar información veraz y actualizada</li>
            <li>Mantener la confidencialidad de sus credenciales de acceso</li>
            <li>Utilizar el servicio de manera legal y apropiada</li>
            <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
          </ul>

          <h4>4. Limitaciones de Responsabilidad</h4>
          <p>
            Nuestra responsabilidad se limita al valor de la transacción procesada. No seremos responsables
            por daños indirectos, incidentales o consecuenciales que puedan surgir del uso de nuestros servicios.
          </p>

          <h4>5. Modificaciones</h4>
          <p>
            Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.
            Las modificaciones entrarán en vigor inmediatamente después de su publicación en este sitio.
          </p>

          <h4>6. Terminación</h4>
          <p>
            Podemos terminar o suspender su acceso a nuestros servicios en cualquier momento, con o sin causa,
            con o sin previo aviso.
          </p>

          <h4>7. Ley Aplicable</h4>
          <p>
            Estos términos y condiciones se rigen por las leyes de México. Cualquier disputa será resuelta
            en los tribunales competentes de México.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default TerminosCondiciones;