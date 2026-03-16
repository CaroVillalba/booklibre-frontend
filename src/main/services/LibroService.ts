import type { LibroHome } from '../../types/Libro'
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

export class LibroService extends CRUDService<LibroHome> {

    constructor() {
        super('libros')
    }

    async update(libro: LibroHome): Promise<void> {
        if (!libro.id) {
            throw new Error('El libro debe tener id para actualizarse')
        }
        await this.api.put(`/libros/${libro.id}`, libro)
    }

    async search(params: LibroSearchParams): Promise<LibroHome[]> {
        const response = await this.api.get<LibroHome[]>('/libros', { params })
        return response.data
    }

    async getLibroPorId(id: number): Promise<LibroHome> {
        const response = await this.api.get<LibroHome>(`/libros/detalle-libro/${id}`)
        return response.data
    }

}

export const libroService = new LibroService()