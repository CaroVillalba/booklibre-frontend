import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

export const UsuarioHeader = () => {
    return (
        <Card className="mb-3 border-round-2xl shadow-1">
            <div className="flex flex-column md:flex-row md:align-items-center md:justify-content-between gap-4">
                <div className="flex flex-column md:flex-row align-items-center md:align-items-start gap-4">
                <Avatar
                    image="https://i.pravatar.cc/150?img=32"
                    size="xlarge"
                    shape="circle"
                />

                <div>
                    <h1 className="m-0 text-2xl font-bold">Emilia Romero</h1>

                    <p className="mt-2 mb-2 text-primary font-semibold">
                    Lectora Ávida & Coleccionista
                    </p>

                    <div className="flex flex-column text-sm md:flex-row gap-2 text-color-secondary">
                    <span>
                        <i className="pi pi-calendar mr-2"></i>
                        Se unió en 2021
                    </span>

                    <span>
                        <i className="pi pi-map-marker mr-2"></i>
                        Gonzalez Catán, BA
                    </span>

                    <span>
                        <i className="pi pi-chart-line mr-2"></i>
                        Bibliokarma 2345
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
