import { getTokenPayload } from '../../utils/jwt'
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../utils/constants'

const listeners = new Set<() => void>()

let tokensSnapshot = {
    accessToken: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    isRefreshing: false,
    refreshCount: 0,
}

function updateSnapshot() {
  tokensSnapshot = {
    ...tokensSnapshot,
    accessToken: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)
  }
}

function notifyListeners(){
  updateSnapshot()
  listeners.forEach((listener)=>listener())
}

export function getTokens() {
  return tokensSnapshot
}

export function getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function checkLoggedIn(): boolean {
    return getRefreshToken() !== null
}

export function getUserIdFromToken(): number | null {
    const token = getAccessToken()
    if (!token) return null

    const payload = getTokenPayload(token)
    const id = payload?.id || payload?.userId || payload?.sub
    return id ? Number(id) : null
}

export function getUserRolesFromToken(): String {
  const token = getAccessToken()
  if (!token) return ""

  const payload = getTokenPayload(token)
  const roles = payload?.roles
  return roles ? roles : ""
}

export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  notifyListeners()
}

export function clearTokens(): void{
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  tokensSnapshot = {...tokensSnapshot, refreshCount: 0}
  notifyListeners()
}

export function incrementRefreshCount():void{
  tokensSnapshot = {
    ...tokensSnapshot,
    refreshCount: tokensSnapshot.refreshCount + 1
  }
  notifyListeners()
}

export function subscribeToTokens(callback : ()=> void): ()=>void{
  listeners.add(callback)
  return ()=>listeners.delete(callback)
}

export function isTokenExpiredError(headers?: Record<string, string>): boolean {
  const wwwAuthenticate = headers?.['www-authenticate'] ?? headers?.['WWW-Authenticate']
  return !!wwwAuthenticate?.includes('error="invalid_token"')
}
