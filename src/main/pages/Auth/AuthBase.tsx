import { Card } from "primereact/card"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { Dropdown } from "primereact/dropdown"

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
    onChange: (value: string) => void
    error: string
}

export const AuthTextField = (props: AuthTextFieldProps) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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


interface AuthDropdownProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    error?: string;
}

export const AuthDropdown = (props: AuthDropdownProps) => {
    return (
        <>
            <p><b>{props.label}</b></p>
            <p>
                <Dropdown 
                    value={props.value} 
                    onChange={(e) => props.onChange(e.value)} 
                    options={props.options} 
                    className="w-full" 
                    style={{ textAlign: 'left' }}
                    placeholder="Seleccioná una opción"
                />
            </p>
            {props.error && <p className="error-message-label">{props.error}</p>}
        </>
    );
}