import { Link } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa6'
import Section from '../components/Section'
import CourseCards from '../components/CourseCards'
import Contacts from '../sections/Contacts'
import { contacts } from '../data/contacts'

const blobs = [
  { color: 'sage', pos: 'tr' },
  { color: 'blush', pos: 'bl' },
]

function CoursesPage() {
  return (
    <main>
      <Section id="top" tone="cream" blobs={blobs} className="page-top">
        <Link className="btn btn--ghost btn--back" to="/">
          <FaArrowLeft aria-hidden="true" />
          Torna alla home
        </Link>
        <p className="eyebrow">I corsi</p>
        <h1 className="section__title">I nostri corsi</h1>
        <p className="section__lead">
          Yoga, maternità, movimento e meditazione. In presenza e online.
        </p>
        <CourseCards />
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
