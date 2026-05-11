import { CRUDService } from "./CRUDService"
import { refreshAccessToken } from "./TokenAuthService"
import type { LibroUsuario } from "../../types/Libro"
import type { PageDTO } from "../../types/PageDTO"
import type { Usuario, UsuarioUpdateRequest } from "../../types/Usuario"

class UsuarioService extends CRUDService<Usuario> {
    constructor() {
        super("usuario")
    }

    async getUsuario(): Promise<Usuario[]> {
        const response = await this.api.get<Usuario[]>(`/${this.path}`)
        return response.data;
    }

    async getUsuarioPorId(id: number): Promise<Usuario> {
        const response = await this.api.get<Usuario>(`/${this.path}/${id}`)
        return response.data;
    }

    async updateUsuario(id:number, payload:UsuarioUpdateRequest):Promise<Usuario>{
        const response = await this.api.patch(`/usuario/${id}`, payload)
        try {
            await refreshAccessToken() // Esto actualiza el localStorage y el snapshot
        } catch (error) {
            console.error("Error al refrescar el token tras cambio de rol", error)
        }
        return response.data
    }

    async getLibrosDeUsuario(
        usuarioId: number,
        page: number,
        size: number,
        sortBy: string,
        direction: string,
        estado: string,
    ): Promise<PageDTO<LibroUsuario>> {
        const response = await this.api.get<PageDTO<LibroUsuario>>(
            `/usuario/${usuarioId}/libros`,
            {
                params: {
                    page,
                    size,
                    sortBy,
                    direction,
                    estado,
                },
            },
        );
        return response.data
    }
}

export const usuarioService = new UsuarioService()
