// DetallePrestamos.tsx

import { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Paginator } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { reservaService } from "../../services/ReservaService";
import type { Prestamo, EstadoPrestamo } from "../../../types/Prestamo";
import "./DetallePrestamos.css";

// ── Helpers ───────────────────────────────────────────────────────────────────

const ESTADO_CONFIG: Record<EstadoPrestamo, { label: string; severity: "success" | "warning" | "secondary" }> = {
    ACTIVO: { label: "Activo", severity: "success" },
    PROXIMO_A_VENCER: { label: "Próximo a Vencer", severity: "warning" },
    DEVUELTO: { label: "Devuelto", severity: "secondary" },
};

const formatFecha = (iso: string) => {
    // "2025-01-15" → "15/01/25"
    const [year, month, day] = iso.split("-");
    return `${day}/${month}/${year.slice(2)}`;
};

// ── Sub-componente: Tarjeta de préstamo ───────────────────────────────────────

interface PrestamoCardProps {
    prestamo: Prestamo;
    esPrestadoAMi: boolean;
    onCalificar?: (prestamo: Prestamo) => void;
}

const PrestamoCard = ({ prestamo, esPrestadoAMi, onCalificar }: PrestamoCardProps) => {
    const cfg = ESTADO_CONFIG[prestamo.estado];
    return (
        <div className="prestamo-card">
            <div className="prestamo-card__estado-badge">
                <Tag value={cfg.label} severity={cfg.severity} />
            </div>

            <div className="prestamo-card__img-wrap">
                <img src={prestamo.imgUrlLibro} alt={prestamo.tituloLibro} className="prestamo-card__img" />
            </div>

            <div className="prestamo-card__body">
                <div className="prestamo-card__rating">
                    <i className="pi pi-star-fill" style={{ color: "#f59e0b", fontSize: "0.75rem" }} />
                    <span>{prestamo.ratingLibro != null ? prestamo.ratingLibro.toFixed(1) : "N/A"}</span>
                </div>
                <p className="prestamo-card__titulo">{prestamo.tituloLibro}</p>
                <p className="prestamo-card__autor">{prestamo.autorLibro}</p>

                <div className="prestamo-card__meta">
                    <span>
                        <i className="pi pi-user" />
                        {esPrestadoAMi
                            ? `Prestado por: ${prestamo.otroUsuario}`
                            : `Prestado a: ${prestamo.otroUsuario}`}
                    </span>
                    <span>
                        <i className="pi pi-calendar" />
                        Rango: {formatFecha(prestamo.fechaDesde)} - {formatFecha(prestamo.fechaHasta)}
                    </span>
                    <span className="prestamo-card__karma">
                        BIBLIOKARMA <strong>+{prestamo.bibliokarma}</strong>
                    </span>
                </div>

                {/* Solo se puede calificar si el préstamo fue devuelto y no tiene calificación aún */}
                {esPrestadoAMi && prestamo.estado === "DEVUELTO" && !prestamo.calificacion && (
                    <Button
                        label="Calificar"
                        icon="pi pi-star"
                        iconPos="left"
                        className="p-button-outlined p-button-sm prestamo-card__btn-calificar"
                        onClick={() => onCalificar?.(prestamo)}
                    />
                )}

                {/* Si ya tiene calificación, mostramos las estrellas */}
                {esPrestadoAMi && prestamo.estado === "DEVUELTO" && prestamo.calificacion && (
                    <div className="prestamo-card__calificacion">
                        <Rating value={prestamo.calificacion} readOnly cancel={false} stars={5} />
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Componente principal ──────────────────────────────────────────────────────

const ITEMS_POR_PAGINA = 4;

export const MisPrestamos = () => {
    const navigate = useNavigate();

    // — Estado de datos —
    const [prestadosAMi, setPrestadosAMi] = useState<Prestamo[]>([]);
    const [prestadosPorMi, setPrestadosPorMi] = useState<Prestamo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // — UI —
    const [busqueda, setBusqueda] = useState("");
    const [prestamoACalificar, setPrestamoACalificar] = useState<Prestamo | null>(null);
    const [puntaje, setPuntaje] = useState<number>(0);
    const [comentario, setComentario] = useState("");
    const [paginaAMi, setPaginaAMi] = useState(0);
    const [paginaPorMi, setPaginaPorMi] = useState(0);

    // — Carga inicial —
    useEffect(() => {
        const cargar = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await reservaService.misPrestamos();  // ← Ya no necesita parámetro
                setPrestadosAMi(data.prestadosAMi);
                setPrestadosPorMi(data.prestadosPorMi);
            } catch (e) {
                setError("No se pudieron cargar los préstamos. Intentá de nuevo más tarde.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    // — Filtro de búsqueda —
    const filtrar = (lista: Prestamo[]) => {
        const q = busqueda.toLowerCase();
        if (!q) return lista;
        return lista.filter(
            (p) =>
                p.tituloLibro.toLowerCase().includes(q) ||
                p.autorLibro.toLowerCase().includes(q)
        );
    };

    const handleConfirmarCalificacion = async () => {
        if (!prestamoACalificar) return;

        try {
            await reservaService.agregarReseña(
                prestamoACalificar.id,
                puntaje,
                comentario  // ← Ya no necesita el userId como parámetro
            );

            // opcional: actualizar UI local
            setPrestamoACalificar(null);
            setPuntaje(0);
            setComentario("");

            // recargar préstamos para reflejar calificación
            const data = await reservaService.misPrestamos();  // ← Ya no necesita parámetro
            setPrestadosAMi(data.prestadosAMi);
            setPrestadosPorMi(data.prestadosPorMi);

        } catch (error) {
            console.error("Error enviando reseña", error);
        }
    };

    const footerDialog = (
        <div className="flex justify-content-end gap-2">
            <Button
                label="Cancelar"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setPrestamoACalificar(null)}
            />
            <Button
                label="Enviar calificación"
                icon="pi pi-check"
                onClick={handleConfirmarCalificacion}
                disabled={puntaje === 0}
            />
        </div>
    );

    // — Render de lista paginada —
    const renderLista = (lista: Prestamo[], esPrestadoAMi: boolean) => {
        const filtrados = filtrar(lista);
        const paginaActual = esPrestadoAMi ? paginaAMi : paginaPorMi;
        const onPageChange = esPrestadoAMi
            ? (e: { first: number }) => setPaginaAMi(e.first)
            : (e: { first: number }) => setPaginaPorMi(e.first);

        const paginados = filtrados.slice(paginaActual, paginaActual + ITEMS_POR_PAGINA);

        if (filtrados.length === 0) {
            return (
                <div className="prestamos-empty">
                    <i className="pi pi-book prestamos-empty__icon" />
                    <p>No se encontraron préstamos.</p>
                </div>
            );
        }

        return (
            <>
                <div className="prestamos-grid">
                    {paginados.map((p) => (
                        <PrestamoCard
                            key={p.id}
                            prestamo={p}
                            esPrestadoAMi={esPrestadoAMi}
                            onCalificar={setPrestamoACalificar}
                        />
                    ))}
                </div>
                {filtrados.length > ITEMS_POR_PAGINA && (
                    <Paginator
                        first={paginaActual}
                        rows={ITEMS_POR_PAGINA}
                        totalRecords={filtrados.length}
                        onPageChange={onPageChange}
                        className="mis-prestamos__paginator"
                    />
                )}
            </>
        );
    };

    // — Loading / Error states —
    if (loading) {
        return (
            <div className="mis-prestamos mis-prestamos--centered">
                <ProgressSpinner />
                <p>Cargando préstamos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mis-prestamos mis-prestamos--centered">
                <i className="pi pi-exclamation-triangle" style={{ fontSize: "2rem", color: "var(--red-500)" }} />
                <p>{error}</p>
                <Button label="Reintentar" icon="pi pi-refresh" onClick={() => window.location.reload()} />
            </div>
        );
    }

    return (
        <div className="mis-prestamos p-3">
            {/* Encabezado */}
            <div className="mis-prestamos__header">
                <div>
                    <h1 className="mis-prestamos__titulo">Préstamos de libros</h1>
                    <p className="mis-prestamos__subtitulo">
                        Aquí vas a encontrar toda la información sobre el intercambio de libros con otros usuarios.
                    </p>
                </div>
            </div>

            {/* Buscador */}
            <div className="mis-prestamos__search p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por título, autor..."
                    className="w-full"
                />
            </div>

            {/* Tabs */}
            <TabView className="mis-prestamos__tabs w-full">
                <TabPanel header="Prestados a mí">
                    {renderLista(prestadosAMi, true)}
                </TabPanel>
                <TabPanel header="Prestados por mí">
                    {renderLista(prestadosPorMi, false)}
                </TabPanel>
            </TabView>

            {/* CTA al catálogo */}
            <div className="mis-prestamos__footer-cta">
                <i className="pi pi-book-open" style={{ fontSize: "2rem", opacity: 0.4 }} />
                <p>¿Querés leer algo nuevo?</p>
                <span>Explorá la biblioteca y solicitá libros en préstamo de otros lectores de la comunidad.</span>
                <Button
                    label="Explorar Catálogo"
                    icon="pi pi-compass"
                    className="p-button-outlined mt-2"
                    onClick={() => navigate("/")}
                />
            </div>

            {/* Dialog de calificación */}
            <Dialog
                header={`Calificar: ${prestamoACalificar?.tituloLibro}`}
                visible={!!prestamoACalificar}
                style={{ width: "420px" }}
                onHide={() => setPrestamoACalificar(null)}
                footer={footerDialog}
                draggable={false}
            >
                <div className="calificacion-dialog">
                    <p className="calificacion-dialog__label">Tu puntuación</p>
                    <Rating
                        value={puntaje}
                        onChange={(e) => setPuntaje(e.value ?? 0)}
                        cancel={false}
                        stars={5}
                    />
                    <p className="calificacion-dialog__label mt-3">Comentario</p>
                    <InputTextarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        rows={4}
                        placeholder="Contale a la comunidad tu experiencia con este libro..."
                        className="w-full"
                        maxLength={500}
                    />
                    <small className="calificacion-dialog__chars">{comentario.length}/500 caracteres</small>
                </div>
            </Dialog>
        </div>
    );
};
