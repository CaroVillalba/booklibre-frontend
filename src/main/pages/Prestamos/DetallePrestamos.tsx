import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useNavigate } from "react-router-dom";
import "./DetallePrestamos.css";
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";

// ── Tipos ────────────────────────────────────────────────────────────────────

type EstadoPrestamo = "ACTIVO" | "PROXIMO_A_VENCER" | "DEVUELTO";

interface Prestamo {
    id: number;
    libro: {
        titulo: string;
        autor: string;
        imgUrl: string;
        rating: number;
    };
    contraparte: string; // "Prestado por" o "Prestado a"
    rangoDesde: string;
    rangoHasta: string;
    bibliokarma: number;
    estado: EstadoPrestamo;
    calificacion?: number;
    comentario?: string;
}

// ── Datos de ejemplo ──────────────────────────────────────────────────────────

const PRESTADOS_A_MI: Prestamo[] = [
    {
        id: 1,
        libro: {
            titulo: "The Great Gatsby",
            autor: "F. Scott Fitzgerald",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/800px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
            rating: 4.8,
        },
        contraparte: "Juan Pérez",
        rangoDesde: "01/10/23",
        rangoHasta: "15/10/23",
        bibliokarma: 240,
        estado: "ACTIVO",
    },
    {
        id: 2,
        libro: {
            titulo: "1984",
            autor: "George Orwell",
            imgUrl: "https://images.cdn3.buscalibre.com/fit-in/360x360/e8/c0/e8c0e9e3c9c3e3e3e3e3e3e3e3e3e3e3.jpg",
            rating: 4.9,
        },
        contraparte: "Ana García",
        rangoDesde: "05/10/23",
        rangoHasta: "20/10/23",
        bibliokarma: 240,
        estado: "PROXIMO_A_VENCER",
    },
    {
        id: 3,
        libro: {
            titulo: "To Kill a Mockingbird",
            autor: "Harper Lee",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
            rating: 4.7,
        },
        contraparte: "Carlos Ruiz",
        rangoDesde: "10/10/23",
        rangoHasta: "25/10/23",
        bibliokarma: 240,
        estado: "ACTIVO",
    },
    {
        id: 4,
        libro: {
            titulo: "The Catcher in the Rye",
            autor: "J.D. Salinger",
            imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
            rating: 4.5,
        },
        contraparte: "Elena Beltrán",
        rangoDesde: "12/10/23",
        rangoHasta: "27/10/23",
        bibliokarma: 240,
        estado: "DEVUELTO",
    },
];

