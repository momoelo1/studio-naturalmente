function Section({ id, tone = 'cream', blobs = [], className = '', children }) {
  return (
    <section id={id} className={`section section--${tone} ${className}`.trim()}>
      {blobs.map(({ id: blobId, color, pos, top }) => (
        <span
          key={blobId ?? `${color}-${pos}`}
          className={`blob blob--${color} blob--${pos}${pos.startsWith('seam') ? ' blob--seam' : ''}`}
          style={top && { '--blob-top': top }}
          aria-hidden="true"
        />
      ))}
      <div className="section__inner">{children}</div>
    </section>
  )
}

export default Section
