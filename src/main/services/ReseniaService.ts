import { CRUDService } from "./CRUDService";
import type { Resenia, ReseniaPage } from "../../types/Resenia";

export class ReseniaService extends CRUDService<Resenia> {
    constructor() {
        super('libros')
    }

    // Las reseñas viven dentro de Reserva y se exponen via GET /v1/libros/{id}/reseñas
    async getReseniasPorLibro(libroId: number, pagina: number): Promise<ReseniaPage> {
        const response = await this.api.get<ReseniaPage>(`/${this.path}/${libroId}/reseñas/${pagina}`)
        return response.data
    }

    async getReseniasViewDetalleLibro(libroId: number): Promise<ReseniaPage> {
        const response = await this.api.get<ReseniaPage>(`/${this.path}/${libroId}/reseñasViewDetalles`)
        return response.data
    }
}

export const reseniaService = new ReseniaService()