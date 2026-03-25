import { CRUDService } from "./CRUDService"
import type { RegistroUsuario } from "../../types/Usuario";
import type { AxiosInstance } from "axios";
import axios from 'axios'
import type { LoginUsuario } from "../../types/Usuario";
import { UserNotLoggedIn } from "../exceptions/exceptions"


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
    async login(loginDto: LoginUsuario): Promise<Number> {
        const res = await axios.get(
            `http://localhost:9000/v1/auth/login?email=${
                loginDto.email}&pw=${
                loginDto.password}&rememberMe=${
                loginDto.rememberMe}`)
        
        //res devuelve el user id
        if (res) {
            sessionStorage.setItem("SESSION_USER_ID", res.data) //Guarda el user id como cookie
        }

        return Number(res.data) //devuelve el user id
    }

    logout() {
        sessionStorage.removeItem("SESSION_USER_ID")
    }

    getLoggedUser(): number {
        let userId: String | null = sessionStorage.getItem("SESSION_USER_ID")
        
        if (userId == null)
            throw new UserNotLoggedIn()

        return Number(userId)   
    }

    checkLoggedIn(): Boolean {
        let userId: String | null = sessionStorage.getItem("SESSION_USER_ID")
        
        return userId != null
    }
}

export const registerService = new RegisterService()
export const loginService = new LoginService()