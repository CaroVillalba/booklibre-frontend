
import type { LibroUsuario } from "../../types/Libro";
import type { PageDTO } from "../../types/PageDTO";
import type {Usuario, UsuarioEstadisticasDTO} from "../../types/Usuario";
import { CRUDService } from "./CRUDService";


class UsuarioService extends CRUDService<Usuario> {
    constructor(){
        super('usuario')
    }

    async getUsuario(): Promise<Usuario[]> {
        const response = await this.api.get<Usuario[]>(`/${this.path}`)
        return response.data
    }



    async getUsuarioPorId(id: number): Promise<Usuario> {
        const response = await this.api.get<Usuario>(`/${this.path}/${id}`)
        return response.data
    }

    async updateUsuario(usuario: Usuario): Promise<void> {
        const payload = {
            nombre: usuario.nombre,
            descripcion: usuario.descripcion,
            email: usuario.email,
            celular: usuario.celular,
            ciudad: usuario.ciudad,
            tipoUsuario: usuario.tipoUsuario,
        }

        await this.api.patch(`/usuario/${usuario.id}`, payload)

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

