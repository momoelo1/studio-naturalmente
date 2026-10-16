import { Link } from 'react-router'
import { FaArrowRight } from 'react-icons/fa6'
import Section from '../components/Section'
import Brush from '../components/Brush'
import logo from '../assets/logo-badge.jpg'

const blobs = [
  { color: 'blush', pos: 'tr' },
  { color: 'leaf', pos: 'br' },
  { color: 'terracotta', pos: 'bl' },
]

function Hero() {
  return (
    <Section id="top" tone="cream" blobs={blobs} className="hero">
      <div className="hero__mark">
        <span className="hero__orbit" aria-hidden="true" />
        <img className="hero__logo" src={logo} alt="Studio Naturalmente" width="520" height="520" />
      </div>
      <h1>
        Più di uno studio, <em>una casa</em> per stare bene.
      </h1>
      <Brush />
      <div className="actions">
        <Link className="btn btn--ghost" to="/#orario">
          Il nostro studio
          <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
      <span className="hero__cue" aria-hidden="true">
        Scorri
      </span>
    </Section>
  )
}

export default Hero
