import { Card } from 'primereact/card'
import { Calendar } from 'primereact/calendar';
import type { Nullable } from 'primereact/ts-helpers';
import type { ReactNode } from 'react';


interface SeccionReservaProps {
    dates: Nullable<(Date | null)[]>;
    formatoFecha: (fecha: Date | null) => string;
    calcularDuracion: (dateArray: Nullable<(Date | null)[]>) => number;
    footer: ReactNode;
}


export const SeccionReserva = ({ 
    dates, 
    formatoFecha, 
    calcularDuracion, 
    footer 
}: SeccionReservaProps) => (
    <Card 
        title="Tu reserva" 
        subTitle="Fechas seleccionadas:" 
        footer={footer} 
        className="md:w-20rem" 
        style={{ minHeight: "410px", padding: "1rem" }}
    >
        <Calendar 
            disabled 
            value={dates} 
            selectionMode="range" 
            readOnlyInput 
            hideOnRangeSelection 
            showIcon 
            iconPos="left" 
            dateFormat="d M, y" 
            className='w-full boton-icono' 
            minDate={new Date()} 
        />
        
        <div className="flex flex-column gap-2 mt-3">
            {[
                { label: 'Recogida', val: dates && dates[0] ? formatoFecha(dates[0]) : "-" },
                { label: 'Devolución', val: dates && dates[1] ? formatoFecha(dates[1]) : "-" },
                { label: 'Duración', val: `${calcularDuracion(dates)} días` }
            ].map((item) => (
                <div key={item.label} className="flex justify-content-between align-items-center p-3 surface-100 border-round-lg">
                    <span className="text-600">{item.label}</span>
                    <span className="font-bold text-900">{item.val}</span>
                </div>
            ))}
        </div>
    </Card>
);