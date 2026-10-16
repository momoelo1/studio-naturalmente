import Section from '../components/Section'
import { events } from '../data/events'

const blobs = [{ color: 'terracotta', pos: 'br' }]

function Events() {
  return (
    <Section id="eventi" tone="mustard" blobs={blobs}>
      <p className="eyebrow">Masterclass ed eventi</p>
      <h2 className="section__title">Fermati. Ascolta.</h2>
      <p className="section__lead">
        Masterclass, workshop, teacher training, eventi e concerti in studio.
      </p>
      <ul className="event-grid">
        {events.map(({ title, when, who, text }) => (
          <li key={title} className="event-card">
            <p className="event-card__when">{when}</p>
            <h3>{title}</h3>
            <p className="event-card__who">{who}</p>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Events
