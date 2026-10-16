function Split({ media, reverse = false, children }) {
  return (
    <div className={reverse ? 'split split--reverse' : 'split'}>
      <div className="split__text">{children}</div>
      <div className="split__media">{media}</div>
    </div>
  )
}

export default Split
