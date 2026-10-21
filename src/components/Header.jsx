import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router'
import logo from '../assets/logo-badge.jpg'
import { createBlossom, petals } from './blossom'

// Sections link to /#id. A link that stands for a whole page names it in `page`, and is
// left out of the menu while that page is open.
const links = [
  { label: 'Home', to: '/', page: '/' },
  { id: 'corsi', label: 'Corsi', page: '/corsi' },
  { id: 'orario', label: 'Orario' },
  { id: 'stanze', label: 'Stanze del benessere' },
  { id: 'eventi', label: 'Eventi' },
  { id: 'contatti', label: 'Contatti' },
]

function subscribe(onChange) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

function Header() {
  const [open, setOpen] = useState(false)
  // Glass bar and small logo show when the page's first content reaches the menu button
  // (the nav links on desktop): the hero's big logo on home, the top section's content on
  // inner pages; on any other page, after a fifth of a screen
  const toggleRef = useRef(null)
  const navListRef = useRef(null)
  const scrolled = useSyncExternalStore(subscribe, () => {
    const marker = document.querySelector('.hero__logo, .page-top .section__inner')
    if (!marker) return window.scrollY > window.innerHeight * 0.2
    const control = toggleRef.current?.offsetParent ? toggleRef.current : navListRef.current
    if (!control) return false
    return marker.getBoundingClientRect().top <= control.getBoundingClientRect().bottom
  })

  // Small logo: blossoms when the bar appears and plays the blossom backwards when it goes,
  // from wherever it has got to (blossom.js). React never re-renders the logo for this.
  const logoRef = useRef(null)
  const blossomRef = useRef(null)
  useEffect(() => {
    const blossom = createBlossom(logoRef.current)
    blossomRef.current = blossom
    return () => blossom.destroy()
  }, [])
  useEffect(() => {
    blossomRef.current.toward(scrolled)
  }, [scrolled])

  // Section crossing the middle of the screen; the hero/page top ("top") clears it
  const { pathname } = useLocation()
  const [active, setActive] = useState(null)
  useEffect(() => {
    const sections = ['top', ...links.map(({ id }) => id)]
      .map((id) => id && document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])
  const menu = links.filter(({ page }) => page !== pathname)

  // Open menu: Escape closes it, and the page behind stays put
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [open])

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <Link ref={logoRef} className="site-logo" to="/">
        <span className="site-logo__flower" aria-hidden="true">
          {petals.map(({ key, ring }) => (
            <span key={key} className={`site-logo__petal site-logo__petal--${ring}`} />
          ))}
          <span className="site-logo__heart" />
        </span>
        <img src={logo} alt="Studio Naturalmente" width="520" height="520" />
      </Link>

      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span className="nav-toggle__icon" aria-hidden="true">
          <span />
          <span />
        </span>
        {open ? 'Chiudi' : 'Menu'}
      </button>

      <nav
        id="site-nav"
        className={open ? 'site-nav is-open' : 'site-nav'}
        aria-label="Sezioni del sito"
      >
        <ul ref={navListRef}>
          {menu.map(({ id, label, to }, i) => (
            <li key={label} style={{ '--i': i }}>
              <Link
                to={to ?? `/#${id}`}
                aria-current={id && active === id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="site-nav__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
