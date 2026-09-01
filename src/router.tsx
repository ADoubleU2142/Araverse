import { createBrowserRouter } from 'react-router'
import { AppShell } from './layouts/AppShell'
import { ArtworkPage } from './pages/ArtworkPage'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'portfolio',
        element: <PortfolioPage />,
      },
      {
        path: 'artworks/:artworkId',
        element: <ArtworkPage />,
      },
    ],
  },
])
