import { NavLink, useParams } from 'react-router'
import { ArtworkGallery } from '../components/artwork/ArtworkGallery'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import { publicCuration } from '../data/publicCuration'
import { toSlug } from '../utils/toSlug'
import styles from './CollectionPage.module.css'

export function CollectionPage() {
  const { collectionSlug } = useParams()
  const guestArtworks = getGuestVisibleArtworks(artworks)
  const collection = [
    ...new Set(guestArtworks.flatMap((artwork) => artwork.collections)),
  ].find(
    (name) =>
      publicCuration.collections.includes(name) &&
      toSlug(name) === collectionSlug,
  )
  const collectionArtworks = collection
    ? guestArtworks.filter((artwork) =>
        artwork.collections.includes(collection),
      )
    : []

  if (!collection || collectionArtworks.length === 0) {
    return (
      <section
        className={styles.notFound}
        aria-labelledby="collection-not-found"
      >
        <p className={styles.eyebrow}>Collection unavailable</p>
        <h1 id="collection-not-found">This collection cannot be displayed.</h1>
        <NavLink to="/collections">Return to collections</NavLink>
      </section>
    )
  }

  return (
    <section className={styles.page} aria-labelledby="collection-title">
      <header className={styles.header}>
        <div>
          <NavLink className={styles.backLink} to="/collections">
            ← All collections
          </NavLink>
          <h1 className={styles.title} id="collection-title">
            {collection}
          </h1>
        </div>

        <p className={styles.count}>
          {collectionArtworks.length}{' '}
          {collectionArtworks.length === 1 ? 'artwork' : 'artworks'}
        </p>
      </header>

      <ArtworkGallery
        artworks={collectionArtworks}
        label={`${collection} artworks`}
        sourceLabel={collection}
      />
    </section>
  )
}
