// services/ReservaService.ts

import type { Reserva } from "../../types/Reserva";
import type { MisPrestamosResponse } from "../../types/Prestamo";
import { CRUDService } from "./CRUDService";
import { loginService } from "./AuthService";

export class ReservaService extends CRUDService<Reserva> {
    constructor() {
        super('reservas')
    }

    async postReserva(reserva: Reserva): Promise<void> {
        const payload = {
            idLibro: reserva.idLibro,
            idLector: reserva.idLector,
            fechaDesde: reserva.fechaDesde,
            fechaHasta: reserva.fechaHasta,
        }
        await this.api.post(`/${this.path}`, payload)
    }

    async misPrestamos(): Promise<MisPrestamosResponse> {
        const userId = loginService.getLoggedUser()  
        
        const response = await this.api.get<MisPrestamosResponse>(
            `/${this.path}/mis-prestamos`,
            { params: { usuarioId: userId } }
        )
        return response.data
    }

    async agregarReseña(reservaId: number, rating: number, texto: string): Promise<void> {
        const userId = loginService.getLoggedUser()  
        
        await this.api.post(
            `/${this.path}/${reservaId}/reseña`,
            {
                rating,
                texto,
                fecha: new Date().toISOString(),
                autorNombre: "Usuario" // TODO: esto es temporal
            },
            { params: { autorId: userId } }
        )
    }
}

export const reservaService = new ReservaService()