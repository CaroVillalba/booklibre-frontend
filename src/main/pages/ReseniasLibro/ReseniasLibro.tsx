import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState } from "react"
import type { LibroHome } from "../../../types/Libro"
import type { Reseña } from "../../../types/Reseña"
import { libroService } from "../../services/LibroService"
import { reseñaService } from "../../services/ReseñaService"
import { useContext } from "react"
import { MainContext } from "../../../types/MainContext"
import { itemTemplate } from "../DetalleLibro/DetalleLibro"
import { NoReseñasCard } from "../DetalleLibro/ReseñaCard/NoReseñasCard"
import { DataScroller } from "primereact/datascroller"
import { useRef } from "react"
import { useOnInit } from "../../hooks/useOnInit"
import { Paginator } from "primereact/paginator"
import type { PaginatorPageChangeEvent } from "primereact/paginator"
import type { ReactNode } from "react"

interface ReseniasLibroProps {
    header: ReactNode
}

export const ReseniasLibro = (props: ReseniasLibroProps) => {
    const navigate = useNavigate()

    const { id } = useParams()

    const [libro, setLibro] = useState<LibroHome>({
            id: 0,
            imgUrl: "",
            titulo: "",
            tipo: "",
            descripcion: "",
            genero: "",
            autor: "",
            cantidadPaginas: 0,
            isbn13: "",
            idioma: "",
            editorial: "",
            fechaPublicacion: null,
            estado: "",
            rating: 0,
            bibliokarma: 0,
            duenioId: null,
            duenioNombre: "",
        })

    const { showToast } = useContext(MainContext)

    const [reseñas, setReseñas] = useState<Reseña[]>([])
    const [reseñasTotales, setReseñasTotales] = useState(0)
    const [tamañoPagina, setTamañoPagina] = useState(0)
    const [paginaActual, setPaginaActual] = useState(0)

    const ds = useRef<any>(null); 

    /*
    const getLibroDetalle = async() => {
        const desdeParam = new Date("1900-1-1").toISOString().split("T")[0]
        const hastaParam = new Date().toISOString().split("T")[0]

        try {
            const libroDetalle = await libroService.getLibroPorId(Number(id), {desde: desdeParam, hasta: hastaParam})
            setLibro(libroDetalle)
        }
        catch (error: unknown) {
            //showToast(getMensajeError(error), 'error')
        }
    }
    */

    const getReseñas = async(page: number) => {
        try {
            const reseñasObtenidas = await reseñaService.getReseñasPorLibro(Number(id),page)
            setReseñas(reseñasObtenidas.reseniaList)
            setTamañoPagina(reseñasObtenidas.size)
            setPaginaActual(reseñasObtenidas.pageNumber)
            setReseñasTotales(reseñasObtenidas.totalElements)
        }
        catch (error : unknown) {
            //showToast(getMensajeError(error), 'error')
        }
    }

    const headerReseñas = (
            <>
            <h1>Reseñas de la comunidad</h1>
            </>
        )

    const handlePageChange = (event: PaginatorPageChangeEvent) => {
        getReseñas(event.page)
    }

    useOnInit (() => {
        //getLibroDetalle()
        getReseñas(0)
    })

    return (
        <div className="flex flex-column gap-4 p-4 detalle-libro-container">
            {/*<h1>Reseñas de la comunidad:</h1>*/}

            <div className="surface-ground border-round-xl ">
                <DataScroller
                    ref={ds}
                    value={reseñas} 
                    itemTemplate={itemTemplate} 
                    rows={5}
                    loader={reseñas.length > 0}
                    header={props.header}
                    className='dataScroller-reseñas'
                    emptyMessage={NoReseñasCard}
                />
            </div>

            {reseñasTotales > 1 && (
                <Paginator 
                first={paginaActual * tamañoPagina}
                rows={tamañoPagina}
                totalRecords={reseñasTotales}
                onPageChange={handlePageChange}
                />
            )}
            
        </div>
    )
}