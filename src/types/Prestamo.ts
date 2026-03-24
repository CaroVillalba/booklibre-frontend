// types/Prestamo.ts

export type EstadoPrestamo = "ACTIVO" | "PROXIMO_A_VENCER" | "DEVUELTO";

export interface Prestamo {
    id: number;
    // — Libro —
    tituloLibro: string;
    autorLibro: string;
    imgUrlLibro: string;
    ratingLibro: number | null; // null cuando el libro no tiene reseñas
    bibliokarma: number;
    // — Otro usuario —
    otroUsuario: string;
    // — Fechas (ISO string desde el back) —
    fechaDesde: string;
    fechaHasta: string;
    // — Estado calculado en el back —
    estado: EstadoPrestamo;
    // — Calificación existente (si ya fue calificado) —
    calificacion?: number | null;
}

export interface MisPrestamosResponse {
    prestadosAMi: Prestamo[];
    prestadosPorMi: Prestamo[];
}