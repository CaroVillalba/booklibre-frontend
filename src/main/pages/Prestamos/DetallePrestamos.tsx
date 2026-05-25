import { useState, useEffect, useContext } from "react";
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
import type { Prestamo, EstadoPrestamo, TipoPrestamo } from "../../../types/Prestamo";
import "./DetallePrestamos.css";
import { getUserIdFromToken } from "../../services/TokenService";
import { useOnInit } from "../../hooks/useOnInit";
import type { Usuario } from "../../../types/Usuario";
import { usuarioService } from "../../services/UsuarioService";
import { MainContext } from "../../../types/MainContext";

// ── Helpers ───────────────────────────────────────────────────────────────────

const ESTADO_CONFIG: Record<EstadoPrestamo, { label: string; severity: "success" | "warning" | "secondary" }> = {
    ACTIVO: { label: "Activo", severity: "success" },
    PROXIMO_A_VENCER: { label: "Próximo a Vencer", severity: "warning" },
    DEVUELTO: { label: "Devuelto", severity: "secondary" },
};

const formatFecha = (iso: string) => {
    const [year, month, day] = iso.split("-");
    return `${day}/${month}/${year.slice(2)}`;
};

const ITEMS_POR_PAGINA = 4;

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
                    {/*<i className="pi pi-star-fill" style={{ color: "#f59e0b", fontSize: "0.75rem" }} />*/}
                    {/* <span>{prestamo.ratingLibro != null ? prestamo.ratingLibro.toFixed(1) : "N/A"}</span> */}
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

                {esPrestadoAMi && prestamo.estado === "DEVUELTO" && !prestamo.calificacion && (
                    <Button
                        label="Calificar"
                        icon="pi pi-star"
                        iconPos="left"
                        className="p-button-outlined p-button-sm prestamo-card__btn-calificar"
                        onClick={() => onCalificar?.(prestamo)}
                    />
                )}

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

export const MisPrestamos = () => {
    const navigate = useNavigate();

    // — Estado de datos —
    const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<Usuario>()

    // — UI —
    const [busqueda, setBusqueda] = useState("");
    const [busquedaDebounced, setBusquedaDebounced] = useState("");
    const [tabActiva, setTabActiva] = useState<TipoPrestamo>("PRESTADOS_A_MI");
    const [paginaActual, setPaginaActual] = useState(0);
    
    const [prestamoACalificar, setPrestamoACalificar] = useState<Prestamo | null>(null);
    const [puntaje, setPuntaje] = useState<number>(0);
    const [comentario, setComentario] = useState("");

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const { showToast } = useContext(MainContext);
    
    //Si es solo publicador, que cambie a PRESTADOS_POR_MI
    useOnInit(async() => {
        const u = await usuarioService.getUsuarioPorId(getUserIdFromToken()!)
        setUsuario(u)

        if (u.tipoUsuario == "PUBLICADOR") {
            handleTabChange(1)
        }
        else {
            handleTabChange(0)
        }
    })

    // — Debounce para búsqueda —
    useEffect(() => {
        const timer = setTimeout(() => {
            setBusquedaDebounced(busqueda);
        }, 500);
        return () => clearTimeout(timer);
    }, [busqueda]);

    // — Cargar préstamos del backend —
    const cargarPrestamos = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await reservaService.misPrestamos(
                tabActiva,
                busquedaDebounced,
                paginaActual,
                ITEMS_POR_PAGINA
            );
            
            setPrestamos(data.content);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        } catch (e) {
            setError("No se pudieron cargar los préstamos. Intentá de nuevo más tarde.");
            showToast("Error al cargar préstamos", "error");
        } finally {
            setLoading(false);
        }
    };

    // — Recargar cuando cambian los filtros —
    useEffect(() => {
        cargarPrestamos();
    }, [tabActiva, busquedaDebounced, paginaActual]);

    // — Al cambiar de tab, resetear página —
    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
        const nuevoTipo: TipoPrestamo = index === 0 ? "PRESTADOS_A_MI" : "PRESTADOS_POR_MI";
        setTabActiva(nuevoTipo);
        setPaginaActual(0);
    };

    // — Al cambiar búsqueda, resetear página —
    useEffect(() => {
        if (busquedaDebounced !== busqueda) return; // Ignorar mientras hace debounce
        setPaginaActual(0);
    }, [busquedaDebounced]);

    // — Calificación —
    const handleConfirmarCalificacion = async () => {
        if (!prestamoACalificar) return;

        try {
            await reservaService.agregarResenia(
                prestamoACalificar.id,
                puntaje,
                comentario
            );

            setPrestamoACalificar(null);
            setPuntaje(0);
            setComentario("");

            // Recargar préstamos
            cargarPrestamos();
        } catch (error) {
            showToast("Error al enviar calificación. Intentá de nuevo más tarde.", "error");
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

    // — Render de lista —
    const renderLista = () => {
        if (loading) {
            return (
                <div className="prestamos-empty">
                    <ProgressSpinner />
                    <p>Cargando préstamos...</p>
                </div>
            );
        }

        if (prestamos.length === 0) {
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
                    {prestamos.map((p) => (
                        <PrestamoCard
                            key={p.id}
                            prestamo={p}
                            esPrestadoAMi={tabActiva === "PRESTADOS_A_MI"}
                            onCalificar={setPrestamoACalificar}
                        />
                    ))}
                </div>
                {totalElements > ITEMS_POR_PAGINA && (
                    <Paginator
                        first={paginaActual * ITEMS_POR_PAGINA}
                        rows={ITEMS_POR_PAGINA}
                        totalRecords={totalElements}
                        onPageChange={(e) => setPaginaActual(e.page ?? 0)}
                        className="mis-prestamos__paginator"
                    />
                )}
            </>
        );
    };

    // — Error state —
    if (error && !loading) {
        return (
            <div className="mis-prestamos mis-prestamos--centered">
                <i className="pi pi-exclamation-triangle" style={{ fontSize: "2rem", color: "var(--red-500)" }} />
                <p>{error}</p>
                <Button label="Reintentar" icon="pi pi-refresh" onClick={cargarPrestamos} />
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
            <TabView 
                activeIndex={activeTabIndex}
                className="mis-prestamos__tabs w-full"
                onTabChange={(e) => handleTabChange(e.index)}
            >
                {(usuario != null) && (usuario.tipoUsuario == "LECTOR" || usuario.tipoUsuario == "LECTOR_PUBLICADOR") && (
                    <TabPanel header="Prestados a mí">
                        {renderLista()}
                    </TabPanel>
                )}

                {(usuario != null) && (usuario.tipoUsuario == "PUBLICADOR" || usuario.tipoUsuario == "LECTOR_PUBLICADOR") && (
                    <TabPanel header="Prestados por mí">
                        {renderLista()}
                    </TabPanel>
                )}
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