import axios from "axios"
import { refreshAccessToken } from "../../../main/services/TokenAuthService"
import { getAccessToken } from "../../../main/services/TokenService"
import { vi, describe, it, expect, beforeEach } from "vitest"

vi.mock("axios")

describe("TokenAuthService", () => {

    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })

    it("refresca access token", async () => {
        ;(axios.post as any).mockResolvedValue({
        data: {
            accessToken: "newA",
            refreshToken: "newR"
        }
        })

        localStorage.setItem("REFRESH_TOKEN_KEY", "old")

        const token = await refreshAccessToken()

        expect(token).toBe("newA")
        expect(getAccessToken()).toBe("newA")
    })
})