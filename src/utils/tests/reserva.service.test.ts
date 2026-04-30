import { reservaService } from "../../main/services/ReservaService"
import { loginService } from "../../main/services/AuthService"
import { vi, describe, it, expect, beforeEach } from "vitest"

describe("ReservaService", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("postReserva envía el payload correcto", async () => {
        const postSpy = vi.spyOn((reservaService as any).api, "post")
            .mockResolvedValue({} as any)

        const reserva = {
            idLibro: 1,
            idLector: 2,
            fechaDesde: "2024-01-01",
            fechaHasta: "2024-01-10"
        } as any

        await reservaService.postReserva(reserva)

        expect(postSpy).toHaveBeenCalledWith(
            "/reservas",
            {
                idLibro: 1,
                idLector: 2,
                fechaDesde: "2024-01-01",
                fechaHasta: "2024-01-10"
            }
        )
    })

    it("misPrestamos usa userId y params", async () => {
        vi.spyOn(loginService, "getLoggedUser").mockReturnValue(5)
    
        const spy = vi.spyOn((reservaService as any).api, "get")
            .mockResolvedValue({ data: {} } as any)
    
        await reservaService.misPrestamos("PRESTADOS_A_MI", "harry", 1, 10)
    
        const [url, config] = spy.mock.calls[0]
    
        expect(url).toBe("/reservas/mis-prestamos")
    
        expect(config.params).toMatchObject({
            usuarioId: 5,
            tipo: "PRESTADOS_A_MI",
            busqueda: "harry",
            page: 1,
            size: 10
        })
    })

    it("agregarResenia envía datos correctos", async () => {
        vi.spyOn(loginService, "getLoggedUser").mockReturnValue(3)

        const spy = vi.spyOn((reservaService as any).api, "post")
            .mockResolvedValue({} as any)

        await reservaService.agregarResenia(10, 4, "Muy bueno")

        expect(spy).toHaveBeenCalledWith(
            "/reservas/10/reseña",
            expect.objectContaining({
                rating: 4,
                texto: "Muy bueno",
                autorNombre: "Usuario"
            }),
            {
                params: { autorId: 3 }
            }
        )
    })
})