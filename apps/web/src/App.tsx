import { ThemeProvider } from "./context/theme-provider"
import AppRoutes from "./routes"

function App() {
  return (
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
