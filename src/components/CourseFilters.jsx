import { useEffect, useId, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { courseGroups, timeBands } from '../data/courses'

const types = [
  { id: 'all', label: 'Tutti' },
  ...courseGroups.map(({ id, title }) => ({ id, label: title, dot: true })),
]
const times = [{ id: 'all', label: 'Qualsiasi orario' }, ...timeBands]

// A button showing the current choice, opening a panel of options. While open it slides to
// the centre of the toolbar (the other dropdown fades out, in CSS). A choice, Escape or a
// click elsewhere closes it; the arrow keys move between options.
function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)
  const id = useId()
  const current = options.find((option) => option.id === value)

  useEffect(() => {
    if (!open) return
    const root = rootRef.current
    // offsetLeft ignores the slide itself, so this stays right on resize
    const centre = () => {
      const toolbar = root.offsetParent
      const shift = toolbar.clientWidth / 2 - (root.offsetLeft + root.offsetWidth / 2)
      root.style.setProperty('--shift', `${shift}px`)
    }
    centre()
    root.querySelector('.dropdown__option[aria-pressed="true"]')?.focus()
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current.focus()
    }
    const onOutside = (event) => {
      if (!root.contains(event.target)) setOpen(false)
    }
    window.addEventListener('resize', centre)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    document.addEventListener('focusin', onOutside)
    return () => {
      window.removeEventListener('resize', centre)
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      document.removeEventListener('focusin', onOutside)
    }
  }, [open])

  function choose(optionId) {
    setOpen(false)
    buttonRef.current.focus()
    if (optionId !== value) onChange(optionId)
  }

  function onPanelKey(event) {
    const items = [...rootRef.current.querySelectorAll('.dropdown__option')]
    const at = items.indexOf(document.activeElement)
    const next = { ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: items.length - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    items[(next + items.length) % items.length].focus()
  }

  return (
    <div ref={rootRef} className={open ? 'dropdown is-open' : 'dropdown'}>
      <span className="dropdown__label" id={`${id}-label`}>
        {label}
      </span>
      <button
        ref={buttonRef}
        type="button"
        className="dropdown__button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {current.dot && <span className={`dropdown__dot dropdown__dot--${current.id}`} aria-hidden="true" />}
        <span className="dropdown__value" id={`${id}-value`}>
          {current.label}
        </span>
        <FaChevronDown className="dropdown__chevron" aria-hidden="true" />
      </button>
      <div
        id={`${id}-panel`}
        className="dropdown__panel"
        role="group"
        aria-labelledby={`${id}-label`}
        onKeyDown={onPanelKey}
      >
        {options.map(({ id: optionId, label: optionLabel, dot }, i) => (
          <button
            key={optionId}
            type="button"
            className="dropdown__option"
            style={{ '--i': i }}
            aria-pressed={optionId === value}
            tabIndex={open ? 0 : -1}
            onClick={() => choose(optionId)}
          >
            {dot && <span className={`dropdown__dot dropdown__dot--${optionId}`} aria-hidden="true" />}
            {optionLabel}
          </button>
        ))}
      </div>
    </div>
  )
}

// Course type and time of day, side by side
function CourseFilters({ filters, onChange }) {
  return (
    <div className="course-filters">
      <Dropdown
        label="Tipo di corso"
        options={types}
        value={filters.group}
        onChange={(group) => onChange({ group })}
      />
      <Dropdown label="Orario" options={times} value={filters.band} onChange={(band) => onChange({ band })} />
    </div>
  )
}

export default CourseFilters
