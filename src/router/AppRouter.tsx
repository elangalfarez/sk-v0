"use client"
import { Routes, Route, Navigate } from "react-router-dom"
import AppLayout from "@/components/layout/AppLayout"
import WelcomePage from "@/pages/guest/WelcomePage"
import GuestDashboardPage from "@/pages/guest/GuestDashboardPage"
import VIPDashboardPage from "@/pages/dashboard/VIPDashboardPage"
import StoreDiscoveryPage from "@/pages/stores/StoreDiscoveryPage"
import StoreDetailPage from "@/pages/stores/StoreDetailPage"
import ReceiptUploadPage from "@/pages/points/ReceiptUploadPage"
import RewardsPage from "@/pages/rewards/RewardsPage"
import ProfilePage from "@/pages/dashboard/ProfilePage"
import LoginPage from "@/pages/auth/LoginPage"
import VIPRegistrationInfoPage from "@/pages/auth/VIPRegistrationInfoPage"
import EventsPage from "@/pages/events/EventsPage"
import NotificationsPage from "@/pages/notifications/NotificationsPage"
import ProtectedRoute from "./ProtectedRoute"
import { useAuth } from "@/hooks/useAuth"

export default function AppRouter() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vip-info" element={<VIPRegistrationInfoPage />} />

      <Route path="/" element={<AppLayout />}>
        <Route index element={isAuthenticated ? <VIPDashboardPage /> : <GuestDashboardPage />} />

        <Route path="explore" element={<StoreDiscoveryPage />} />
        <Route path="stores/:storeId" element={<StoreDetailPage />} />
        <Route path="events" element={<EventsPage />} />

        <Route
          path="scan"
          element={
            <ProtectedRoute>
              <ReceiptUploadPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="rewards"
          element={
            <ProtectedRoute>
              <RewardsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="me"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
