import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState, useContext } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserContext from "../../context/userContext";
import "./forms.css";

function Sign() {
  const { redirect } = useParams();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const { sign } = useUser();

  useEffect(() => {}, []);

  const signHandler = () => {
    setErrorMessage("");
    if (user.trim() === "" || password.trim() === "") {
      return setErrorMessage("Asegúrate de llenar todos los campos");
    }
    setLoader(true);
    sign(
      (data, err) => {
        setLoader(false); // Detener el cargador cuando se recibe respuesta
        if (err) {
          return setErrorMessage(err);
        }
        setLogged(true);
        window.sessionStorage.setItem("session", JSON.stringify(data.data));
        if (redirect) {
          navigate(`/${redirect}`);
        } else {
          navigate("/");
        }
      },
      { user, password }
    );
  };

  // Función para redirigir a la página de registro en una nueva ventana
  const handleRegisterClick = () => {
    navigate("/forms/signup"); // Abrir en una nueva ventana/pestaña
  };

  // funcion para redirigir a la pagina de recuperar la contraseña en una nueva ventana
  const handleClick = () =>{
    navigate("/forms/recover_password");
  }



  return (
    <>
      <div className="container">
        <div className="header">
          <div className="text">Inicia sesión</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <input
              id="login-username-input"
              onChange={(event) => setUser(event.target.value)}
              className="form_sign__input-username input-form"
              type="text"
              placeholder="Usuario"
            />
          </div>

          <div className="input">
            <input
              id="login-password-input"
              onChange={(event) => setPassword(event.target.value)}
              className="form_sign__input-password input-form"
              type="password"
              placeholder="Contraseña"
            />
          </div>

          {loader ? (
            <div className="effect-loader">
              <svg className="ring" viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>
          ) : null}

          <div className="submit-container">
            <div className="submit" onClick={signHandler}>
              Iniciar sesión
            </div>

            <div className="submit" onClick={handleRegisterClick}>
              <b>Regístrate aquí</b>
            </div>
          </div>
          <div className="forgot-password">
          <span onClick={handleClick} style={{ color: 'blue', cursor: 'pointer' }}>
      ¿Olvidaste tu contraseña?
    </span>
          </div>

          {/* Botón de Google para iniciar sesión */}
          <div className="container__google-login">
            <GoogleLogin
              className="button-google"
              onSuccess={(response) => {
                console.log("Google login success", response);
              }}
              onError={() => {
                console.log("Google login failed");
              }}
            />
          </div>
        </div>

        {/* Mensaje de error si hay un problema */}
        {errorMessage && (
          <div id="container_error" className="form-sign__container-error">
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default Sign;
