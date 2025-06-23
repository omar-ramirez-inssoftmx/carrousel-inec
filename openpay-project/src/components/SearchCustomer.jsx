import React, { useState } from 'react';
import axios from 'axios';

function SearchCustomer({ onSearch }) {
  const [enrollment, setEnrollment] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!enrollment) {
      alert("Por favor, colocar su matrícula.");
      return;
    }

    axios.post('http://localhost:3000/api/customers/list', { external_id: enrollment })
      .then(response => {
        if (response.data.length === 0) {
          setError('Matrícula no encontrada');
          onSearch(null);
        } else {
          setError(null);
          onSearch(response.data[0]);
        }
      })
      .catch(() => {
        setError('Ocurrió un problema, intenta de nuevo.');
      });
  };

  return (
    <div>
      <h2>Buscar Matrícula</h2>
      <input
        type="text"
        value={enrollment}
        onChange={(e) => setEnrollment(e.target.value)}
        className="form-control form-control-lg"
        placeholder="Matrícula del alumno"
      />
      <button className="btn-custom" onClick={handleSearch}>Buscar</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default SearchCustomer;
