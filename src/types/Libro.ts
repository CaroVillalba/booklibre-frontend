export interface Libro {
    id: number
    imgUrl?: string
    titulo: string
    tipo: string
    descripcion: string
    genero: string
    autor: string
    cantidadPaginas: number | null
    isbn13: string
    idioma: string
    editorial: string
    fechaPublicacion: Date | null
    estado: string
    duenioId: number | null
    duenioNombre: string      
}

// LibroHome refleja exactamente lo que devuelve LibroDTO del back.
// imgUrl y rating se marcan opcionales porque el back aún no los implementa.
export type LibroHome = Libro & {
    rating?: number
    bibliokarma: number
}

export interface LibroUsuario{
    id?:number,
    titulo: string,
    disponible:boolean,
    fechaAgregado:string,
    autor:string,
    genero: string
}
