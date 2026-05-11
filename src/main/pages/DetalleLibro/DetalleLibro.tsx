import { useState, useContext } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Image } from 'primereact/image'
import { Rating } from 'primereact/rating'
import { ScrollPanel } from 'primereact/scrollpanel'
import { ReseniaCard } from './ReseniaCard/ReseniaCard'
import { useOnInit } from './../../hooks/useOnInit'
import { libroService } from '../../services/LibroService'
import { reseniaService } from '../../services/ReseniaService'
import { reservaService } from '../../services/ReservaService'
import { getMensajeError } from '../../../utils/errorHandling'
import { MainContext } from '../../../types/MainContext'
import { InfoItem } from '../../components/DetalleLibroComponentes/InfoItem'
import { SeccionReserva } from '../../components/DetalleLibroComponentes/SeccionReserva'
import { loginService } from '../../services/AuthService'
import { usuarioService } from '../../services/UsuarioService'
import { ReseniasLibro } from '../ReseniasLibro/ReseniasLibro'
import type { Resenia } from '../../../types/Resenia'
import type { LibroHome } from "../../../types/Libro"
import type { Nullable } from "primereact/ts-helpers"
import '../../../toast.css'
import './DetalleLibro.css'

export const itemTemplate = (data: Resenia) => {
        return (
            <div className="col-12 p-2">
                <ReseniaCard resenia={data} />
            </div>
        )
    }

