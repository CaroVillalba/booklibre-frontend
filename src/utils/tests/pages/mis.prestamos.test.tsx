import { render, waitFor } from "@testing-library/react"
import { MisPrestamos } from "../../../main/pages/Prestamos/DetallePrestamos"
import { reservaService } from "../../../main/services/ReservaService"
import { usuarioService } from "../../../main/services/UsuarioService"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { MainContext } from "../../../types/MainContext"

vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn()
}))

describe("MisPrestamos", () => {

    const mockToast = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const renderComponent = () =>
        render(
            <MainContext.Provider value={{ showToast: mockToast } as any}>
                <MisPrestamos />
            </MainContext.Provider>
        )

    it("carga préstamos correctamente", async () => {
        vi.spyOn(usuarioService, "getUsuarioPorId").mockResolvedValue({
            id: 1,
            tipoUsuario: "LECTOR"
        } as any)

        vi.spyOn(reservaService, "misPrestamos").mockResolvedValue({
            content: [],
            totalElements: 0,
            totalPages: 0,
            page: 0,
            size: 0
        })

        renderComponent()

        await waitFor(() => {
            expect(reservaService.misPrestamos).toHaveBeenCalled()
        })
    })

    it("muestra error si falla", async () => {
        vi.spyOn(usuarioService, "getUsuarioPorId").mockResolvedValue({
            id: 1,
            tipoUsuario: "LECTOR"
        } as any)

        vi.spyOn(reservaService, "misPrestamos").mockRejectedValue(new Error())

        renderComponent()

        await waitFor(() => {
            expect(mockToast).toHaveBeenCalled()
        })
    })
})