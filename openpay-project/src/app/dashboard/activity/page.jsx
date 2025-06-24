import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlatformLayout from "../layout";

const Activity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos el estado desde el navigate  
  const { orders = {} } = location.state || {};
  const pedidos = orders.pedidos || [];
  const mesesDisponibles = orders.mesesDisponibles || [];

  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");

  const detailComponent = (detail) => {
    console.log("detail detailComponent", detail);
    navigate("/dashboard/activity/detail", {
      state: {
        detail: detail, // Enviamos solo el array de detalles
        orderData: { // Enviamos datos generales del pago
          numero: detail[0]?.numero,
          fecha: detail[0]?.fecha,
          card: detail[0]?.card
        }
      }
    });
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

  // Filtrado dinámico
  const pagosFiltrados = pagosEnriquecidos.filter((pago) =>
    mesSeleccionado === "Todos" ? true : pago.mesFiltro === mesSeleccionado
  );

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
            {mesesDisponibles.map((mes, idx) => (
              <button
                key={idx}
                className={`btn btn-sm px-3 py-2 fw-semibold transition-all ${mes.month_value === mesSeleccionado
                  ? "btn-primary shadow-sm"
                  : "btn-outline-primary"
                  }`}
                style={{
                  transition: 'all 0.2s ease-in-out',
                  borderRadius: '8px'
                }}
                onMouseEnter={(e) => {
                  if (mes.month_value !== mesSeleccionado) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (mes.month_value !== mesSeleccionado) {
                    e.target.style.transform = 'translateY(0px)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
                onClick={() => setMesSeleccionado(mes.month_value)}
              >
                {mes.month_display}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla de Pagos */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white border-bottom py-3">
            <h5 className="mb-0 fw-semibold text-dark">
              Lista de Pagos
              <span className="badge bg-primary ms-2">{pagosFiltrados.length}</span>
            </h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="fw-semibold text-dark py-3 px-4 border-0">No.</th>
                    <th className="fw-semibold text-dark py-3 px-4 border-0">Concepto de Pago</th>
                    <th className="fw-semibold text-dark py-3 px-4 border-0">Fecha</th>
                    <th className="fw-semibold text-dark py-3 px-4 border-0">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {pagosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted">
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
                        <td className="py-3 px-4 align-middle">
                          <span className="badge bg-secondary">{pago.numero ?? "—"}</span>
                        </td>
                        <td className="py-3 px-4 align-middle">
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
                        <td className="py-3 px-4 align-middle">
                          <span className="text-dark">{pago.fecha}</span>
                        </td>
                        <td className="py-3 px-4 align-middle">
                          <span className="fw-semibold text-success fs-6">{pago.monto}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
};

export default Activity;
