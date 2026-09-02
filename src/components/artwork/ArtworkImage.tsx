import { useState } from 'react'
import styles from './ArtworkImage.module.css'

interface ArtworkImageProps {
  src: string
  alt: string
  imageClassName?: string
  containerClassName?: string
  loading?: 'eager' | 'lazy'
}

type ImageStatus = 'loading' | 'loaded' | 'error'

export function ArtworkImage({
  src,
  alt,
  imageClassName,
  containerClassName,
  loading = 'lazy',
}: ArtworkImageProps) {
  const [status, setStatus] = useState<ImageStatus>('loading')
  const containerClasses = [styles.container, containerClassName]
    .filter(Boolean)
    .join(' ')
  const imageClasses = [
    styles.image,
    imageClassName,
    status === 'error' ? styles.failedImage : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses} data-status={status}>
      <img
        className={imageClasses}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />

      {status === 'loading' && (
        <span className={styles.loadingState} aria-hidden="true" />
      )}

      {status === 'error' && (
        <div
          className={styles.errorState}
          role="img"
          aria-label={`Artwork image unavailable. ${alt}`}
        >
          <span className={styles.errorMark}>×</span>
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  )
}
