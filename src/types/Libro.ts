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

export interface LibroHome {
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