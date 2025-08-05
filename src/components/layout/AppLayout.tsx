import { Outlet } from "react-router-dom"
import Header from "@/components/common/Header"
import MobileTabBar from "./MobileTabBar"

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-4">
        <Outlet />
      </main>

      <MobileTabBar />
    </div>
  )
}
