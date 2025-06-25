import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithMatricula } from "../../api";
import PlatformLayout from "./layout";
import useStudentStore from "../../store/studentStore";
import { maskEmail, maskPhone } from "../../lib/utils";

const InfoStudent = () => {
	const navigate = useNavigate();
	const { students } = useStudentStore();
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (matricula) => {
		if (matricula.trim() === '') {
			alert("Es necesario colocar una matrícula.");
			return;
		}

		setIsLoading(true);

		try {
			const data = await loginWithMatricula(matricula);

			if (data && data.length > 0) {
				const hasOpenPayData = data.some((pedido) => pedido.open_pay_id && pedido.identificador_pago);

				if (hasOpenPayData) {
					// Solo navegar, la página de check-links obtendrá sus propios datos
					navigate('/dashboard/check-links');
				} else {
					// Solo navegar, la página de pedidos obtendrá sus propios datos
					navigate('/dashboard/pedidos');
				}
			} else {
				alert("No se encontraron pagos para esta matrícula.");
			}
		} catch (error) {
			console.error("Error al obtener datos:", error);
			alert("Error: " + (error.response?.data?.message || "Intente de nuevo"));
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<PlatformLayout>
			<section className="d-flex justify-content-center align-items-center px-3 pb-2 border-bottom">
				<h5 className="text-secondary m-0">Detalle de matrícula</h5>
			</section>

			{students.length > 0 ? (
				students.map((student) => (
					<section key={student.id_alumno} className="d-flex flex-column w-100 gap32 pt-4 pb-2 px-3 border-bottom">
						<div className="d-flex flex-column">
							<p className="m-0 text-secondary">Matrícula</p>
							<h5><b>{student.matricula}</b></h5>
						</div>
						<div className="d-flex flex-column">
							<p className="m-0 text-secondary">Nombre completo</p>
							<h5><b>{`${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`}</b></h5>
						</div>
						<div className="d-flex flex-column">
							<p className="m-0 text-secondary">Correo electrónico</p>
							<h5><b>{maskEmail(student.email)}</b></h5>
						</div>
						<div className="d-flex flex-column">
							<p className="m-0 text-secondary">Teléfono celular</p>
							<h5><b>{maskPhone(student.celular)}</b></h5>
						</div>
						<div className="w-100 d-flex justify-content-center mt-2 mb-3">
							<button
								className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
								onClick={() => handleLogin(student.matricula)}
								disabled={isLoading}
							>
								<h5 className="m-0">
									<b className="secontFont text-light">
										{isLoading ? "Ingresando..." : "Usar matrícula"}
									</b>
								</h5>
							</button>
						</div>
					</section>
				))
			) : (
				<p className="text-secondary mt-3">No hay estudiantes disponibles.</p>
			)}
		</PlatformLayout>
	);
};

export default InfoStudent;