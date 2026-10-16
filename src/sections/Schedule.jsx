import { useState } from 'react'
import Section from '../components/Section'
import { days } from '../data/schedule'
import { contacts } from '../data/contacts'

const blobs = [{ color: 'leaf', pos: 'bl' }]

function todayId() {
  return days[(new Date().getDay() + 6) % 7].id
}

function Schedule() {
  const [activeId, setActiveId] = useState(todayId)
  const day = days.find(({ id }) => id === activeId)

  return (
    <Section id="orario" tone="sage" blobs={blobs}>
      <p className="eyebrow">Calendario corsi 2026 · 2027</p>
      <h2 className="section__title">Orario settimanale</h2>

      <div className="day-tabs" role="group" aria-label="Giorno della settimana">
        {days.map(({ id, short, name }) => (
          <button
            key={id}
            type="button"
            className="day-tab"
            aria-pressed={id === activeId}
            onClick={() => setActiveId(id)}
          >
            <span className="day-tab__short" aria-hidden="true">
              {short}
            </span>
            <span className="day-tab__name">{name}</span>
          </button>
        ))}
      </div>

      {day.classes.length > 0 ? (
        <ul className="slots">
          {day.classes.map(({ time, name, teacher, online, note }) => (
            <li key={`${time}-${name}`} className="slot">
              <span className="slot__time">{time}</span>
              <div>
                <p className="slot__name">{name}</p>
                <p className="slot__meta">
                  con {teacher}
                  {note && ` · ${note}`}
                  {online && <span className="badge">anche online</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="slots slots--empty">{day.empty}</p>
      )}

      <div className="actions">
        <a className="btn" href={contacts.booking} target="_blank" rel="noreferrer">
          Prenota la tua lezione
        </a>
      </div>
    </Section>
  )
}

export default Schedule
