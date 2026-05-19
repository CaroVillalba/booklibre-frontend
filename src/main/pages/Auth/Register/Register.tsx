import "../Login/Login.css"
import { Button } from "primereact/button";
import { useState, useContext } from "react";
import { registerService } from "../../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { AuthDropdown } from "../AuthBase.tsx";
import { AuthBase } from "../AuthBase.tsx";
import { AuthTextField } from "../AuthBase.tsx";
import { AuthPasswordField } from "../AuthBase.tsx";
import { validateEmail } from "../../../../utils/validateEmail.ts";
import { MainContext } from '../../../../types/MainContext.ts';

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
    const [rol, setRol] = useState("")

    const { showToast } = useContext(MainContext)

    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("")
    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [rolErrorMessage, setRolErrorMessage] = useState("")

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
        setRolErrorMessage("")

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

        if (rol == "") {
            frontErrors.push("EMPTY_ROLE")
        }

        if (frontErrors.length != 0) {
            showToast("Revisá los campos del formulario.", "warning")

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
            
            if (frontErrors.includes("EMPTY_ROLE"))
                setRolErrorMessage("Debe seleccionar un tipo de usuario.")

            return
        }

        try {
            await registerService.create({
                nombre: name,
                email: email,
                password: password,
                tipoUsuario: rol
            })

            showToast("Cuenta creada correctamente.", "success")

            navigate("/login")
        }

        catch (error: unknown) {
            if (error instanceof AxiosError && error.response != undefined) {
                if (error.response.status >= 400 && error.response.status < 500) {
                    const errors = error.response.data.split(",")

                    if (errors.includes("USERNAME_ALREADY_EXISTS")) 
                        setUsernameErrorMessage("Ya hay un usuario con el mismo nombre")
                        showToast("Ya hay un usuario con ese nombre.", "error")

                    if (errors.includes("EMAIL_ALREADY_EXISTS")) 
                        setEmailErrorMessage("Ya hay un usuario con el mismo email")
                        showToast("Ya hay un usuario con ese email.", "error")
                }
            }
            else {
                showToast("Error del servidor. Intentelo mas tarde.", "error")
            }
        }
    }

    return (
        <AuthBase header={registerHeader}>
            <form onSubmit={(e) => {
                e.preventDefault()
                register()
            }}>
                <AuthTextField label="Nombre completo:" value={name} onChange={setName} error={usernameErrorMessage} /> 

                <AuthTextField label="Correo electronico:" value={email} onChange={setEmail} error={emailErrorMessage}/>
                
                <AuthPasswordField label="Contraseña:" value={password} onChange={setPassword} error={""} />

                <AuthPasswordField label="Confirmar contraseña:" value={confirmPassword} onChange={setConfirmPassword} error={passwordErrorMessage} />

                <AuthDropdown 
                    label="Tipo de usuario:" 
                    value={rol} 
                    onChange={setRol} 
                    options={rolOptions} 
                    error={rolErrorMessage}
                />

                <p><Button className="login-button" type="submit">Crear cuenta</Button></p>

                <p className="center">¿Ya tenés una cuenta? <Link to="/login">Iniciar sesion</Link></p>
            </form>
        </AuthBase>
    )
}