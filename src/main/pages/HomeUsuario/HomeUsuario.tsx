import { SidebarFiltros } from "../components/SidebarFiltros";
import { BusquedaLibros } from "../components/BusquedaLibros";
import { LibroCard } from "../components/LibroCard";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import type { LibroHome } from "../../../types/Libro.ts";

export const HomeUsuario = () => {

    type Orden = "rating" | "estado" | "tipo"
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
            isbn13: "978-1-499-65964-1",
            idioma: "Francés",
            tipo: "Con Dedicatoria",
            bibliokarma: 820,
            estado: "Excelente"
        }
    ]

    const ordenadores: Record<Orden, (a: LibroHome, b: LibroHome) => number> = {
        rating: (a: LibroHome, b: LibroHome) => b.rating - a.rating,
        estado: (a: LibroHome, b: LibroHome) => a.estado.localeCompare(b.estado),
        tipo: (a: LibroHome, b: LibroHome) => a.tipo.localeCompare(b.tipo)
    }

    const librosOrdenados = [...libros].sort(
        orden ? ordenadores[orden] : () => 0
    )

    return (
        <div className="grid">
            {/* Sidebar */}
            <div className="col-12 md:col-3">
                <SidebarFiltros />
            </div>

            <div className="col-12 md:col-9">
                {/* Barra de búsqueda */}
                <BusquedaLibros />

                {/* Libros */}
                <div className="flex justify-content-between align-items-center mt-3">
                    <h2 className="m-0">Libros Populares</h2>

                    <div className="flex align-items-center gap-2">
                        <span>Ordenar por:</span>
                        <Dropdown 
                            value={orden}
                            options={opcionesOrden}
                            onChange={(e) => setOrden(e.value)}
                            placeholder="Seleccione..." 
                        />
                    </div>
                </div>
                <div className="grid mt-2">
                    {librosOrdenados.map((libro, index) => (
                        <div key={index} className="col-12 md:col-6 lg:col-3 xl:col-4">
                            <LibroCard libro={libro}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}