import { SidebarFiltros } from "../../components/SidebarFiltros.tsx"
import { BusquedaLibros } from "../../components/BusquedaLibros.tsx"
import { LibroCard } from "../../components/LibroCard.tsx"
import { Dropdown } from "primereact/dropdown"
import { ProgressSpinner } from "primereact/progressspinner"
import { Message } from "primereact/message"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { LibroHome } from "../../../types/Libro.ts"
import { libroService } from "../../services/LibroService.ts"
import { useOnInit } from "../../hooks/useOnInit.tsx"
import "./HomeUsuario.css"

// Convierte un Date a string ISO (YYYY-MM-DD) que espera el back
const toISODate = (date: Date): string => date.toISOString().split("T")[0]

// Fechas por defecto: hoy y en 30 días
const hoy = new Date()
const en30Dias = new Date()
en30Dias.setDate(hoy.getDate() + 30)

export const HomeUsuario = () => {
    const navigate = useNavigate()
    type Orden = "rating" | "estado" | "tipo"

    // --- Filtros del sidebar ---
    const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([])
    const [paginasSeleccionadas, setPaginasSeleccionadas] = useState<[number, number]>([0, 1500])
    const [fechaDesde, setFechaDesde] = useState<Date | null>(hoy)
    const [fechaHasta, setFechaHasta] = useState<Date | null>(en30Dias)
    const [isbn, setIsbn] = useState("")
    const [prestadoPorUsuario, setPrestadoPorUsuario] = useState("")

    // --- Búsqueda por título ---
    const [tituloBusqueda, setTituloBusqueda] = useState("")

    // --- Orden ---
    const [orden, setOrden] = useState<Orden | null>(null)

    // --- Estado de datos ---
    const [libros, setLibros] = useState<LibroHome[]>([])
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const opcionesOrden: { label: string; value: Orden }[] = [
        { label: "Rating",         value: "rating" },
        { label: "Estado",         value: "estado" },
        { label: "Tipo de libro",  value: "tipo"   },
    ]

    const ordenadores: Record<Orden, (a: LibroHome, b: LibroHome) => number> = {
        rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
        estado: (a, b) => a.estado.localeCompare(b.estado),
        tipo:   (a, b) => a.tipo.localeCompare(b.tipo),
    }

    // Función central que llama al back con los parámetros actuales
    const fetchLibros = async (tituloOverride?: string) => {
        setCargando(true)
        setError(null)
        try {
            const resultado = await libroService.search({
               titulo: (tituloOverride ?? tituloBusqueda) || undefined,
                generos:            generosSeleccionados.length > 0
                                        ? generosSeleccionados.join(",")
                                        : undefined,
                paginasMin:         paginasSeleccionadas[0] > 0 ? paginasSeleccionadas[0] : undefined,
                paginasMax:         paginasSeleccionadas[1] < 1500 ? paginasSeleccionadas[1] : undefined,
                isbn:               isbn || undefined,
                desde:              toISODate(fechaDesde ?? hoy),
                hasta:              toISODate(fechaHasta ?? en30Dias),
                prestadoPorUsuario: prestadoPorUsuario || undefined,
            })
            setLibros(resultado)
        } catch (e) {
            setError("No se pudieron cargar los libros. Verificá que el servidor esté activo.")
            console.error(e)
        } finally {
            setCargando(false)
        }
    }

    // Carga inicial: trae todos los libros disponibles en el rango de fechas por defecto
    useOnInit(() => { fetchLibros() })

    const handleBuscar = () => {
        fetchLibros(tituloBusqueda)
    }

    const handleAplicarFiltros = () => {
        fetchLibros()
    }

    const handleOrden = (nuevoOrden: Orden) => {
        setOrden(nuevoOrden)
        setLibros(prev => [...prev].sort(ordenadores[nuevoOrden]))
    }

    return (
        <div className="grid home_content">
            {/* Sidebar */}
            <div className="col-12 md:col-3">
                <SidebarFiltros
                    generosSeleccionados={generosSeleccionados}
                    setGenerosSeleccionados={setGenerosSeleccionados}
                    paginasSeleccionadas={paginasSeleccionadas}
                    setPaginasSeleccionadas={setPaginasSeleccionadas}
                    fechaDesde={fechaDesde}
                    setFechaDesde={setFechaDesde}
                    fechaHasta={fechaHasta}
                    setFechaHasta={setFechaHasta}
                    isbn={isbn}
                    setIsbn={setIsbn}
                    prestadoPorUsuario={prestadoPorUsuario}
                    setPrestadoPorUsuario={setPrestadoPorUsuario}
                    onAplicarFiltros={handleAplicarFiltros}
                />
            </div>

            <div className="col-12 md:col-9">
                {/* Barra de búsqueda */}
                <BusquedaLibros
                    tituloBusqueda={tituloBusqueda}
                    setTituloBusqueda={setTituloBusqueda}
                    onBuscar={handleBuscar}
                />

                {/* Encabezado + ordenador */}
                <div className="flex justify-content-between align-items-center mt-3">
                    <h2 className="m-0">
                        Libros disponibles
                        {!cargando && (
                            <span className="text-500 text-base ml-2">({libros.length})</span>
                        )}
                    </h2>

                    <div className="flex align-items-center gap-2">
                        <span>Ordenar por:</span>
                        <Dropdown
                            value={orden}
                            options={opcionesOrden}
                            onChange={(e) => handleOrden(e.value)}
                            placeholder="Seleccione..."
                        />
                    </div>
                </div>

                {/* Estados de carga / error / vacío */}
                {cargando && (
                    <div className="flex justify-content-center mt-5">
                        <ProgressSpinner />
                    </div>
                )}

                {!cargando && error && (
                    <Message severity="error" text={error} className="w-full mt-3" />
                )}

                {!cargando && !error && libros.length === 0 && (
                    <Message
                        severity="info"
                        text="No se encontraron libros con los filtros seleccionados."
                        className="w-full mt-3"
                    />
                )}

                {/* Grid de libros */}
                {!cargando && !error && (
                    <div className="grid mt-2">
                        {libros.map((libro) => (
                            <div
                                key={libro.id}
                                className="col-12 md:col-6 lg:col-3 xl:col-4"
                                onClick={() => navigate(`/detalle-libro/${libro.id}`)}
                            >
                                <LibroCard libro={libro} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}