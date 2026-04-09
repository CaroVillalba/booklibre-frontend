import { Card } from "primereact/card"
import { Divider } from "primereact/divider"

interface UsuarioDatosProps{
    email:string,
    celular:string,
    tipoUsuario:string
}

export const UsuarioDatos = ({email,celular,tipoUsuario}:UsuarioDatosProps) => {

    const tipoUsuarioLabels: Record<string, string> = {
	LECTOR: "Lector",
	PUBLICADOR: "Publicador",
	LECTOR_PUBLICADOR: "Lector y Publicador",
    }


    return (
        <Card className="border-round-2xl shadow-1">

        <div className="flex align-items-center gap-3 mb-4">
            <i className="pi pi-user text-xl"></i>
            <h2 className="m-0 text-2xl font-bold">
            Mis Datos
            </h2>
        </div>

        <div className="mb-4">
            <div className="text-sm text-color-secondary mb-2">
            Email
            </div>
            <div>
            {email}
            </div>
        </div>

        <Divider />

        <div className="mb-4">
            <div className="text-sm text-color-secondary mb-2">
            Teléfono
            </div>
            <div>
            {celular}
            </div>
        </div>

        <Divider />

        <div>
            <div className="text-sm text-color-secondary mb-2">
            Tipo de perfil
            </div>
            <div>
            {tipoUsuarioLabels[tipoUsuario]}
            </div>
        </div>

        </Card>
    )
}