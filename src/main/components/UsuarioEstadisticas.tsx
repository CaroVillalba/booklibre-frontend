import { Card } from "primereact/card"

export const UsuarioEstadisticas = () => {

    return (
        <Card className="border-round-2xl shadow-1">

        <div className="grid text-center">

            <div className="col-6">
            <div>
                <div className="text-2xl font-bold mb-2">
                12
                </div>
                <div className="text-color-secondary">
                Libros Prestados
                </div>
            </div>
            </div>

            <div className="col-6">
            <div>
                <div className="text-2xl font-bold mb-2">
                45
                </div>
                <div className="text-color-secondary">
                Libros Leídos
                </div>
            </div>
            </div>

        </div>

        </Card>
    )
}