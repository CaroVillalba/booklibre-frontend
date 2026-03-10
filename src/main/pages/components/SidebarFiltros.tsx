import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";

import { useState } from "react";
import { Calendar } from "primereact/calendar";

export const SidebarFiltros = () => {

    const [generos, setGeneros] = useState<string[]>([])
    const [paginas, setPaginas] = useState<[number, number]>([200, 300])

    const hoy = new Date();
    const [fechaDesde, setFechaDesde] = useState<Date | null>(hoy)
    const [fechaHasta, setFechaHasta] = useState<Date | null>(hoy)

    const toggleGenero = (genero: string) => {
        if (generos.includes(genero)) {
            setGeneros(generos.filter(g => g !== genero))
        } else {
            setGeneros([...generos, genero])
        }
    }

    return (
        <Card>
            <h3 className="mt-0">Género</h3>

            <div className="flex flex-column gap-2">
            <div>
                <Checkbox 
                    inputId="ciencia" 
                    checked={generos.includes("ciencia")} 
                    onChange={() => toggleGenero("ciencia")} 
                />
                <label htmlFor="ciencia"> Ciencia Ficción</label>
            </div>
            <div>
                <Checkbox
                    inputId="drama"
                    checked={generos.includes("drama")}
                    onChange={() => toggleGenero("drama")}
                />
                <label htmlFor="drama"> Drama</label>
            </div>
                <div>
                    <Checkbox 
                        inputId="autoayuda" 
                        checked={generos.includes("autoayuda")} 
                        onChange={() => toggleGenero("autoayuda")} 
                    />
                    <label htmlFor="autoayuda"> Autoayuda</label>
                </div>
                <div>
                    <Checkbox 
                        inputId="romance" 
                        checked={generos.includes("romance")} 
                        onChange={() => toggleGenero("romance")} 
                    />
                    <label htmlFor="romance"> Romance</label>
                </div>
                <div>
                    <Checkbox 
                        inputId="diseño" 
                        checked={generos.includes("diseño")} 
                        onChange={() => toggleGenero("diseño")} 
                    />
                    <label htmlFor="diseño"> Diseño</label>
                </div>
                <div>
                    <Checkbox 
                        inputId="novela" 
                        checked={generos.includes("novela")} 
                        onChange={() => toggleGenero("novela")} 
                    />
                    <label htmlFor="novela"> Literatura clásica</label>
                </div>
            </div>

            <Divider />

            <h3 className="mt-0">Rango de páginas</h3>

            <Slider 
                value={paginas} 
                onChange={(e) => setPaginas(e.value as [number, number])} 
                range
                min={0}
                max={500}
            />
            <p>{paginas[0]} - {paginas[1]}</p>

            <Divider />

            <h3>Rango de fechas para reservar</h3>

            <div className="flex flex-row gap-2">
                <div>
                    <label>Desde </label>
                    <Calendar value={fechaDesde} onChange={(e) => setFechaDesde(e.value ?? null)} dateFormat="dd/mm/yy" />
                </div>
                <div>
                    <label>Hasta </label>
                    <Calendar value={fechaHasta} onChange={(e) => setFechaHasta(e.value ?? null)} dateFormat="dd/mm/yy" />
                </div>
            </div>

            <Divider />

            <div className="flex flex-column gap-1">

                <h3 className="mt-0">Detalles</h3>

                <div className="flex flex-column gap-3">
                    <div>
                        <label>ISBN </label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-barcode" />
                            <InputText className="w-full" placeholder="978-3-16..." />
                        </IconField>
                    </div>
                    <div>
                        <label>Prestado por </label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user" />
                            <InputText className="w-full" placeholder="Usuario..." />
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