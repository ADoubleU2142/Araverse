import { NavLink, useParams } from 'react-router'
import { ArtworkGallery } from '../components/artwork/ArtworkGallery'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { publicCuration } from '../data/publicCuration'
import { toSlug } from '../utils/toSlug'
import styles from './TechniquePage.module.css'

export function TechniquePage() {
  const { techniqueSlug } = useParams()
  const guestArtworks = getGuestVisibleArtworks(artworks)
  const technique = [
    ...new Set(guestArtworks.flatMap((artwork) => artwork.techniques)),
  ].find(
    (name) =>
      publicCuration.techniques.includes(name) &&
      toSlug(name) === techniqueSlug,
  )
  const techniqueArtworks = technique
    ? guestArtworks.filter((artwork) => artwork.techniques.includes(technique))
    : []

  if (!technique || techniqueArtworks.length === 0) {
    return (
      <section
        className={styles.notFound}
        aria-labelledby="technique-not-found"
      >
        <p className={styles.eyebrow}>Technique unavailable</p>
        <h1 id="technique-not-found">This technique cannot be displayed.</h1>
        <NavLink to="/techniques">Return to techniques</NavLink>
      </section>
    )
  }

  return (
    <section className={styles.page} aria-labelledby="technique-title">
      <header className={styles.header}>
        <div>
          <NavLink className={styles.backLink} to="/techniques">
            ← All techniques
          </NavLink>
          <h1 className={styles.title} id="technique-title">
            {technique}
          </h1>
        </div>

        <p className={styles.count}>
          {techniqueArtworks.length}{' '}
          {techniqueArtworks.length === 1 ? 'artwork' : 'artworks'}
        </p>
      </header>

      <ArtworkGallery
        artworks={techniqueArtworks}
        label={`${technique} artworks`}
        sourceLabel={technique}
      />
    </section>
  )
}
