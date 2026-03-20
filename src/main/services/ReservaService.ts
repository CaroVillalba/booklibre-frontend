// services/ReservaService.ts

import type { Reserva } from "../../types/Reserva";
import type { MisPrestamosResponse } from "../../types/Prestamo";
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
            fechaHasta: reserva.fechaHasta,
        }
        await this.api.post(`/${this.path}`, payload)
    }

    async misPrestamos(usuarioId: number): Promise<MisPrestamosResponse> {
        const response = await this.api.get<MisPrestamosResponse>(
            `/${this.path}/mis-prestamos`,
            { params: { usuarioId } }
        )
        return response.data
    }
}

export const reservaService = new ReservaService()