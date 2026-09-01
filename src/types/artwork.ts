export type ContentLevel = 'safe' | 'sensitive' | 'mature'

export type ArtworkVisibility = 'public' | 'private'

export type GiftType = 'none' | 'regular' | 'personal'

export type ColorMode = 'color' | 'black-and-white' | 'black-and-white-accent'

export interface Artwork {
  id: string
  imageSrc: string
  alt: string
  year: number
  contentLevel: ContentLevel
  visibility: ArtworkVisibility
  giftType: GiftType
  isFavorite: boolean
  isPortfolio: boolean
  sortOrder: number
  exactDate?: string
  title?: string
  note?: string
  colorMode?: ColorMode
  techniques: string[]
  subjects: string[]
  collections: string[]
}
