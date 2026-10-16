import Motif from './Motif'
import { courseGroups } from '../data/courses'

function CourseCards() {
  return (
    <ul className="course-grid">
      {courseGroups.map(({ id, title, motif, courses }) => (
        <li key={id} className={`course-card course-card--${id}`}>
          <Motif kind={motif} />
          <h3>{title}</h3>
          <ul>
            {courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default CourseCards
