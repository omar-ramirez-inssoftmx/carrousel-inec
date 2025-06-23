import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Activity = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtenemos el estado desde el navigate
  const { student = [], orders = {} } = location.state || {};
  const pedidos = orders.pedidos || [];
  const mesesDisponibles = orders.mesesDisponibles || [];

  const [mesSeleccionado, setMesSeleccionado] = useState("Todos");

  const detailComponent = (detail) => {
    console.log("detail detailComponent", detail);
    navigate("/dashboard/DetailActivity", {
      state: {
        student: student,
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
      const dia = partes[1].padStart(2, '0');
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
    <main className="container-fluid p-0">
      <section className="d-flex flex-column justify-content-center align-items-center">
        {/* Navbar */}
        <Navbar students={student} logo={logo} />

        <div className="container-fluid backgroundMain minHeight100vh pt-5">
          <section className="d-flex justify-content-center align-items-center mt-5">
            <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded py-4 px-3 mt-4">
              {/* Header */}
              <section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
                <div className="d-flex flex-wrap align-items-center col-auto">
                  <h3 className="m-0 mb-3"><strong>Pagos</strong></h3>
                  <h5 className="mt-1 ms-3 ms-md-5 text-secondary m-0 mb-3 me-lg-5">
                    Selecciona un pago para ver su detalle
                  </h5>
                </div>
              </section>

              {/* Botones de Meses */}
              <section
                key={student.id_alumno}
                className="d-flex flex-column w-100 gap32 pt-4 pb-2 px-3 border-bottom"
              >
                <div className="mb-4">
                  <div className="d-flex flex-wrap gap-2">
                    {mesesDisponibles.map((mes, idx) => (
                      <button
                        key={idx}
                        className={`btn btn-sm ${mes.month_value === mesSeleccionado
                            ? "btn-primary"
                            : "btn-outline-secondary"
                          }`}
                        onClick={() => setMesSeleccionado(mes.month_value)}
                      >
                        <b>{mes.month_display}</b>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabla de Pagos */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Pago</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center text-secondary">
                            No hay pagos para este mes.
                          </td>
                        </tr>
                      ) : (
                        pagosFiltrados.map((pago, index) => (
                          <tr key={index} onClick={() => detailComponent(pago.pedidosDetail)}>
                            <td>{pago.numero ?? "—"}</td>
                            <td>{pago.pago}</td>
                            <td>{pago.fecha}</td>
                            <td>{pago.monto}</td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Activity;
