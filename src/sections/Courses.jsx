import { Link } from "react-router";
import Section from "../components/Section";

const blobs = [{ color: "sage", pos: "tr" }];

function Courses() {
  return (
    <Section id="corsi" tone="blush" blobs={blobs}>
      <p className="eyebrow">I corsi</p>
      <h2 className="section__title">
        Dalla prima lezione alla pratica quotidiana, accompagnati da Noi.
      </h2>
      <p className="section__lead">
        Qui ogni insegnante ti conosce per nome, segue i tuoi progressi e ti
        porta un passo più avanti ogni settimana.
      </p>
      <div className="actions">
        <Link className="btn" to="/corsi">
          Scopri i corsi
        </Link>
      </div>
    </Section>
  );
}

export default Courses;
