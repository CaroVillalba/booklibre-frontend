import type { Reserva } from "../../types/Reserva";
import { CRUDService } from "./CRUDService";



export class ReservaService extends CRUDService<Reserva> {
    constructor() {
        super('reservas')
    }

    async postReserva(reserva: Reserva): Promise<void> {
        const payload = {
            tituloLibro: reserva.tituloLibro,
            nombreLector: reserva.nombreLector,
            fechaDesde: reserva.fechaDesde,
            fechaHasta: reserva.fechaHasta
        }
        await this.api.post(`/${this.path}`, payload)

    }
}

export const reservaService = new ReservaService()