import type { Reseña } from "../../types/Reseña";
import { CRUDService } from "./CRUDService";

export class ReseñaService extends CRUDService<Reseña> {
    constructor() {
        super('libros')
    }

    // Las reseñas viven dentro de Reserva y se exponen via GET /v1/libros/{id}/reseñas
    async getReseñasPorLibro(libroId: number): Promise<Reseña[]> {
        const response = await this.api.get<Reseña[]>(`/${this.path}/${libroId}/reseñas`)
        return response.data
    }
}

export const reseñaService = new ReseñaService()