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

    // POST /v1/reservas/{id}/reseña?autorId={autorId}
    // autorId es temporal hasta que auth esté implementado
    async agregarReseña(reservaId: number, rating: number, texto: string, autorId: number): Promise<void> {
    await this.api.post(
        `/${this.path}/${reservaId}/reseña`,
        {
            rating,
            texto,
            fecha: new Date().toISOString(),
            autorNombre: "Usuario" // TODO: esto es temporal
        },
        { params: { autorId } }
    )
}
}

export const reservaService = new ReservaService()