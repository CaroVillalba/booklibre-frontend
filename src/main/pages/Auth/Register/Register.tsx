import "../Login/Login.css"
import { Button } from "primereact/button";
import { useState } from "react";
import { registerService } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { validateEmail } from "../AuthBase.tsx";
import { AuthBase } from "../AuthBase.tsx";
import { AuthTextField } from "../AuthBase.tsx";
import { AuthPasswordField } from "../AuthBase.tsx";

const registerHeader = (
    <div className="login-header">
        <h1>📚</h1>
        <h1>Crea una cuenta</h1>
        <p>Unete a nuestra comunidad y empieza a leer</p>
    </div>
)

export const Register = () => {
    var [name, setName] = useState("")
    var [email, setEmail] = useState("")
    var [password, setPassword] = useState("")
    var [confirmPassword, setConfirmPassword] = useState("")

    var [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    var [usernameErrorMessage, setUsernameErrorMessage] = useState("")
    var [emailErrorMessage, setEmailErrorMessage] = useState("")

    var [registerErrorMessage, setRegisterErrorMessage] = useState("")

    var navigate = useNavigate()

    async function register() {
        var frontErrors: string[] = []

        setPasswordErrorMessage("")
        setUsernameErrorMessage("")
        setEmailErrorMessage("")
        setRegisterErrorMessage("")

        //toooooooooda la validacion antes de la request
        if (password != confirmPassword) {
            frontErrors.push("NON_MATCHING_PASSWORDS")
        }

        if (name == "" || email == "") {
            if (name == "") 
                frontErrors.push("EMPTY_USERNAME")
            
            if (email == "") 
                frontErrors.push("EMPTY_EMAIL")
            
            if (password == "") 
                frontErrors.push("EMPTY_PASSWORD")
        }
        
        if (email != "" && !validateEmail(email)) {
            frontErrors.push("INVALID_EMAIL")
        }

        

        if (frontErrors.length != 0) {

            if (frontErrors.includes("NON_MATCHING_PASSWORDS")) 
                setPasswordErrorMessage("Las contraseñas ingresadas no coinciden.")
            
            if (frontErrors.includes("EMPTY_PASSWORD")) 
                setPasswordErrorMessage("La contraseña no puede estar vacia.")
            
            if (frontErrors.includes("EMPTY_USERNAME")) 
                setUsernameErrorMessage("El nombre de usuario no puede estar vacio.")
            
            if (frontErrors.includes("EMPTY_EMAIL")) 
                setEmailErrorMessage("El correo electronico no puede estar vacio.")
            
            if (frontErrors.includes("INVALID_EMAIL")) 
                setEmailErrorMessage("El correo electronico ingresado es invalido.")
            
            return
        }

        try {
            await registerService.create({"nombre": name, "email": email, "password": password})

            navigate("/login")
        }

        catch (error: any) {
            if (error instanceof AxiosError && error.response != undefined) {
                if (error.response.status >= 400 && error.response.status < 500) {
                    var errors = error.response.data.split(",")


                    if (errors.includes("USERNAME_ALREADY_EXISTS")) 
                        setUsernameErrorMessage("Ya hay un usuario con el mismo nombre")

                    if (errors.includes("EMAIL_ALREADY_EXISTS")) 
                        setEmailErrorMessage("Ya hay un usuario con el mismo email")
                }
            }
            else {
                setRegisterErrorMessage("Error del servidor. Intentelo mas tarde.")
            }
        }
    }

    return (
        <AuthBase header={registerHeader}>
            <AuthTextField label="Nombre completo:" value={name} onChange={setName} error={usernameErrorMessage} /> 

            <AuthTextField label="Correo electronico:" value={email} onChange={setEmail} error={emailErrorMessage}/>
            
            <AuthPasswordField label="Contraseña:" value={password} onChange={setPassword} error={""} />

            <AuthPasswordField label="Confirmar contraseña:" value={confirmPassword} onChange={setConfirmPassword} error={passwordErrorMessage} />

            <p id="account-login-error" className="error-message-label">{registerErrorMessage}</p>

            <p><Button className="login-button" onClick={register}>Crear cuenta</Button></p>

            <p className="center">Ya tienes una cuenta? <a href="/login">Iniciar sesion</a></p>
        </AuthBase>
    )
}