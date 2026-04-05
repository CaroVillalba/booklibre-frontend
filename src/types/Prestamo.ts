// types/Prestamo.ts

export type EstadoPrestamo = "ACTIVO" | "PROXIMO_A_VENCER" | "DEVUELTO";

export interface Prestamo {
    id: number;
    tituloLibro: string;
    autorLibro: string;
    imgUrlLibro: string;
    ratingLibro: number | null;
    bibliokarma: number;
    otroUsuario: string;
    fechaDesde: string;
    fechaHasta: string;
    estado: EstadoPrestamo;
    calificacion?: number | null;
}

export interface MisPrestamosResponse {
    prestadosAMi: Prestamo[];
    prestadosPorMi: Prestamo[];
}