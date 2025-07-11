import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './hooks/useCart'
import ErrorBoundary from './components/ErrorBoundary'

// Fallback loading component
const AppLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>CHRONO</h2>
      <p className="text-gray-600">Loading your luxury watch experience...</p>
    </div>
  </div>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <Suspense fallback={<AppLoading />}>
          <App />
        </Suspense>
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
)