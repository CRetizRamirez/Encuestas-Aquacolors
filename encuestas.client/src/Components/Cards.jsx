import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Cards() {

    const [vendedoresTienda, setVendedoresTienda] = useState([]);
    const navigate = useNavigate();

    // Obtener el usuario (nombre de la tienda) desde localStorage
    const user = localStorage.getItem("user");

    const handleImageClick = (vendedor) => {
        navigate('/encuestas', { state: { vendedor, user } });
    };

    const mostrarVendedoresTiendaSP = async () => {
        const data = {
            Tienda: user
        };
        const url = ("/api/sp/mostrarvendedorestienda");
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setVendedoresTienda(await response.json())
            } else {
                alert("No hay Vendedores en" + user)
            }
        } catch (error) {
            console.error('Error en mostrarVendedoresSP', error);
        }
    };

    useEffect(() => {
        mostrarVendedoresTiendaSP();
    }, []);

    return (
        <div
            className="Fondo">
            <h1 className="mb-4 mt-4 text-center">Quien te atendio en {user} ?</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {vendedoresTienda.map((vendedor) => (
                    <div key={vendedor.idVendedor} className="col">
                        <div className="card h-100" style={{ border: '2px solid pink' }}>
                            {vendedor.imgVendedor && (
                                <img
                                    src={`data:image/png;base64,${vendedor.imgVendedor}`}
                                    alt={vendedor.vendedor}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                    onClick={() => handleImageClick(vendedor.vendedor)}
                                />
                            )}
                            <div className="card-title text-center mt-3">
                                <h5 className="card-title">{vendedor.vendedor} 🎄</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cards;