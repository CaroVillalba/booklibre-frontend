import type { Reseña } from "../../types/Reseña";
import { CRUDService } from "./CRUDService";

export class ReseñaService extends CRUDService<Reseña> {
    constructor() {
        super('reseñas')
    }

    async getReseñasPorLibro(libroId: number): Promise<Reseña[]> {
        const response = await this.api.get<Reseña[]>(`detalle-libro/${libroId}`)
        return response.data
    }
}