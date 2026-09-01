import { NavLink } from 'react-router'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <p className={styles.eyebrow}>Personal art archive · Since 2015</p>

      <h1 className={styles.title} id="home-title">
        An evolving archive of art,{' '}
        <span className={styles.highlight}>curated with intention.</span>
      </h1>

      <p className={styles.introduction}>
        Araverse brings together more than a decade of traditional and digital
        artwork in one private archive with a carefully selected public
        portfolio.
      </p>

      <div className={styles.actions}>
        <NavLink className={styles.primaryAction} to="/portfolio">
          Explore portfolio
        </NavLink>

        <p className={styles.archiveSummary}>
          <strong>400</strong>
          <span>artworks since 2015</span>
        </p>
      </div>
    </section>
  )
}
