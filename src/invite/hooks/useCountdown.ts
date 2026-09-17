import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function useCountdown(targetIso: string) {
  const target = new Date(targetIso).getTime()
  const [now, setNow] = useState(() => Date.now())
  const isPast = now >= target

  useEffect(() => {
    if (isPast) return
    const id = window.setInterval(() => setNow(Date.now()), SECOND)
    return () => window.clearInterval(id)
  }, [isPast])

  const remaining = Math.max(0, target - now)
  return {
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
    isPast,
  }
}
