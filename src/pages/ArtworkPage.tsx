import { NavLink, useLocation, useNavigate, useParams } from 'react-router'
import { artworks } from '../data/artworks'
import styles from './ArtworkPage.module.css'

export function ArtworkPage() {
  const { artworkId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const navigationState = location.state as { sourceLabel?: string } | null
  const sourceLabel = navigationState?.sourceLabel
  const artwork = artworks.find(
    (item) =>
      item.id === artworkId &&
      item.visibility === 'public' &&
      item.contentLevel !== 'mature',
  )

  if (!artwork) {
    return (
      <section className={styles.notFound} aria-labelledby="not-found-title">
        <p className={styles.eyebrow}>Artwork unavailable</p>
        <h1 id="not-found-title">This artwork cannot be displayed.</h1>
        <NavLink to="/portfolio">Return to portfolio</NavLink>
      </section>
    )
  }

  return (
    <article className={styles.page}>
      {sourceLabel ? (
        <button
          className={styles.backLink}
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back to {sourceLabel}
        </button>
      ) : (
        <NavLink className={styles.backLink} to="/portfolio">
          ← Back to portfolio
        </NavLink>
      )}

      <div className={styles.viewer}>
        <div className={styles.imageFrame}>
          <img
            className={styles.image}
            src={artwork.imageSrc}
            alt={artwork.alt}
          />
        </div>

        <section className={styles.details} aria-labelledby="artwork-title">
          <p className={styles.eyebrow}>{artwork.year}</p>
          <h1 className={styles.title} id="artwork-title">
            {artwork.title ?? `Untitled, ${artwork.year}`}
          </h1>

          <dl className={styles.metadata}>
            <div>
              <dt>Techniques</dt>
              <dd>{artwork.techniques.join(', ')}</dd>
            </div>
            <div>
              <dt>Subjects</dt>
              <dd>{artwork.subjects.join(', ')}</dd>
            </div>
            {artwork.colorMode && (
              <div>
                <dt>Color mode</dt>
                <dd>{artwork.colorMode.replaceAll('-', ' ')}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </article>
  )
}
