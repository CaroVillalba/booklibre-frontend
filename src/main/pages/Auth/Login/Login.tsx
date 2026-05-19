import "./Login.css"
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useState } from "react";
import { loginService } from "../../../services/AuthService";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { validateEmail } from "../../../../utils/validateEmail.ts";
import { AuthBase } from "../AuthBase";
import { AuthTextField } from "../AuthBase.tsx";
import { AuthPasswordField } from "../AuthBase.tsx";
import { getMensajeError } from '../../../../utils/errorHandling.ts'
import { MainContext } from '../../../../types/MainContext.ts';
import { useContext } from "react";

const loginHeader = (
    <div className="login-header">
        <h1>📚</h1>
        <h1>BookLibre</h1>
        <p>Por favor ingresa tus datos para continuar leyendo.</p>
    </div>
)

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberme, setRememberme] = useState(false)

    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    
    const { showToast } = useContext(MainContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/home"

    const handleCheckRememberme = () => {
        setRememberme(!rememberme)
    }

    async function login () {
        setEmailErrorMessage("")
        setPasswordErrorMessage("")

        const frontErrors: string[] = []

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
            showToast("Por favor corregí los errores en el formulario.", 'warning')

            if (frontErrors.includes("EMPTY_EMAIL")) 
                setEmailErrorMessage("El correo electronico no puede estar vacio.")
            
            if (frontErrors.includes("EMPTY_PASSWORD")) 
                setPasswordErrorMessage("La contraseña no puede estar vacia.")
            
            if (frontErrors.includes("INVALID_EMAIL")) 
                setEmailErrorMessage("El correo electronico ingresado es invalido.")
            
            return 
        }

        try {
            await loginService.login({"email": email, "password": password, "rememberMe": false})
            navigate(from, { replace: true })
        }
        catch (error: unknown) {
            showToast(getMensajeError(error), 'error')
        }
    }

    return (
        <AuthBase header={loginHeader}>
            <form onSubmit={(e) => {
                e.preventDefault()
                login()
            }}>
                <AuthTextField label="Correo electronico:" value={email} onChange={setEmail} error={emailErrorMessage}/>
                
                <AuthPasswordField label="Contraseña:" value={password} onChange={setPassword} error={passwordErrorMessage} />

                <p><Checkbox checked={rememberme} onClick={handleCheckRememberme}></Checkbox> Recordame</p>

                <p><Button className="login-button" type="submit">Ingresar</Button></p>

                <p className="center">¿Todavía no tenés una cuenta? <Link to="/register">Registrate gratis</Link></p>
            </form>
        </AuthBase>
    )
}