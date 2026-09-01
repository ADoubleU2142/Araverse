import { NavLink } from 'react-router'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { publicCuration } from '../data/publicCuration'
import { toSlug } from '../utils/toSlug'
import styles from './CollectionsPage.module.css'

export function CollectionsPage() {
  const guestArtworks = getGuestVisibleArtworks(artworks)
  const collections = [
    ...new Set(guestArtworks.flatMap((artwork) => artwork.collections)),
  ]
    .filter((collection) => publicCuration.collections.includes(collection))
    .toSorted((first, second) => first.localeCompare(second))
    .map((collection) => {
      const collectionArtworks = guestArtworks.filter((artwork) =>
        artwork.collections.includes(collection),
      )

      return {
        collection,
        count: collectionArtworks.length,
        cover: collectionArtworks[0],
      }
    })

  return (
    <section className={styles.page} aria-labelledby="collections-title">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Curated series</p>
        <h1 className={styles.title} id="collections-title">
          Collections
        </h1>
        <p className={styles.introduction}>
          Deliberate artistic series and groups selected for public
          presentation.
        </p>
      </header>

      {collections.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyLabel}>Nothing published here yet</p>
          <h2>No public collections yet.</h2>
          <p>
            Curated collections will appear here when they are ready to be
            presented.
          </p>
        </div>
      ) : (
        <ul className={styles.grid} aria-label="Available collections">
          {collections.map(({ collection, count, cover }) => (
            <li key={collection}>
              <NavLink
                className={styles.card}
                to={`/collections/${toSlug(collection)}`}
              >
                <img
                  className={styles.cover}
                  src={cover.imageSrc}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.cardContent}>
                  <strong>{collection}</strong>
                  <span>
                    {count} {count === 1 ? 'artwork' : 'artworks'}
                  </span>
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
