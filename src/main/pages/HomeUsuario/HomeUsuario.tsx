import { SidebarFiltros } from "../../components/SidebarFiltros.tsx"
import { BusquedaLibros } from "../../components/BusquedaLibros.tsx"
import { LibroCard } from "../../components/LibroCard.tsx"
import { Dropdown } from "primereact/dropdown"
import { Paginator } from "primereact/paginator"
import type { PaginatorPageChangeEvent } from "primereact/paginator"
import { ProgressSpinner } from "primereact/progressspinner"
import { Message } from "primereact/message"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { LibroHome } from "../../../types/Libro.ts"
import { libroService } from "../../services/LibroService.ts"
import { useOnInit } from "../../hooks/useOnInit.tsx"
import "./HomeUsuario.css"

const toISODate = (date: Date): string => date.toISOString().split("T")[0]

const hoy = new Date()

export const HomeUsuario = () => {
    const navigate = useNavigate()
    type Orden = "titulo" | "autor" | "duenioNombre"

    // --- Filtros del sidebar ---
    const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([])
    const [paginasSeleccionadas, setPaginasSeleccionadas] = useState<[number, number]>([0, 1500])
    const [fechaDesde, setFechaDesde] = useState<Date | null>(hoy)
    const [fechaHasta, setFechaHasta] = useState<Date | null>(hoy)
    const [isbn, setIsbn] = useState("")
    const [prestadoPorUsuario, setPrestadoPorUsuario] = useState("")

    // --- Búsqueda por título ---
    const [tituloBusqueda, setTituloBusqueda] = useState("")

    // --- Orden ---
    const [orden, setOrden] = useState<Orden>("titulo")
    const [direccion, setDireccion] = useState<"asc" | "desc">("asc")

    // --- Paginación ---
    const [paginaActual, setPaginaActual] = useState(0)
    const [tamanoPagina] = useState(6)
    const [totalElementos, setTotalElementos] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)

    // --- Estado de datos ---
    const [libros, setLibros] = useState<LibroHome[]>([])
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const opcionesOrden: { label: string; value: Orden }[] = [
        { label: "Título", value: "titulo" },
        { label: "Autor", value: "autor" },
        { label: "Usuario", value: "duenioNombre" },
    ]

    // Función central que llama al back con los parámetros actuales
    const fetchLibros = async (tituloOverride?: string, pagina?: number) => {
        setCargando(true)
        setError(null)
        try {
            const resultado = await libroService.search({
                titulo: (tituloOverride ?? tituloBusqueda) || undefined,
                generos: generosSeleccionados.length > 0
                    ? generosSeleccionados
                    : undefined,
                paginasMin: paginasSeleccionadas[0] > 0 ? paginasSeleccionadas[0] : undefined,
                paginasMax: paginasSeleccionadas[1] < 1500 ? paginasSeleccionadas[1] : undefined,
                isbn: isbn || undefined,
                desde: toISODate(fechaDesde ?? hoy),
                hasta: toISODate(fechaHasta ?? hoy),
                prestadoPorUsuario: prestadoPorUsuario || undefined,
                page: pagina ?? paginaActual,
                size: tamanoPagina,
                sortBy: orden,
                direction: direccion,
            })
            
            setLibros(resultado.content)
            setTotalElementos(resultado.totalElements)
            setTotalPaginas(resultado.totalPages)
            setPaginaActual(resultado.page)
        } catch (e) {
            setError("No se pudieron cargar los libros. Verificá que el servidor esté activo.")
            console.error(e)
        } finally {
            setCargando(false)
        }
    }

    // Carga inicial
    useOnInit(() => { fetchLibros() })

    // Efecto para re-fetch cuando cambia el orden o dirección
    useEffect(() => {
        // Solo ejecutar si ya hay datos cargados (evita doble llamada en mount)
        if (libros.length > 0 || cargando) {
            fetchLibros(undefined, 0) // Reset a página 0 al cambiar orden
        }
    }, [orden, direccion])

    const handleBuscar = () => {
        setPaginaActual(0)
        fetchLibros(tituloBusqueda, 0)
    }

    const handleAplicarFiltros = () => {
        setPaginaActual(0)
        fetchLibros(undefined, 0)
    }

    const handleOrden = (nuevoOrden: Orden) => {
        // Si es el mismo campo, cambia la dirección
        if (nuevoOrden === orden) {
            setDireccion(prev => prev === "asc" ? "desc" : "asc")
        } else {
            setOrden(nuevoOrden)
            setDireccion("asc")
        }
        setPaginaActual(0)
    }

    const handleToggleDireccion = () => {
        setDireccion(prev => prev === "asc" ? "desc" : "asc")
        setPaginaActual(0)
    }

    const handlePageChange = (event: PaginatorPageChangeEvent) => {
        fetchLibros(undefined, event.page)
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
                            <span className="text-500 text-base ml-2">({totalElementos})</span>
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
                        <i 
                            className={`pi ${direccion === "asc" ? "pi-sort-amount-up" : "pi-sort-amount-down"} cursor-pointer`}
                            onClick={handleToggleDireccion}
                            style={{ fontSize: "1.2rem" }}
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
                {!cargando && !error && libros.length > 0 && (
                    <>
                        <div className="grid mt-2">
                            {libros.map((libro) => (
                                <div
                                    key={libro.id}
                                    className="col-12 md:col-6 lg:col-4"
                                    onClick={() => {
                                        const desde = toISODate(fechaDesde ?? hoy)
                                        const hasta = toISODate(fechaHasta ?? hoy)
                                        navigate(`/detalle-libro/${libro.id}?desde=${desde}&hasta=${hasta}`)
                                    }}
                                >
                                    <LibroCard libro={libro} />
                                </div>
                            ))}
                        </div>

                        {/* Paginador */}
                        {totalPaginas > 1 && (
                            <div className="mt-4">
                                <Paginator
                                    first={paginaActual * tamanoPagina}
                                    rows={tamanoPagina}
                                    totalRecords={totalElementos}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}