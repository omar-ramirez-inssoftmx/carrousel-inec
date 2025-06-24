import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginWithMatriculaStudent } from '../api';
import PublicLayout from '../layouts/PublicLayout';
import useStudentStore from '../store/studentStore';

const Login = () => {
	const [matricula, setMatricula] = useState('');
	const navigate = useNavigate();
	const { setStudents } = useStudentStore();

	const mutation = useMutation({
		mutationFn: loginWithMatriculaStudent,
		onSuccess: (data) => {
			console.log("Datos recibidos:", data);
			if (data && data.length > 0) {
				// Guardar estudiantes en el store global
				setStudents(data);
				// Navegar sin state - el store maneja los datos
				navigate('/info/student');
			} else {
				alert("No se encontraron pedidos para esta matrícula.");
			}
		},
		onError: (error) => {
			console.log("error ", error)
			alert("Error al iniciar sesión: " + (error.response?.data?.message || "Intente de nuevo"));
		}
	});

	const handleLogin = () => {
		if (matricula.trim() !== '') {
			mutation.mutate(matricula);
		} else {
			alert("Es necesario colocar una matrícula.");
		}
	};

	return (
		<PublicLayout>
			<div className="text-center mt-3 px-4 mx-4">
				<h5 className="text-secondary">Ingresa tu número de matrícula para acceder a la plataforma de pagos en línea del <b className="colorMain">INEC.</b></h5>
			</div>
			<div className="inputCustom">
				<div className="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="21.672" height="21" viewBox="0 0 21.672 21">
						<path d="M20.568,13.345H15.159l1.526-5.7H20.52a1.133,1.133,0,0,0,1.143-.992,1.1,1.1,0,0,0-1.1-1.208H17.274l1.078-4.02A1.131,1.131,0,0,0,17.69.072a1.1,1.1,0,0,0-1.455.74L14.991,5.45H9.378l1.078-4.02A1.13,1.13,0,0,0,9.793.072,1.1,1.1,0,0,0,8.341.818L7.1,5.45H1.148a1.13,1.13,0,0,0-1.143.992A1.1,1.1,0,0,0,1.1,7.651H6.509L4.983,13.345H1.148a1.132,1.132,0,0,0-1.143.992,1.1,1.1,0,0,0,1.1,1.208H4.394l-1.078,4.02a1.131,1.131,0,0,0,.662,1.36,1.1,1.1,0,0,0,1.455-.742l1.244-4.638h5.617l-1.078,4.02a1.13,1.13,0,0,0,.664,1.36,1.1,1.1,0,0,0,1.451-.746l1.243-4.638h5.951a1.13,1.13,0,0,0,1.143-.993,1.1,1.1,0,0,0-1.1-1.2Zm-13.306,0,1.526-5.7h5.618l-1.526,5.7Z" fill="#363636" />
					</svg>
				</div>
				<input
					type="text"
					placeholder="Matrícula del alumno"
					value={matricula}
					onChange={(e) => setMatricula(e.target.value)}
				/>
			</div>
			<div>
				<button className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0" onClick={handleLogin} disabled={mutation.isLoading}>
					<h5 className="m-0"><b className="secontFont text-light">{mutation.isLoading ? "Ingresando..." : "Buscar"}</b></h5>
				</button>
			</div>
			{/* Enlaces agregados aquí */}
			<div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
				<a href="/terminos-condiciones" className="text-decoration-none text-secondary small">
					Términos y condiciones
				</a>
				<a href="/aviso-privacidad" className="text-decoration-none text-secondary small">
					Aviso de privacidad
				</a>
				<a href="/contacto" className="text-decoration-none text-secondary small">
					Contacto
				</a>
			</div>
		</PublicLayout>
	);
};

export default Login;
