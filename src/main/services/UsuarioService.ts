import { CRUDService } from "./CRUDService"
import type { Usuario } from "../../types/Usuario"


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

}