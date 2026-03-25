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
        const userId = loginService.getLoggedUser()  // ← Obtener userId del sessionStorage

        const response = await this.api.post<PageResponse<LibroHome>>(
            `/libros/busqueda?userId=${userId}`,  // ← Enviar userId como query param
            params
        )
        return response.data
    }

    async getLibroPorId(id: number, params: LibroDetalleParams): Promise<LibroHome> {
        const userId = loginService.getLoggedUser()  // ← Obtener userId del sessionStorage

        const response = await this.api.get<LibroHome>(
            `/libros/detalle-libro/${id}?userId=${userId}`,  // ← Enviar userId
            { params }
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

        const userId = loginService.getLoggedUser()  // ← Obtener userId del sessionStorage

        await this.api.post(`/libros?userId=${userId}`, data)  // ← Enviar userId
    }
}

export const libroService = new LibroService()