import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { AppErrorBoundary } from './components/errors/AppErrorBoundary'
import { AppRouter } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppErrorBoundary>
        <AppRouter />
      </AppErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
