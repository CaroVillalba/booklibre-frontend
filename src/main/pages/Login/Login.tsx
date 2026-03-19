import "./Login.css"
import { Card } from 'primereact/card';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { loginService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [rememberme, setRememberme] = useState(false)

    var navigate = useNavigate()

    const handleCheckRememberme = () => {
        setRememberme(!rememberme)
    }

    const handleEmailInput = (e: any) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e: any) => {
        setPassword(e.target.value)
    }

    async function login () {
        var emailErrorMessage = document.getElementById("email-conflict-error")
        emailErrorMessage!.innerText = ""

        var passwordErrorMessage = document.getElementById("password-confirmation-error")
        passwordErrorMessage!.innerText = ""

        var frontErrors: string[] = []

        if(email == "") {
            frontErrors.push("EMPTY_EMAIL")
        }

        if(password == "") {
            frontErrors.push("EMPTY_PASSWORD")
        }

        if (frontErrors.length > 0) {
            if (frontErrors.includes("EMPTY_EMAIL")) {
                emailErrorMessage!.innerText = "El correo electronico no puede estar vacio."
            }

            if (frontErrors.includes("EMPTY_PASSWORD")) {
                passwordErrorMessage!.innerText = "La contraseña no puede estar vacia."
            }

            return 
        }

        var res = await loginService.login({"email": email, "password": password, "rememberMe": false})

        alert("Se inicio la sesion correctamente!!")
        console.log(`email: ${email}; password: ${password}`)

        navigate("/")
    }

    return (
        <div className="Login">
            <Card>
                <div className="login-header">
                    <h1>📚</h1>
                    <h1>BookLibre</h1>
                    <p>Por favor ingresa tus datos para continuar leyendo.</p>
                </div>

                <hr/>

                <p><b>Correo electronico:</b></p>
                <p><InputText className="block-input-text" value={email} onChange={handleEmailInput}></InputText></p>
                
                <p id="email-conflict-error" className="error-message-label"></p>

                <p><b>Contraseña:</b></p>
                <p><Password className="block-input-text" value={password} onChange={handlePasswordInput} toggleMask></Password></p>

                <p id="password-confirmation-error" className="error-message-label"></p>

                <p><Checkbox checked={rememberme} onClick={handleCheckRememberme}></Checkbox> Recordame</p>

                <p><Button className="login-button" onClick={login}>Ingresar</Button></p>

                <p className="center">Aun no tienes una cuenta? <a href="/register">Registrate gratis</a></p>
            </Card>
            
            <p className="center">© PastelReads. Todos los derechos reservados.</p>
        </div>
    )
}