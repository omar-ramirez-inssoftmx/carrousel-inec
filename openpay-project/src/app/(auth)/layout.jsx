import logo from '../../styles/image/logo.png';
import fondo from '../../styles/image/fondo.svg';

const PublicLayout = ({ children }) => {
  return (
    <main className="container-fluid p-0">
      <section className="d-flex flex-wrap justify-content-center align-items-center">
        <div className="login bg-white container-fluid p-0">
          <section className="d-flex flex-column justify-content-center align-items-center minHeight100vh gap32">
            <div>
              <img src={logo} alt="Logo" />
            </div>
            {children}
          </section>
        </div>
        <div
          className="caratura bg-success"
          style={{
            background: `url(${fondo}) no-repeat center / cover`,
            borderLeft: '2px solid #000'
          }}
        >
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default PublicLayout; 