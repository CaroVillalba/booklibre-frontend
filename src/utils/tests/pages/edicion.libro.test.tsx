import { render, screen, fireEvent } from "@testing-library/react"
import { EdicionLibro } from "../../../main/pages/EdicionLibro/EdicionLibro"
import { libroService } from "../../../main/services/LibroService"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { MainContext } from "../../../types/MainContext"

vi.mock("react-router-dom", () => ({
    useParams: () => ({}),
    useNavigate: () => vi.fn()
}))

describe("EdicionLibro", () => {

    const mockToast = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    const renderComponent = () =>
        render(
            <MainContext.Provider value={{ showToast: mockToast } as any}>
                <EdicionLibro />
            </MainContext.Provider>
        )

    it("muestra error si el formulario está vacío", async () => {
        renderComponent()

        fireEvent.click(screen.getByText("Guardar Cambios"))

        expect(mockToast).toHaveBeenCalled()
    })

    it("no llama a create si es inválido", () => {
        vi.spyOn(libroService, "create")
    
        renderComponent()
    
        fireEvent.click(screen.getByText("Guardar Cambios"))
    
        expect(libroService.create).not.toHaveBeenCalled()
    })

    it("maneja error en create", async () => {
        vi.spyOn(libroService, "create").mockRejectedValue("error")

        renderComponent()

        fireEvent.click(screen.getByText("Guardar Cambios"))

        expect(mockToast).toHaveBeenCalled()
    })
})