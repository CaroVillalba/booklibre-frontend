import type { Libro } from './Libro';

export interface Reseña {
    puntaje: number
    texto: string
    fecha: Date
    autor: string
    libro: Libro
}