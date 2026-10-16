import { FaEnvelope, FaFacebookF, FaInstagram, FaLocationDot, FaWhatsapp } from 'react-icons/fa6'
import Section from '../components/Section'
import { contacts } from '../data/contacts'

const blobs = [
  { color: 'leaf', pos: 'tr' },
  { color: 'sage', pos: 'bl' },
]

function Contacts() {
  return (
    <Section id="contatti" tone="green" blobs={blobs}>
      <p className="eyebrow">Contatti</p>
      <h2 className="section__title">Vieni a trovarci.</h2>

      <div className="contact-columns">
        <address className="contact">
          <p className="contact__name">{contacts.name}</p>
          <ul className="contact__list">
            <li>
              <a href={contacts.maps} target="_blank" rel="noreferrer">
                <span className="icon icon--plain">
                  <FaLocationDot aria-hidden="true" />
                </span>
                {contacts.address}
              </a>
            </li>
            <li>
              <a href={contacts.whatsapp} target="_blank" rel="noreferrer">
                <span className="icon icon--whatsapp">
                  <FaWhatsapp aria-hidden="true" />
                </span>
                {contacts.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`}>
                <span className="icon icon--plain">
                  <FaEnvelope aria-hidden="true" />
                </span>
                {contacts.email}
              </a>
            </li>
          </ul>
        </address>

        <div>
          <ul className="socials">
            <li>
              <a
                className="icon icon--instagram"
                href={contacts.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                className="icon icon--facebook"
                href={contacts.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
            </li>
          </ul>

          <div className="actions">
            <a className="btn btn--light" href={contacts.booking} target="_blank" rel="noreferrer">
              Prenota la tua lezione
            </a>
          </div>
        </div>
      </div>

      <p className="copyright">© 2026 {contacts.name}</p>
    </Section>
  )
}

export default Contacts
