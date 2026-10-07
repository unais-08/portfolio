import { site } from '../data/site'

export function Footer() {
  return <footer className="site-footer">
    <span>© 2026 Unais</span>
    <div><a href={site.github}>GitHub</a><a href={`mailto:${site.email}`}>Email</a><span>Built with React + TypeScript</span></div>
  </footer>
}
