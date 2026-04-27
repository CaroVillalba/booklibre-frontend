import axios from 'axios'
import { getRefreshToken, setTokens, incrementRefreshCount } from './TokenService'
import type { LoginResponse } from '../../types/Auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/v1'

export async function refreshAccessToken(): Promise<string> {
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
        throw new Error('No hay refresh token')
    }

    const response = await axios.post<LoginResponse>(
        `${API_URL}/auth/refresh`,
        { refreshToken }
    )

    const { accessToken, refreshToken: newRefreshToken } = response.data

    setTokens(accessToken, newRefreshToken)
    incrementRefreshCount()

    return accessToken
}