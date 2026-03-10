import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";

export const LibroCard = () => {

    return (
        <>
            <h2>Libros Populares</h2>
            
            <Card className="p-0 overflow-hidden">
                {/* Imagen */}
                <div className="flex justify-content-center p-4 surface-100">
                    <img 
                        src="https://http2.mlstatic.com/D_NQ_NP_2X_876004-CBT80927631830_122024-F.webp"
                        alt="Meridiano de Sangre"
                        style={{ height: "220px" }} 
                    />
                </div>

                {/* Contenido */}
                <div className="p-3 flex flex-column gap-2">

                    {/* Género + rating */}
                    <div className="flex justify-content-between align-items-center">
                        <span className="text-primary text-sm">Drama</span>

                        <div className="flex align-items-center gap-1">
                            <i className="pi pi-star-fill text-yellow-500"></i>
                            <span>5.0</span>
                        </div>
                    </div>

                    {/* Título */}
                    <h3 className="m-0">Meridiano de Sangre</h3>

                    {/* Autor */}
                    <span className="text-500">Cormac McCarthy</span>

                    <Divider />

                    {/* Detalles */}
                    <div className="grid text-sm">
                        <div className="col-6">
                            <div className="text-500">ISBN</div>
                            <div>978-0-525-55947-4</div>
                        </div>

                        <div className="col-6">
                            <div className="text-500">IDIOMA</div>
                            <div>Español</div>
                        </div>

                        <div className="col-6">
                            <div className="text-500">TIPO</div>
                            <div>Coleccionable</div>
                        </div>
                    
                        <div className="col-6">
                            <div className="text-500">BIBLIOKARMA</div>
                            <div>+1000</div>
                        </div>
                    </div>

                    {/* Estado */}
                    <Tag value="Bueno" severity="success" rounded />
                </div>
            </Card>
        </>
    )
}