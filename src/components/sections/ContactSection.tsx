import { site } from '../../data/site'
import { Arrow } from '../ui/Arrow'
import { SectionLabel } from '../ui/SectionLabel'


export function ContactSection() {
  return (
    <section className="contact section" id="contact">
      <SectionLabel number="04">
        Have an opportunity
        <br />
        or interesting problem?
      </SectionLabel>

      <div className="contact-content">
        <h2>
          Let’s connect <em>→</em>
        </h2>

        <a
          className="contact-email"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>

        <div className="social-links">
          <a href={site.github}>
            GitHub <Arrow />
          </a>

          <a href={site.linkedin}>
            LinkedIn <Arrow />
          </a>

          <a href={site.resume}>
            Resume <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}