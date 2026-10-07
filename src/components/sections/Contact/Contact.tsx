import { site } from '../../../data/site'
import { Arrow } from '../../ui/Arrow'
import { SectionLabel } from '../../ui/SectionLabel'
import './Contact.css'

const links = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'Resume', href: site.resume },
]

export function ContactSection() {
  return (
    <section className="contact-section section" id="contact">
      <SectionLabel number="04">Contact</SectionLabel>

      <div className="contact-panel">
        <div className="contact-main">
          <p className="contact-status">
            <span className="status-dot" />
            Open to SDE and full-stack roles
          </p>

          <h2>
          Have a role or an interesting problem? <mark>Let’s talk.</mark>
          </h2>

          <a className="button contact-cta" href={`mailto:${site.email}`}>
            Send an email <Arrow />
          </a>

          <p className="contact-email-text">{site.email}</p>
        </div>

        <ul className="contact-links">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>
                {label}
                <span className="contact-link-arrow">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}