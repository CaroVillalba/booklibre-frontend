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


export const DetalleLibro = () => {

    const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

    const footer = (
        <>
        <Button label= " Confirmar reserva " icon= "pi pi-check" iconPos="right" className="p-button-primary p-button-text" />
        </>
    )

    const header = (
        <>
            <div className="p-3 pb-0 flex flex-row gap-3 align-items-center">
                <Tag value= "Novela" style={{width: "10%", height: "100%", borderRadius: "18px"}} ></Tag>
                <Rating value={3} readOnly cancel={false}></Rating> <span className="font-bold text-750">3.0</span>
            </div>
        
        </>
    )
    

    return (
        <div className="flex flex-column gap-4 p-4">

            <div className="flex flex-row align-items-center gap-4">
                <Card className="md:w-20rem flex flex-column align-items-center">
                    <Image src="https://http2.mlstatic.com/D_NQ_NP_2X_876004-CBT80927631830_122024-F.webp" alt="Image" width="250"/>
                </Card>
                <Card header = {header} className="flex-1" title="Meridiano de Sangre" subTitle="Cormac McCarthy" style={{ minHeight: "490px", padding: "1rem" }}>
                    <div className="contenido-card">
                    <p className="text-750 font-bold">Sipnosis</p>
                    <ScrollPanel style={{ width: '100%', height: '200px', alignContent: 'center' }}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.

                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</ScrollPanel>
                    </div>
                </Card>
            </div>


            <div className="flex flex-row align-items-start gap-4">

            <Card title="Tu reserva" subTitle="Fechas seleccionadas:" footer= { footer } className= "md:w-20rem">

                <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection showIcon iconPos="left" />

                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">Recogida</span>
                    <span className="font-bold text-900">24 Oct, 2023</span>
                </div>
                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">Devolución</span>
                    <span className="font-bold text-900">24 Oct, 2023</span>
                </div>
                <div className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">Duración</span>
                    <span className="font-bold text-900">14 días</span>
                </div>
            </Card>

            <Card title="Detalles del libro" className='flex-1' style={{ padding: "1rem"}}>
                <div className="flex flex-column gap-4">
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <div className="flex flex-column  gap-2">
                            <span className="font-bold opacity-70">Tipo</span>
                            <Tag value="Con dedicatoria" style={{borderRadius: "18px", width:"auto"}}></Tag>
                        </div>
                        <div className= "flex flex-column  gap-2 ">
                            <span className="font-bold opacity-70">BiblioKarmas</span>
                            <Tag value= "+1234" ></Tag>
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <div className="flex flex-column  gap-2">
                            <span className='font-bold opacity-70'>Género</span>
                            <span className="font-bold">Ficción historica</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Páginas</span>
                            <span className="font-bold">180</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Idioma</span>
                            <span className="font-bold">Inglés</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Editorial</span>
                            <span className="font-bold">Scribner</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-content-between align-items-center w-full p-1">
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>ISBN-13</span>
                            <span className="font-bold">123455</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Publicado</span>
                            <span className="font-bold">10 abril, 1992</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Estado</span>
                            <span className="font-bold">Bueno</span>
                        </div>
                        <div className="flex flex-column mb-4 gap-1">
                            <span className='font-bold opacity-70'>Ranking</span>
                            <span className="font-bold">4.5</span>
                        </div>
                    </div>  
                </div>
            </Card>
            </div>
            <div className="flex justify-content-between align-items-center mb-4">
                <h2 className="m-0 text-xl font-bold">Reseñas de la Comunidad</h2>
                <Button label="Ver las 124 reseñas" icon="pi pi-arrow-right" iconPos="right" className="p-button-link p-0" />
            </div>

   
            <div className="flex flex-row gap-4">
        
       
            <Card className="flex-1 surface-card border-round-xl shadow-1">
                <div className="flex align-items-center gap-3 mb-3">
               
                <div className="flex align-items-center justify-content-center border-circle bg-blue-100 text-blue-600 font-bold" style={{ width: '40px', height: '40px' }}>
                    JD
                </div>
                <div className="flex flex-column">
                    <span className="font-bold text-900">Jane Doe</span>
                    <Rating value={5} readOnly cancel={false} style={{ fontSize: '0.8rem' }} />
                </div>
            </div>
            <p className="m-0 text-600 line-height-3">
                Un clásico atemporal. La prosa de Fitzgerald es inigualable, capturando la esencia de la Era del Jazz maravillosamente.
            </p>
        </Card>

        
            <Card className="flex-1 surface-card border-round-xl shadow-1">
                <div className="flex align-items-center gap-3 mb-3">
                    <div className="flex align-items-center justify-content-center border-circle bg-green-100 text-green-600 font-bold" style={{ width: '40px', height: '40px' }}>
                    MS
                    </div>
                    <div className="flex flex-column">
                        <span className="font-bold text-900">Mark Smith</span>
                        <Rating value={4} readOnly cancel={false} style={{ fontSize: '0.8rem' }} />
                </div>
                </div>
                <p className="m-0 text-600 line-height-3">
                El simbolismo en este libro es increíble. La luz verde, los ojos del Dr. T.J. Eckleburg...
                </p>
            </Card>

            </div>


        </div>
    )
}   