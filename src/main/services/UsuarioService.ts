import type { LibroUsuario } from "../../types/Libro";
import type { PageDTO } from "../../types/PageDTO";
import type {Usuario, UsuarioEstadisticasDTO} from "../../types/Usuario";
import { CRUDService } from "./CRUDService";

export class UsuarioService extends CRUDService<Usuario>{

    constructor(){
        super('users')
    }

    async getEstadisticas(id:number): Promise<UsuarioEstadisticasDTO>{
        const response = await this.api.get<UsuarioEstadisticasDTO>(`/users/${id}/estadisticas`)
        return response.data
    }

    async getLibrosDeUsuario(
        usuarioId: number,
        page: number,
        size: number,
        sortBy: string,
        direction: string,
        estado:string
    ): Promise<PageDTO<LibroUsuario>>{
        const response = await this.api.get<PageDTO<LibroUsuario>>(
            `/users/${usuarioId}/libros`,
            {
                params:{
                    page,
                    size,
                    sortBy,
                    direction,
                    estado
                }
            }
        )
        return response.data
    }
}

export const usuarioService = new UsuarioService()