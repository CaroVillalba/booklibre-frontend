import { useParams } from "react-router-dom"
import { useState, useRef } from "react"
import type { Resenia } from "../../../types/Resenia"
import { reseniaService } from "../../services/ReseniaService"
import { useContext } from "react"
import { MainContext } from "../../../types/MainContext"
import { itemTemplate } from "../DetalleLibro/DetalleLibro"
import { NoReseniasCard } from "../DetalleLibro/ReseniaCard/NoReseniasCard"
import { DataScroller } from "primereact/datascroller"
import { useOnInit } from "../../hooks/useOnInit"
import { Paginator } from "primereact/paginator"
import { getMensajeError } from "../../../utils/errorHandling"
import type { PaginatorPageChangeEvent } from "primereact/paginator"
import type { ReactNode } from "react"

interface ReseniasLibroProps {
    header: ReactNode
}

export const ReseniasLibro = (props: ReseniasLibroProps) => {
    const { id } = useParams()

    const { showToast } = useContext(MainContext)

    const [resenias, setResenias] = useState<Resenia[]>([])
    const [reseniasTotales, setReseniasTotales] = useState(0)
    const [tamanioPagina, setTamanioPagina] = useState(0)
    const [paginaActual, setPaginaActual] = useState(0)

    const ds = useRef<any>(null)

    const getResenias = async(page: number) => {
        try {
            const reseniasObtenidas = await reseniaService.getReseniasPorLibro(id!!,page)
            setResenias(reseniasObtenidas.reseniaList)
            setTamanioPagina(reseniasObtenidas.size)
            setPaginaActual(reseniasObtenidas.pageNumber)
            setReseniasTotales(reseniasObtenidas.totalElements)
        }
        catch (error : unknown) {
            showToast(getMensajeError(error), 'error')
        }
    }

    const handlePageChange = (event: PaginatorPageChangeEvent) => {
        getResenias(event.page)
    }

    useOnInit (() => {
        getResenias(0)
    })

    return (
        <div className="flex flex-column gap-4">
            {/*<h1>Reseñas de la comunidad:</h1>*/}

            <div className="surface-ground border-round-xl ">
                <DataScroller
                    ref={ds}
                    value={resenias} 
                    itemTemplate={itemTemplate} 
                    rows={5}
                    loader={resenias.length > 0}
                    header={props.header}
                    className='dataScroller-reseñas'
                    emptyMessage={NoReseniasCard}
                />
            </div>

            {reseniasTotales > 1 && (
                <Paginator 
                first={paginaActual * tamanioPagina}
                rows={tamanioPagina}
                totalRecords={reseniasTotales}
                onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}