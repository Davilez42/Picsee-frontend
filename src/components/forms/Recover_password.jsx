import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Recover_password.css";

const Recover_password = () => {
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();

    const handleRecovery = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el enlace de recuperación al correo
        setMensaje(`Se envió el enlace para recuperar la contraseña a ${email}`);

        // Redirigir a la vista de ingreso del código
        navigate("/forms/Codeinput");
    };

    return (
        <div className="Recover_password">
            <div className="header_recover">
                <h2 className="text_recover">Recuperar Contraseña</h2>
                <div className="underline_recover"></div>
            </div>
            <form onSubmit={handleRecovery}>
                <div className="inputs_recover">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        className="input-form_recover"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="submit-container_recover">
                    <button type="submit" className="submit_recover">
                        Enviar
                    </button>
                </div>
                {mensaje && <p id="container_error_recover">{mensaje}</p>}
            </form>
        </div>
    );
};

export default Recover_password;
