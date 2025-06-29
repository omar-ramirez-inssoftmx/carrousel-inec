import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { aviso } from '../api'; // Importa el servicio de aviso
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import logo from '../styles/image/logo.png';
import fondo from '../styles/image/fondo.svg';

const AvisoPrivacidad = () => {
  const navigate = useNavigate();
  const [avisoData, setAvisoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definir la mutación para obtener el aviso de privacidad
  const { mutate: fetchAviso } = useMutation({
    mutationFn: aviso,
    onSuccess: (data) => {
      setAvisoData(data);
      setLoading(false);
    },
    onError: (err) => {
      setError(err.message || 'Error al cargar el aviso de privacidad');
      setLoading(false);
    }
  });

  // Ejecutar la mutación al montar el componente
  useEffect(() => {
    fetchAviso();
  }, [fetchAviso]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center minHeight100vh">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
        <button
          className="btn btn-link"
          onClick={() => {
            setError(null);
            fetchAviso();
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <main className="container-fluid p-0">
      <section className="d-flex flex-wrap justify-content-center align-items-center">
        <div className="login bg-white container-fluid p-0">
          <section className="d-flex flex-column justify-content-center align-items-center minHeight100vh gap32">
            <div>
              <img src={logo} alt="Logo" />
            </div>

            {/* Mostrar el aviso de privacidad */}
            <div className="container p-4">
              <h2 className="text-center mb-4">Aviso de Privacidad</h2>
              <div
                className="privacy-content p-3 border rounded"
                style={{ maxHeight: '60vh', overflowY: 'auto' }}
                dangerouslySetInnerHTML={{ __html: avisoData?.valor || 'Contenido no disponible' }}
              />

              <div className="text-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(-1)} // Volver atrás
                >
                  Aceptar y continuar
                </button>
              </div>
            </div>
          </section>
        </div>
        <div className="caratura bg-success"
          style={{ background: `url(${fondo}) no-repeat center / cover`, borderLeft: '2px solid #000' }}>
          <div></div>
        </div>
      </section>
    </main>
  );
};

export default AvisoPrivacidad;