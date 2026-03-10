import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";

export const BusquedaLibros = () => {

    return (
        <Card>
            <div className="flex flex-column">
                <h2>Encuentra tu próxima lectura</h2>

                <p>Explora miles de libros disponibles para préstamo en nuestra comunidad.</p>

                <div className="flex">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText placeholder="Buscar por título..." />
                    </IconField>

                    <Button label="Buscar" severity="info" />
                </div>
            </div>
        </Card>
    )
}