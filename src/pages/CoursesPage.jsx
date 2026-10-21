import { Link } from 'react-router'
import Section from '../components/Section'
import Brush from '../components/Brush'
import CourseCards from '../components/CourseCards'
import Contacts from '../sections/Contacts'
import { contacts } from '../data/contacts'

// Seam bubbles carry on from one section into the next (see .blob--seam in App.css)
const blobs = [
  { color: 'sage', pos: 'tr' },
  { color: 'blush', pos: 'seam-bl' },
]
const ctaBlobs = [
  { color: 'mustard', pos: 'seam-tl' },
  { color: 'sage', pos: 'seam-br' },
]

function CoursesPage() {
  return (
    <main>
      <Section id="top" tone="cream" blobs={blobs} className="page-top courses-hero">
        <h1 className="courses-hero__title">
          I <em>Corsi</em>
          <Brush />
        </h1>
        <p className="section__lead">
          Qui ogni insegnante ti conosce per nome, segue i tuoi progressi e ti
          porta un passo più avanti ogni settimana. Scopri i Corsi:
          
        </p>
      </Section>

      {/* Its own section, so the bubbles can follow the number of cards shown */}
      <CourseCards />

      <Section tone="cream" blobs={ctaBlobs} className="courses-cta">
        <h2 className="section__title">
          Il tuo <em>momento</em> può iniziare da qui
        </h2>
        <Brush />
        <div className="actions">
          <Link className="btn" to="/#orario">
            Guarda l’orario
          </Link>
          <a className="btn btn--ghost" href={contacts.booking} target="_blank" rel="noreferrer">
            Prenota la tua lezione
          </a>
        </div>
      </Section>
      <Contacts />
    </main>
  )
}

export default CoursesPage
