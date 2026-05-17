import axios from 'axios'
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { clearTokens, getAccessToken } from './TokenService'
import { refreshAccessToken } from './TokenAuthService'

export interface InterfaceService<T> {
    getAll(): Promise<T[]>;
    getById(id: number | string): Promise<T>;
    create(item: T): Promise<void>;
    update(item: T): Promise<void>;
    deleteItem(id: number | string): Promise<void>;
}

type RetryableRequest = InternalAxiosRequestConfig & {
    _retry?: boolean
}

let isRefreshing = false

let failedQueue: Array<{
    resolve: (token:string) => void
    reject: (error: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null=null){
    failedQueue.forEach((promise)=>{
        if(error){
            promise.reject(error)
        }else if(token){
            promise.resolve(token)
        }
    })
    failedQueue = []
}

export abstract class CRUDService<T, F = undefined> implements InterfaceService<T> {
    protected api: AxiosInstance
    protected apiRoot = import.meta.env.VITE_API_URL || 'http://localhost:9000/v1'
    protected path: string

    constructor(path: string) {
        this.path = path
        this.api = axios.create({
            baseURL: this.apiRoot,
            headers: { 'Content-Type': 'application/json' },
        })
        // solución temporal hasta agregar jwt
        this.api.interceptors.request.use((config) => {
            const token = getAccessToken()
    
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
    
            return config
        })

        this.api.interceptors.response.use(
            (response)=> response,
            async (error: AxiosError)=>{
                const originalRequest =error.config as RetryableRequest

                const status = error.response?.status
                const data = error.response?.data as {message?: string, error?:string}

                const tokenVencido = 
                status === 401 &&
            (
                data?.message?.toLowerCase().includes('vencida') ||
                data?.error ?.toLowerCase().includes('expired')
            )

                if (!tokenVencido || originalRequest._retry){
                    return Promise.reject(error)
                }

                originalRequest._retry = true

                if (isRefreshing){
                    return new Promise((resolve,reject)=>{
                        failedQueue.push({
                            resolve:(token:string)=>{
                                originalRequest.headers.Authorization = `Bearer ${token}`
                                resolve(this.api(originalRequest))
                            },
                            reject
                        })
                    })
                }

                isRefreshing = true

                try{
                    const newAccessToken = await refreshAccessToken()

                    processQueue(null,newAccessToken)

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                    return this.api(originalRequest)
                } catch (refreshError) {
                    processQueue(refreshError, null)
                    clearTokens(true)  // ← CAMBIÁ ESTO: pasale true para indicar que es por sesión expirada
                    return Promise.reject(refreshError)
                } finally {
                    isRefreshing = false
                }
            }
        )
    }

    async getAll(params?: F): Promise<T[]> {
        const response = await this.api.get<T[]>(`/${this.path}`, { params })
        return response.data
    }

    async getById(id: number | string): Promise<T> {
        const response = await this.api.get<T>(`/${this.path}/${id}`)
        return response.data
    }

    async create(item: T): Promise<void> {
        await this.api.post(`/${this.path}`, item)
    }

    async update(item: T): Promise<void> {
        await this.api.patch(`/${this.path}`, item)
    }

    async deleteItem(id: number | string): Promise<void> {
        await this.api.delete(`/${this.path}/${id}`)
    }
}