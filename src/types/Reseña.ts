import type { Libro } from './Libro';

export interface Reseña {
    rating: number      // Double del back → number en TS
    texto: string
    fecha: string       // ISO string, no Date
    autorNombre: string
}