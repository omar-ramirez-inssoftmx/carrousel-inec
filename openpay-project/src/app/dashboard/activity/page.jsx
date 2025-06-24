import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlatformLayout from "../layout";
import { setTemporaryData, generatePaymentId, getTemporaryData } from "../../../utils/GeneralMethods";

const Activity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Intentar obtener datos del state primero, luego de localStorage
  const stateOrders = location.state?.orders;
  const storedOrders = getTemporaryData('orders');
  const orders = stateOrders || storedOrders || {};

  const pedidos = orders.pedidos || [];
  const mesesDisponibles = orders.mesesDisponibles || [];

  // Inicializar mesSeleccionado con "Todos" por defecto
  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");

  // Guardar orders en localStorage si viene del state
  useEffect(() => {
    if (stateOrders) {
      setTemporaryData('orders', stateOrders);
    }
  }, [stateOrders]);

  const detailComponent = (detail) => {
    console.log("detail detailComponent", detail);

    // Generar un ID único para este pago
    const paymentId = generatePaymentId(detail);

    if (paymentId) {
      // Guardar los datos completos en localStorage
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
  const extraerMesFiltro = (fechaStr) => {
    console.log("fechaStr ", fechaStr);

    // Mapeo de meses abreviados a números
    const meses = {
      ene: "01", feb: "02", mar: "03", abr: "04", may: "05", jun: "06",
      jul: "07", ago: "08", sep: "09", oct: "10", nov: "11", dic: "12"
    };

    // Extraer día, mes abreviado y año (ej: "02 abr 25")
    const partes = fechaStr.toLowerCase().match(/(\d{1,2}) ([a-z]{3}) (\d{2})/);

    if (partes) {
      // const dia = partes[1].padStart(2, '0'); // No usado actualmente
      const mesAbrev = partes[2];
      const anio = "20" + partes[3]; // Asumimos siglo 21 para años de 2 dígitos

      if (meses[mesAbrev]) {
        return `${anio}-${meses[mesAbrev]}`;
      }
    }

    return "Desconocido";
  };

  // Uso correcto con el campo fecha
  const pagosEnriquecidos = pedidos.map((pago) => ({
    ...pago,
    mesFiltro: extraerMesFiltro(pago.fecha) // Usamos pago.fecha en lugar de pago.pago
  }));

  // Filtrado dinámico - corregir la lógica para manejar tanto strings como objetos
  const pagosFiltrados = pagosEnriquecidos.filter((pago) => {
    if (mesSeleccionado === "Todos") return true;

    // Si mesSeleccionado es un string que viene de month_value, comparar con mesFiltro
    if (typeof mesSeleccionado === 'string') {
      return pago.mesFiltro === mesSeleccionado;
    }

    return false;
  });

  // Preparar opciones de meses para el filtro
  const opcionesMeses = ["Todos"];

  // Agregar meses disponibles - manejar tanto objetos como strings
  mesesDisponibles.forEach(mes => {
    if (typeof mes === 'object' && mes.month_value) {
      opcionesMeses.push(mes.month_value);
    } else if (typeof mes === 'string') {
      opcionesMeses.push(mes);
    }
  });

  // Función para obtener el texto a mostrar del mes
  const getMonthDisplayText = (mesValue) => {
    if (mesValue === "Todos") return "Todos";

    // Buscar el objeto mes correspondiente para mostrar el texto correcto
    const mesObj = mesesDisponibles.find(m =>
      typeof m === 'object' && m.month_value === mesValue
    );

    return mesObj ? mesObj.month_display : mesValue;
  };

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
