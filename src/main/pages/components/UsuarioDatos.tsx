import { Card } from "primereact/card"
import { Divider } from "primereact/divider"

export const UsuarioDatos = () => {

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
            emily@example.com
            </div>
        </div>

        <Divider />

        <div className="mb-4">
            <div className="text-sm text-color-secondary mb-2">
            Teléfono
            </div>
            <div>
            +54 (11) 123-4567
            </div>
        </div>

        <Divider />

        <div>
            <div className="text-sm text-color-secondary mb-2">
            Tipo de perfil
            </div>
            <div>
            Lector / Publicador
            </div>
        </div>

        </Card>
    )
}