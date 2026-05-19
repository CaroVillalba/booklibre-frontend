import { useParams } from "react-router-dom";
import { useState } from "react";
import type { Resenia } from "../../../types/Resenia";
import { reseniaService } from "../../services/ReseniaService";
import { useContext } from "react";
import { MainContext } from "../../../types/MainContext";
import { itemTemplate } from "../DetalleLibro/DetalleLibro";
import { NoReseniasCard } from "../DetalleLibro/ReseniaCard/NoReseniasCard";
import { DataScroller } from "primereact/datascroller";
import { Paginator } from "primereact/paginator";
import { getMensajeError } from "../../../utils/errorHandling";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import type { ReactNode } from "react";
import type { ReseniaEmbebida } from "../../../types/Libro";
import { Button } from "primereact/button";

interface ReseniasLibroProps {
    header: ReactNode;
    reseniasEmbebidas: ReseniaEmbebida[];
}

const toResenia = (r: ReseniaEmbebida): Resenia => ({
    autorNombre: r.autorNombre,
    rating: r.rating,
    texto: r.texto,
    fecha: "",
});

export const ReseniasLibro = ({
    header,
    reseniasEmbebidas,
}: ReseniasLibroProps) => {
    const { id } = useParams();

    const { showToast } = useContext(MainContext);

    const [resenias, setResenias] = useState<Resenia[]>([]);
    const [reseniasTotales, setReseniasTotales] = useState(0);
    const [tamanioPagina, setTamanioPagina] = useState(0);
    const [paginaActual, setPaginaActual] = useState(0);
    const [modoCompleto, setModoCompleto] = useState(false);

    const reseniasAMostrar = modoCompleto ? resenias : reseniasEmbebidas.map(toResenia)
    const totalAMostrar = modoCompleto ? reseniasTotales: reseniasEmbebidas.length

    const cargarDesdePostgres = async (page: number) => {
        if(!id) return
        try {
            const reseniasObtenidas = await reseniaService.getReseniasPorLibro(
                id,
                page,
            );
            setResenias(reseniasObtenidas.reseniaList);
            setTamanioPagina(reseniasObtenidas.size);
            setPaginaActual(reseniasObtenidas.pageNumber);
            setReseniasTotales(reseniasObtenidas.totalElements);
            setModoCompleto(true);
        } catch (error: unknown) {
            showToast(getMensajeError(error), "error");
        }
    };

    const handleVerMas = () => {
        cargarDesdePostgres(0);
    };

    const handlePageChange = (event: PaginatorPageChangeEvent) => {
        cargarDesdePostgres(event.page);
    };

    return (
        <div className="flex flex-column gap-4">
            {/*<h1>Reseñas de la comunidad:</h1>*/}

            <div className="surface-ground border-round-xl ">
                <DataScroller
                    value={reseniasAMostrar}
                    itemTemplate={itemTemplate}
                    rows={5}
                    loader={reseniasAMostrar.length > 0}
                    header={header}
                    className={`dataScroller-reseñas ${modoCompleto && totalAMostrar<tamanioPagina ? "mb-5" : ""}`}
                    emptyMessage={NoReseniasCard}
                />
            </div>

            {!modoCompleto && reseniasEmbebidas.length > 0 && (
                <Button
                    label="Ver todas las reseñas"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    className="p-button-outlined text-color p-button-secondary p-3 w-full mb-5"
                    onClick={handleVerMas}
                />
            )}

            {modoCompleto && totalAMostrar > tamanioPagina && (
                <Paginator
                    first={paginaActual * tamanioPagina}
                    rows={tamanioPagina}
                    totalRecords={totalAMostrar}
                    onPageChange={handlePageChange}
                    className="mb-5"
                />
            )}
        </div>
    );
};
