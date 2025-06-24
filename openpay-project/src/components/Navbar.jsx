import { useNavigate } from "react-router-dom";
import { fetchStudentCards, fetchStudentActivity } from '../utils/GeneralMethods';
import useStudentStore from '../store/studentStore';
import { setTemporaryData } from '../utils/GeneralMethods';

const Navbar = ({ logo }) => {
  const navigate = useNavigate();
  const { getCurrentStudent } = useStudentStore();
  const currentStudent = getCurrentStudent();

  const handlePagosClick = () => {
    navigate("/dashboard");
  };

  const handleCardClick = async () => {
    const currentStudent = getCurrentStudent();
    if (!currentStudent?.matricula) {
      alert("Matrícula no disponible");
      return;
    }

    try {
      const tarjetas = await fetchStudentCards(
        currentStudent.open_pay_id,
        currentStudent.matricula
      );

      // Guardar en localStorage y navegar
      setTemporaryData('tarjetas', tarjetas);
      navigate("/dashboard/cards");
    } catch (error) {
      console.error("Error al obtener tarjetas:", error);
      alert("No se pudieron cargar las tarjetas.");
    }
  };

  const handleActivityClick = async () => {
    const currentStudent = getCurrentStudent();
    if (!currentStudent?.matricula) {
      alert("Matrícula no disponible");
      return;
    }

    try {
      const orders = await fetchStudentActivity(
        currentStudent.matricula
      );

      // Guardar en localStorage y navegar
      setTemporaryData('orders', orders);
      navigate("/dashboard/activity");
    } catch (error) {
      console.error("Error al obtener actividad:", error);
      alert("No se posible cargar la actividad.");
    }
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
