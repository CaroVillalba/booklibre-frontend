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
    duenioId: number | null
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
}