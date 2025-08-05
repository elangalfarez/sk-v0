import axios from "axios"
import type { CustomerProfile, LoginCredentials } from "@/types"

class AuthServiceClass {
  private api = axios.create({
    baseURL: "https://salamun-crm.supermal.com",
    timeout: 15000,
  })

  private guestId: string

  constructor() {
    this.guestId = this.generateGuestId()
  }

  private generateGuestId(): string {
    const stored = localStorage.getItem("guest_id")
    if (stored) return stored

    const newId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem("guest_id", newId)
    return newId
  }

  getGuestId(): string {
    return this.guestId
  }

  async login(credentials: LoginCredentials): Promise<{ token: string; profile: CustomerProfile }> {
    try {
      const response = await this.api.post("/auth/login", credentials)
      const { token, profile } = response.data.data

      localStorage.setItem("auth_token", token)
      localStorage.setItem("user_profile", JSON.stringify(profile))

      return { token, profile }
    } catch (error) {
      // Mock login for demo purposes
      console.warn("Using mock login")
      return this.mockLogin(credentials)
    }
  }

  private mockLogin(credentials: LoginCredentials): { token: string; profile: CustomerProfile } {
    const mockProfile: CustomerProfile = {
      cif: credentials.cif,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+62812345678",
      dateOfBirth: "1990-01-15",
      address: "Jakarta, Indonesia",
      gender: "L",
      memberTier: "Gold",
      registrationDate: "2023-06-15T00:00:00Z",
      status: "Active",
      tierProgress: {
        current: 15750,
        target: 25000,
        nextTier: "Platinum",
      },
    }

    const mockToken = `mock_token_${Date.now()}`

    localStorage.setItem("auth_token", mockToken)
    localStorage.setItem("user_profile", JSON.stringify(mockProfile))

    return { token: mockToken, profile: mockProfile }
  }

  async getProfile(): Promise<CustomerProfile> {
    const stored = localStorage.getItem("user_profile")
    if (stored) {
      return JSON.parse(stored)
    }

    try {
      const response = await this.api.get("/auth/profile")
      const profile = response.data.data
      localStorage.setItem("user_profile", JSON.stringify(profile))
      return profile
    } catch (error) {
      throw new Error("Failed to get profile")
    }
  }

  getStoredToken(): string | null {
    return localStorage.getItem("auth_token")
  }

  clearAuth(): void {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_profile")
  }
}

export const AuthService = new AuthServiceClass()
