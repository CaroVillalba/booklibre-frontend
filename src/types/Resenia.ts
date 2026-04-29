export interface Resenia {
    rating: number      // Double del back → number en TS
    texto: string
    fecha: string       // ISO string, no Date
    autorNombre: string
}

export interface ReseniaPage {
    totalElements: number
    totalPages: number
    size: number
    pageNumber: number
    reseniaList: Array<Resenia>
}