const PRESTADOS_POR_MI: Prestamo[] = [
    {
        id: 5,
        libro: {
            titulo: "Meridiano de Sangre",
            autor: "Cormac McCarthy",
            imgUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_876004-CBT80927631830_122024-F.webp",
            rating: 5.0,
        },
        contraparte: "Sofía Martínez",
        rangoDesde: "03/10/23",
        rangoHasta: "18/10/23",
        bibliokarma: 320,
        estado: "ACTIVO",
    },
    {
        id: 6,
        libro: {
            titulo: "El Señor de las Moscas",
            autor: "William Golding",
            imgUrl: "https://upload.wikimedia.org/wikipedia/en/9/9b/LordOfTheFliesBookCover.jpg",
            rating: 4.4,
        },
        contraparte: "Lucas Fernández",
        rangoDesde: "01/10/23",
        rangoHasta: "12/10/23",
        bibliokarma: 180,
        estado: "DEVUELTO",
    },
    {
        id: 7,
        libro: {
            titulo: "Moby Dick",
            autor: "Herman Melville",
            imgUrl: "https://images.cdn3.buscalibre.com/fit-in/360x360/ed/c5/edc5b53333ebd87cfe6256685249673f.jpg",
            rating: 4.1,
        },
        contraparte: "Valentina López",
        rangoDesde: "07/10/23",
        rangoHasta: "22/10/23",
        bibliokarma: 210,
        estado: "PROXIMO_A_VENCER",
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const ESTADO_CONFIG: Record<EstadoPrestamo, { label: string; severity: "success" | "warning" | "secondary" }> = {
    ACTIVO: { label: "Activo", severity: "success" },
    PROXIMO_A_VENCER: { label: "Próximo a Vencer", severity: "warning" },
    DEVUELTO: { label: "Devuelto", severity: "secondary" },
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
                <img src={prestamo.libro.imgUrl} alt={prestamo.libro.titulo} className="prestamo-card__img" />
            </div>

            <div className="prestamo-card__body">
                <div className="prestamo-card__rating">
                    <i className="pi pi-star-fill" style={{ color: "#f59e0b", fontSize: "0.75rem" }} />
                    <span>{prestamo.libro.rating}</span>
                </div>
                <p className="prestamo-card__titulo">{prestamo.libro.titulo}</p>
                <p className="prestamo-card__autor">{prestamo.libro.autor}</p>

                <div className="prestamo-card__meta">
                    <span>
                        <i className="pi pi-user" />
                        {esPrestadoAMi ? `Prestado por: ${prestamo.contraparte}` : `Prestado a: ${prestamo.contraparte}`}
                    </span>
                    <span>
                        <i className="pi pi-calendar" />
                        Rango: {prestamo.rangoDesde} - {prestamo.rangoHasta}
                    </span>
                    <span className="prestamo-card__karma">
                        BIBLIOKARMA <strong>+{prestamo.bibliokarma}</strong>
                    </span>
                </div>

                {esPrestadoAMi && prestamo.estado === "DEVUELTO" && (
                    <Button
                        label="Calificar"
                        icon="pi pi-star"
                        iconPos="left"
                        className="p-button-outlined p-button-sm prestamo-card__btn-calificar"
                        onClick={() => onCalificar?.(prestamo)}
                    />
                )}
            </div>
        </div>
    );
};

// ── Componente principal ──────────────────────────────────────────────────────

export const MisPrestamos = () => {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState("");
    const [prestamoACalificar, setPrestamoACalificar] = useState<Prestamo | null>(null);
    const [puntaje, setPuntaje] = useState<number>(0);
    const [comentario, setComentario] = useState("");

    const filtrar = (lista: Prestamo[]) => {
        const q = busqueda.toLowerCase();
        if (!q) return lista;
        return lista.filter(
            (p) =>
                p.libro.titulo.toLowerCase().includes(q) ||
                p.libro.autor.toLowerCase().includes(q)
        );
    };

    const handleConfirmarCalificacion = () => {
        // Aquí iría la llamada al servicio
        console.log("Calificación enviada:", { prestamoACalificar, puntaje, comentario });
        setPrestamoACalificar(null);
        setPuntaje(0);
        setComentario("");
    };

    const footerDialog = (
        <div className="flex justify-content-end gap-2">
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setPrestamoACalificar(null)} />
            <Button label="Enviar calificación" icon="pi pi-check" onClick={handleConfirmarCalificacion} disabled={puntaje === 0} />
        </div>
    );

    const renderLista = (lista: Prestamo[], esPrestadoAMi: boolean) => {
        const filtrados = filtrar(lista);
        if (filtrados.length === 0) {
            return (
                <div className="prestamos-empty">
                    <i className="pi pi-book prestamos-empty__icon" />
                    <p>No se encontraron préstamos.</p>
                </div>
            );
        }
        return (
            <div className="prestamos-grid">
                {filtrados.map((p) => (
                    <PrestamoCard
                        key={p.id}
                        prestamo={p}
                        esPrestadoAMi={esPrestadoAMi}
                        onCalificar={setPrestamoACalificar}
                    />
                ))}
            </div>
        );
    };

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
                <IconField iconPosition="left" className="flex-grow-1">
                    <InputIcon className="pi pi-search" />
                        <InputText 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar por título, autor..."
                            className="w-full"
                        />
                </IconField>
            </div>

            {/* Tabs */}
            <TabView className="mis-prestamos__tabs">
                <TabPanel header="Prestados a mí">
                    {renderLista(PRESTADOS_A_MI, true)}
                </TabPanel>
                <TabPanel header="Prestados por mí">
                    {renderLista(PRESTADOS_POR_MI, false)}
                </TabPanel>
            </TabView>

            {/* Estado vacío global */}
            <div className="mis-prestamos__footer-cta">
                <i className="pi pi-book-open" style={{ fontSize: "2rem", opacity: 0.4 }} />
                <p>¿Querés leer algo nuevo?</p>
                <span>Explorá la biblioteca y solicitá libros en préstamo de otros lectores de la comunidad.</span>
                <Button label="Explorar Catálogo" icon="pi pi-compass" className="p-button-outlined mt-2" onClick={() => navigate("/")} />
            </div>

            {/* Dialog de calificación */}
            <Dialog
                header={`Calificar: ${prestamoACalificar?.libro.titulo}`}
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