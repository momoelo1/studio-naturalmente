import { useEffect } from 'react'
import { useLocation } from 'react-router'

// New page: start at the top. Link with a hash (e.g. /#orario): scroll to that section.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1))
    if (target) {
      target.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash, key])

  return null
}

export default ScrollManager
