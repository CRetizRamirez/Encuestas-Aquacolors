import { Container } from "reactstrap"
import React, { useContext } from 'react';
import { AuthContext } from '../App.jsx';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");

	const handleUsuarioChange = (value) => {
		setUsuario(value);
	}

	const handleContrasenaChange = (value) => {
		setContrasena(value);
	}

	const handleLoginSP = async () => {
		const data = {
			Usuario: usuario,
			Contrasena: contrasena
		};
		const url = ("/api/sp/login");
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			if (response.ok) {
				const result = await response.json();

				// Llamar a login() antes de navegar
				login();

				if (result.rol == "admin") {
					localStorage.setItem("user", result.usuario); // Guarda el admin en localStorage
					navigate("/consultas", { state: { usuario: result.usuario, idusuario: result.idUser } });
				} else if (result.rol == "tienda") {
					localStorage.setItem("user", result.usuario); // Guarda la tienda en localStorage
					navigate("/cards", { state: { usuario: result.usuario, idusuario: result.idUser } });
				}
			} else {
				alert("Credenciales invalidas")
			}
		}
		catch (error) {
			console.error("Error en el handleLoginSP", error);
		}
	}


  return (
	  <Container className="modal-centered">
		  <div className="App">
			  <section className=" text-center text-lg-start">
				  <div className="card mb-3 bg-light">
					  <div className="row g-0 d-flex align-items-center">
						  <div className="col-lg-4 d-none d-lg-flex">
							  <img
								  src="https://alt72.com.ar/wp-content/uploads/2014/09/login.png"
								  alt="Usuario"
								  className="w-100"
							  />
						  </div>
						  <div className="col-lg-8">
							  <div className="card-body py-5 px-md-5">
								  <form>
									  <div className="form-outline mb-4">
										  <input
											  type="text"
											  id="form2Example1"
											  className="form-control"
											  onChange={(e) => handleUsuarioChange(e.target.value)}
										  />
										  <label className="form-label" htmlFor="form2Example1">
											  Usuario
										  </label>
									  </div>
									  <div className="form-outline mb-4">
										  <input
											  type="password"
											  id="form2Example2"
											  className="form-control"
											  onChange={(e) => handleContrasenaChange(e.target.value)}
										  />
										  <label className="form-label" htmlFor="form2Example2">
											  Password
										  </label>
									  </div>									  
									  <button
										  type="button"
										  className="btn btn-primary btn-block mb-4"
										  onClick={() => handleLoginSP()}
									  >
										  Ingresar
									  </button>
								  </form>
							  </div>
						  </div>
					  </div>
				  </div>
			  </section>
		  </div>
	  </Container>
  );
}

export default Login;