import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import type { Usuario } from "../../types/Usuario";

interface UsuarioHeaderProps{
    usuario: Usuario
}

export const UsuarioHeader = ({usuario}: UsuarioHeaderProps) => {
    return (
        <Card className="mb-3 border-round-2xl shadow-1">
            <div className="flex flex-column md:flex-row md:align-items-center md:justify-content-between gap-4">
                <div className="flex flex-column md:flex-row align-items-center md:align-items-center gap-4">
                <Avatar
                    image={usuario.fotoPerfil || "https://cdn-icons-png.flaticon.com/512/12225/12225881.png"}
                    size="xlarge"
                    shape="circle"
                    className="perfil-avatar"
                />

                <div>
                    <h1 className="m-0 text-2xl font-bold">{usuario.nombre}</h1>

                    <p className="mt-2 mb-2 text-primary font-semibold">
                    {usuario.descripcion}
                    </p>

                    <div className="flex flex-column text-sm md:flex-row gap-2 text-color-secondary">
                    <span>
                        <i className="pi pi-calendar mr-2"></i>
                        Se unió en {new Date(usuario.fechaRegistro).getFullYear()}
                    </span>

                    <span>
                        <i className="pi pi-map-marker mr-2"></i>
                        {usuario.ciudad}
                    </span>

                    <span>
                        <i className="pi pi-chart-line mr-2"></i>
                        Bibliokarma {usuario.biblioKarmas}
                    </span>
                    </div>
                </div>
                </div>

                <Button
                label="Editar Perfil"
                icon="pi pi-cog"
                className="p-button-secondary p-button-text"
                />
            </div>
        </Card>
    );
};
