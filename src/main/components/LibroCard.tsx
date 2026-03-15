import { Card } from "primereact/card"
import { Tag } from "primereact/tag"
import { Divider } from "primereact/divider"
import type { LibroHome } from "../../types/Libro.ts"

interface Props {
    libro: LibroHome
}

// Mapea el EstadoLibro del back a la severity del Tag de PrimeReact
const estadoSeverity = (estado: string): "success" | "warning" | "danger" | "info" => {
    switch (estado) {
        case "EXCELENTE":  return "success"
        case "MUY_BUENO":  return "success"
        case "BUENO":      return "info"
        case "REGULAR":    return "warning"
        case "MALO":       return "danger"
        default:           return "info"
    }
}

// Convierte "CIENCIA_FICCION" → "Ciencia Ficción" para mostrar al usuario
const formatEnum = (value: string): string =>
    value.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())

export const LibroCard = ({ libro }: Props) => {
    return (
        <Card className="p-0 overflow-hidden">
            {/* Imagen */}
            <div className="flex justify-content-center p-4 surface-100">
                {libro.imgUrl ? (
                    <img
                        src={libro.imgUrl}
                        alt={libro.titulo}
                        style={{ height: "220px" }}
                    />
                ) : (
                    <div
                        className="flex align-items-center justify-content-center surface-200 border-round"
                        style={{ height: "220px", width: "150px" }}
                    >
                        <i className="pi pi-book text-4xl text-400" />
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="p-3 flex flex-column gap-2">

                {/* Género + rating */}
                <div className="flex justify-content-between align-items-center">
                    <span className="text-primary text-sm">{formatEnum(libro.genero)}</span>

                    {libro.rating != null && (
                        <div className="flex align-items-center gap-1">
                            <i className="pi pi-star-fill text-yellow-500" />
                            <span>{libro.rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Título */}
                <h3 className="m-0 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                    {libro.titulo}
                </h3>

                {/* Autor */}
                <span className="text-500">{libro.autor}</span>

                <Divider />

                {/* Detalles */}
                <div className="grid text-sm">
                    <div className="col-6">
                        <div className="text-500">ISBN</div>
                        <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
                            {libro.isbn13}
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="text-500">IDIOMA</div>
                        <div>{formatEnum(libro.idioma)}</div>
                    </div>

                    <div className="col-6">
                        <div className="text-500">TIPO</div>
                        <div>{formatEnum(libro.tipo)}</div>
                    </div>

                    <div className="col-6">
                        <div className="text-500">PÁGINAS</div>
                        <div>{libro.cantidadPaginas}</div>
                    </div>

                    {libro.bibliokarma != null && (
                        <div className="col-12">
                            <div className="text-500">BIBLIOKARMA</div>
                            <div>+{libro.bibliokarma}</div>
                        </div>
                    )}
                </div>

                {/* Estado */}
                <Tag
                    value={formatEnum(libro.estado)}
                    severity={estadoSeverity(libro.estado)}
                    rounded
                />
            </div>
        </Card>
    )
}