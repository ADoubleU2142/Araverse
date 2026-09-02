import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { artworks } from '../../data/artworks'
import { publicCuration } from '../../data/publicCuration'
import { toSlug } from '../../utils/toSlug'

const staticTitles: Record<string, string> = {
  '/': 'Araverse',
  '/portfolio': 'Portfolio | Araverse',
  '/years': 'Years | Araverse',
  '/collections': 'Collections | Araverse',
  '/techniques': 'Techniques | Araverse',
}

function getDocumentTitle(pathname: string, search: string) {
  const staticTitle = staticTitles[pathname]

  if (staticTitle) {
    return staticTitle
  }

  if (pathname === '/search') {
    const query = new URLSearchParams(search).get('q')?.trim()
    return query ? `Search: ${query} | Araverse` : 'Search | Araverse'
  }

  const [, section, identifier] = pathname.split('/')

  if (section === 'years' && identifier) {
    return publicCuration.years.includes(Number(identifier))
      ? `${identifier} | Araverse`
      : 'Year unavailable | Araverse'
  }

  if (section === 'techniques' && identifier) {
    const technique = publicCuration.techniques.find(
      (item) => toSlug(item) === identifier,
    )
    return technique
      ? `${technique} | Araverse`
      : 'Technique unavailable | Araverse'
  }

  if (section === 'collections' && identifier) {
    const collection = publicCuration.collections.find(
      (item) => toSlug(item) === identifier,
    )
    return collection
      ? `${collection} | Araverse`
      : 'Collection unavailable | Araverse'
  }

  if (section === 'artworks' && identifier) {
    const artwork = artworks.find(
      (item) =>
        item.id === identifier &&
        item.visibility === 'public' &&
        item.contentLevel !== 'mature',
    )

    if (!artwork) {
      return 'Artwork unavailable | Araverse'
    }

    return `${artwork.title ?? artwork.source ?? `Untitled, ${artwork.year}`} | Araverse`
  }

  return 'Page not found | Araverse'
}

export function DocumentTitle() {
  const location = useLocation()

  useEffect(() => {
    document.title = getDocumentTitle(location.pathname, location.search)
  }, [location.pathname, location.search])

  return null
}
