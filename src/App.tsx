import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./hooks/useAuth"
import "./styles/index.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background text-text-primary">
            <AppRouter />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#1F2937",
                  color: "#FFFFFF",
                  border: "1px solid #D4AF37",
                },
                success: {
                  iconTheme: {
                    primary: "#10B981",
                    secondary: "#FFFFFF",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#FFFFFF",
                  },
                },
              }}
            />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App