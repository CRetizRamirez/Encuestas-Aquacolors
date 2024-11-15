import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import { useForm } from 'react-hook-form';

function Vendedores() {

    const { register, handleSubmit, reset } = useForm();

    const [imageBase64, setImageBase64] = useState('');
    const [tiendas, setTiendas] = useState([]);
    const [vendedoresSql, setVendedoresSql] = useState([]);

    const onSubmit = async (datos) => {
        const data = {
            ...datos,
            imgVendedor: imageBase64
        };
        try {
            const response = await fetch("/api/sp/ingresarvendedor", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                mostrarVendedoresSP();
                reset();
            } else {
                const errorText = await response.text();
                console.error("Error al agregar vendedor:", errorText);
            }
        }
        catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Convertir la imagen a Base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onloadend = () => {
            setImageBase64(reader.result.split(',')[1]); // Guardamos solo la parte base64
        };
    };

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

    const eliminarSP = async(item) => {
        const dato = {
            idVendedor:item.idVendedor
        }
        try {
            const response = await fetch("/api/sp/eliminarvendedor", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dato)
            });
            if (response.ok) {
                mostrarVendedoresSP();
                alert(item.vendedor + " fue eliminado")
            }
        }
        catch (error) {
            console.error('Error en eliminarSP', error)
        }
        
    }

    useEffect(() => {
        mostrarTiendasSP();
        mostrarVendedoresSP();
    }, []);

    return (
        <div className="container">
            <Navbar />
            <h1>Vendedores</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-2 mb-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input
                                required
                                type="text"
                                className="form-control"
                                id="inputNombre"
                                name="inputNombre"
                                placeholder=""
                                {...register("vendedor")}

                            />
                            <label htmlFor="inputNombre">Nombre del Vendedor</label>
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
                            <input
                                required
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                accept="image/*" />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Ingresar Vendedor</button>
                </div>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Vendedor</th>
                        <th>Tienda</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vendedoresSql.map(item => (
                            <tr key={item.idVendedor}>
                                <td>{item.vendedor}</td>
                                <td>{item.tienda}</td>
                                <td>
                                    <button onClick={()=>eliminarSP(item)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Vendedores;