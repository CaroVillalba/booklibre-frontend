import { CRUDService } from "./CRUDService"
import type { RegistroUsuario } from "../../types/Usuario";
import type { AxiosInstance } from "axios";
import axios from 'axios'
import type { LoginUsuario } from "../../types/Usuario"
import { setTokens, getUserIdFromToken, clearTokens } from "./TokenService"
import { httpRequest } from '../../utils/common'
import type { LoginResponse } from "../../types/Auth"

export class RegisterService extends CRUDService <RegistroUsuario> {
    constructor() {
        super('auth/register')
    }
}

export class LoginService {
    protected api: AxiosInstance
    protected path
    protected apiRoot = 'http://localhost:9000/v1'

    constructor() {
        this.path = "v1/auth/login"
        this.api = axios.create({
            baseURL: this.apiRoot,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    async login(loginDto: LoginUsuario): Promise<void> {
        console.log('Login DTO:', loginDto) // Debug: Verificar el contenido del DTO
        const response = await httpRequest<LoginResponse>({
            method: 'POST',
            url: `${this.apiRoot}/auth/login`,
            data: loginDto
        })
        const { accessToken, refreshToken } = response
        setTokens(accessToken, refreshToken)
    }

    logout() {
        clearTokens()
    }

    getLoggedUser(): number | null {
        return getUserIdFromToken() 
    }
}

export const registerService = new RegisterService()
export const loginService = new LoginService()