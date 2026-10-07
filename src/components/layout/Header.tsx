import { useState } from 'react'
import { site } from '../../data/site'
import { Arrow } from '../ui/Arrow'

export function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="/"
        onClick={close}
        aria-label="Unais home"
      >
        U<span>.</span>
      </a>

      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="main-nav"
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <i aria-hidden="true">{open ? '×' : '☰'}</i>
      </button>

      <nav
        id="main-nav"
        className={open ? 'main-nav is-open' : 'main-nav'}
        aria-label="Main navigation"
      >
        <a href={detail ? '/#work' : '#work'} onClick={close}>
          Work
        </a>

        <a href={detail ? '/#about' : '#about'} onClick={close}>
          About
        </a>

        <a href={detail ? '/#contact' : '#contact'} onClick={close}>
          Contact
        </a>

        <a
          className="button nav-contact"
          href={site.resume}
          onClick={close}
        >
          Resume <Arrow />
        </a>
      </nav>
    </header>
  )
}
