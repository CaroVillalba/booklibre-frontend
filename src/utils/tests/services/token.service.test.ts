import {
    setTokens,
    getAccessToken,
    getRefreshToken,
    clearTokens,
    checkLoggedIn,
    getUserIdFromToken,
    getUserRolesFromToken,
    isTokenExpiredError
} from "../../../main/services/TokenService"
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../../constants"

import { vi, describe, it, expect, beforeEach } from "vitest"

vi.mock("../../../utils/jwt", () => ({
    getTokenPayload: vi.fn()
}))

import { getTokenPayload } from "../../jwt"

describe("TokenService", () => {

    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })

    it("guarda tokens en localStorage", () => {
        setTokens("access", "refresh")
    
        expect(getAccessToken()).toBe("access")
        expect(getRefreshToken()).toBe("refresh")
    })

    it("limpia tokens", () => {
        setTokens("a", "b")
        clearTokens()

        expect(getAccessToken()).toBeNull()
        expect(getRefreshToken()).toBeNull()
    })

    it("checkLoggedIn funciona", () => {
        localStorage.setItem(REFRESH_TOKEN_KEY, "x")
        expect(checkLoggedIn()).toBe(true)
    })

    it("obtiene userId del token", () => {
        localStorage.setItem(TOKEN_KEY, "fake")
    
        ;(getTokenPayload as any).mockReturnValue({ id: 5 })
    
        expect(getUserIdFromToken()).toBe(5)
    })

    it("obtiene roles del token", () => {
        localStorage.setItem(TOKEN_KEY, "fake")
    
        ;(getTokenPayload as any).mockReturnValue({ roles: "PUBLICADOR" })
    
        expect(getUserRolesFromToken()).toBe("PUBLICADOR")
    })

    it("detecta token expirado por header", () => {
        const headers = {
            "WWW-Authenticate": 'Bearer error="invalid_token"'
        }

        expect(isTokenExpiredError(headers)).toBe(true)
    })
})