import { NavLink, useLocation, useNavigate, useParams } from 'react-router'
import { MetadataPills } from '../components/artwork/MetadataPills'
import { artworks } from '../data/artworks'
import type { ArtworkNavigationState } from '../types/artworkNavigation'
import { getColorModeLabel } from '../utils/colorMode'
import { toSlug } from '../utils/toSlug'
import styles from './ArtworkPage.module.css'

interface ArtworkPageProps {
  isModal?: boolean
  onPrevious?: () => void
  onNext?: () => void
}

export function ArtworkPage({
  isModal = false,
  onPrevious,
  onNext,
}: ArtworkPageProps) {
  const { artworkId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const navigationState = location.state as ArtworkNavigationState | null
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
      {!isModal &&
        (sourceLabel ? (
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
        ))}

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

          {isModal && (onPrevious || onNext) && (
            <nav
              className={styles.viewerNavigation}
              aria-label="Artwork viewer"
            >
              <button type="button" onClick={onPrevious} disabled={!onPrevious}>
                ← Previous
              </button>
              <button type="button" onClick={onNext} disabled={!onNext}>
                Next →
              </button>
            </nav>
          )}

          <dl className={styles.metadata}>
            <div>
              <dt>Techniques</dt>
              <dd>
                <MetadataPills
                  items={artwork.techniques}
                  getTo={(technique) => `/techniques/${toSlug(technique)}`}
                  getAriaLabel={(technique) =>
                    `Browse artworks created with ${technique}`
                  }
                />
              </dd>
            </div>
            <div>
              <dt>Subjects</dt>
              <dd>
                <MetadataPills
                  items={artwork.subjects}
                  getTo={(subject) =>
                    `/search?q=${encodeURIComponent(subject)}`
                  }
                  getAriaLabel={(subject) =>
                    `Search for artworks with subject ${subject}`
                  }
                />
              </dd>
            </div>
            {artwork.collections.length > 0 && (
              <div>
                <dt>Collections</dt>
                <dd>
                  <MetadataPills
                    items={artwork.collections}
                    getTo={(collection) => `/collections/${toSlug(collection)}`}
                    getAriaLabel={(collection) =>
                      `Browse the ${collection} collection`
                    }
                  />
                </dd>
              </div>
            )}
            {artwork.fanWorkType && (
              <div>
                <dt>Type</dt>
                <dd>{artwork.fanWorkType.replaceAll('-', ' ')}</dd>
              </div>
            )}
            {artwork.source && (
              <div>
                <dt>Source</dt>
                <dd>{artwork.source}</dd>
              </div>
            )}
            {artwork.colorMode && (
              <div>
                <dt>Color mode</dt>
                <dd>
                  <MetadataPills
                    items={[getColorModeLabel(artwork.colorMode)]}
                    getTo={() => `/search?colorMode=${artwork.colorMode}`}
                    getAriaLabel={(colorMode) => `Browse ${colorMode} artworks`}
                  />
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </article>
  )
}
