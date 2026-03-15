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
}

export const usuarioService = new UsuarioService()