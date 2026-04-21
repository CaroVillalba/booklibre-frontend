import { getTokenPayload } from '../../utils/jwt'
import axios from 'axios'
import { BACKEND_URL, REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../utils/constants'


const listeners = new Set<() => void>()
    let tokensSnapshot = {
    accessToken: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    isRefreshing: false,
    refreshCount: 0,
}

export function getTokens() {
  return tokensSnapshot
}

export function getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

export function checkLoggedIn(): boolean {
    return getAccessToken() !== null
}

export function getUserIdFromToken(): number | null{
    const token = getAccessToken()
    if (!token) return null

    const payload = getTokenPayload(token)
    const id = payload?.sub || payload?.userId || payload?.id
    return id ? Number(id) : null

}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}
