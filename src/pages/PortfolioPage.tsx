import { ArtworkGallery } from '../components/artwork/ArtworkGallery'
import { artworks } from '../data/artworks'
import { getGuestVisibleArtworks } from '../data/artworkSelectors'
import styles from './PortfolioPage.module.css'

export function PortfolioPage() {
  const portfolioArtworks = getGuestVisibleArtworks(artworks).filter(
    (artwork) => artwork.isPortfolio,
  )

  return (
    <section className={styles.page} aria-labelledby="portfolio-title">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Curated selection</p>
          <h1 className={styles.title} id="portfolio-title">
            Portfolio
          </h1>
        </div>

        <p className={styles.introduction}>
          A focused selection of traditional and digital artwork from the
          archive.
        </p>
      </header>

      <ArtworkGallery
        artworks={portfolioArtworks}
        label="Portfolio artworks"
        sourceLabel="portfolio"
      />
    </section>
  )
}
