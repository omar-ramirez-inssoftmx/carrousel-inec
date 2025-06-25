import { useNavigate } from "react-router-dom";
import useStudentStore from '../store/studentStore';

const Navbar = ({ logo }) => {
  const navigate = useNavigate();
  const { getCurrentStudent } = useStudentStore();
  const currentStudent = getCurrentStudent();

  const handlePagosClick = () => {
    navigate("/dashboard");
  };

  const handleCardClick = () => {
    const currentStudent = getCurrentStudent();
    if (!currentStudent?.matricula) {
      alert("Matrícula no disponible");
      return;
    }

    // Navegar directamente, el componente de tarjetas hará el fetching
    navigate("/dashboard/cards");
  };

  const handleActivityClick = () => {
    const currentStudent = getCurrentStudent();
    if (!currentStudent?.matricula) {
      alert("Matrícula no disponible");
      return;
    }

    // Navegar directamente, el componente de actividad hará el fetching
    navigate("/dashboard/activity");
  };

  return (
    <div
      style={{ height: "90px" }}
      className="border-bottom px-md-3 px-lg-5 bg-white fixed-top d-flex justify-content-between align-items-center"
    >
      {/* Logo */}
      <div className="d-flex align-items-center">
        <img style={{ maxWidth: "120px", width: "25vw" }} src={logo} alt="Logo" />
      </div>

      {/* Menú de opciones */}
      <nav className="d-flex align-items-center">
        <ul className="nav">
          <li className="nav-item">
            <button
              className="nav-link text-dark fw-bold border-0 bg-transparent"
              onClick={handlePagosClick}
            >
              Pagos
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-dark fw-bold border-0 bg-transparent"
              onClick={handleActivityClick}
            >
              Actividad
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link text-dark fw-bold border-0 bg-transparent"
              onClick={handleCardClick}
            >
              Tarjetas
            </button>
          </li>
        </ul>
      </nav>

      {/* Información del usuario */}
      <div className="dropdown">
        <button
          className="border-0 btn dropdown-toggle d-flex align-items-center p-0 py-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="d-flex flex-column me-2">
            <h5 className="m-0">
              {`${currentStudent?.nombre || "Nombre no disponible"} ${currentStudent?.apellido_paterno || ""} ${currentStudent?.apellido_materno || ""}`}
            </h5>
            <p className="m-0 text-secondary">
              Matricula - {currentStudent?.matricula || "N/A"}
            </p>
          </div>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="/">Salir</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
