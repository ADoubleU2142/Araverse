import { Route, Routes, useLocation } from 'react-router'
import { ArtworkLightbox } from './components/artwork/ArtworkLightbox'
import { AppShell } from './layouts/AppShell'
import { ArtworkPage } from './pages/ArtworkPage'
import { CollectionPage } from './pages/CollectionPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SearchPage } from './pages/SearchPage'
import { TechniquePage } from './pages/TechniquePage'
import { TechniquesPage } from './pages/TechniquesPage'
import { YearPage } from './pages/YearPage'
import { YearsPage } from './pages/YearsPage'
import type { ArtworkNavigationState } from './types/artworkNavigation'

export function AppRouter() {
  const location = useLocation()
  const state = location.state as ArtworkNavigationState | null
  const backgroundLocation = state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation ?? location}>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route
            path="collections/:collectionSlug"
            element={<CollectionPage />}
          />
          <Route path="years" element={<YearsPage />} />
          <Route path="years/:year" element={<YearPage />} />
          <Route path="techniques" element={<TechniquesPage />} />
          <Route path="techniques/:techniqueSlug" element={<TechniquePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="artworks/:artworkId" element={<ArtworkPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/artworks/:artworkId" element={<ArtworkLightbox />} />
        </Routes>
      )}
    </>
  )
}
