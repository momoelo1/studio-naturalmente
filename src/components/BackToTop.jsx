import { useSyncExternalStore } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

function subscribe(onChange) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

function BackToTop({ afterId }) {
  const visible = useSyncExternalStore(subscribe, () => {
    const section = document.getElementById(afterId)
    return section ? section.getBoundingClientRect().bottom < window.innerHeight / 2 : false
  })

  return (
    <a
      className={visible ? 'back-to-top is-visible' : 'back-to-top'}
      href="#top"
      aria-label="Torna all’inizio della pagina"
    >
      <FaArrowUp aria-hidden="true" />
    </a>
  )
}

export default BackToTop
