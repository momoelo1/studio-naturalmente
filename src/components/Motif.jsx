const shapes = {
  breath: (
    <>
      <path className="motif__a" d="M32 6c13 15 17 26 0 50C15 32 19 21 32 6z" />
      <path className="motif__b" d="M32 24c6 8 8 13 0 25-8-12-6-17 0-25z" />
    </>
  ),
  duo: (
    <>
      <circle className="motif__a" cx="27" cy="37" r="19" />
      <circle className="motif__b" cx="48" cy="16" r="8" />
    </>
  ),
  wave: (
    <>
      <path className="motif__a" d="M4 24q7-14 14 0t14 0 14 0 14 0" />
      <path className="motif__b" d="M4 42q7-14 14 0t14 0 14 0 14 0" />
    </>
  ),
  rings: (
    <>
      <circle className="motif__a" cx="32" cy="32" r="8" />
      <circle className="motif__b" cx="32" cy="32" r="17" />
      <circle className="motif__c" cx="32" cy="32" r="26" />
    </>
  ),
}

function Motif({ kind }) {
  return (
    <svg className={`motif motif--${kind}`} viewBox="0 0 64 64" aria-hidden="true">
      {shapes[kind]}
    </svg>
  )
}

export default Motif
