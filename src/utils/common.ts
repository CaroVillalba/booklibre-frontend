import axios, { AxiosHeaders } from 'axios'
import type { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create()

export async function httpRequest<T>(request: AxiosRequestConfig): Promise<T> {
  const headers = (request.headers as AxiosHeaders) ?? new AxiosHeaders()

  const okRequest: AxiosRequestConfig = {
    ...request,
    headers,
    withXSRFToken: true,
    withCredentials: true,
    xsrfHeaderName: 'X-XSRF-TOKEN',
    xsrfCookieName: 'XSRF-TOKEN',
  }

  const response = await axiosInstance(okRequest)
  return response.data
}