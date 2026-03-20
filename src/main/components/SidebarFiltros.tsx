import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";

// Géneros disponibles: deben coincidir con el enum Genero del back (en mayúsculas)
const GENEROS = [
    { id: "CIENCIA_FICCION", label: "Ciencia Ficción" },
    { id: "DRAMA",           label: "Drama"           },
    { id: "AUTOAYUDA",       label: "Autoayuda"       },
    { id: "ROMANCE",         label: "Romance"         },
    { id: "DISENO",          label: "Diseño"          },
    { id: "LITERATURA",      label: "Literatura"      },
]

interface Props {
    generosSeleccionados: string[]
    setGenerosSeleccionados: (generos: string[]) => void
    paginasSeleccionadas: [number, number]
    setPaginasSeleccionadas: (paginas: [number, number]) => void
    fechaDesde: Date | null
    setFechaDesde: (fecha: Date | null) => void
    fechaHasta: Date | null
    setFechaHasta: (fecha: Date | null) => void
    isbn: string
    setIsbn: (isbn: string) => void
    prestadoPorUsuario: string
    setPrestadoPorUsuario: (usuario: string) => void
    onAplicarFiltros: () => void
}

export const SidebarFiltros = (props: Props) => {
    const {
        generosSeleccionados, setGenerosSeleccionados,
        paginasSeleccionadas, setPaginasSeleccionadas,
        fechaDesde, setFechaDesde,
        fechaHasta, setFechaHasta,
        isbn, setIsbn,
        prestadoPorUsuario, setPrestadoPorUsuario,
        onAplicarFiltros,
    } = props

    const toggleGenero = (genero: string) => {
        if (generosSeleccionados.includes(genero)) {
            setGenerosSeleccionados(generosSeleccionados.filter(g => g !== genero))
        } else {
            setGenerosSeleccionados([...generosSeleccionados, genero])
        }
    }

    return (
        <Card>
            <h3 className="mt-0">Género</h3>

            <div className="flex flex-column gap-2">
                {GENEROS.map(({ id, label }) => (
                    <div key={id}>
                        <Checkbox
                            inputId={id}
                            checked={generosSeleccionados.includes(id)}
                            onChange={() => toggleGenero(id)}
                        />
                        <label htmlFor={id}> {label}</label>
                    </div>
                ))}
            </div>

            <Divider />

            <h3 className="mt-0">Rango de páginas</h3>
            <Slider
                value={paginasSeleccionadas}
                onChange={(e) => setPaginasSeleccionadas(e.value as [number, number])}
                range
                min={0}
                max={1500}
            />
            <p>{paginasSeleccionadas[0]} - {paginasSeleccionadas[1]}</p>

            <Divider />

            <h3>Rango de fechas para reservar</h3>
            <div className="flex flex-row gap-2">
                <div>
                    <label>Desde </label>
                    <Calendar
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.value ?? null)}
                        dateFormat="dd/mm/yy"
                        minDate={new Date()}
                    />
                </div>
                <div>
                    <label>Hasta </label>
                    <Calendar
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.value ?? null)}
                        dateFormat="dd/mm/yy"
                        minDate={new Date()}
                    />
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
                            <InputText
                                className="w-full"
                                placeholder="978-3-16..."
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                            />
                        </IconField>
                    </div>
                    <div>
                        <label>Prestado por </label>
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user" />
                            <InputText
                                className="w-full"
                                placeholder="Usuario..."
                                value={prestadoPorUsuario}
                                onChange={(e) => setPrestadoPorUsuario(e.target.value)}
                            />
                        </IconField>
                    </div>

                    <Button
                        label="Aplicar Filtros"
                        icon="pi pi-sliders-h"
                        severity="info"
                        className="w-full"
                        onClick={onAplicarFiltros}
                    />
                </div>
            </div>
        </Card>
    )
}