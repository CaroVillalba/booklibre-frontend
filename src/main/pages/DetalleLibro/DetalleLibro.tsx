import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useState } from "react";
import type { Nullable } from "primereact/ts-helpers";


export const DetalleLibro = () => {

    const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

    const footer = (
        <>
        <Button label= " Confirmar reserva " icon= "pi pi-check" iconPos="right" />
        </>
    )


    return (


        <Card title="Tu reserva" subTitle="Fechas seleccionadas:" footer= { footer } className= "md:w-25rem">

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
    )
}   