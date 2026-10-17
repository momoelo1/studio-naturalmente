import { Link } from "react-router";
import Section from "../components/Section";
import { courseGroups } from "../data/courses";

const blobs = [
  { color: "sage", pos: "seam-tr" }, // continues from the hero
  { color: "cream", pos: "bl" },
];
const yoga = courseGroups.find(({ id }) => id === "yoga");

function Courses() {
  return (
    <Section id="corsi" tone="blush" blobs={blobs}>
      <h2 className="section__title">
        Dalla prima lezione alla pratica quotidiana, accompagnati da Noi.
      </h2>
      {/* Every yoga course leads to the courses page */}
      <ul className="course-links">
        {yoga.courses.map((course, i) => (
          <li key={course} style={{ "--i": i }}>
            <Link to="/corsi">
              <span className="course-links__drop" aria-hidden="true" />
              {course}
            </Link>
          </li>
        ))}
      </ul>
      <div className="actions">
        <Link className="btn" to="/corsi">
          Scopri i corsi
        </Link>
      </div>
    </Section>
  );
}

export default Courses;
