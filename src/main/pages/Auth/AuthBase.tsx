import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"

export const validateEmail = (email: string): Boolean => {
    //regex de mail
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

    return email.match(emailRegex) != null
}

interface AuthProps {
    children: React.ReactNode
    header: React.ReactNode
}

export const AuthBase = (props: AuthProps) => {
    return (
        
            <div className="Auth">
                <Card>
                    {props.header}
                    <hr/>
                    {props.children}
                </Card>

                <p className="center">© PastelReads. Todos los derechos reservados.</p>
            </div>
        
    )
}

interface AuthTextFieldProps {
    label: string
    value: string
    onChange: Function
    error: string
}

export const AuthTextField = (props: AuthTextFieldProps) => {
    const handleInput = (e: any) => {
        props.onChange(e.target.value)
    }
    
    return (
        <>
            <p><b>{props.label}</b></p>
            <p><InputText className="block-input-text" value={props.value} onChange={handleInput} /></p>

            <p className="error-message-label">{props.error}</p>
        </>
    )
}

export const AuthPasswordField = (props: AuthTextFieldProps) => {
    const handleInput = (e: any) => {
        props.onChange(e.target.value)
    }
    
    return (
        <>
            <p><b>{props.label}</b></p>
            <p><Password className="block-input-text" value={props.value} onChange={handleInput} toggleMask /></p>

            <p className="error-message-label">{props.error}</p>
        </>
    )
}