import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginWithMatricula } from "../../api";
import PlatformLayout from "./layout";
import useStudentStore from "../../store/studentStore";
import { setTemporaryData } from "../../utils/GeneralMethods";

const InfoStudent = () => {
	const navigate = useNavigate();
	const { students } = useStudentStore();

	const mutation = useMutation({
		mutationFn: loginWithMatricula,
		onSuccess: (data) => {
			if (data && data.length > 0) {
				const hasOpenPayData = data.some((pedido) => pedido.open_pay_id && pedido.identificador_pago);

				if (hasOpenPayData) {
					const groupedData = data.reduce((acc, current) => {
						const { transaccion_Id, link_de_pago, open_pay_id, matricula, estatus } = current;
						if (transaccion_Id) {
							if (!acc[transaccion_Id]) {
								acc[transaccion_Id] = { transaccion: transaccion_Id, pedidos: [], link_de_pago: link_de_pago, open_pay_id: open_pay_id, matricula: matricula, estatus: estatus };
							}
							acc[transaccion_Id].pedidos.push(current);
						}
						return acc;
					}, {});

					const groupedDataArray = Object.values(groupedData);
					console.log("groupedDataArray ", groupedDataArray);

					// Guardar en localStorage y navegar
					setTemporaryData('check_links_data', {
						pedidos: groupedDataArray,
						todosLosPedidos: data
					});
					navigate('/dashboard/check-links');
				} else {
					// Guardar en localStorage y navegar
					setTemporaryData('pedidos_data', { pedidos: data });
					navigate('/dashboard/pedidos');
				}
			} else {
				alert("No se encontraron pagos para esta matrícula.");
			}
		},
		onError: (error) => {
			alert(" Error: " + (error.response?.data?.message || "Intente de nuevo"));
		}
	});

	const handleLogin = (matricula) => {
		if (matricula.trim() !== '') {
			mutation.mutate(matricula);
		} else {
			alert("Es necesario colocar una matrícula.");
		}
	};

	const enmascararEmail = (email) => {
		if (!email) return "";
		const [nombreUsuario, dominio] = email.split("@");
		const primerosCaracteres = nombreUsuario.slice(0, 2);
		const enmascarado = primerosCaracteres + "*".repeat(nombreUsuario.length - 2);
		return `${enmascarado}@${dominio}`;
	};

	const enmascararCelular = (celular) => {
		if (!celular) return "";
		const longitud = celular.length;
		const ultimosCuatro = celular.slice(-4);
		const enmascarado = "*".repeat(longitud - 4) + ultimosCuatro;
		return enmascarado;
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
							<h5><b>{enmascararEmail(student.email)}</b></h5>
						</div>
						<div className="d-flex flex-column">
							<p className="m-0 text-secondary">Teléfono celular</p>
							<h5><b>{enmascararCelular(student.celular)}</b></h5>
						</div>
						<div className="w-100 d-flex justify-content-center mt-2 mb-3">
							<button
								className="px-5 py-3 rounded btn btn-primary backgroundMainColor border-0"
								onClick={() => handleLogin(student.matricula)}
								disabled={mutation.isLoading}
							>
								<h5 className="m-0">
									<b className="secontFont text-light">
										{mutation.isLoading ? "Ingresando..." : "Usar matrícula"}
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