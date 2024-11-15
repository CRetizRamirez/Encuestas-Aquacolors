import Navbar from "./Navbar";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import BotonExcelDefault from "./BotonExcelDefault.jsx";

function Consultas() {

    const { register, handleSubmit } = useForm();
    const [resultados, setResultados] = useState([])
    const [tiendas, setTiendas] = useState([]);
    const [vendedoresSql, setVendedoresSql] = useState([]);
    const [vendedorBuscado, setVendedorBuscado] = useState("");

    const onSubmit = async (formData) => {
        setVendedorBuscado(formData.vendedor);
        try {
            // Crear los parámetros para la URL
            const params = new URLSearchParams({
                fechaInicio: formData.fechaInicio,
                fechaFin: formData.fechaFin,
                tienda: formData.tienda,
                vendedor: formData.vendedor
            });
            // Realizar la solicitud fetch con los parámetros
            const response = await fetch(`/api/sp/MostrarRespuestas?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Manejo de errores del servidor
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`);
            }

            // Procesar los datos de la respuesta
            const result = await response.json();
            setResultados(result.respuestas);
            //reset();
            return result;
        } catch (error) {
            console.error('Error en onSubmit:', error);
        }
    }

    const mostrarTiendasSP = async () => {
        try {
            const responce = await fetch("/api/sp/mostrartiendas");
            setTiendas(await responce.json());
        }
        catch (error) {
            console.error('Error en mostrarTiendasSP', error)
        }
    }

    const mostrarVendedoresSP = async () => {
        try {
            const responce = await fetch("/api/sp/mostrarvendedores");
            setVendedoresSql(await responce.json());
        }
        catch (error) {
            console.error('Error en mostrarVendedoresSP', error)
        }
    }

    useEffect(() => {
        mostrarTiendasSP();
        mostrarVendedoresSP();
    }, []);

    return (
        <div className="container">
            <Navbar />
            <h1>Consultas</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input
                                required
                                type="date"
                                className="form-control"
                                id="inputFechaInicio"
                                name="inputFechaInicio"
                                placeholder=""
                                {...register("fechaInicio")}
                            />
                            <label htmlFor="inputClave">Fecha de Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input
                                required
                                type="date"
                                className="form-control"
                                id="inputFechaFin"
                                name="inputFechaFin"
                                placeholder=""
                                {...register("fechaFin")}
                            />
                            <label htmlFor="inputClave">Fecha Fin</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select"
                                required
                                id="inputTienda"
                                name="inputTienda"
                                aria-label="Floating label select example"
                                {...register("tienda")}
                            >
                                <option value=""></option>
                                {
                                    tiendas.map(item => (
                                        <option key={item.idTienda} value={item.tienda}>{item.tienda}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="inputTienda">Tienda</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select"
                                required
                                id="inputVendedor"
                                name="inputVendedor"
                                aria-label="Floating label select example"
                                {...register("vendedor")}
                            >
                                <option value=""></option>
                                {
                                    vendedoresSql.map(item => (
                                        <option key={item.idVendedor} value={item.vendedor}>{item.vendedor}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="inputVendedor">Vendedor</label>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </div>
            </form>
            <div>
                <p>1.- Te gustaria ser atendido nuevamente por {vendedorBuscado} ?</p>
                <p>2.- {vendedorBuscado} mostro interes al atenderte?</p>
                <p>3.- {vendedorBuscado}  resolvio todas tus dudas del producto?</p>
                <p>4.- Como calificarias a {vendedorBuscado}?</p>
                <p>5.- Mediante que red social nos conociste?</p>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Vendedor</th>
                        <th>Tienda</th>
                        <th>Pregunta 1</th>
                        <th>Pregunta 2</th>
                        <th>Pregunta 3</th>
                        <th>Pregunta 4</th>
                        <th>Pregunta 5</th>
                        <th>Comentario</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        resultados.map(item => (
                            <tr key={item.idRespuesta}>
                                <td>{item.fecha}</td>
                                <td>{item.vendedor}</td>
                                <td>{item.tienda}</td>
                                <td>{item.respuesta1}</td>
                                <td>{item.respuesta2}</td>
                                <td>{item.respuesta3}</td>
                                <td>{item.respuesta4}</td>
                                <td>{item.respuesta5}</td>
                                <td>{item.comentario}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="modal-footer">
                <BotonExcelDefault resultados={resultados} />
            </div>
        </div>
    );
}

export default Consultas;