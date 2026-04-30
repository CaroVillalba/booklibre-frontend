import { vi, describe, it, expect, beforeEach } from "vitest"
import axios from "axios"
import { refreshAccessToken } from "../../main/services/TokenAuthService"
import * as TokenService from "../../main/services/TokenService"

vi.mock("axios")

vi.mock("../../main/services/TokenService", () => {
    return {
        getRefreshToken: vi.fn(),
        setTokens: vi.fn(),
        incrementRefreshCount: vi.fn()
    }
})

describe("TokenAuthService", () => {
    beforeEach(() => {
        vi.restoreAllMocks()
        vi.mocked(TokenService.getRefreshToken).mockReturnValue("mock-refresh")
    })

    it("refresca access token", async () => {
        vi.mocked(axios.post).mockResolvedValue({
            data: {
                accessToken: "newAccess",
                refreshToken: "newRefresh"
            }
        })

        const token = await refreshAccessToken()

        expect(token).toBe("newAccess")
        expect(TokenService.getRefreshToken).toHaveBeenCalled()
        expect(TokenService.setTokens).toHaveBeenCalledWith("newAccess", "newRefresh")
        expect(TokenService.incrementRefreshCount).toHaveBeenCalled()
    })

    it("lanza error si no hay refresh token", async () => {
        vi.mocked(TokenService.getRefreshToken).mockReturnValue(null)

        await expect(refreshAccessToken()).rejects.toThrow('No hay refresh token')
    })
})