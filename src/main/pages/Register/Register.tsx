import "./Register.css"
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { registerService } from "../../services/AuthService";
import type { RegistroUsuario } from "../../../types/Usuario";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    var [name, setName] = useState("")
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [confirmPassword, setConfirmPassword] = useState("")

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

        var passwordErrorMessage = document.getElementById("password-confirmation-error")
        passwordErrorMessage!.innerText = ""

        var usernameErrorMessage = document.getElementById("username-conflict-error")
        usernameErrorMessage!.innerText = ""

        var emailErrorMessage = document.getElementById("email-conflict-error")
        emailErrorMessage!.innerText = ""

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

        }

        

        if (frontErrors.length != 0) {
            console.log(frontErrors)

            if (frontErrors.includes("NON_MATCHING_PASSWORDS")) {
                console.log("Las contraseñas ingresadas no coinciden.")
                passwordErrorMessage!.innerText = "Las contraseñas ingresadas no coinciden."
            }
            if (frontErrors.includes("EMPTY_USERNAME")) {
                console.log("El nombre de usuario no puede estar vacio")
                usernameErrorMessage!.innerText = "El nombre de usuario no puede estar vacio"
            }
            if (frontErrors.includes("EMPTY_EMAIL")) {
                console.log("El correo electronico no puede estar vacio")
                emailErrorMessage!.innerText = "El correo electronico no puede estar vacio"
            }

            return
        }

        try {
            var result = await registerService.create({"nombre": name, "email": email, "password": password})

            navigate("/login")
        }
        catch (e) {
            var errors = e.response.data.split(",")
            
            console.log(errors)

            if (errors.includes("USERNAME_ALREADY_EXISTS")) {
                console.log("Ya hay un usuario con el mismo nombre")
                usernameErrorMessage!.innerText = "Ya hay un usuario con el mismo nombre"
            }

            if (errors.includes("EMAIL_ALREADY_EXISTS")) {
                console.log("Ya hay un usuario con el mismo email")
                emailErrorMessage!.innerText = "Ya hay un usuario con el mismo email"
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

                <p id="username-conflict-error" className="error-message-label"></p>

                <p><b>Correo electronico:</b></p>
                <p><InputText className="block-input-text" value={email} onChange={handleEmailInput}></InputText></p>

                <p id="email-conflict-error" className="error-message-label"></p>

                <p><b>Contraseña:</b></p>
                <p><Password className="block-input-text" value={password} onChange={handlePasswordInput} toggleMask></Password></p>

                <p><b>Confirmer contraseña:</b></p>
                <p><Password className="block-input-text" value={confirmPassword} onChange={handleConfirmPasswordInput} toggleMask></Password></p>

                <p id="password-confirmation-error" className="error-message-label"></p>

                <p><Button className="login-button" onClick = {register}>Crear cuenta</Button></p>

                <p className="center">Ya tienes una cuenta? <a href="/login">Iniciar sesion</a></p>
            </Card>
            
            <p className="center">© PastelReads. Todos los derechos reservados.</p>
        </div>
    )
}