import type { Libro, LibroDetalle } from '../../types/Libro'
import { CRUDService } from './CRUDService'

export class LibroService extends CRUDService<Libro> {

    constructor() {
        super('libros')
    }

    async update(libro: Libro): Promise<void> {
        if (!libro.id) {
            throw new Error('El libro debe tener id para actualizarse')
        }
    
        await this.api.put(`/libros/${libro.id}`, libro)
    }

    async search(filters: {
        titulo?: string
        generos?: string[]
        paginasMin?: number
        paginasMax?: number
        isbn?: string
        prestadoPorUsuario?: string
        desde: string
        hasta: string
    }): Promise<Libro[]> {
    
        const response = await this.api.get(`/libros`, {
            params: filters
        })
    
        return response.data
    }

    async getLibroPorId(id: number): Promise<LibroDetalle> {
        const response = await this.api.get<LibroDetalle>(`/detalle-libro/${id}`)
        return response.data
    }

}

export const libroService = new LibroService()