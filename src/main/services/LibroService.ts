import type { LibroHome, LibroForm } from '../../types/Libro'
import { CRUDService } from './CRUDService'

export interface LibroSearchParams {
    titulo?: string
    generos?: string[]     // Array de géneros: ["DRAMA", "ROMANCE"]
    paginasMin?: number
    paginasMax?: number
    isbn?: string
    desde: string          // ISO date: "2025-01-01"
    hasta: string          // ISO date: "2025-12-31"
    prestadoPorUsuario?: string
    page?: number          // Página actual (default: 0)
    size?: number          // Tamaño de página (default: 6)
    sortBy?: string        // Campo de ordenamiento (default: "titulo")
    direction?: string     // Dirección (default: "asc")
}

export interface LibroDetalleParams {
    desde: string          // ISO date: "2025-01-01"
    hasta: string          // ISO date: "2025-12-31"
}

export interface PageResponse<T> {
    content: T[]
    page: number
    size: number
    totalElements: number
    totalPages: number
}

export class LibroService extends CRUDService<LibroHome> {

    constructor() {
        super('libros')
    }

    async update(libro: LibroForm): Promise<void> {
        if (!libro.id) {
            throw new Error('El libro debe tener id para actualizarse')
        }

        const data = {
            ...libro,
            fechaPublicacion: libro.fechaPublicacion
                ? libro.fechaPublicacion.toISOString().split("T")[0]
                : null
        }

        await this.api.patch(`/libros/${libro.id}`, data)
    }

    async search(params: LibroSearchParams): Promise<PageResponse<LibroHome>> {
        const response = await this.api.post<PageResponse<LibroHome>>('/libros/busqueda', params)
        return response.data
    }

    async getLibroPorId(id: number, params: LibroDetalleParams ): Promise<LibroHome> {
        const response = await this.api.get<LibroHome>(`/libros/detalle-libro/${id}`, { params })
        return response.data
    }

    async create(libro: LibroForm): Promise<void> {
        const data = {
            ...libro,
            fechaPublicacion: libro.fechaPublicacion
                ? libro.fechaPublicacion.toISOString().split("T")[0]
                : null
        }

        const duenioId = 1 // TODO: Reemplazar con el ID del usuario autenticado

        await this.api.post(`/libros?duenioId=${duenioId}`, data)
    }

    async eliminarLibro(id:number): Promise<void>{
        await this.api.delete(`/libros/${id}`)
    }
}

export const libroService = new LibroService()