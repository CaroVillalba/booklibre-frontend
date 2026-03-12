import { SidebarFiltros } from "../../components/SidebarFiltros.tsx";
import { BusquedaLibros } from "../../components/BusquedaLibros.tsx";
import { LibroCard } from "../../components/LibroCard.tsx";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LibroHome } from "../../../types/Libro.ts";
import "./HomeUsuario.css"
//import { libroService } from "../../services/LibroService.ts";
//import { useOnInit } from "../../hooks/useOnInit.tsx";

export const HomeUsuario = () => {
    const navigate = useNavigate()
    type Orden = "rating" | "estado" | "tipo"

    const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([])
    const [paginasSeleccionadas, setPaginasSeleccionadas] = useState<[number, number]>([200, 300])
    const [fechaDesde, setFechaDesde] = useState<Date | null>(new Date())
    const [fechaHasta, setFechaHasta] = useState<Date | null>(new Date())
    const [tituloBusqueda, setTituloBusqueda] = useState("")
    const [orden, setOrden] = useState<Orden | null>(null)

    const opcionesOrden: { label: string; value: Orden }[]= [
        { label: "Relevancia", value: "rating" },
        { label: "Estado", value: "estado" },
        { label: "Tipo de libro", value: "tipo" }
    ]

    // ejemplo de datos (deben venir del back)
    const libros: LibroHome[] = [
        {
            imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_876004-CBT80927631830_122024-F.webp",
            genero: "Drama",
            rating: 5.0,
            titulo: "Meridiano de Sangre",
            autor: "Cormac McCarthy",
            cantidadPaginas: 325,
            isbn13: "978-0-679-72875-7",
            idioma: "Español",
            tipo: "Coleccionable",
            bibliokarma: 1000,
            estado: "Bueno"
        },
        {
            imgUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/LordOfTheFliesBookCover.jpg",
            genero: "Literatura",
            rating: 4.4,
            titulo: "El Señor de las Moscas",
            autor: "William Golding",
            cantidadPaginas: 75,
            isbn13: "978-0-399-50148-7",
            idioma: "Inglés",
            tipo: "Comun",
            bibliokarma: 650,
            estado: "Muy Bueno"
        },
        {
            imgUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7ZHPtvzGtZWcHFR3Ub9bWVfgSAuBdFQ0dOY_R6vCvB99IB0KXxwseXRQk5vXu7S4lTR75mMfZlibmosQlsMZ5uxSeew8bEfZfNy1-5i_Yy4l3K1ACsQwFzTMCX9vFyGugk44h4oqct2A/s1600/Cover.jpg",
            genero: "Ciencia Ficcion",
            rating: 4.7,
            titulo: "No Tengo Boca y Debo Gritar",
            autor: "Harlan Ellison",
            cantidadPaginas: 11,
            isbn13: "978-1-499-65964-1",
            idioma: "Francés",
            tipo: "Con Dedicatoria",
            bibliokarma: 820,
            estado: "Excelente"
        },
        {
            imgUrl: "https://images.cdn3.buscalibre.com/fit-in/360x360/ed/c5/edc5b53333ebd87cfe6256685249673f.jpg",
            genero: "Literatura",
            rating: 4.1,
            titulo: "Moby Dick",
            autor: "Herman Melville",
            cantidadPaginas: 500,
            isbn13: "978-1-85326-008-7",
            idioma: "Inglés",
            tipo: "Comun",
            bibliokarma: 710,
            estado: "Bueno"
        }
    ]

    // const [librosMaster, setLibrosMaster] = useState<LibroHome[]>([])
    const [librosFiltrados, setLibrosFiltrados] = useState<LibroHome[]>(libros)

    /* useOnInit(async () => {
        try {
            const data = await libroService.getAll();
            // Mapeo
            const librosBack = data as unknown as LibroHome[];
            
            setLibrosMaster(librosBack);    // Guarda la copia original
            setLibrosFiltrados(librosBack); // Inicialmente muestra todos
        } catch (error) {
            console.error("Error al cargar libros:", error);
        }
    }) */

    const ordenadores: Record<Orden, (a: LibroHome, b: LibroHome) => number> = {
        rating: (a: LibroHome, b: LibroHome) => b.rating - a.rating,
        estado: (a: LibroHome, b: LibroHome) => a.estado.localeCompare(b.estado),
        tipo: (a: LibroHome, b: LibroHome) => a.tipo.localeCompare(b.tipo)
    }

    const handleBuscar = () => {
        if (tituloBusqueda === "") {
            const resultado = [...libros];
            if (orden) resultado.sort(ordenadores[orden]);
            setLibrosFiltrados(resultado);
        } else {
            const filtrados = libros.filter(libro =>
                libro.titulo.toLowerCase().includes(tituloBusqueda.toLowerCase())
            );
            setLibrosFiltrados(filtrados)
        }
    }

    const handleOrden = (nuevoOrden: Orden) => {
        setOrden(nuevoOrden);
        const resultado = [...librosFiltrados].sort(ordenadores[nuevoOrden])
        setLibrosFiltrados(resultado)
    }

    const handleAplicarFiltros = () => {
        let filtrados = [...libros]

        // filtro por título
        if (tituloBusqueda !== "") {
            filtrados = filtrados.filter(libro =>
                libro.titulo.toLowerCase().includes(tituloBusqueda.toLowerCase())
            )
        }

        // filtro por género
        if (generosSeleccionados.length > 0) {
            filtrados = filtrados.filter(libro =>
                generosSeleccionados.includes(libro.genero.toLowerCase())
            )
        }

        // filtro por páginas
        filtrados = filtrados.filter(libro =>
            libro.cantidadPaginas >= paginasSeleccionadas[0] &&
            libro.cantidadPaginas <= paginasSeleccionadas[1]
        )

        // filtro por disponibilidad en fechas (necesitobackend)
        // filtrados = filtrados.filter(libro => estaDisponible(libro, fechaDesde, fechaHasta))

        setLibrosFiltrados(filtrados)
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
                    onAplicarFiltros={handleAplicarFiltros}
                />
            </div>

            <div className="col-12 md:col-9">
                {/* Barra de búsqueda */}
                <BusquedaLibros tituloBusqueda={tituloBusqueda} setTituloBusqueda={setTituloBusqueda} onBuscar={handleBuscar} />

                {/* Libros */}
                <div className="flex justify-content-between align-items-center mt-3">
                    <h2 className="m-0">Libros Populares</h2>

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
                <div className="grid mt-2">
                    {librosFiltrados.map((libro, index) => (
                        <div 
                            key={index} className="col-12 md:col-6 lg:col-3 xl:col-4"
                            onClick={() => navigate(`/detalle-libro`)}
                        >
                            <LibroCard libro={libro}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}