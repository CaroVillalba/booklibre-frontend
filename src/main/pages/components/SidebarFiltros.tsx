import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";

import { useState } from "react";

export const SidebarFiltros = () => {

    const [paginas, setPaginas] = useState<[number, number]>([0, 500])
    const [fechaDesde, setFechaDesde] = useState<string | null>(null)
    const [fechaHasta, setFechaHasta] = useState<string | null>(null)

    return (
        <Card>
            <h3>Género</h3>

            <div className="flex flex-column gap-2">
            <div><Checkbox inputId="ciencia" checked={false} /><label htmlFor="ciencia"> Ciencia Ficción</label></div>
                <div><Checkbox inputId="drama" checked={false} /><label htmlFor="drama"> Drama</label></div>
                <div><Checkbox inputId="autoayuda" checked={false} /><label htmlFor="autoayuda"> Autoayuda</label></div>
                <div><Checkbox inputId="romance" checked={false} /><label htmlFor="romance"> Romance</label></div>
                <div><Checkbox inputId="diseño" checked={false} /><label htmlFor="diseño"> Diseño</label></div>
                <div><Checkbox inputId="novela" checked={false} /><label htmlFor="novela"> Literatura clásica</label></div>
            </div>

            <Divider />

            <h3>Rango de páginas</h3>

            <Slider value={paginas} onChange={(e) => setPaginas(e.value as [number, number])} range/>
            <p>{paginas[0]} - {paginas[1]}</p>

            <Divider />

            <h3>Rango de fechas para reservar</h3>

            <div className="flex flex-row gap-1">
                <div>
                    <label>Desde </label>
                    <InputMask
                        mask="99/99/9999"
                        placeholder="dd/mm/yyyy"
                        value={fechaDesde || ""}
                        onChange={(e) => setFechaDesde(e.value ?? null)}
                    />
                </div>
                <div>
                    <label>Hasta </label>
                    <InputMask
                        mask="99/99/9999"
                        placeholder="dd/mm/yyyy"
                        value={fechaHasta || ""}
                        onChange={(e) => setFechaHasta(e.value ?? null)}
                    />
                </div>
            </div>

            <Divider />

            <div className="flex flex-column gap-3">

                <h3>Detalles</h3>

                <div className="flex flex-column gap-2">
                    <div>
                        <label>ISBN </label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-barcode" />
                            <InputText placeholder="978-3-16..." />
                        </IconField>
                    </div>
                    <div>
                        <label>Prestado por </label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user" />
                            <InputText placeholder="Usuario..." />
                        </IconField>
                    </div>

                    <Button 
                        label="Aplicar Filtros" 
                        icon="pi pi-sliders-h" 
                        severity="info" 
                        className="w-full" 
                    />
                </div>
            </div>

        </Card>
    )
}