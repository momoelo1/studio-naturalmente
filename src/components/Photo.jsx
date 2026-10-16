function Photo({ src, alt = '', ratio = 'portrait', hint = 'Foto', loading = 'lazy' }) {
  const className = `photo photo--${ratio}`

  if (!src) {
    return <div className={`${className} photo--placeholder`}>{hint}</div>
  }

  return <img className={className} src={src} alt={alt} loading={loading} />
}

export default Photo
