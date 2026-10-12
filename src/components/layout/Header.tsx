import { useState } from 'react'
import { site } from '../../data/site'
import { Arrow } from '../ui/Arrow'

export function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  const toggleTheme = () => {
    const nextIsDark = !isDark
    setIsDark(nextIsDark)
    if (nextIsDark) {
      document.documentElement.dataset.theme = 'dark'
    } else {
      delete document.documentElement.dataset.theme
    }
    try {
      window.localStorage.setItem('portfolio-theme', nextIsDark ? 'dark' : 'light')
    } catch {
      // The theme still changes for this visit if storage is unavailable.
    }
  }

  const themeToggle = (className: string) => (
    <button
      className={className}
      type="button"
      onClick={toggleTheme}
      aria-label={`Theme is ${isDark ? 'dark' : 'light'}. Switch to ${isDark ? 'light' : 'dark'} theme.`}
      aria-pressed={isDark}
    >
      <span className="theme-toggle-label">Theme</span>
      <span className="theme-toggle-value">{isDark ? 'Dark' : 'Light'}</span>
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  )

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
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
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

        {themeToggle('theme-toggle mobile-theme-toggle')}

        <a
          className="button nav-contact"
          href={site.resume}
          target="_blank"
          rel="noreferrer"
          onClick={close}
        >
          Resume <Arrow />
        </a>
        {themeToggle('theme-toggle desktop-theme-toggle')}
      </nav>
    </header>
  )
}
