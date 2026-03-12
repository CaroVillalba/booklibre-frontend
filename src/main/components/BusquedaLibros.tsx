import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";

interface Props {
    tituloBusqueda: string
    setTituloBusqueda: (titulo: string) => void
    onBuscar: () => void
}

export const BusquedaLibros = ({ tituloBusqueda, setTituloBusqueda, onBuscar }: Props) => {

    return (
        <Card>
            <div className="flex flex-column">
                <h2 className="m-0 mb-1">Encuentra tu próxima lectura</h2>

                <p>Explora miles de libros disponibles para préstamo en nuestra comunidad.</p>

                <div className="flex pr-8">
                    <IconField iconPosition="left" className="flex-grow-1">
                        <InputIcon className="pi pi-search" />
                        <InputText 
                            value={tituloBusqueda} 
                            onChange={(e) => setTituloBusqueda(e.target.value)}
                            placeholder="Buscar por título..." 
                            className="w-full"
                        />
                    </IconField>

                    <Button label="Buscar" severity="info" onClick={onBuscar} />
                </div>
            </div>
        </Card>
    )
}