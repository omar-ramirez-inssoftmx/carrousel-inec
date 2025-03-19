import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { pay } from '../api'; // Importar la función pay
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ students, totalPagos, pedidosSeleccionados, getVigencia, getTipoPago, pedidoMasViejoSeleccionado, onHide }) => {
  console.log("totalPagos ", totalPagos);

  // Estado para los datos de la tarjeta
  const [cardData, setCardData] = useState({
    holder_name: "",
    card_number: "",
    expiration_month: "",
    expiration_year: "",
    cvv2: "",
  });

  // Estado para los demás campos del formulario
  const [formData, setFormData] = useState({
    telefono: "",
    ciudad: "",
    postal: "",
  });

  const [deviceSessionId, setDeviceSessionId] = useState("");
  const navigate = useNavigate();

  // Configurar OpenPay
  useEffect(() => {
    window.OpenPay.setId("mulebp3rfhpbzpzgsooa");
    window.OpenPay.setApiKey("pk_e7e955e463394f3d874b7d6caeee342c");
    window.OpenPay.setSandboxMode(true);
    setDeviceSessionId(window.OpenPay.deviceData.setup());
  }, []);

  // Mutación para procesar el pago
  const mutation = useMutation({
    mutationFn: async ({ openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados, deviceSessionId, token }) => {
      const response = await pay(openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados, deviceSessionId, token);
      return response;
    },
    onSuccess: (response) => {
      console.log("Pago exitoso:",  response.charge);
      alert("Pago realizado con éxito");     
    },
    onError: (error) => {
      console.error("Error en el pago:", error);
      alert("Error al procesar el pago");
    },
  });

  // Función para manejar el pago
  const handlePayment = () => {
    window.OpenPay.token.create(cardData, async (response) => {
      console.log("Token generado:", response.data.id);

      // Obtener los parámetros necesarios
      const openPayId = students[0].open_pay_id;
      const description = "Pago de pedidos seleccionados";
      const totalAmount = totalPagos;
      const pedidoIds = pedidosSeleccionados.map((pedido) => pedido.id_pedido);
      const fechaVigencia = getVigencia(pedidoMasViejoSeleccionado, getTipoPago(pedidoMasViejoSeleccionado), pedidosSeleccionados);
      const pedidosSeleccionadosData = pedidosSeleccionados;
      const token = response.data.id; // Token generado por OpenPay
      const orderId = students[0].matricula;

      // Llamar a la mutación con los parámetros necesarios
      mutation.mutate({ openPayId, description, orderId, totalAmount, pedidoIds, fechaVigencia, pedidosSeleccionados: pedidosSeleccionadosData, deviceSessionId, token });
    }, (error) => {
      console.error("Error al generar token:", error);
      alert("Error al generar el token");
    });
  };

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in cardData) {
      setCardData({ ...cardData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getPagoActual = (pedido) => {
    const fechaActual = new Date();

     // Verifica si la fecha de descuento existe y si aplica
     if (pedido.fecha_vigenica_descuento && fechaActual <= new Date(pedido.fecha_vigenica_descuento)) {
        return pedido.pago_descuento || "0";
    }

    // Verifica si la fecha de recargo existe y si aplica
    if (pedido.fecha_vigencia_recargo && fechaActual >= new Date(pedido.fecha_vigencia_pago)) {
        return pedido.pago_recargo || "0";
    }

    // Verifica si la fecha de pago existe y si aplica
    if (pedido.fecha_vigencia_pago && fechaActual <= new Date(pedido.fecha_vigencia_pago)) {
        return pedido.pago || "0";
    }

    // Si no hay fechas o no aplica ninguna, se considera "normal"
    return "0";
  };

  console.log("Estado de la mutación:", {
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  });


  return (
    <div className="w-100 d-flex flex-wrap justify-content-center position-relative">
      <div className="w-100 d-flex justify-content-end p-3 position-absolute">
        
      </div>
      <section className="container-fluid col-12 col-lg-8 bg-white pt-5 pb-4">
        <div className="px-1 px-md-3 px-lg-5 d-flex flex-column">
          <div className="col-12 mb-2">
            <h3 className="m-0">
              <strong>Método de pago</strong>
            </h3>
            <h5 className="text-secondary my-1 m-0">
              Agregar una tarjeta de crédito o débito
            </h5>
          </div>
          <div className="col-12 d-flex flex-column mt-3 mb-2">
            <label htmlFor="holder_name" className="mb-1"><strong>Nombre del dueño de la tarjeta</strong></label>
            <input
              name="holder_name"
              placeholder="Ingresa nombre completo del dueño"
              className="inputCustom w-100 p-3"
              value={cardData.holder_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 d-flex flex-column mt-3 mb-2">
            <label htmlFor="card_number" className="mb-1"><strong>Números de la tarjeta</strong></label>
            <input
              name="card_number"
              placeholder="Ingresa los 16 dígitos de tu tarjeta"
              className="inputCustom w-100 p-3"
              value={cardData.card_number}
              onChange={handleInputChange}
              maxLength="16"
            />
          </div>
          <div className="row flex-wrap">
            <div className="col-12 col-lg-6 d-flex flex-column mt-3 mb-2">
              <label htmlFor="expiration_month" className="mb-1"><strong>Fecha de vencimiento</strong></label>
              <div className="row justify-content-between">
                <div className="col-6">
                  <input
                    name="expiration_month"
                    placeholder="Mes"
                    className="inputCustom w-100 p-3"
                    value={cardData.expiration_month}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <input
                    name="expiration_year"
                    placeholder="Año"
                    className="inputCustom w-100 p-3"
                    value={cardData.expiration_year}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column mt-3 mb-2">
              <label htmlFor="cvv2" className="mb-1"><strong>Código de Seguridad</strong></label>
              <input
                name="cvv2"
                placeholder="CVC"
                className="inputCustom w-100 p-3"
                value={cardData.cvv2}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column mt-3 mb-2">
              <label htmlFor="telefono" className="mb-1"><strong>Teléfono celular</strong></label>
              <input
                name="telefono"
                placeholder="Ingresa a 10 dígitos tu teléfono"
                className="inputCustom w-100 p-3"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column mt-3 mb-2">
              <label htmlFor="ciudad" className="mb-1"><strong>Ciudad</strong></label>
              <select
                name="ciudad"
                className="inputCustom w-100 p-3"
                value={formData.ciudad}
                onChange={handleInputChange}
              >
                <option value="">Ciudad donde radicas</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Monterrey">Monterrey</option>
                <option value="Guadalajara">Guadalajara</option>
              </select>
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column mt-3 mb-2">
              <label htmlFor="postal" className="mb-1"><strong>Código postal</strong></label>
              <input
                name="postal"
                placeholder="Código postal donde radicas"
                className="inputCustom w-100 p-3"
                value={formData.postal}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid col-12 col-lg-4 backgroundMain pt-5 pb-3 minHeight90vhLg d-flex flex-column justify-content-between">
        <div>
          <div className="mt-3 border rounded px-3 py-4 bg-white">
            <div className="container-fluid d-flex flex-wrap">
              {pedidosSeleccionados.map((pedido) => (
                <div key={pedido.id_pedido} className="col-12 d-flex flex-wrap mt-3">
                  <h6 className="col-8 m-0"><strong>{pedido.concepto_pedido}</strong></h6>
                  <div className="col-4 d-flex align-items-center justify-content-end">
                    <strong className="m-0 me-1">$</strong>
                    <h6 className="m-0"><strong>{getPagoActual(pedido)}</strong></h6>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "2px solid" }} className="w-100 d-flex mt-4">
                <div className="container-fluid d-flex mt-4">
                  <div className="col-8 d-flex flex-wrap">
                    <h6 className="col-12 m-0"><strong>Total a pagar</strong></h6>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-end">
                    <strong className="m-0 me-1">$</strong>
                    <h4 className="m-0"><strong>{totalPagos}</strong></h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-5 w-100 d-flex justify-content-center">
            <button
              type="button"
              className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
              onClick={handlePayment}
              disabled={mutation.isLoading}
            >
              <h5 className="m-0">
                <b className="secontFont text-light">
                  {mutation.isLoading ? "Procesando..." : "Realizar el pago"}
                </b>
              </h5>
            </button>
          </div>
          <div className="container-fluid py-3 text-center">
            <span>
              Los pagos en nuestra plataforma se procesan a través de nuestro proveedor <strong>Openpay</strong>, por lo que nos acogemos a sus términos y condiciones.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentForm;