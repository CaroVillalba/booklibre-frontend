import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import type { LibroHome } from "../../types/Libro.ts";

interface Props {
    libro: LibroHome
}

export const LibroCard = ({ libro }: Props) => {

    return (
        <>
            <Card className="p-0 overflow-hidden">
                {/* Imagen */}
                <div className="flex justify-content-center p-4 surface-100">
                    <img 
                        src={libro.imgUrl}
                        alt={libro.titulo}
                        style={{ height: "220px" }} 
                    />
                </div>

                {/* Contenido */}
                <div className="p-3 flex flex-column gap-2">

                    {/* Género + rating */}
                    <div className="flex justify-content-between align-items-center">
                        <span className="text-primary text-sm">{libro.genero}</span>

                        <div className="flex align-items-center gap-1">
                            <i className="pi pi-star-fill text-yellow-500"></i>
                            <span>{libro.rating}</span>
                        </div>
                    </div>

                    {/* Título */}
                    <h3 className="m-0 white-space-nowrap overflow-hidden text-overflow-ellipsis">{libro.titulo}</h3>

                    {/* Autor */}
                    <span className="text-500">{libro.autor}</span>

                    <Divider />

                    {/* Detalles */}
                    <div className="grid text-sm">
                        <div className="col-6">
                            <div className="text-500">ISBN</div>
                            <div>{libro.isbn13}</div>
                        </div>

                        <div className="col-6">
                            <div className="text-500">IDIOMA</div>
                            <div>{libro.idioma}</div>
                        </div>

                        <div className="col-6">
                            <div className="text-500">TIPO</div>
                            <div>{libro.tipo}</div>
                        </div>
                    
                        <div className="col-6">
                            <div className="text-500">BIBLIOKARMA</div>
                            <div>+{libro.bibliokarma}</div>
                        </div>
                    </div>

                    {/* Estado */}
                    <Tag value={libro.estado} severity="success" rounded />
                </div>
            </Card>
        </>
    )
}