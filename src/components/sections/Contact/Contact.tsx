import { useState } from 'react'
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
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
  }

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

          <button
            className="button contact-cta"
            type="button"
            onClick={copyEmail}
          >
            {copyStatus === 'copied'
              ? 'Email copied'
              : copyStatus === 'failed'
                ? 'Copy failed'
                : 'Copy email'}{' '}
            <Arrow />
          </button>

          <p className="contact-email-text">{site.email}</p>
        </div>

        <ul className="contact-links">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer">
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