import { createBrowserRouter } from 'react-router'
import { AppShell } from './layouts/AppShell'
import { ArtworkPage } from './pages/ArtworkPage'
import { CollectionPage } from './pages/CollectionPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { HomePage } from './pages/HomePage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SearchPage } from './pages/SearchPage'
import { TechniquePage } from './pages/TechniquePage'
import { TechniquesPage } from './pages/TechniquesPage'
import { YearPage } from './pages/YearPage'
import { YearsPage } from './pages/YearsPage'

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
        path: 'collections',
        element: <CollectionsPage />,
      },
      {
        path: 'collections/:collectionSlug',
        element: <CollectionPage />,
      },
      {
        path: 'years',
        element: <YearsPage />,
      },
      {
        path: 'years/:year',
        element: <YearPage />,
      },
      {
        path: 'techniques',
        element: <TechniquesPage />,
      },
      {
        path: 'techniques/:techniqueSlug',
        element: <TechniquePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'artworks/:artworkId',
        element: <ArtworkPage />,
      },
    ],
  },
])
