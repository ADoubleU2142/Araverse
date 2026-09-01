import { NavLink, Outlet } from 'react-router'
import { MobileNavigation } from '../components/navigation/MobileNavigation'
import { ScrollToTop } from '../components/navigation/ScrollToTop'
import styles from './AppShell.module.css'

export function AppShell() {
  return (
    <div className={styles.shell}>
      <ScrollToTop />

      <header className={styles.header}>
        <NavLink className={styles.brand} to="/" aria-label="Araverse home">
          Araverse
        </NavLink>

        <nav className={styles.navigation} aria-label="Primary navigation">
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
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
            }
            to="/years"
          >
            Years
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
            }
            to="/collections"
          >
            Collections
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
            }
            to="/techniques"
          >
            Techniques
          </NavLink>
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

        <MobileNavigation />

        <span className={styles.mode}>Guest portfolio</span>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <small>Artwork archive since 2015</small>
      </footer>
    </div>
  )
}
