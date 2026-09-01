import { NavLink, type To } from 'react-router'
import styles from './MetadataPills.module.css'

interface MetadataPillsProps {
  items: string[]
  getTo: (item: string) => To
  getAriaLabel: (item: string) => string
}

export function MetadataPills({
  items,
  getTo,
  getAriaLabel,
}: MetadataPillsProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>
          <NavLink
            className={styles.pill}
            to={getTo(item)}
            aria-label={getAriaLabel(item)}
          >
            {item}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
