import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/**
 * Ported note: the original seeded state with `Date.now()`. These pages are prerendered
 * now, so that value differs between the build-time HTML and the first client render —
 * a hydration mismatch (React #418) that aborts hydration and leaves the whole
 * invitation unhydrated, with its scroll-driven reveals never running.
 *
 * `now` therefore starts null (server and first client render agree on the placeholder)
 * and the real clock starts in an effect, which only runs on the client.
 */
export function useCountdown(targetIso: string) {
  const target = new Date(targetIso).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => {
      const next = Date.now()
      setNow(next)
      // Nothing left to count down to — stop ticking, as the original did.
      if (next >= target) window.clearInterval(id)
    }, SECOND)
    return () => window.clearInterval(id)
  }, [target])

  /** Before the first client tick nothing time-dependent is known yet. */
  const pending = now === null
  const isPast = !pending && now >= target
  const remaining = pending ? 0 : Math.max(0, target - now)

  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
    isPast,
    pending,
  }
}
