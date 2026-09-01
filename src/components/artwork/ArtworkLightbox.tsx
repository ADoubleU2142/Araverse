import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ArtworkPage } from '../../pages/ArtworkPage'
import type { ArtworkNavigationState } from '../../types/artworkNavigation'
import styles from './ArtworkLightbox.module.css'

export function ArtworkLightbox() {
  const navigate = useNavigate()
  const location = useLocation()
  const { artworkId } = useParams()
  const dialogRef = useRef<HTMLDivElement>(null)
  const swipeStartRef = useRef<{
    pointerId: number
    x: number
    y: number
  } | null>(null)
  const navigationState = location.state as ArtworkNavigationState | null
  const artworkIds = navigationState?.artworkIds ?? []
  const currentIndex = artworkId ? artworkIds.indexOf(artworkId) : -1
  const previousArtworkId =
    currentIndex > 0 ? artworkIds[currentIndex - 1] : undefined
  const nextArtworkId =
    currentIndex >= 0 && currentIndex < artworkIds.length - 1
      ? artworkIds[currentIndex + 1]
      : undefined

  const navigateToArtwork = useCallback(
    (nextArtworkId: string) => {
      void navigate(`/artworks/${nextArtworkId}`, {
        replace: true,
        state: navigationState,
      })
    },
    [navigate, navigationState],
  )

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch') {
      return
    }

    swipeStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const swipeStart = swipeStartRef.current
    swipeStartRef.current = null

    if (!swipeStart || swipeStart.pointerId !== event.pointerId) {
      return
    }

    const horizontalDistance = event.clientX - swipeStart.x
    const verticalDistance = event.clientY - swipeStart.y
    const isHorizontalSwipe =
      Math.abs(horizontalDistance) >= 60 &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.25

    if (!isHorizontalSwipe) {
      return
    }

    if (horizontalDistance > 0 && previousArtworkId) {
      navigateToArtwork(previousArtworkId)
    }

    if (horizontalDistance < 0 && nextArtworkId) {
      navigateToArtwork(nextArtworkId)
    }
  }

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

      if (event.key === 'ArrowLeft' && previousArtworkId) {
        navigateToArtwork(previousArtworkId)
      }

      if (event.key === 'ArrowRight' && nextArtworkId) {
        navigateToArtwork(nextArtworkId)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocusedElement?.focus()
    }
  }, [navigate, navigateToArtwork, nextArtworkId, previousArtworkId])

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

      <div
        className={styles.panel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartRef.current = null
        }}
      >
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close artwork viewer"
          onClick={() => navigate(-1)}
        >
          ×
        </button>

        <ArtworkPage
          isModal
          onPrevious={
            previousArtworkId
              ? () => navigateToArtwork(previousArtworkId)
              : undefined
          }
          onNext={
            nextArtworkId ? () => navigateToArtwork(nextArtworkId) : undefined
          }
        />
      </div>
    </div>
  )
}
