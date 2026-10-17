import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { FaArrowRight } from 'react-icons/fa6'
import Section from './Section'
import Photo from './Photo'
import CourseFilters from './CourseFilters'
import { courses } from '../data/courses'

// Placeholder copy until the studio sends a category and a description for each course
const placeholder = {
  category: 'Lorem ipsum',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
}

const noFilters = { group: 'all', band: 'all' }

// Seam bubbles carry on from the hero above and into the closing section below. In between,
// one side bubble for every three cards shown, spread evenly down alternate sides, so a long
// list is as filled as a short one.
const sideColors = ['sage', 'terracotta', 'plum', 'leaf']

function bubblesFor(cardCount) {
  const sides = Math.ceil(cardCount / 3)
  return [
    { color: 'blush', pos: 'seam-tl' },
    ...Array.from({ length: sides }, (_, k) => ({
      id: `side-${k}`,
      color: sideColors[k % sideColors.length],
      pos: k % 2 ? 'ml' : 'mr',
      top: `${10 + ((k + 0.5) / sides) * 80}%`,
    })),
    { color: 'mustard', pos: 'seam-bl' },
  ]
}

function reducedMotion() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches
}

// The filters, then one card per matching course, coloured by its family
function CourseCards() {
  const [filters, setFilters] = useState(noFilters)
  const gridRef = useRef(null)

  const visible = courses.filter(
    ({ group, bands }) =>
      (filters.group === 'all' || group === filters.group) &&
      (filters.band === 'all' || bands.includes(filters.band)),
  )

  // Filter changes glide the cards to their new places where the browser supports it
  function update(change) {
    const apply = () => setFilters((current) => ({ ...current, ...change }))
    if (!document.startViewTransition || reducedMotion()) return apply()
    document.startViewTransition(() => flushSync(apply))
  }

  // Cards unroll once they scroll into view (data-in). Cards arriving together are numbered
  // left to right, top to bottom (--stagger), so they come in one after another.
  useEffect(() => {
    const cards = [...gridRef.current.querySelectorAll('.course-card:not([data-in])')]
    if (reducedMotion()) {
      cards.forEach((card) => card.setAttribute('data-in', ''))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter(({ isIntersecting }) => isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left,
          )
          .forEach(({ target }, n) => {
            target.style.setProperty('--stagger', n)
            target.setAttribute('data-in', '')
            observer.unobserve(target)
          })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [filters])

  return (
    <Section tone="cream" blobs={bubblesFor(visible.length)} className="course-list">
      <div className="course-toolbar">
        <CourseFilters filters={filters} onChange={update} />
        <p className="course-results" aria-live="polite">
          {visible.length === 1 ? '1 corso' : `${visible.length} corsi`}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul ref={gridRef} className="course-grid">
          {visible.map(({ id, name, group }) => (
            <li key={id} className={`course-card course-card--${group}`} style={{ viewTransitionName: id }}>
              <Photo ratio="landscape" />
              <div className="course-card__body">
                <p className="course-card__category">{placeholder.category}</p>
                <h2>{name}</h2>
                <p className="course-card__text">{placeholder.text}</p>
                {/* No destination yet: there are no single-course pages */}
                <button type="button" className="btn course-card__more">
                  Scopri di più
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div ref={gridRef} className="course-empty">
          <p>Nessun corso corrisponde ai filtri scelti.</p>
          <button type="button" className="btn btn--ghost" onClick={() => update(noFilters)}>
            Azzera filtri
          </button>
        </div>
      )}
    </Section>
  )
}

export default CourseCards
