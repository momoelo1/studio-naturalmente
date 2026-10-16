import BackToTop from '../components/BackToTop'
import Hero from '../sections/Hero'
import Courses from '../sections/Courses'
import Schedule from '../sections/Schedule'
import Treatments from '../sections/Treatments'
import Events from '../sections/Events'
import Contacts from '../sections/Contacts'

function Home() {
  return (
    <>
      <main>
        <Hero />
        <Courses />
        <Schedule />
        <Treatments />
        <Events />
        <Contacts />
      </main>
      <BackToTop afterId="orario" />
    </>
  )
}

export default Home
