import type { Reseña } from "../../types/Reseña";
import { CRUDService } from "./CRUDService";
import type { ReseñaPage } from "../../types/Reseña";

export class ReseñaService extends CRUDService<Reseña> {
    constructor() {
        super('libros')
    }

    // Las reseñas viven dentro de Reserva y se exponen via GET /v1/libros/{id}/reseñas
    async getReseñasPorLibro(libroId: number, pagina: number): Promise<ReseñaPage> {
        const response = await this.api.get<ReseñaPage>(`/${this.path}/${libroId}/reseñas/${pagina}`)
        return response.data
    }

    async getReseñasViewDetalleLibro(libroId: number): Promise<ReseñaPage> {
        const response = await this.api.get<ReseñaPage>(`/${this.path}/${libroId}/reseñasViewDetalles`)
        return response.data
    }
}

export const reseñaService = new ReseñaService()