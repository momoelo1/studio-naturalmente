// Small logo's blossom. Every piece has its own keyframes. Blooming plays them forwards;
// closing plays them backwards at double speed, and either can start from wherever the
// other has got to. Each change starts brand-new animations from the right moment and
// never touches running ones: Safari can't be trusted to reverse or seek an animation
// mid-flight, but runs fresh ones smoothly on the GPU.

// Lotus-like blossom: an outer ring of petals and an inner ring set between them.
// Each petal starts a little later round the ring and gets small fixed differences
// in sway, drift and size, so they never move in lockstep.
export const petals = ['outer', 'inner'].flatMap((ring, r) =>
  Array.from({ length: 8 }, (_, i) => ({
    key: `${ring}-${i}`,
    ring,
    angle: i * 45 + r * 22.5,
    delay: r * 160 + i * 35 + ((i * 7) % 3) * 15,
    sway: (((i * 5) % 5) - 2) * 3,
    drift: (((i * 3) % 5) - 2) * 6,
    size: 0.94 + ((i * 7) % 5) * 0.03,
  })),
)

const CLOSE_SPEED = 2
// A hard flick (px per ms; ordinary scrolling stays well under it), and the longest the
// close waits for one to slow down
const FLICK_SPEED = 1.5
const FLICK_WAIT = 700

const petalPose = (turn, tilt, lift, scale) =>
  `rotate(${turn}deg) rotateX(${tilt}deg) translateY(${lift}) scale(${scale})`

// Folded over the centre → springs open past flat → settles → relaxes back and drifts away.
// Inner petals stay cupped, like a lotus.
function petalKeyframes({ ring, angle, sway, drift, size }) {
  const outer = ring === 'outer'
  return [
    {
      offset: 0,
      opacity: 0,
      transform: petalPose(angle - 24, outer ? -120 : -115, 0, outer ? 0.45 : 0.5),
      easing: 'cubic-bezier(0.25, 0.8, 0.35, 1)',
    },
    { offset: 0.08, opacity: 1, easing: 'ease' },
    {
      offset: outer ? 0.38 : 0.4,
      transform: petalPose(angle + sway, outer ? 8 : -22, 0, size * (outer ? 1.06 : 1.05)),
      easing: 'ease-in-out',
    },
    {
      offset: outer ? 0.54 : 0.56,
      transform: petalPose(angle, outer ? -10 : -38, 0, size),
      easing: 'ease-in-out',
    },
    {
      offset: 0.68,
      opacity: 1,
      transform: petalPose(angle, outer ? -6 : -34, 0, size),
      easing: 'cubic-bezier(0.45, 0, 0.7, 0.4)',
    },
    {
      offset: 1,
      opacity: 0,
      transform: outer
        ? petalPose(angle + drift, 42, '-22%', size * 1.05)
        : petalPose(angle + drift, 12, '-16%', size),
    },
  ]
}

