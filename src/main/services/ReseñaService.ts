import type { Reseña } from "../../types/Reseña";
import { CRUDService } from "./CRUDService";

export class ReseñaService extends CRUDService<Reseña> {
    constructor() {
        super('comments')
    }

    async getReseñasPorLibro(libroId: number): Promise<Reseña[]> {
        const response = await this.api.get<Reseña[]>(`${this.path}/libro/${libroId}`)
        return response.data
    }
}

export const reseñaService = new ReseñaService()