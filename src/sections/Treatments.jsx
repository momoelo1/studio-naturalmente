import { FaWhatsapp } from 'react-icons/fa6'
import Section from '../components/Section'
import { treatments } from '../data/treatments'
import { contacts } from '../data/contacts'

const blobs = [{ color: 'plum', pos: 'tr' }]

function Treatments() {
  return (
    <Section id="stanze" tone="sand" blobs={blobs}>
      <p className="eyebrow">Trattamenti individuali</p>
      <h2 className="section__title">Le stanze del benessere</h2>
      <p className="section__lead">
        Un momento per te: trattamenti su appuntamento con operatori olistici qualificati.
      </p>
      <ul className="chips">
        {treatments.map((treatment) => (
          <li key={treatment}>{treatment}</li>
        ))}
      </ul>
      <div className="actions">
        <a className="btn" href={contacts.whatsapp} target="_blank" rel="noreferrer">
          <FaWhatsapp aria-hidden="true" />
          Scrivici su WhatsApp
        </a>
      </div>
    </Section>
  )
}

export default Treatments
