import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listMatriculaStudentOrders } from "../../../api";
import PlatformLayout from "../layout";
import useStudentStore from "../../../store/studentStore";
import { generatePaymentId, setTemporaryData } from "../../../utils/GeneralMethods";

const Activity = () => {
  const navigate = useNavigate();
  const { getCurrentStudent } = useStudentStore();

  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");

  // Cargar orders al montar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      const currentStudent = getCurrentStudent();
      if (!currentStudent?.matricula) {
        setLoading(false);
        return;
      }

      try {
        const ordersData = await listMatriculaStudentOrders(currentStudent.matricula);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error al cargar actividad:", error);
        alert("No se pudo cargar la actividad.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getCurrentStudent]);

  const pedidos = orders.pedidos || [];
  const mesesDisponibles = orders.mesesDisponibles || [];

  const detailComponent = (detail) => {
    console.log("detail detailComponent", detail);

    // Generar un ID único para este pago
    const paymentId = generatePaymentId(detail);

    if (paymentId) {
      // Guardar los datos completos en localStorage para la página de detalle
      setTemporaryData('current_payment', {
        detail: detail,
        orderData: {
          numero: detail[0]?.numero,
          fecha: detail[0]?.fecha,
          card: detail[0]?.card
        }
      });

      // Navegar usando solo el ID
      navigate(`/dashboard/activity/detail/${paymentId}`);
    }
  };

  // Función para obtener el mes en formato "YYYY-MM" desde el texto del pago
  const getPaymentMonth = (pedido) => {
    if (!pedido || !pedido.fecha) return "";
    const fecha = new Date(pedido.fecha);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  // Filtrar pedidos por mes seleccionado
  const pagosFiltrados = pedidos.filter((pago) => {
    if (mesSeleccionado === "Todos") return true;

    if (pago.pedidosDetail && pago.pedidosDetail.length > 0) {
      const monthFromPago = getPaymentMonth(pago.pedidosDetail[0]);
      return monthFromPago === mesSeleccionado;
    }
    return false;
  });

  // Obtener opciones de meses disponibles
  const opcionesMeses = ["Todos", ...mesesDisponibles.map(mes =>
    typeof mes === 'object' ? mes.month_value : mes
  )];

  const getMonthDisplayText = (mesValue) => {
    if (mesValue === "Todos") return "Todos";

    // Buscar el objeto mes correspondiente para mostrar el texto correcto
    const mesObj = mesesDisponibles.find(m =>
      typeof m === 'object' && m.month_value === mesValue
    );

    return mesObj ? mesObj.month_display : mesValue;
  };

  if (loading) {
    return (
      <PlatformLayout>
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando actividad...</span>
          </div>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout>
      <div className="py-4 px-4">
        <div className="d-flex align-items-center">
          <div>
            <h2 className="mb-2 fw-bold text-primary">
              <i className="bi bi-credit-card-2-front"></i>
              Pagos
            </h2>
            <p className="mb-0 text-muted fs-6">
              Selecciona un pago para ver su detalle completo
            </p>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="py-4 px-4">
        {/* Filtros de Meses */}
        <div className="mb-4">
          <h5 className="mb-3 fw-semibold text-dark">Filtrar por mes</h5>
          <div className="d-flex flex-wrap gap-2">
            {opcionesMeses.map((mesValue) => (
              <button
                key={mesValue}
                className={`btn btn-sm ${mesSeleccionado === mesValue
                  ? "btn-primary"
                  : "btn-outline-primary"
                  }`}
                onClick={() => setMesSeleccionado(mesValue)}
              >
                {getMonthDisplayText(mesValue)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla de Pagos */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col" className="fw-semibold text-dark">
                  <i className="bi bi-hash me-2"></i>
                  No.
                </th>
                <th scope="col" className="fw-semibold text-dark">
                  <i className="bi bi-list-ul me-2"></i>
                  Concepto de Pago
                </th>
                <th scope="col" className="fw-semibold text-dark">
                  <i className="bi bi-calendar-date me-2"></i>
                  Fecha
                </th>
                <th scope="col" className="fw-semibold text-dark">
                  <i className="bi bi-currency-dollar me-2"></i>
                  Monto
                </th>
                <th scope="col" className="fw-semibold text-dark">
                  <i className="bi bi-credit-card me-2"></i>
                  Método de pago
                </th>
              </tr>
            </thead>
            <tbody>
              {pagosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-3 text-secondary"></i>
                    <h6 className="mb-2">No hay pagos disponibles</h6>
                    <p className="mb-0 small">No se encontraron pagos para el mes seleccionado.</p>
                  </td>
                </tr>
              ) : (
                pagosFiltrados.map((pago, index) => (
                  <tr
                    key={index}
                    onClick={() => detailComponent(pago.pedidosDetail)}
                    className="cursor-pointer"
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.transform = 'translateX(0px)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <td className="align-middle">
                      <span className="badge bg-secondary bg-opacity-10 text-dark fw-medium px-3 py-2">
                        #{pago.numero ?? "—"}
                      </span>
                    </td>
                    <td className="align-middle">
                      {pago.pago ? (
                        <div>
                          {pago.pago.split(',').map((item, idx) => (
                            <div key={idx} className="mb-1 d-flex align-items-center">
                              <i className="bi bi-dot text-primary me-1"></i>
                              <span className="text-dark">{item.trim()}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                          <i className="bi bi-calendar-check text-primary"></i>
                        </div>
                        <div>
                          <div className="fw-medium text-dark">{pago.fecha}</div>
                          <small className="text-muted">{pago.mesFiltro}</small>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="fw-bold text-success fs-6">
                        {pago.monto}
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-credit-card-fill text-primary me-2"></i>
                        <span className="text-dark">
                          {pago.card ? `${pago.card.card_brand} - ${pago.card.card_number}` : 'No disponible'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PlatformLayout>
  );
};

export default Activity;
