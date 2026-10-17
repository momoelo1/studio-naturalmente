import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router'
import logo from '../assets/logo-badge.jpg'

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

// Lotus-like blossom: an outer ring of petals and an inner ring set between them.
// Each petal starts a little later round the ring and gets small fixed differences
// in sway, drift and size, so they never move in lockstep.
const petals = ['outer', 'inner'].flatMap((ring, r) =>
  Array.from({ length: 8 }, (_, i) => ({
    key: `${ring}-${i}`,
    ring,
    style: {
      '--angle': `${i * 45 + r * 22.5}deg`,
      '--delay': `${r * 160 + i * 35 + ((i * 7) % 3) * 15}ms`,
      '--sway': `${(((i * 5) % 5) - 2) * 3}deg`,
      '--drift': `${(((i * 3) % 5) - 2) * 6}deg`,
      '--size': 0.94 + ((i * 7) % 5) * 0.03,
    },
  })),
)

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

  // Small logo: "is-open" starts the blossom (CSS). When the bar goes, the same animations
  // play backwards at double speed from wherever the blossom has got to, then the logo hides.
  // Classes are set directly because React never needs to re-render the logo for this.
  const logoRef = useRef(null)
  useEffect(() => {
    const el = logoRef.current
    if (scrolled) {
      if (el.classList.contains('is-closing')) {
        // Scrolled back down mid-close: blossom again from where it is
        el.classList.remove('is-closing')
        for (const animation of el.getAnimations({ subtree: true })) {
          animation.playbackRate = 1
          animation.play()
        }
      }
      el.classList.add('is-open')
      return
    }
    if (!el.classList.contains('is-open') || el.classList.contains('is-closing')) return

    el.classList.add('is-closing')
    // They all started together, so the one furthest along says where the blossom is; the
    // ones already done hold their last frame until the reverse reaches them
    const animations = el.getAnimations({ subtree: true })
    const now = Math.max(0, ...animations.map((a) => a.currentTime ?? 0))
    for (const animation of animations) {
      animation.playbackRate = -2
      animation.play()
      animation.currentTime = now
    }
    Promise.all(animations.map((a) => a.finished))
      .then(() => {
        if (el.classList.contains('is-closing')) el.classList.remove('is-open', 'is-closing')
      })
      .catch(() => {})
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
          {petals.map(({ key, ring, style }) => (
            <span key={key} className={`site-logo__petal site-logo__petal--${ring}`} style={style} />
          ))}
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
