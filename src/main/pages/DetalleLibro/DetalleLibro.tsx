import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";
import { Tag } from 'primereact/tag';
import { Image } from 'primereact/image';
import './DetalleLibro.css'
import type { Nullable } from "primereact/ts-helpers";
import { Rating } from 'primereact/rating';
import { ScrollPanel } from 'primereact/scrollpanel';
import type { Reseña } from '../../../types/Reseña';
import { ReseñaCard } from './ReseñaCard/ReseñaCard';
import { DataScroller } from 'primereact/datascroller';
import { useRef } from 'react';
import type { LibroDetalle } from '../../../types/Libro';


export const DetalleLibro = () => {

    const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
    const ds = useRef<null>(null);

    const footer = (
        <>
        <Button label= " Confirmar reserva " icon= "pi pi-check" iconPos="right" className="p-button-primary p-button-text boton-ancho" />
        </>
    )

   

    const headerReseñas = (
        <>
        <h1>Reseñas de la comunidad</h1>
        <Button label="Ver más" icon="pi pi-arrow-right" iconPos="right" className="p-button-link p-0" onClick={() => ds.current.load()} />
        </>
    )


    const reseñaEjemplo : Reseña[] = [
        {
        puntaje: 4,
        texto: "Un clásico atemporal. La prosa de Fitzgerald es inigualable, capturando la esencia de la Era del Jazz maravillosamente.",
        fecha: new Date(),
        autor: "Jane Doe",
        libro: {
            id: 1,
            genero: "Drama",
            titulo: "Meridiano de Sangre",
            autor: "Cormac McCarthy",
            cantidadPaginas: 325,
            descripcion: "hola:",
            editorial: "Scribner",
            fechaPublicacion: "19-04-1992",
            isbn13: "978-0-679-72875-7",
            idioma: "Español",
            tipo: "Coleccionable",
            estado: "Bueno"
        }
    },
    {
        puntaje: 4,
        texto: "Un clásico atemporal. La prosa de Fitzgerald es inigualable, capturando la esencia de la Era del Jazz maravillosamente.",
        fecha: new Date(),
        autor: "Jane Doe",
        libro: {
            id: 1,
            genero: "Drama",
            titulo: "Meridiano de Sangre",
            autor: "Cormac McCarthy",
            cantidadPaginas: 325,
            descripcion: "hola:",
            editorial: "Scribner",
            fechaPublicacion: "19-04-1992",
            isbn13: "978-0-679-72875-7",
            idioma: "Español",
            tipo: "Coleccionable",
            estado: "Bueno"
        }
    },
    {
        puntaje: 4,
        texto: "Un clásico atemporal. La prosa de Fitzgerald es inigualable, capturando la esencia de la Era del Jazz maravillosamente.",
        fecha: new Date(),
        autor: "Jane Doe",
        libro: {
            id: 1,
            genero: "Drama",
            titulo: "Meridiano de Sangre",
            autor: "Cormac McCarthy",
            cantidadPaginas: 325,
            descripcion: "hola:",
            editorial: "Scribner",
            fechaPublicacion: "19-04-1992",
            isbn13: "978-0-679-72875-7",
            idioma: "Español",
            tipo: "Coleccionable",
            estado: "Bueno"
        }
    }
    ]

    const libro: LibroDetalle = {
                id: 1,
                imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_876004-CBT80927631830_122024-F.webp",
                genero: "Drama",
                rating: 5.0,
                descripcion: "Meridiano de Sangre es una novela del escritor estadounidense Cormac McCarthy, publicada en 1985. La historia sigue a un joven conocido como 'El Niño' mientras viaja por el suroeste de Estados Unidos y México con su familia, enfrentándose a la violencia y la brutalidad de la frontera durante la década de 1850. La novela es conocida por su estilo oscuro y poético, así como por su exploración de temas como la violencia, la moralidad y la naturaleza humana.",
                titulo: "Meridiano de Sangre",
                autor: "Cormac McCarthy",
                editorial: "Scribner",
                fechaPublicacion: "19-04-1985",
                cantidadPaginas: 325,
                isbn13: "978-0-679-72875-7",
                idioma: "Español",
                tipo: "Coleccionable",
                bibliokarma: 1000,
                estado: "Bueno"
    }

    const itemTemplate = (data: Reseña) => {
        return (
            <div className="col-12 p-2">
                <ReseñaCard reseña={data} />
            </div>
        )
    }

    const header = (
        <>
            <div className="p-3 pb-0 flex flex-row gap-3 align-items-center">
                <Tag value= "Novela" style={{width: "10%", height: "100%", borderRadius: "18px"}} ></Tag>
                <Rating value={libro.rating} readOnly cancel={false}></Rating> <span className="font-bold text-750">{libro.rating}</span>
            </div>
        
        </>
    )

    const formatoFecha = (fecha: Date | null) => {
        if (!fecha) return "-";
        return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const calcularDuracion = (dateArray: Nullable<(Date | null)[]>) => {
        if (!dateArray || !dateArray[0] || !dateArray[1]) return 0;
        const diffTime = Math.abs(dateArray[1].getTime() - dateArray[0].getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    };



    return (
        <div className="flex flex-column gap-4 p-4">

            <div className="flex flex-row align-items-center gap-4">
                <Card className="md:w-20rem flex flex-column align-items-center">
                    <Image src={libro.imgUrl} alt="Image" width="250"/>
                </Card>
                <Card header = {header} className="flex-1" title={libro.titulo} subTitle={libro.autor} style={{ minHeight: "490px", padding: "1rem",}}>
                    <div className="contenido-card">
                    <p className="text-750 font-bold">Sipnosis</p>
                    <ScrollPanel style={{ width: '100%', height: '200px', alignContent: 'center'}}>{libro.descripcion}</ScrollPanel>
                    </div>
                </Card>
            </div>


            <div className="flex flex-row align-items-start gap-4">

            <Card title="Tu reserva" subTitle="Fechas seleccionadas:" footer= { footer } className= "md:w-20rem" style={{minHeight:"410px", padding: "1rem"}}>

                <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection showIcon iconPos="left" dateFormat="d M, y" className='w-full'/>

                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">Recogida</span>
                    <span className="font-bold text-900">
                        {dates && dates[0] ? formatoFecha(dates[0]) : "-"}
                </span>
                </div>
                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">Devolución</span>
                    <span className="font-bold text-900">
                        {dates && dates[1] ? formatoFecha(dates[1]) : "-"}
                    </span>
                </div>
                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">Duración</span>
                    <span className="font-bold text-900">{calcularDuracion(dates)} días</span>
                </div>
            </Card>

            <Card title="Detalles del libro" className='flex-1' style={{ padding: "1rem"}}>
                <div className="flex flex-column gap-4">
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <div className="flex flex-column  gap-2">
                            <span className="font-bold opacity-70">Tipo</span>
                            <Tag value="Con dedicatoria" className="tag-tipo"></Tag>
                        </div>
                        <div className= "flex flex-column  gap-2 ">
                            <span className="font-bold opacity-70">BiblioKarmas</span>
                            <Tag value={`+${libro.bibliokarma}`} ></Tag>
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <div className="flex flex-column  gap-2">
                            <span className='font-bold opacity-70'>Género</span>
                            <span className="font-bold">{libro.genero}</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Páginas</span>
                            <span className="font-bold">{libro.cantidadPaginas}</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Idioma</span>
                            <span className="font-bold">{libro.idioma}</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Editorial</span>
                            <span className="font-bold">{libro.editorial}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>ISBN-13</span>
                            <span className="font-bold">{libro.isbn13}</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Publicado</span>
                            <span className="font-bold">{libro.fechaPublicacion}</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Estado</span>
                            <span className="font-bold">{libro.estado}</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Rating</span>
                            <span className="font-bold">{libro.rating}</span>
                        </div>
                    </div>  
                </div>
            </Card>
            </div>

            <div className="surface-ground border-round-xl">
                <DataScroller
                    ref={ds}
                    value={reseñaEjemplo} 
                    itemTemplate={itemTemplate} 
                    rows={2}
                    loader
                    header={headerReseñas}
                    className='dataScroller-reseñas'
                />
            </div>
        </div>
    )
}