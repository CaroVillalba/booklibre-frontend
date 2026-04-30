import { CRUDService } from "./CRUDService";
import type { Resenia, ReseniaPage } from "../../types/Resenia";

export class ReseniaService extends CRUDService<Resenia> {
    constructor() {
        super('libros')
    }

    // Las reseñas viven dentro de Reserva y se exponen via GET /v1/libros/{id}/resenias
    async getReseniasPorLibro(libroId: number, pagina: number): Promise<ReseniaPage> {
        const response = await this.api.get<ReseniaPage>(`/${this.path}/${libroId}/resenias/${pagina}`)
        return response.data
    }
}

export const reseniaService = new ReseniaService()