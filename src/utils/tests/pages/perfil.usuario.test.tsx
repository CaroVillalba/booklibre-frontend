import { render, screen } from "@testing-library/react"
import { PerfilUsuario } from "../../../main/pages/PerfilUsuario/PerfilUsuario"
import { usuarioService } from "../../../main/services/UsuarioService"
import { loginService } from "../../../main/services/AuthService"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { MainContext } from "../../../types/MainContext"
import { waitFor } from "@testing-library/react"

vi.mock("../../../main/components/UsuarioHeader", () => ({
    UsuarioHeader: () => <div>Header</div>
}))
vi.mock("../../../main/components/UsuarioDatos", () => ({
    UsuarioDatos: () => <div>Datos</div>
}))
vi.mock("../../../main/components/UsuarioEstadisticas", () => ({
    UsuarioEstadisticas: () => <div>Stats</div>
}))
vi.mock("../../../main/components/UsuarioLibros", () => ({
    UsuarioLibros: () => <div>Libros</div>
}))
vi.mock("../../../main/components/MensajePublicador", () => ({
    MensajePublicador: () => <div>Mensaje</div>
}))
vi.mock("../../../main/components/ModalEditarPerfil", () => ({
    ModalEditarPerfil: () => <div>Modal</div>
}))

describe("PerfilUsuario", () => {

    const mockToast = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const renderComponent = () =>
        render(
            <MainContext.Provider value={{ showToast: mockToast } as any}>
                <PerfilUsuario />
            </MainContext.Provider>
        )

    it("carga usuario correctamente", async () => {
        vi.spyOn(loginService, "getLoggedUser").mockReturnValue(1)

        vi.spyOn(usuarioService, "getById").mockResolvedValue({
            id: 1,
            nombre: "Test",
            email: "test@mail.com",
            tipoUsuario: "LECTOR",
            librosLeidos: 0,
            librosPrestados: 0
        } as any)

        renderComponent()

        expect(await screen.findByText("Header")).toBeInTheDocument()
    })

    it("muestra error si falla", async () => {
        vi.spyOn(loginService, "getLoggedUser").mockReturnValue(1)
    
        vi.spyOn(usuarioService, "getById").mockRejectedValue({
            response: {
                data: { message: "Error backend" }
            }
        })
    
        renderComponent()
    
        await waitFor(() => {
            expect(mockToast).toHaveBeenCalled()
        })
    })
})