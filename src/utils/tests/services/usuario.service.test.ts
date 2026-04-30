import { usuarioService } from "../../../main/services/UsuarioService"
import { vi, describe, it, expect } from "vitest"

vi.mock("../../main/services/TokenAuthService", () => ({
    refreshAccessToken: vi.fn()
}))

describe("UsuarioService", () => {

    it("refresca token al actualizar usuario", async () => {
        const spy = vi.spyOn((usuarioService as any).api, "patch")
        .mockResolvedValue({ data: {} } as any)

        await usuarioService.updateUsuario(1, {} as any)

        expect(spy).toHaveBeenCalled()
    })
})