import "../Login/Login.css"
import { Button } from "primereact/button";
import { useState } from "react";
import { registerService } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel"; // Import FloatLabel from PrimeReact
import { AxiosError } from "axios";
import { AuthDropdown, validateEmail } from "../AuthBase.tsx";
import { AuthBase } from "../AuthBase.tsx";
import { AuthTextField } from "../AuthBase.tsx";
import { AuthPasswordField } from "../AuthBase.tsx";
import { Dropdown } from "primereact/dropdown";

const registerHeader = (
    <div className="login-header">
        <h1>📚</h1>
        <h1>Creá una cuenta</h1>
        <p>Unite a nuestra comunidad y empezá a leer</p>
    </div>
)

export const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
    const [emailErrorMessage, setEmailErrorMessage] = useState("")

    const [registerErrorMessage, setRegisterErrorMessage] = useState("")

    const [rol, setRol] = useState("")

    const rolOptions = [
        { label: 'Solo quiero leer', value: 'LECTOR' },
        { label: 'Solo quiero publicar', value: 'PUBLICADOR' },
        { label: 'Quiero hacer ambas', value: 'LECTOR_PUBLICADOR' }
    ]

    const navigate = useNavigate()

    async function register() {
        const frontErrors: string[] = []

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
            await registerService.create({
                nombre: name,
                email: email,
                password: password,
                tipoUsuario: rol
            })

            navigate("/login")
        }

        catch (error: unknown) {
            if (error instanceof AxiosError && error.response != undefined) {
                if (error.response.status >= 400 && error.response.status < 500) {
                    const errors = error.response.data.split(",")

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

            <AuthDropdown 
                label="Tipo de usuario:" 
                value={rol} 
                onChange={setRol} 
                options={rolOptions} 
            />

            <p><Button className="login-button" onClick={register}>Crear cuenta</Button></p>

            <p className="center">¿Ya tenés una cuenta? <a href="/login">Iniciar sesion</a></p>
        </AuthBase>
    )
}