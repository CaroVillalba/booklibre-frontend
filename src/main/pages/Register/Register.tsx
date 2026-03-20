import "./Register.css"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { registerService } from "../../services/AuthService";
import type { RegistroUsuario } from "../../../types/Usuario";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export const Register = () => {
    var [name, setName] = useState("")
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [confirmPassword, setConfirmPassword] = useState("")

    var [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    var [usernameErrorMessage, setUsernameErrorMessage] = useState("")
    var [emailErrorMessage, setEmailErrorMessage] = useState("")

    var navigate = useNavigate()

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

    async function register() {
        var frontErrors: string[] = []

        setPasswordErrorMessage("")
        setUsernameErrorMessage("")
        setEmailErrorMessage("")

        //toooooooooda la validacion antes de la request
        if (password != confirmPassword) {
            frontErrors.push("NON_MATCHING_PASSWORDS")
        }

        if (name == "" || email == "") {
            if (name == "") {
                frontErrors.push("EMPTY_USERNAME")
            }
            if (email == "") {
                frontErrors.push("EMPTY_EMAIL")
            }
            if (password == "") {
                frontErrors.push("EMPTY_PASSWORD")
            }
        }

        

        if (frontErrors.length != 0) {

            if (frontErrors.includes("NON_MATCHING_PASSWORDS")) {
                setPasswordErrorMessage("Las contraseñas ingresadas no coinciden.")
            }
            if (frontErrors.includes("EMPTY_PASSWORD")) {
                setPasswordErrorMessage("La contraseña no puede estar vacia.")
            }
            if (frontErrors.includes("EMPTY_USERNAME")) {
                setUsernameErrorMessage("El nombre de usuario no puede estar vacio")
            }
            if (frontErrors.includes("EMPTY_EMAIL")) {
                setEmailErrorMessage("El correo electronico no puede estar vacio")
            }

            return
        }

        try {
            var result = await registerService.create({"nombre": name, "email": email, "password": password})

            navigate("/login")
        }
        catch (e: AxiosError) {
            var errors = e.response.data.split(",")
            
            console.log(errors)

            if (errors.includes("USERNAME_ALREADY_EXISTS")) {
                console.log("Ya hay un usuario con el mismo nombre")
                setUsernameErrorMessage("Ya hay un usuario con el mismo nombre")
            }

            if (errors.includes("EMAIL_ALREADY_EXISTS")) {
                console.log("Ya hay un usuario con el mismo email")
                setEmailErrorMessage("Ya hay un usuario con el mismo email")
            }
        }
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

                <p id="username-conflict-error" className="error-message-label">{usernameErrorMessage}</p>

                <p><b>Correo electronico:</b></p>
                <p><InputText className="block-input-text" value={email} onChange={handleEmailInput}></InputText></p>

                <p id="email-conflict-error" className="error-message-label">{emailErrorMessage}</p>

                <p><b>Contraseña:</b></p>
                <p><Password className="block-input-text" value={password} onChange={handlePasswordInput} toggleMask></Password></p>

                <p><b>Confirmer contraseña:</b></p>
                <p><Password className="block-input-text" value={confirmPassword} onChange={handleConfirmPasswordInput} toggleMask></Password></p>

                <p id="password-confirmation-error" className="error-message-label">{passwordErrorMessage}</p>

                <p><Button className="login-button" onClick = {register}>Crear cuenta</Button></p>

                <p className="center">Ya tienes una cuenta? <a href="/login">Iniciar sesion</a></p>
            </Card>
            
            <p className="center">© PastelReads. Todos los derechos reservados.</p>
        </div>
    )
}