import type React from "react"
import VIPGate from "@/components/common/VIPGate"

interface ProtectedRouteProps {
  children: React.ReactNode
  featureName?: string
}

export default function ProtectedRoute({ children, featureName = "this feature" }: ProtectedRouteProps) {
  return (
    <VIPGate featureName={featureName} showTeaser={true}>
      {children}
    </VIPGate>
  )
}
