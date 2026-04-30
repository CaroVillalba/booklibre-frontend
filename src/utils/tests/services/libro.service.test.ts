import { libroService } from "../../../main/services/LibroService"
import { loginService } from "../../../main/services/AuthService"
import { vi, describe, it, expect, beforeEach } from "vitest"

describe("LibroService", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("lanza error si update no tiene id", async () => {
        await expect(libroService.update({} as any))
            .rejects
            .toThrow("id")
    })

    it("usa userId en search", async () => {
        vi.spyOn(loginService, "getLoggedUser").mockReturnValue(10)

        const spy = vi
            .spyOn((libroService as any).api, "post")
            .mockResolvedValue({ data: {} })

        await libroService.search({} as any)

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining("userId=10"),
            expect.anything()
        )
    })

    it("formatea fecha en create", async () => {
        const spy = vi
            .spyOn((libroService as any).api, "post")
            .mockResolvedValue({})

        await libroService.create({
            id: 1,
            titulo: "Test",
            fechaPublicacion: new Date("2024-01-01")
        } as any)

        expect(spy).toHaveBeenCalled()

        // 💡 opcional: verificar formato de fecha
        const callArgs = spy.mock.calls[0][1]
        expect(callArgs.fechaPublicacion).toBe("2024-01-01")
    })
})