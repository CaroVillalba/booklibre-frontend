import "./Login.css"
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useState } from "react";
import { loginService } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { validateEmail } from "../AuthBase";
import { AuthBase } from "../AuthBase";
import { AuthTextField } from "../AuthBase.tsx";
import { AuthPasswordField } from "../AuthBase.tsx";

export const loginHeader = (
    <div className="login-header">
        <h1>📚</h1>
        <h1>BookLibre</h1>
        <p>Por favor ingresa tus datos para continuar leyendo.</p>
    </div>
)

export const Login = () => {
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [rememberme, setRememberme] = useState(false)

    var [emailErrorMessage, setEmailErrorMessage] = useState("")
    var [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    var [loginErrorMessage, setLoginErrorMessage] = useState("")

    var navigate = useNavigate()

    const handleCheckRememberme = () => {
        setRememberme(!rememberme)
    }

    async function login () {
        setEmailErrorMessage("")
        setPasswordErrorMessage("")
        setLoginErrorMessage("")

        var frontErrors: string[] = []

        if(email == "") {
            frontErrors.push("EMPTY_EMAIL")
        }

        if(password == "") {
            frontErrors.push("EMPTY_PASSWORD")
        }
        
        if (email != "" && !validateEmail(email)) {
            frontErrors.push("INVALID_EMAIL")
        }

        if (frontErrors.length > 0) {
            if (frontErrors.includes("EMPTY_EMAIL")) {
                setEmailErrorMessage("El correo electronico no puede estar vacio.")
            }

            if (frontErrors.includes("EMPTY_PASSWORD")) {
                setPasswordErrorMessage("La contraseña no puede estar vacia.")
            }

            if (frontErrors.includes("INVALID_EMAIL")) {
                setEmailErrorMessage("El correo electronico ingresado es invalido.")
            }

            return 
        }

        try {
            await loginService.login({"email": email, "password": password, "rememberMe": false})

            navigate("/home")
        }
        catch (error: AxiosError) {
            if (error.response.status >= 400 && error.response.status < 500)
            setLoginErrorMessage(error.response.data)
        }
    }

    return (
        <AuthBase header={loginHeader}>

            <AuthTextField label="Correo electronico:" value={email} onChange={setEmail} error={emailErrorMessage}/>
            
            <AuthPasswordField label="Contraseña:" value={password} onChange={setPassword} error={passwordErrorMessage} />

            <p><Checkbox checked={rememberme} onClick={handleCheckRememberme}></Checkbox> Recordame</p>

            <p id="account-login-error" className="error-message-label">{loginErrorMessage}</p>

            <p><Button className="login-button" onClick={login}>Ingresar</Button></p>

            <p className="center">Aun no tienes una cuenta? <a href="/register">Registrate gratis</a></p>
        </AuthBase>
    )
}