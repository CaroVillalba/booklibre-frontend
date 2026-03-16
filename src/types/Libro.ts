import type { Reseña } from "./Reseña";
import { Rating } from 'primereact/rating';

export interface Libro {
    id: number
    titulo: string
    tipo: string
    descripcion: string
    genero: string
    autor: string
    cantidadPaginas: number
    isbn13: string
    idioma: string
    editorial: string
    fechaPublicacion: string
    estado: string
}

export interface LibroHome extends Partial<Libro> {
    imgUrl: string
    genero: string
    rating: number
    titulo: string
    autor: string
    cantidadPaginas: number
    isbn13: string
    idioma: string
    tipo: string
    bibliokarma: number
    estado: string
}

export interface LibroDetalle extends Libro {
    imgUrl: string,
    rating: number,
    cantidadPaginas: number,
    bibliokarma: number,
}