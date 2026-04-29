import { CRUDService } from "./CRUDService";
import { loginService } from "./AuthService";
import type { Reserva } from "../../types/Reserva";
import type { PrestamosPaginados, TipoPrestamo } from "../../types/Prestamo";

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

    async misPrestamos(
        tipo: TipoPrestamo,
        busqueda: string = "",
        page: number = 0,
        size: number = 4
    ): Promise<PrestamosPaginados> {
        const userId = loginService.getLoggedUser()
        
        const response = await this.api.get<PrestamosPaginados>(
            `/${this.path}/mis-prestamos`,
            {
                params: {
                    usuarioId: userId,
                    tipo,
                    busqueda,
                    page,
                    size,
                    sortBy: "fechaDesde",
                    direction: "desc"
                }
            }
        )
        return response.data
    }

    async agregarResenia(reservaId: number, rating: number, texto: string): Promise<void> {
        const userId = loginService.getLoggedUser()
        
        await this.api.post(
            `/${this.path}/${reservaId}/reseña`,
            {
                rating,
                texto,
                fecha: new Date().toISOString(),
                autorNombre: "Usuario"
            },
            { params: { autorId: userId } }
        )
    }
}

export const reservaService = new ReservaService()