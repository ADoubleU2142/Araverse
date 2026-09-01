import { NavLink } from 'react-router'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { publicCuration } from '../data/publicCuration'
import { toSlug } from '../utils/toSlug'
import styles from './TechniquesPage.module.css'

export function TechniquesPage() {
  const guestArtworks = getGuestVisibleArtworks(artworks)
  const techniques = [
    ...new Set(guestArtworks.flatMap((artwork) => artwork.techniques)),
  ]
    .filter((technique) => publicCuration.techniques.includes(technique))
    .toSorted((first, second) => first.localeCompare(second))
    .map((technique) => {
      const techniqueArtworks = guestArtworks.filter((artwork) =>
        artwork.techniques.includes(technique),
      )

      return {
        technique,
        count: techniqueArtworks.length,
        cover: techniqueArtworks[0],
      }
    })

  return (
    <section className={styles.page} aria-labelledby="techniques-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Materials and methods</p>
        <h1 className={styles.title} id="techniques-title">
          Techniques
        </h1>
        <p className={styles.introduction}>
          Browse selected public artwork by how it was created.
        </p>
      </header>

      <ul className={styles.grid} aria-label="Available techniques">
        {techniques.map(({ technique, count, cover }) => (
          <li key={technique}>
            <NavLink
              className={styles.card}
              to={`/techniques/${toSlug(technique)}`}
            >
              <img
                className={styles.cover}
                src={cover.imageSrc}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className={styles.cardContent}>
                <strong>{technique}</strong>
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
