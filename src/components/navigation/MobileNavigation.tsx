import { useEffect, useRef } from 'react'
import { NavLink, useMatch } from 'react-router'
import styles from './MobileNavigation.module.css'

export function MobileNavigation() {
  const browseMenuRef = useRef<HTMLDetailsElement>(null)
  const yearsMatch = useMatch('/years/*')
  const collectionsMatch = useMatch('/collections/*')
  const techniquesMatch = useMatch('/techniques/*')
  const isBrowseActive = Boolean(
    yearsMatch || collectionsMatch || techniquesMatch,
  )

  function closeBrowseMenu() {
    browseMenuRef.current?.removeAttribute('open')
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        browseMenuRef.current?.open &&
        !browseMenuRef.current.contains(event.target as Node)
      ) {
        closeBrowseMenu()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <nav className={styles.navigation} aria-label="Mobile navigation">
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
        }
        to="/"
        end
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
        }
        to="/portfolio"
      >
        Portfolio
      </NavLink>

      <details
        className={styles.browseMenu}
        ref={browseMenuRef}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            closeBrowseMenu()
            browseMenuRef.current?.querySelector('summary')?.focus()
          }
        }}
      >
        <summary
          className={`${styles.navLink} ${isBrowseActive ? styles.activeNavLink : ''}`}
        >
          Browse
        </summary>

        <div className={styles.browseOptions}>
          <NavLink to="/years" onClick={closeBrowseMenu}>
            Years
          </NavLink>
          <NavLink to="/collections" onClick={closeBrowseMenu}>
            Collections
          </NavLink>
          <NavLink to="/techniques" onClick={closeBrowseMenu}>
            Techniques
          </NavLink>
        </div>
      </details>

      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
        }
        to="/search"
        state={{ focusSearch: true }}
      >
        Search
      </NavLink>
    </nav>
  )
}
