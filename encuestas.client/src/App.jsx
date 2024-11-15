import './App.css';
import Encuestas from './Components/Encuestas';
import Login from './Components/Login'
import Cards from './Components/Cards';
import Consultas from './Components/Consultas';
import Vendedores from './Components/Vendedores';
import React, { useState, useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes.jsx';
import { Routes, Route } from 'react-router-dom';

export const AuthContext = React.createContext(null);

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    //// Comprueba si el usuario ya está autenticado en localStorage, Se queda autenticado aunque se refresque la pagina
    //const [isAuthenticated, setIsAuthenticated] = useState(() => {
    //    return localStorage.getItem('isAuthenticated') === 'true';
    //});

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Guarda el estado de autenticación
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Elimina el estado de autenticación al cerrar sesión
        localStorage.removeItem('user');
    };

    return (
        <div>
            <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='*' element={<Login />} />
                    <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                        <Route path='/cards' element={<Cards />} />
                        <Route path='/encuestas' element={<Encuestas />} />
                        <Route path='/consultas' element={<Consultas />} />
                        <Route path='/vendedores' element={<Vendedores />} />
                    </Route>
                </Routes>
            </AuthContext.Provider>
        </div>
    )
}

export default App;