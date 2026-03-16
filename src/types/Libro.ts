// import type { Reseña } from "./Reseña";
// import { Rating } from 'primereact/rating';

export interface Libro {
    id: number
    imgURL: string 
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
    duenioId: number | null
    duenioNombre: string      
}

// LibroHome refleja exactamente lo que devuelve LibroDTO del back.
// Los campos imgUrl, rating y bibliokarma no existen en el back todavía,
// por eso se marcan como opcionales.
export type LibroHome = Libro & {
    imgUrl?: string
    rating?: number
    bibliokarma?: number
}

export interface LibroDetalle extends Libro {
    imgUrl?: string
    rating?: number
    cantidadPaginas: number
    bibliokarma?: number
    imgUrl: string,
    rating: number,
    cantidadPaginas: number,
    bibliokarma: number,
}

export interface LibroUsuario{
    id?:number,
    titulo: string,
    disponible:boolean,
    fechaAgregado:string,
    autor:string,
    genero: string
}