import type { Libro } from './Libro';

export interface Reseña {
    rating: number      // Double del back → number en TS
    texto: string
    fecha: string       // ISO string, no Date
    autorNombre: string
}

export interface ReseñaPage {
    totalElements: number
    totalPages: number
    size: number
    pageNumber: number
    reseniaList: Array<Reseña>
}