export function createBlossom(logo) {
  const spring = 'cubic-bezier(0.34, 1.35, 0.64, 1)'
  const pieces = [
    // The flower turns open as a whole
    {
      el: logo.querySelector('.site-logo__flower'),
      keyframes: [
        { transform: 'rotate(-40deg) scale(0.55)', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
        { transform: 'none' },
      ],
      duration: 1800,
      delay: 0,
    },
    // Golden heart, uncovered as the petals part
    {
      el: logo.querySelector('.site-logo__heart'),
      keyframes: [
        { offset: 0, opacity: 0, transform: 'scale(0.3)', easing: 'ease' },
        { offset: 0.25, opacity: 1, transform: 'none', easing: 'ease' },
        { offset: 0.65, opacity: 1, transform: 'none', easing: 'ease' },
        { offset: 1, opacity: 0, transform: 'none' },
      ],
      duration: 1600,
      delay: 150,
    },
    ...[...logo.querySelectorAll('.site-logo__petal')].map((el, i) => ({
      el,
      keyframes: petalKeyframes(petals[i]),
      duration: 1900,
      delay: petals[i].delay,
    })),
    // The logo pops out of the flower's heart with a soft spring
    {
      el: logo.querySelector('img'),
      keyframes: [
        { offset: 0, opacity: 0, transform: 'rotate(-35deg) scale(0)', easing: spring },
        { offset: 0.4, opacity: 1, easing: spring },
        { offset: 1, opacity: 1, transform: 'none' },
      ],
      duration: 800,
      delay: 800,
    },
  ]
  const end = Math.max(...pieces.map(({ duration, delay }) => delay + duration))
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  let open = false
  let animations = []
  let hideTimer = 0

  // Where the blossom is (0 closed, `end` fully open): where the current run started, moved
  // on by the time since the browser actually started it (none while it's still pending)
  let from = 0
  let rate = 0
  const clock = () => {
    const start = animations[0]?.startTime
    const elapsed = start == null ? 0 : document.timeline.currentTime - start
    return Math.min(end, Math.max(0, from + rate * elapsed))
  }

  // Hide only once the clock is back at zero; checks again if the close started late
  const hideWhenClosed = () => {
    const left = clock() / CLOSE_SPEED
    if (left > 0) hideTimer = setTimeout(hideWhenClosed, left + 20)
    else logo.classList.remove('is-open')
  }

  // Scroll speed, smoothed. When the bar goes in the middle of a hard flick, the close waits
  // for the page to slow down, so it doesn't land on the phone's busiest frames.
  let lastY = window.scrollY
  let lastScroll = performance.now()
  let speed = 0
  const onScroll = () => {
    const now = performance.now()
    const dt = now - lastScroll
    if (dt > 0) speed = speed * 0.6 + (Math.abs(window.scrollY - lastY) / dt) * 0.4
    lastY = window.scrollY
    lastScroll = now
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  const flicking = () => performance.now() - lastScroll < 120 && speed > FLICK_SPEED

  let wanted = false
  let waitTimer = 0
  let waitingSince = 0
  const closeWhenSettled = () => {
    if (wanted) return
    if (flicking() && performance.now() - waitingSince < FLICK_WAIT) waitTimer = setTimeout(closeWhenSettled, 50)
    else run(false)
  }

  // Bloom (true) or close (false), from wherever the blossom is now
  const run = (next) => {
    if (next === open) return
    open = next
    const at = clock()
    for (const animation of animations) animation.cancel()
    clearTimeout(hideTimer)

    if (reducedMotion.matches) {
      // No motion: the logo just shows or hides (petals and heart stay invisible)
      animations = []
      from = open ? end : 0
      rate = 0
      logo.classList.toggle('is-open', open)
      return
    }

    from = at
    if (open) {
      // Forwards from `at`: a piece's own timeline is shifted back by how far along we are
      rate = 1
      logo.classList.add('is-open')
      animations = pieces.map(({ el, keyframes, duration, delay }) =>
        el.animate(keyframes, { duration, delay: delay - at, fill: 'both' }),
      )
    } else {
      // Backwards from `at` at double speed: each piece rewinds when the clock comes back
      // down through its own stretch of the bloom
      rate = -CLOSE_SPEED
      animations = pieces.map(({ el, keyframes, duration, delay }) =>
        el.animate(keyframes, {
          duration: duration / CLOSE_SPEED,
          delay: (at - delay - duration) / CLOSE_SPEED,
          direction: 'reverse',
          fill: 'both',
        }),
      )
      hideTimer = setTimeout(hideWhenClosed, at / CLOSE_SPEED + 20)
    }
  }

  return {
    // Bloom (true) or close (false); a close asked for mid-flick waits for the page to slow
    toward(next) {
      wanted = next
      clearTimeout(waitTimer)
      if (!next && open && !reducedMotion.matches && flicking()) {
        waitingSince = performance.now()
        waitTimer = setTimeout(closeWhenSettled, 50)
      } else {
        run(next)
      }
    },
    destroy() {
      clearTimeout(hideTimer)
      clearTimeout(waitTimer)
      window.removeEventListener('scroll', onScroll)
      for (const animation of animations) animation.cancel()
    },
  }
}
