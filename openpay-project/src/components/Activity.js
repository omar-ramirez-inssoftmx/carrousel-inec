import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginWithMatricula } from "../api";
import logo from "../styles/image/logo.png";
import fondo from "../styles/image/fondo.svg";
import Navbar from "../components/Navbar";

const Activity = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const students = location.state?.student || [];

   

    return (
        <main className="container-fluid p-0">
            <section className="d-flex flex-column justify-content-center align-items-center">
                 {/* Navbar */}
                <Navbar students={students} logo={logo} />

                <div className="container-fluid backgroundMain minHeight100vh pt-5">
                    <section className="d-flex justify-content-center align-items-center mt-5">
                        <div className="d-flex flex-column justify-content-center align-items-center bg-white rounded py-4 px-3 mt-4">
                            <section className="row justify-content-center align-items-center px-3 pb-2 border-bottom">
                                <button 
                                    onClick={() => navigate("/")}
                                    className="col-auto me-4 btn btn-link text-decoration-none d-flex align-items-center"
                                >                                    
                                    <h3 className="m-0 ms-2"><b>Pagos</b></h3>
                                </button>
                                <h5 className="col-auto text-secondary m-0">Seleciona un pago para ver su detalle</h5>
                            </section>

                            <section key={students.id_alumno} className="d-flex flex-column w-100 gap32 pt-4 pb-2 px-3 border-bottom">
                                {/* Fila de meses (ahora horizontal) */}
                                <div className="mb-4">                                   
                                    <div className="d-flex flex-wrap gap-2">
                                        <button className="btn btn-sm btn-outline-primary"><b>Todos</b></button>
                                        <button className="btn btn-sm btn-outline-secondary">Ene-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Dic-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Nov-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Oct-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Sep-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Jul-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Jun-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">May-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Apr-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Mar-24</button>
                                        <button className="btn btn-sm btn-outline-secondary">Feb-24</button>
                                    </div>
                                </div>

                                {/* Tabla de pagos (ocupa todo el ancho ahora) */}
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Pago</th>
                                                <th>Fecha</th>
                                                <th>Monto</th>
                                                <th>Factura</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>123/124</td>
                                                <td>Mensualidad de enero 2024</td>
                                                <td>25 Ene 24</td>
                                                <td>$3,120</td>
                                                <td><a href="#" className="text-primary">Descargar</a></td>
                                            </tr>
                                            <tr>
                                                <td>5586013</td>
                                                <td>Mensualidad de diciembre 2024. Trámite para boleta de calificaciones</td>
                                                <td>10 Dic 24</td>
                                                <td>$3,500</td>
                                                <td className="text-secondary">Sin factura</td>
                                            </tr>
                                            <tr>
                                                <td>5213578</td>
                                                <td>Mensualidad de nov 2024</td>
                                                <td>10 Nov 24</td>
                                                <td>$3,000</td>
                                                <td className="text-secondary">Sin factura</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                
                                
                            </section>
                             
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
};

export default Activity;