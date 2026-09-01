import { useEffect, useRef } from 'react'
import {
  Form,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { ArtworkGallery } from '../components/artwork/ArtworkGallery'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { getColorModeLabel, isColorMode } from '../utils/colorMode'
import { searchArtworks } from '../utils/searchArtworks'
import styles from './SearchPage.module.css'

export function SearchPage() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const query = searchParams.get('q')?.trim() ?? ''
  const colorModeParameter = searchParams.get('colorMode')
  const colorMode = isColorMode(colorModeParameter)
    ? colorModeParameter
    : undefined
  const colorModeLabel = colorMode ? getColorModeLabel(colorMode) : undefined
  const hasSearchCriteria = Boolean(query || colorMode)
  const colorModeArtworks = colorMode
    ? getGuestVisibleArtworks(artworks).filter(
        (artwork) => artwork.colorMode === colorMode,
      )
    : getGuestVisibleArtworks(artworks)
  const results = query
    ? searchArtworks(colorModeArtworks, query)
    : hasSearchCriteria
      ? colorModeArtworks
      : []
  const navigationState = location.state as { focusSearch?: boolean } | null

  useEffect(() => {
    if (navigationState?.focusSearch) {
      searchInputRef.current?.focus()
      void navigate(`${location.pathname}${location.search}`, {
        replace: true,
        state: null,
      })
    }
  }, [location.pathname, location.search, navigate, navigationState])

  return (
    <section className={styles.page} aria-labelledby="search-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Find an artwork</p>
        <h1 className={styles.title} id="search-title">
          Search
        </h1>
        <p className={styles.introduction}>
          Search the public portfolio by subject, title, or source.
        </p>
      </header>

      <Form className={styles.form} role="search" method="get" action="/search">
        <label className={styles.label} htmlFor="artwork-search">
          Search titles and subjects
        </label>
        <div className={styles.fieldGroup}>
          <input
            className={styles.input}
            id="artwork-search"
            key={query}
            ref={searchInputRef}
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Try cat, Batman, portrait…"
            autoComplete="off"
          />
          <button className={styles.submitButton} type="submit">
            Search
          </button>
        </div>
        {colorMode && (
          <input type="hidden" name="colorMode" value={colorMode} />
        )}
      </Form>

      {colorModeLabel && (
        <div className={styles.activeFilter}>
          <span>Color mode: {colorModeLabel}</span>
          <NavLink
            to={query ? `/search?q=${encodeURIComponent(query)}` : '/search'}
          >
            Clear filter
          </NavLink>
        </div>
      )}

      {!hasSearchCriteria ? (
        <div className={styles.message}>
          <p className={styles.messageLabel}>Start with a subject</p>
          <h2>What would you like to find?</h2>
          <p>Try searching for cat, human, Batman, or Imagine Dragons.</p>
        </div>
      ) : results.length === 0 ? (
        <div className={styles.message} aria-live="polite">
          <p className={styles.messageLabel}>No results</p>
          <h2>Nothing matched the current search.</h2>
          <p>Try a broader subject or check the spelling.</p>
        </div>
      ) : (
        <div className={styles.results}>
          <p className={styles.resultCount} aria-live="polite">
            {results.length} {results.length === 1 ? 'artwork' : 'artworks'}
            {query && ` for “${query}”`}
            {colorModeLabel && ` · ${colorModeLabel}`}
          </p>
          <ArtworkGallery
            artworks={results}
            label="Filtered artwork results"
            sourceLabel="filtered results"
          />
        </div>
      )}
    </section>
  )
}
