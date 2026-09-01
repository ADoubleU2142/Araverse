import { NavLink } from 'react-router'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <p className={styles.code}>404</p>
      <h1 className={styles.title} id="not-found-title">
        This page wandered outside the archive.
      </h1>
      <p className={styles.description}>
        The address may be incorrect, or the page may no longer exist.
      </p>

      <div className={styles.actions}>
        <NavLink className={styles.primaryAction} to="/portfolio">
          Browse portfolio
        </NavLink>
        <NavLink className={styles.secondaryAction} to="/">
          Return home
        </NavLink>
      </div>
    </section>
  )
}
