import type { Artwork } from '../types/artwork'

function normalizeSearchValue(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()
}

export function searchArtworks(artworks: Artwork[], query: string) {
  const normalizedQuery = normalizeSearchValue(query)

  if (!normalizedQuery) {
    return []
  }

  return artworks.filter((artwork) => {
    const searchableValues = [
      artwork.title ?? '',
      artwork.note ?? '',
      artwork.source ?? '',
      ...artwork.subjects,
    ]

    return searchableValues.some((value) =>
      normalizeSearchValue(value).includes(normalizedQuery),
    )
  })
}
