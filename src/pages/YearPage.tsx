import { NavLink, useParams } from 'react-router'
import { ArtworkGallery } from '../components/artwork/ArtworkGallery'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { publicCuration } from '../data/publicCuration'
import styles from './YearPage.module.css'

export function YearPage() {
  const { year: yearParameter } = useParams()
  const year = Number(yearParameter)
  const yearArtworks = getGuestVisibleArtworks(artworks).filter(
    (artwork) => publicCuration.years.includes(year) && artwork.year === year,
  )

  if (!Number.isInteger(year) || yearArtworks.length === 0) {
    return (
      <section className={styles.notFound} aria-labelledby="year-not-found">
        <p className={styles.eyebrow}>Year unavailable</p>
        <h1 id="year-not-found">This year cannot be displayed.</h1>
        <NavLink to="/years">Return to years</NavLink>
      </section>
    )
  }

  return (
    <section className={styles.page} aria-labelledby="year-title">
      <header className={styles.header}>
        <div>
          <NavLink className={styles.backLink} to="/years">
            ← All years
          </NavLink>
          <h1 className={styles.title} id="year-title">
            {year}
          </h1>
        </div>

        <p className={styles.count}>
          {yearArtworks.length}{' '}
          {yearArtworks.length === 1 ? 'artwork' : 'artworks'}
        </p>
      </header>

      <ArtworkGallery
        artworks={yearArtworks}
        label={`Artworks from ${year}`}
        sourceLabel={`${year}`}
      />
    </section>
  )
}
