import type { LibroHome, LibroForm } from '../../types/Libro'
import { CRUDService } from './CRUDService'

export interface LibroSearchParams {
    titulo?: string
    generos?: string       // CSV: "DRAMA,ROMANCE"
    paginasMin?: number
    paginasMax?: number
    isbn?: string
    desde: string          // ISO date: "2025-01-01"
    hasta: string          // ISO date: "2025-12-31"
    prestadoPorUsuario?: string
}

export interface LibroDetalleParams {
    desde: string          // ISO date: "2025-01-01"
    hasta: string          // ISO date: "2025-12-31"
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

    async search(params: LibroSearchParams): Promise<LibroHome[]> {
        const response = await this.api.get<LibroHome[]>('/libros', { params })
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
}

export const libroService = new LibroService()