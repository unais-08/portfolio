import { site } from '../../data/site'
import { SocialIcon } from '../ui/SocialIcon'

export function Footer() {
  return <footer className="site-footer">
    <span>© 2026 Unais</span>
    <div><a href={site.github} target="_blank" rel="noreferrer"><SocialIcon name="github" />GitHub</a><a href={`mailto:${site.email}`}><SocialIcon name="email" />Email</a><time dateTime="2026-10-12">Last updated Oct 12, 2026</time></div>
  </footer>
}
