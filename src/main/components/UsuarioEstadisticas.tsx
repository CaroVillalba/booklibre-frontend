import { Card } from "primereact/card"

interface UsuarioEstadisticasProps{
    librosLeidos: number
    librosPrestados: number
}

export const UsuarioEstadisticas = ({librosLeidos, librosPrestados}:UsuarioEstadisticasProps) => {


    return (
        <Card className="border-round-2xl shadow-1">

        <div className="grid text-center">

            <div className="col-6">
            <div>
                <div className="text-2xl font-bold mb-2">
                {librosPrestados}
                </div>
                <div className="text-color-secondary">
                Libros Prestados
                </div>
            </div>
            </div>

            <div className="col-6">
            <div>
                <div className="text-2xl font-bold mb-2">
                {librosLeidos}
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