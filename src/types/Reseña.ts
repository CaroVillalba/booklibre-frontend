import type { Libro } from './Libro';

export interface Reseña {
    id: number //id del comentario
    puntaje: number //stars
    texto: string //mensaje
    fecha: Date //localdate
    autor: string //nombre del autor
    libro: number //id del libro
}