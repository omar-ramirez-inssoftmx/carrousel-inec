import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { contacto } from '../api'; // Importa el servicio de contacto
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';
import logo from '../styles/image/logo.png';
import fondo from '../styles/image/fondo.svg';

const Contacto = () => {
	const navigate = useNavigate();
	const [contactoData, setContactoData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Definir la mutación para obtener la información de contacto
	const { mutate: fetchContacto } = useMutation({
		mutationFn: contacto,
		onSuccess: (data) => {
			setContactoData(data);
			setLoading(false);
		},
		onError: (err) => {
			setError(err.message || 'Error al cargar la información de contacto');
			setLoading(false);
		}
	});

	// Ejecutar la mutación al montar el componente
	useEffect(() => {
		fetchContacto();
	}, [fetchContacto]);

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
						fetchContacto();
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

						{/* Mostrar la información de contacto */}
						<div className="container p-4">
							<h2 className="text-center mb-4">Información de Contacto</h2>
							<div
								className="contact-content p-3 border rounded"
								style={{ maxHeight: '60vh', overflowY: 'auto' }}
								dangerouslySetInnerHTML={{ __html: contactoData?.valor || 'Contenido no disponible' }}
							/>

							<div className="text-center mt-4">
								<button
									className="btn btn-primary"
									onClick={() => navigate(-1)} // Volver atrás
								>
									Volver
								</button>
							</div>
						</div>
					</section>
				</div>
				<div className="caratura bg-success" style={{ background: `url(${fondo}) no-repeat center / cover` }}>
					<div></div>
				</div>
			</section>
		</main>
	);
};

export default Contacto;