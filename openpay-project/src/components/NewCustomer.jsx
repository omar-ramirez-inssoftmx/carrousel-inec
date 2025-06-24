import React, { useState } from 'react';
import axios from 'axios';

function NewCustomer({ onGenerateLink }) {
  const [customerData, setCustomerData] = useState({
    name: '',
    last_name: '',
    enrollment: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { name, last_name, external_id, email, phone_number } = customerData;

    if (!name || !last_name || !email || !external_id || !phone_number) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailPattern)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phone_number.match(phonePattern)) {
      setError('El teléfono debe contener solo números y tener 10 dígitos.');
      return;
    }

    axios.post('http://localhost:3000/api/customers/create', customerData)
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
        } else if (response.data.payment_url) {
          onGenerateLink(response.data.payment_url);
        }
      })
      .catch(() => {
        setError('Ocurrió un problema, intenta de nuevo.');
      });
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h2>Generar Link de Pago</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex flex-column gap-2">
        <input
          type="text"
          id="name"
          value={customerData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Nombre"
        />
        <input
          type="text"
          id="last_name"
          value={customerData.last_name}
          onChange={handleChange}
          className="form-control"
          placeholder="Apellido"
        />
        <input
          type="text"
          id="external_id"
          value={customerData.external_id}
          onChange={handleChange}
          className="form-control"
          placeholder="Matrícula"
        />
        <input
          type="email"
          id="email"
          value={customerData.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Correo electrónico"
        />
        <input
          type="text"
          id="phone_number"
          value={customerData.phone_number}
          onChange={handleChange}
          className="form-control"
          placeholder="Teléfono"
        />
      </div>
      <button
        className="btn btn-primary backgroundMainColor border-0 mt-3"
        onClick={handleSubmit}
      >
        Generar Link
      </button>
    </div>
  );
}

export default NewCustomer;
