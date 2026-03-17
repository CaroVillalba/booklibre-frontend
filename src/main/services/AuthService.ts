import { CRUDService } from "./CRUDService"
import type { RegistroUsuario } from "../../types/Usuario";

export class RegisterService extends CRUDService <RegistroUsuario> {
    constructor() {
        super('auth/register')
    }
}

export const registerService = new RegisterService()