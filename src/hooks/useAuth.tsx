"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { AuthState, LoginCredentials } from "@/types"
import { AuthService } from "@/services/AuthService"
import toast from "react-hot-toast"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  showVIPRegistrationInfo: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isGuest: true,
    user: null,
    token: null,
    guestId: AuthService.getGuestId(),
  })

  useEffect(() => {
    // Check for existing session on app start
    const initAuth = async () => {
      const token = AuthService.getStoredToken()
      if (token) {
        try {
          const profile = await AuthService.getProfile()
          setAuthState({
            isAuthenticated: true,
            isGuest: false,
            user: profile,
            token,
            guestId: AuthService.getGuestId(),
          })
        } catch (error) {
          // Token invalid, clear it
          AuthService.clearAuth()
        }
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const { token, profile } = await AuthService.login(credentials)

      setAuthState({
        isAuthenticated: true,
        isGuest: false,
        user: profile,
        token,
        guestId: AuthService.getGuestId(),
      })

      toast.success(`Welcome back, ${profile.name}!`)
      navigate("/")
      return true
    } catch (error) {
      toast.error("Login failed. Please check your credentials.")
      return false
    }
  }

  const logout = () => {
    AuthService.clearAuth()
    setAuthState({
      isAuthenticated: false,
      isGuest: true,
      user: null,
      token: null,
      guestId: AuthService.getGuestId(),
    })
    toast.success("Logged out successfully")
    navigate("/")
  }

  const showVIPRegistrationInfo = () => {
    navigate("/vip-info")
  }

  const refreshProfile = async () => {
    if (authState.token) {
      try {
        const profile = await AuthService.getProfile()
        setAuthState((prev) => ({ ...prev, user: profile }))
      } catch (error) {
        console.error("Failed to refresh profile:", error)
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        showVIPRegistrationInfo,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
