import type { LibroHome, LibroForm } from '../../types/Libro'
import { CRUDService } from './CRUDService'
import { loginService } from './AuthService'

export interface LibroSearchParams {
    titulo?: string
    generos?: string[]
    paginasMin?: number
    paginasMax?: number
    isbn?: string
    desde: string
    hasta: string
    prestadoPorUsuario?: string
    page?: number
    size?: number
    sortBy?: string
    direction?: string
}

export interface LibroDetalleParams {
    desde: string
    hasta: string
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
        const userId = loginService.getLoggedUser()  

        const response = await this.api.post<PageResponse<LibroHome>>(
            `/libros/busqueda?userId=${userId}`,  
            params
        )
        return response.data
    }

    async getLibroPorId(id: string, params: LibroDetalleParams): Promise<LibroHome> {
        const userId = loginService.getLoggedUser()  

        const response = await this.api.get<LibroHome>(
            `/libros/detalle-libro/${id}?userId=${userId}`,  
            { params }
        )
        return response.data
    }

    async getLibroParaEdicion(id: string): Promise<LibroForm> {
        const userId = loginService.getLoggedUser()
        
        const response = await this.api.get<LibroForm>(
            `/libros/${id}/edicion?userId=${userId}`
        )
        return response.data
    }

    async create(libro: LibroForm): Promise<void> {
        const data = {
            ...libro,
            fechaPublicacion: libro.fechaPublicacion
                ? libro.fechaPublicacion.toISOString().split("T")[0]
                : null
        }

        const userId = loginService.getLoggedUser()  

        await this.api.post(`/libros?userId=${userId}`, data)  
    }

    async eliminarLibro(id: string): Promise<void>{
        await this.api.delete(`/libros/${id}`)
    }
}

export const libroService = new LibroService()