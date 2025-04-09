import { useNavigate } from "react-router-dom";
import { fetchStudentCards, fetchStudentActivity } from '../utils/GeneralMethods';

const Navbar = ({ students, logo }) => {
  const navigate = useNavigate();

  const handlePagosClick = () => {
    navigate("/info/student", { state: { student: students} });
  };

  const handleCardClick = async () => {
    if (!students[0]?.matricula) {
        alert("Matrícula no disponible");
        return;
    }

    try {
       const tarjetas = await fetchStudentCards(
            students[0].open_pay_id, 
            students[0].matricula
        );

      
        
        navigate("/dashboard/ListCard", { 
            state: { 
                student: students, 
                tarjetas 
            } 
        });
    } catch (error) {
        console.error("Error al obtener tarjetas:", error);
        alert("No se pudieron cargar las tarjetas.");
    }
  };

  const handleActivityClick = async (month = 'Todos') => {
    if (!students[0]?.matricula) {
      alert("Matrícula no disponible");
      return;
    } 

    try {
   
      const orders = await fetchStudentActivity(           
            students[0].matricula
        );

      
        navigate("/dashboard/Activity", { state: { student: students, orders} });
    } catch (error) {
        console.error("Error al obtener tarjetas:", error);
        alert("No se pudieron cargar las tarjetas.");
    }
   
  };

  return (
    <div
      style={{ height: "90px" }}
      className="border-bottom px-md-3 px-lg-5 container-fluid bg-white fixed-top d-flex justify-content-center align-items-center"
    >
      <nav className="row w-100 justify-content-between">
        {/* Logo */}
        <div className="col-auto d-flex align-items-center">
          <img style={{ maxWidth: "120px", width: "25vw" }} src={logo} alt="Logo" />
        </div>

        {/* Menú de opciones */}
        <div className="col-auto d-flex align-items-center">
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
        </div>

        {/* Información del usuario */}
        <div className="col-auto">
          <div className="dropdown">
            <button
              className="border-0 btn dropdown-toggle d-flex align-items-center p-0 py-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex flex-column me-2">
                <h5 className="m-0">
                  {`${students[0]?.nombre || "Nombre no disponible"} ${students[0]?.apellido_paterno || ""} ${students[0]?.apellido_materno || ""}`}
                </h5>
                <p className="m-0 text-secondary">
                  Matricula - {students[0]?.matricula || "N/A"}
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
      </nav>
    </div>
  );
};

export default Navbar;
