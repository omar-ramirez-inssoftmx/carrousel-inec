import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

const ContentLoader = ({ fetchFunction, renderContent }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { mutate: fetchData } = useMutation({
    mutationFn: fetchFunction,
    onSuccess: (responseData) => {
      setData(responseData);
      setLoading(false);
    },
    onError: (err) => {
      setError(err.message || 'Error al cargar la información');
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
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
            setLoading(true);
            fetchData();
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return renderContent(data);
};

export default ContentLoader; 