import { reseniaService } from "../../../main/services/ReseniaService"
import { vi, describe, it, expect, beforeEach } from "vitest"

describe("ReseniaService", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("getReseniasPorLibro llama endpoint correcto", async () => {
        const spy = vi.spyOn((reseniaService as any).api, "get")
            .mockResolvedValue({ data: {} } as any)

        await reseniaService.getReseniasPorLibro(1, 2)

        expect(spy).toHaveBeenCalledWith(
            "/libros/1/reseñas/2"
        )
    })

    it("getReseniasViewDetalleLibro llama endpoint correcto", async () => {
        const spy = vi.spyOn((reseniaService as any).api, "get")
            .mockResolvedValue({ data: {} } as any)

        await reseniaService.getReseniasViewDetalleLibro(1)

        expect(spy).toHaveBeenCalledWith(
            "/libros/1/reseñasViewDetalles"
        )
    })
})