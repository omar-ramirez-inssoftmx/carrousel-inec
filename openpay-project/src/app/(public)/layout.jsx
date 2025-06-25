import { Link } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  return (
    <main className="min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid px-4">
          {/* Logo */}
          <div className="navbar-brand">
            <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          </div>

          {/* Legal Links */}
          <div className="navbar-nav ms-auto">
            <Link
              to="/aviso-privacidad"
              className="nav-link text-decoration-none me-3"
            >
              Aviso de Privacidad
            </Link>
            <Link
              to="/contacto"
              className="nav-link text-decoration-none me-3"
            >
              Contacto
            </Link>
            <Link
              to="/terminos-condiciones"
              className="nav-link text-decoration-none"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </nav>

      {/* Content - Centered */}
      <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 76px)' }}>
        {children}
      </div>
    </main>
  );
};

export default PublicLayout; 