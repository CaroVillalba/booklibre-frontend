export interface Libro {
    id: number
    imgUrl?: string
    titulo: string
    tipo: string
    descripcion: string
    genero: string
    autor: string
    cantidadPaginas: number | null //idem abajo
    isbn13: string
    idioma: string
    editorial: string
    fechaPublicacion: Date | null //TODO: ¿Por qué esto es NULL si es una info estática? Es solamente la fecha en que se publicó el libro, no la fecha en que se agregó a la plataforma. Debería ser siempre una fecha válida, no null. Revisar esto después.
    estado: string
    duenioId: number | null
    duenioNombre: string      
}

// LibroHome refleja exactamente lo que devuelve LibroDTO del back.
// imgUrl y rating se marcan opcionales porque el back aún no los implementa.
export type LibroHome = Libro & {
    rating?: number | null  // null cuando el libro no tiene reseñas
    bibliokarma: number
}

export interface LibroUsuario{
    id?:number,
    titulo: string,
    disponible:boolean,
    imgUrl: string,
    fechaAgregado:string,
    autor:string,
    genero: string
}

export interface LibroForm  {
    id?: number
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
}