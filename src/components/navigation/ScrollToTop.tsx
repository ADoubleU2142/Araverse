import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [navigationType, pathname])

  return null
}
