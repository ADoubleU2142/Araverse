import type { Artwork } from '../types/artwork'

export function isGuestVisibleArtwork(artwork: Artwork) {
  return artwork.visibility === 'public' && artwork.contentLevel !== 'mature'
}

export function sortArtworks(artworks: Artwork[]) {
  return artworks.toSorted((first, second) =>
    first.sortOrder === second.sortOrder
      ? first.id.localeCompare(second.id)
      : first.sortOrder - second.sortOrder,
  )
}

export function getGuestVisibleArtworks(artworks: Artwork[]) {
  return sortArtworks(artworks.filter(isGuestVisibleArtwork))
}
