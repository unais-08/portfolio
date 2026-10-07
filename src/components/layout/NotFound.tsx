import { Footer } from './Footer'
import { Header } from './Header'

export function NotFound() {
  return <>
    <Header />
    <main className="not-found">
      <span className="eyebrow">404</span>
      <h1>This page doesn’t exist.</h1>
      <a className="button button-dark" href="/">← Back home</a>
    </main>
    <Footer />
  </>
}
