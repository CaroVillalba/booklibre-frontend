import "./Login.css"
import { Card } from 'primereact/card';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";



export const Login = () => {
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [rememberme, setRememberme] = useState(false)

    const handleCheckRememberme = () => {
        setRememberme(!rememberme)
    }

    const handleEmailInput = (e: any) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e: any) => {
        setPassword(e.target.value)
    }

    const login = () => {
        console.log(`email: ${email}; password: ${password}`)
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

                <p><b>Contraseña:</b></p>
                <p><InputText className="block-input-text" value={password} onChange={handlePasswordInput}></InputText></p>

                <p><Checkbox checked={rememberme} onClick={handleCheckRememberme}></Checkbox> Recordame</p>

                <p><Button className="login-button" onClick={login}>Ingresar</Button></p>

                <p className="center">Aun no tienes una cuenta? <a href="/register">Registrate gratis</a></p>
            </Card>
            
            <p className="center">© PastelReads. Todos los derechos reservados.</p>
        </div>
    )
}