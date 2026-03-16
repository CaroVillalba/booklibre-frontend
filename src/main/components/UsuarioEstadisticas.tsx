import { Card } from "primereact/card"
import { useEffect, useState } from "react"
import { usuarioService } from "../services/UsuarioService"
import type { UsuarioEstadisticasDTO } from "../../types/Usuario"

interface UsuarioEstadisticasProps{
    usuarioId: number
}

export const UsuarioEstadisticas = ({usuarioId}:UsuarioEstadisticasProps) => {

    const [estadisticas,setEstadisticas] = useState<UsuarioEstadisticasDTO | null>(null)

    useEffect(()=>{
        usuarioService.getEstadisticas(usuarioId)
        .then(setEstadisticas)
        .catch((error)=>console.log("error al cargar estadisticas",error))
    },[usuarioId])

    return (
        <Card className="border-round-2xl shadow-1">

        <div className="grid text-center">

            <div className="col-6">
            <div>
                <div className="text-2xl font-bold mb-2">
                {estadisticas?.librosPrestados}
                </div>
                <div className="text-color-secondary">
                Libros Prestados
                </div>
            </div>
            </div>

            <div className="col-6">
            <div>
                <div className="text-2xl font-bold mb-2">
                {estadisticas?.librosLeidos}
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