export const DetalleLibro = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [searchParams] = useSearchParams()

    const desdeParam = searchParams.get('desde') || new Date().toISOString().split("T")[0]
    const hastaParam = searchParams.get('hasta') || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]

    const [libro, setLibro] = useState<LibroHome>({
        id: "",
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

    const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

    const [resenias, setResenias] = useState<Resenia[]>([])
    const [reseniasTotales, setReseniasTotales] = useState(0)
    const [tipoUsuario, setTipoUsuario] = useState<string | null>(null)
    
    const { actualizarBibliokarmas } = useContext(MainContext)

    const headerResenias = ( 
        <> 
            <h1>Reseñas de la comunidad</h1> 
            { /*resenias.length > 0 && ( 
                <Button 
                    label={"Ver más ("+reseniasTotales.toString()+")"}  icon="pi pi-arrow-right" 
                    iconPos="right" className="p-button-link p-0" 
                    onClick={() => navigate(`/comentarios-libro/${id}`)} 
                /> )*/
            } 
        </> 
    )
    
    const getLibroDetalle = async() => {
        try {
            const libroDetalle = await libroService.getLibroPorId(id!!, {
                desde: desdeParam, 
                hasta: hastaParam,
            })
            setLibro(libroDetalle)

            const [year, month, day] = desdeParam.split('-').map(Number)
            const fechaDesdeCorrecta = new Date(year, month - 1, day)

            const [yH, mH, dH] = hastaParam.split('-').map(Number)
            const fechaHastaCorrecta = new Date(yH, mH - 1, dH)

            setDates([fechaDesdeCorrecta, fechaHastaCorrecta])
        }
        catch (error: unknown) {
            showToast(getMensajeError(error), 'error')
        }
    }

    /*
     const getResenias = async() => {
        try {
            const reseniasObtenidas = await reseniaService.getReseniasViewDetalleLibro(Number(id))
            setResenias(reseniasObtenidas.reseniaList)
            setReseniasTotales(reseniasObtenidas.totalElements)
        }
        catch (error : unknown) {
            showToast(getMensajeError(error), 'error')
        }
    } 
    */

    const realizarReserva = async () => {
        if (!dates || !dates[0] || !dates[1]) {
            showToast('Por favor, selecciona un rango de fechas válido', 'warning')
            return;
        }

        try {
            const userId = loginService.getLoggedUser()
            const usuario = await usuarioService.getUsuarioPorId(userId!!)

            await reservaService.postReserva({
                idLibro: libro.id,
                idLector: usuario.id,
                fechaDesde: dates[0], 
                fechaHasta: dates[1],
            });

            setLibro((prevLibro) => ({
                ...prevLibro,
                estado: "Prestado" 
            }));

            const usuarioActualizado = await usuarioService.getUsuarioPorId(userId!!);
            actualizarBibliokarmas(usuarioActualizado.biblioKarmas);
            
            showToast('Reserva realizada con éxito', 'success')
            navigate(`/prestamos`)
            setDates(null)
        } catch (error: unknown) {
            showToast(getMensajeError(error), 'error')
        }
    }

    const footer = (
        <>
            <Button label= " Confirmar reserva " icon= "pi pi-check" iconPos="right" className="p-button-primary p-button-text boton-ancho" onClick={realizarReserva} />
        </>
    )

    useOnInit(() => {
        getLibroDetalle()
        /* getResenias() */

        const fetchUsuario = async () => {
            try {
                const userId = loginService.getLoggedUser()
                const usuario = await usuarioService.getUsuarioPorId(userId!!)
                setTipoUsuario(usuario.tipoUsuario)
            } catch (error) {
                showToast(getMensajeError(error), 'error')
            }
        }

        fetchUsuario()
    })

    const header = (
        <>
       {/*  TODO: VER bien el tema de cómo se muestra el género y el rating, porque cuando es CIENCIA_FICCION queda medio "corrido" */}

            <div className="p-3 pb-0 flex flex-row gap-3 align-items-center">
                <Tag value={libro.genero} style={{ height: "100%", borderRadius: "18px"}} />

                {libro.rating != null ? (
                    <>
                        <Rating value={libro.rating} readOnly cancel={false} />
                        <span className="font-bold text-750">
                            {libro.rating.toFixed(1)}
                        </span>
                    </> 
                ) : (
                    <span className="font-bold text-750">N/A</span>
                )}

            </div>
        </>
    )

    const formatoFecha = (fecha: Date | null) => {
        if (!fecha) return "-"
        return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    const calcularDuracion = (dateArray: Nullable<(Date | null)[]>) => {
        if (!dateArray || !dateArray[0] || !dateArray[1]) return 0
        const diffTime = Math.abs(dateArray[1].getTime() - dateArray[0].getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) 
    }

    return (
        <div className="flex flex-column gap-4 p-4 detalle-libro-container">

            <div className="flex flex-row align-items-center gap-4">
                <Card className="md:w-20rem flex flex-column align-items-center">
                    <Image src={libro.imgUrl} alt="Image" width="250" imageStyle={{minHeight:'420px', objectFit:'cover'}}/>
                </Card>
                <Card header = {header} className="flex-1" title={libro.titulo} subTitle={libro.autor} style={{ minHeight: "490px", padding: "1rem",}}>
                    <div className="contenido-card">
                        <p className="text-750 font-bold">Sipnosis</p>
                        <ScrollPanel style={{ width: '100%', height: '200px', alignContent: 'center'}}>{libro.descripcion}</ScrollPanel>
                    </div>
                </Card>
            </div>

            <div className="flex flex-row align-items-start gap-4 h-auto">
                {tipoUsuario != "PUBLICADOR" && (
                    <SeccionReserva
                        dates={dates}
                        formatoFecha={formatoFecha}
                        calcularDuracion={calcularDuracion}
                        footer={footer}
                    />
                )}

                <Card title="Detalles del libro" className='flex-1' style={{ padding: "1rem"}}>
                    <div className="flex flex-column gap-4">
                        <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                            <InfoItem label="Tipo" value={<Tag value={libro.tipo} className='tag-tipo'></Tag>}></InfoItem>
                            <InfoItem label="Bibliokarmas" value={<Tag value={`+${libro.bibliokarma}`} ></Tag>}></InfoItem>
                        </div>
                        <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                            <InfoItem label="Género" value={libro.genero}></InfoItem>
                            <InfoItem label="Páginas" value={libro.cantidadPaginas}></InfoItem>
                            <InfoItem label="Idioma" value={libro.idioma}></InfoItem>
                            <InfoItem label="Editorial" value={libro.editorial}></InfoItem>
                        </div> 
                    </div>
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <InfoItem label="ISBN-13" value={libro.isbn13}></InfoItem>
                        <InfoItem label="Publicado" value={libro.fechaPublicacion
                            ? new Date(libro.fechaPublicacion).toLocaleDateString() : 'N/A'
                        }></InfoItem>
                        <InfoItem label="Estado" value={libro.estado}></InfoItem>
                        <InfoItem label="Rating" value={libro.rating
                            ? libro.rating.toFixed(2) : 'N/A'
                        }></InfoItem>
                    </div>  
                </Card>
            </div>
            
            <div className="surface-ground border-round-xl ">
                {/*
                    <DataScroller
                        ref={ds}
                        value={resenias} 
                        itemTemplate={itemTemplate} 
                        rows={2}
                        loader={reseñas.length > 0}
                        header={headerResenias}
                        className='dataScroller-reseñas'
                        emptyMessage={NoReseniasCard}
                    />
                */}
                <ReseniasLibro header={headerResenias}/>
            </div>
        </div>
    )
}