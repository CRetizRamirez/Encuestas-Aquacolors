import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../App.jsx';

function Navbar() {

    const { logout } = useContext(AuthContext);

    const salir = () => {
        logout();
    }

    return (
        <div className="my-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink to={"/consultas"} >
                                <li className="navStyles mx-2" >Consultas</li>
                            </NavLink>
                            <NavLink to={"/vendedores"} >
                                <li className="navStyles mx-2" >Vendedores</li>
                            </NavLink>
                            <NavLink to={"/"} >
                                <li className="navStyles mx-2" onClick={salir} >Salir</li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;