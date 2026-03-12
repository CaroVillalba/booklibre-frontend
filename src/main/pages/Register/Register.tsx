import "./Register.css"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const Register = () => {
    var [name, setName] = useState("")
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [confirmPassword, setConfirmPassword] = useState("")

    const handleNameInput = (e: any) => {
        setName(e.target.value)
    }

    const handleEmailInput = (e: any) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e: any) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordInput = (e: any) => {
        setConfirmPassword(e.target.value)
    }

    const register = () => {
        console.log(`name: ${name}; email: ${email}; password: ${password}; confirmPassword: ${confirmPassword}`)
    }

    return (
        <div className="Register">
            <Card>
                <div className="login-header">
                    <h1>📚</h1>
                    <h1>Crea una cuenta</h1>
                    <p>Unete a nuestra comunidad y empieza a leer</p>
                </div>

                <hr/>

                <p><b>Nombre completo:</b></p>
                <p><InputText className="block-input-text" value={name} onChange={handleNameInput}></InputText></p>

                <p><b>Correo electronico:</b></p>
                <p><InputText className="block-input-text" value={email} onChange={handleEmailInput}></InputText></p>

                <p><b>Contraseña:</b></p>
                <p><InputText className="block-input-text" value={password} onChange={handlePasswordInput}></InputText></p>

                <p><b>Confirmer contraseña:</b></p>
                <p><InputText className="block-input-text" value={confirmPassword} onChange={handleConfirmPasswordInput}></InputText></p>

                <p><Button className="login-button" onClick = {register}>Crear cuenta</Button></p>

                <p className="center">Ya tienes una cuenta? <a href="/login">Iniciar sesion</a></p>
            </Card>
            
            <p className="center">© PastelReads. Todos los derechos reservados.</p>
        </div>
    )
}