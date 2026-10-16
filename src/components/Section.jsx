function Section({ id, tone = 'cream', blobs = [], className = '', children }) {
  return (
    <section id={id} className={`section section--${tone} ${className}`.trim()}>
      {blobs.map(({ color, pos }) => (
        <span
          key={`${color}-${pos}`}
          className={`blob blob--${color} blob--${pos}`}
          aria-hidden="true"
        />
      ))}
      <div className="section__inner">{children}</div>
    </section>
  )
}

export default Section
