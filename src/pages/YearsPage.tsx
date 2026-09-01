import { NavLink } from 'react-router'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { publicCuration } from '../data/publicCuration'
import styles from './YearsPage.module.css'

export function YearsPage() {
  const guestArtworks = getGuestVisibleArtworks(artworks).filter((artwork) =>
    publicCuration.years.includes(artwork.year),
  )
  const years = [...new Set(guestArtworks.map((artwork) => artwork.year))]
    .toSorted((first, second) => second - first)
    .map((year) => {
      const yearArtworks = guestArtworks.filter(
        (artwork) => artwork.year === year,
      )

      return {
        year,
        count: yearArtworks.length,
        cover: yearArtworks[0],
      }
    })

  return (
    <section className={styles.page} aria-labelledby="years-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Browse the archive</p>
        <h1 className={styles.title} id="years-title">
          Years
        </h1>
        <p className={styles.introduction}>
          Explore selected public artwork in chronological groups.
        </p>
      </header>

      <ul className={styles.grid} aria-label="Available years">
        {years.map(({ year, count, cover }) => (
          <li key={year}>
            <NavLink className={styles.card} to={`/years/${year}`}>
              <img
                className={styles.cover}
                src={cover.imageSrc}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className={styles.cardContent}>
                <strong>{year}</strong>
                <span>
                  {count} {count === 1 ? 'artwork' : 'artworks'}
                </span>
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
