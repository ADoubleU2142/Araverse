import { Component, type ErrorInfo, type ReactNode } from 'react'
import styles from './AppErrorBoundary.module.css'

interface AppErrorBoundaryProps {
  children: ReactNode
}

interface AppErrorBoundaryState {
  hasError: boolean
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Araverse rendering error', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main className={styles.page}>
        <section className={styles.message} aria-labelledby="error-title">
          <p className={styles.eyebrow}>Something went wrong</p>
          <h1 className={styles.title} id="error-title">
            Araverse could not display this page.
          </h1>
          <p className={styles.description}>
            Your data has not been changed. Reload the application or return to
            the home page and try again.
          </p>

          <div className={styles.actions}>
            <button
              className={styles.primaryAction}
              type="button"
              onClick={() => window.location.reload()}
            >
              Reload application
            </button>
            <a className={styles.secondaryAction} href="/">
              Return home
            </a>
          </div>
        </section>
      </main>
    )
  }
}
