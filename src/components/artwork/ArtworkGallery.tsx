import { NavLink, useLocation } from 'react-router'
import type { Artwork } from '../../types/artwork'
import { ArtworkImage } from './ArtworkImage'
import styles from './ArtworkGallery.module.css'

interface ArtworkGalleryProps {
  artworks: Artwork[]
  label: string
  sourceLabel: string
}

export function ArtworkGallery({
  artworks,
  label,
  sourceLabel,
}: ArtworkGalleryProps) {
  const location = useLocation()
  const artworkIds = artworks.map((artwork) => artwork.id)

  return (
    <ul className={styles.gallery} aria-label={label}>
      {artworks.map((artwork, index) => (
        <li className={styles.item} key={artwork.id}>
          <NavLink
            className={styles.cardLink}
            to={`/artworks/${artwork.id}`}
            state={{ sourceLabel, backgroundLocation: location, artworkIds }}
            aria-label={`Open artwork from ${artwork.year}`}
          >
            <article className={styles.card}>
              <ArtworkImage
                src={artwork.imageSrc}
                alt={artwork.alt}
                imageClassName={styles.image}
                containerClassName={styles.imageFrame}
                loading={index < 2 ? 'eager' : 'lazy'}
              />

              <div className={styles.metadata}>
                <span>{artwork.year}</span>
                <span>{artwork.techniques.join(' · ')}</span>
              </div>
            </article>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
