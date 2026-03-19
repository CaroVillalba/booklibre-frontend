import { CRUDService } from "./CRUDService"
import type { RegistroUsuario } from "../../types/Usuario";
import type { AxiosInstance } from "axios";
import axios from 'axios'
import type { LoginUsuario } from "../../types/Usuario";


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

    //La funcion devuelve el sessionId como una cookie
    async login(loginDto: LoginUsuario) {
        /*
        const res = await axios.post(`/${this.path}`, {
            loginDto
        }, {
            withCredentials: true
        })*/

        const res = await axios.post(`http://localhost:9000/v1/auth/login`, loginDto, {
            withCredentials: true
        })

    }
}

export const registerService = new RegisterService()
export const loginService = new LoginService()