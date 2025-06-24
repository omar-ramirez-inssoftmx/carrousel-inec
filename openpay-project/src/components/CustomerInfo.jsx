import React, { useState } from 'react';
import axios from 'axios';

function CustomerInfo({ customer, onGenerateLink }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateLink = () => {
    setIsGenerating(true);
    const description = 'Cargo inicial a mi cuenta prueba link de pago';

    axios.post('http://localhost:3000/api/orders/createId', { customer_id: customer.id, description })
      .then(response => {
        if (response.data.payment_url) {
          onGenerateLink(response.data.payment_url);
        } else {
          alert('Error al generar el pago.');
        }
      })
      .catch(() => {
        alert('Ocurrió un problema, intenta de nuevo.');
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h3>Alumno encontrado:</h3>
      <div className="d-flex flex-column gap-2">
        <p className="m-0"><strong>ID:</strong> {customer.id}</p>
        <p className="m-0"><strong>Nombre:</strong> {customer.name || 'N/A'}</p>
        <p className="m-0"><strong>Apellido:</strong> {customer.last_name || 'N/A'}</p>
        <p className="m-0"><strong>Email:</strong> {customer.email || 'N/A'}</p>
        <p className="m-0"><strong>Teléfono:</strong> {customer.phone_number || 'N/A'}</p>
        <p className="m-0"><strong>Fecha de Creación:</strong> {customer.creation_date}</p>
        <p className="m-0"><strong>Matrícula:</strong> {customer.external_id || 'N/A'}</p>
      </div>
      <button
        className="btn btn-primary backgroundMainColor border-0 mt-3"
        onClick={handleGenerateLink}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generando...' : 'Generar Link'}
      </button>
    </div>
  );
}

export default CustomerInfo;
