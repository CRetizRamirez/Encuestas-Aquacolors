import React, { useState, useContext, useEffect } from 'react';
//import { AuthContext } from '../App.jsx';
//import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap'; // Si usas reactstrap
import Swal from 'sweetalert2'
import cinco from "../Components/Images/cinco.png";
import cuatro from "../Components/Images/cuatro.png";
import tres from "../Components/Images/tres.png";
import dos from "../Components/Images/dos.png";
import uno from "../Components/Images/uno.png";

function Encuestas() {

    //const { login, isAuthenticated } = useContext(AuthContext); // Asegúrate de usar login() para establecer autenticación
    const navigate = useNavigate();
    // 15 y 16 son para traerme el nombre del vendedor
    const location = useLocation();
    const vendedor = location.state?.vendedor;
    const tienda = location.state?.user;

    const [modal1, setModal1] = useState(true);  // Controla el primer modal
    const [modal2, setModal2] = useState(false); // Controla el segundo modal
    const [modal3, setModal3] = useState(false); // Controla el tercer modal
    const [modal4, setModal4] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [modalComentario, setModalComentario] = useState(false);
    const [comentario, setComentario] = useState(''); // Estado para guardar el comentario
    const [formData, setFormData] = useState({}); // Almacena todos los datos de los formularios

    const handleImageSelect1 = (valorSeleccionado) => {
        setFormData(prevData => ({
            ...prevData,
            respuesta1: valorSeleccionado, // Guarda la selección en formData
            vendedor: vendedor,
            tienda: tienda
        }));
        //navigate('/cards')
        setModal1(false); // Cierra este modal
        setModal2(true);  // Abre el siguiente modal
    };

    const handleImageSelect2 = (valorSeleccionado) => {
        setFormData(prevData => ({
            ...prevData,
            respuesta2: valorSeleccionado // Guarda la selección en formData
        }));
        setModal2(false); // Cierra este modal
        setModal3(true);  // Abre el siguiente modal
    };

    const handleImageSelect3 = (valorSeleccionado) => {
        setFormData(prevData => ({
            ...prevData,
            respuesta3: valorSeleccionado // Guarda la selección en formData
        }));
        setModal3(false); // Cierra este modal
        setModal4(true);  // Abre el siguiente modal
    };

    const handleImageSelect4 = (valorSeleccionado) => {
        setFormData(prevData => ({
            ...prevData,
            respuesta4: valorSeleccionado // Guarda la selección en formData
        }));
        setModal4(false); // Cierra este modal
        setModal5(true);  // Abre el siguiente modal
    };

    const handleImageSelect5 = (valorSeleccionado) => {
        setFormData(prevData => ({
            ...prevData,
            respuesta5: valorSeleccionado // Guarda la selección en formData
        }));
        setModal5(false); // Cierra este modal
        setModalComentario(true);  // Abre el siguiente modal
    };

    const handleComentario = async (valorSeleccionado) => {
        // Actualizar el comentario en el estado
        setFormData((prevData) => ({
            ...prevData,
            comentario: valorSeleccionado
        }));

        setModalComentario(false);

        const updatedFormData = { ...formData, comentario };  // Actualizamos formData, esta linea es indispensable

        // Realizamos el fetch
        try {
            const response = await fetch("/api/sp/ingresarrespuesta", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.statusText}`);
            }

            // Sweet Modal de agradecimiento
            await Swal.fire({
                title: "Gracias por contestar la encuesta.",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "rgba(0, 0, 0, 0.5) url()",
                backdrop: `
                rgba(0,0,0,0.4)
                url(https://img1.picmix.com/output/stamp/normal/8/9/4/6/1566498_43a19.gif)
                left top
                no-repeat
            `
            });
            navigate("/cards");
        } catch (error) {
            console.error("Error en realizarFetch:", error);
        }
    };

    //Despues de un minuto de inactividad en Encuestas se regresa a Cards
    useEffect(() => {
        let timeout;

        // Función que maneja el regreso a Cards.jsx después de 1 minuto de inactividad
        const handleInactivity = () => {
            navigate("/cards");
        };

        // Función que reinicia el temporizador
        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleInactivity, 30000); // 1/2 minuto = 30000 ms
        };

        // Agregar eventos para detectar la interacción del usuario
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("mousedown", resetTimer);
        window.addEventListener("keypress", resetTimer);
        window.addEventListener("touchstart", resetTimer);

        // Inicializar el temporizador cuando se monte el componente
        resetTimer();

        // Limpiar los eventos y el temporizador cuando se desmonte el componente
        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", resetTimer);
            window.removeEventListener("mousedown", resetTimer);
            window.removeEventListener("keypress", resetTimer);
            window.removeEventListener("touchstart", resetTimer);
        };
    }, [navigate]);

    return (
        <div className="Fondo">
            {/* Primer Modal */}
            <Modal isOpen={modal1} fade={false} size="xl" className="modal-centered" modalClassName="Fondo" >
                <ModalBody>
                    <div className="text-center mb-5">
                        <h2>Te gustaria ser atendido nuevamente por {vendedor} ?</h2>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <div onClick={() => handleImageSelect1('si')}>
                            <img src="https://www.gifservice.fr/img/gif-vignette-small/589ae6507e3752e852d260ffcd25abf9/399286-mensajes-espaol-si-004.gif"
                                alt="Bueno"
                                style={{ cursor: 'pointer', width: '100px' }} />
                        </div>
                        <div onClick={() => handleImageSelect1('no')}>
                            <img src="https://i.pinimg.com/originals/b1/03/3b/b1033bc996c69d3a6003c2fa07281aaf.gif"
                                alt="Regular"
                                style={{ cursor: 'pointer', width: '200px', height: '200px' }} />
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Segundo Modal */}
            <Modal isOpen={modal2} fade={false} size="xl" className="modal-centered" modalClassName="Fondo">
                <ModalBody>
                    <div className="text-center mb-5">
                        <h2>{vendedor} mostro interes al atenderte?</h2>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <div onClick={() => handleImageSelect2('bueno')}>
                            <img src="https://media.tenor.com/zlfKjNcBP4cAAAAi/very-good.gif" alt="Bueno" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Bueno</p>
                        </div>
                        <div onClick={() => handleImageSelect2('regular')}>
                            <img src="https://media.tenor.com/c9Rb0vF3sjcAAAAi/good-morning.gif" alt="Regular" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Regular</p>
                        </div>
                        <div onClick={() => handleImageSelect2('malo')}>
                            <img src="https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f97a.gif" alt="Malo" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Malo</p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Tercer Modal */}
            <Modal isOpen={modal3} fade={false} size="xl" className="modal-centered" modalClassName="Fondo">
                <ModalBody>
                    <div className="text-center mb-5">
                        <h2>{vendedor} resolvio todas tus dudas del producto?</h2>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <div onClick={() => handleImageSelect3('bueno')}>
                            <img src="https://media.tenor.com/zlfKjNcBP4cAAAAi/very-good.gif" alt="Bueno" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Bueno</p>
                        </div>
                        <div onClick={() => handleImageSelect3('regular')}>
                            <img src="https://media.tenor.com/c9Rb0vF3sjcAAAAi/good-morning.gif" alt="Regular" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Regular</p>
                        </div>
                        <div onClick={() => handleImageSelect3('malo')}>
                            <img src="https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f97a.gif" alt="Malo" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Malo</p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Cuarto Modal */}
            <Modal isOpen={modal4} fade={false} size="xl" className="modal-centered" modalClassName="Fondo">
                <ModalBody>
                    <div className="text-center mb-5">
                        <h2>Como calificarias a {vendedor}?</h2>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <div onClick={() => handleImageSelect4('cinco')}>
                            <img src={cinco} alt="Cinco" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">5</p>
                        </div>
                        <div onClick={() => handleImageSelect4('cuatro')}>
                            <img src={cuatro} alt="Cuatro" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">4</p>
                        </div>
                        <div onClick={() => handleImageSelect4('tres')}>
                            <img src={tres} alt="Tres" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">3</p>
                        </div>
                        <div onClick={() => handleImageSelect4('dos')}>
                            <img src={dos} alt="Dos" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">2</p>
                        </div>
                        <div onClick={() => handleImageSelect4('uno')}>
                            <img src={uno} alt="Uno" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">1</p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Quinto Modal */}
            <Modal isOpen={modal5} fade={false} size="xl" className="modal-centered" modalClassName="Fondo">
                <ModalBody>
                    <div className="text-center mb-5">
                        <h2>Mediante que red social nos conociste?</h2>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <div onClick={() => handleImageSelect5('youtube')}>
                            <img src="https://i.gifer.com/WnER.gif" alt="Youtube" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Youtube</p>
                        </div>
                        <div onClick={() => handleImageSelect5('facebook')}>
                            <img src="https://c0.klipartz.com/pngpicture/571/686/gratis-png-facebook-iconos-de-computadora-servicio-de-redes-sociales-logotipo-de-redes-sociales-facebook.png" alt="Facebook" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Facebook</p>
                        </div>
                        <div onClick={() => handleImageSelect5('instagram')}>
                            <img src="https://i.pinimg.com/originals/2c/09/4d/2c094d32daf5a9079a09588004319274.gif" alt="Instagram" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Instagram</p>
                        </div>
                        <div onClick={() => handleImageSelect5('tiktok')}>
                            <img src="https://i2.wp.com/media3.giphy.com/media/cnhcoqxqmZI4PhFdop/giphy.gif" alt="Tiktok" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">TikTok</p>
                        </div>
                        <div onClick={() => handleImageSelect5('ninguno')}>
                            <img src="https://media.giphy.com/media/l3JDJ8hPoiNbAt6Uw/giphy.gif" alt="Ninguno" style={{ cursor: 'pointer', width: '100px' }} />
                            <p className="text-center texto-grande-negrita">Ninguno</p>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            {/* Modal Comentario */}
            <Modal isOpen={modalComentario} fade={false} size="xl" className="modal-centered" modalClassName="Fondo">
                <ModalBody>
                    <div className="text-center mb-5">
                        <h2>COMENTARIO</h2>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <textarea
                            placeholder="Escribe tu comentario..."
                            rows="4"
                            cols="50"
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                            value={comentario} // Mantiene el valor del comentario en el textarea
                            onChange={(e) => setComentario(e.target.value)} // Guarda el comentario en el estado 'comentario'
                        />
                    </div>
                    <div className="text-center mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => { handleComentario(comentario) }} >
                            Enviar Comentario
                        </button>
                    </div>
                </ModalBody>
            </Modal>

        </div>
    );
}

export default Encuestas;
