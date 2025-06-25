import logo from '../../styles/image/logo.png';
import fondo from '../../styles/image/fondo.svg';

const PublicLayout = ({ children }) => {
  return (
    <main className="container-fluid p-0 vh-100">
      <section className="d-flex h-100">
        <div className="login bg-white col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center p-4">
          <div className="mb-4">
            <img src={logo} alt="Logo" style={{ maxWidth: '200px' }} />
          </div>
          {children}
        </div>
        <div
          className="caratura d-none d-lg-block col-lg-6"
          style={{
            background: `url(${fondo}) no-repeat center / cover`,
            minHeight: '100vh'
          }}
        >
        </div>
      </section>
    </main>
  );
};

export default PublicLayout; 