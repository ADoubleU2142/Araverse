import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { ArtworkPage } from '../../pages/ArtworkPage'
import styles from './ArtworkLightbox.module.css'

export function ArtworkLightbox() {
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement as HTMLElement | null
    const previousBodyOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        navigate(-1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocusedElement?.focus()
    }
  }, [navigate])

  return (
    <div
      className={styles.overlay}
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Artwork viewer"
      tabIndex={-1}
    >
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Close artwork viewer"
        onClick={() => navigate(-1)}
      />

      <div className={styles.panel}>
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close artwork viewer"
          onClick={() => navigate(-1)}
        >
          ×
        </button>

        <ArtworkPage isModal />
      </div>
    </div>
  )
}
