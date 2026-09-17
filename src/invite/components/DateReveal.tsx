'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CalendarPlus, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useWedding } from '../context/TraditionContext'
import { coupleNames, mainEvent, venueLocation } from '../data/weddingData'
import { downloadIcs, googleCalendarUrl } from '../lib/calendar'
import { Mandala } from './ui/Ornaments'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const DOOR_EASE = [0.65, 0, 0.35, 1] as const

export function DateReveal() {
  const [revealed, setRevealed] = useState(false)
  const dateRef = useRef<HTMLDivElement>(null)
  const details = useWedding()
  const { events, couple } = details
  const wedding = mainEvent(events)
  const titlePrefix = coupleNames(details)
  const location = venueLocation(details)
  const monogram = `${couple.groom.firstName[0]} & ${couple.bride.firstName[0]}`
  const [dayNumber, ...monthYear] = wedding.date.split(' ')

  useEffect(() => {
    // The seal button disappears on reveal, so hand focus to the date it uncovered
    if (revealed) dateRef.current?.focus({ preventScroll: true })
  }, [revealed])

  return (
    <section id="date" aria-labelledby="date-title" className="relative bg-inv-cream px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        id="date-title"
        eyebrow="Save the date"
        title="Reveal the Date"
        subtitle="Break the seal to uncover the day two families become one."
      />

      <Reveal className="mx-auto mt-14 max-w-2xl">
        <div className="frame relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-inv-ivory sm:aspect-[6/5] sm:max-w-none">
          <div className="absolute inset-0 grid place-items-center px-6 text-center" inert={!revealed}>
            <motion.div
              ref={dateRef}
              tabIndex={-1}
              role="group"
              aria-label={`Wedding date: ${wedding.day}, ${wedding.date}, ${wedding.time}`}
              className="outline-none"
              initial={false}
              animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 1, delay: revealed ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow text-inv-gold-deep">{wedding.day}</p>
              <p className="tabular mt-1 font-display text-[clamp(5.5rem,26vw,9rem)] leading-none text-inv-primary">
                {dayNumber}
              </p>
              <p className="tabular mt-3 font-display text-xl tracking-[0.26em] text-inv-brown uppercase sm:text-2xl">
                {monthYear.join(' ')}
              </p>
              <p className="mt-4 text-sm text-inv-brown-soft">
                {wedding.time} · {details.venue.name}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  className="btn btn-primary"
                  href={googleCalendarUrl(wedding, titlePrefix, location)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CalendarPlus aria-hidden="true" className="size-4" />
                  Google Calendar
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => downloadIcs(events, titlePrefix, location, 'wedding-celebrations.ics')}
                >
                  <Download aria-hidden="true" className="size-4" />
                  Apple / Outlook
                </button>
              </div>
            </motion.div>
          </div>

          {(['left', 'right'] as const).map((side) => {
            const isLeft = side === 'left'
            return (
              <motion.div
                key={side}
                aria-hidden="true"
                className={`absolute inset-y-0 w-1/2 overflow-hidden border-inv-gold/70 bg-inv-primary [background-image:var(--texture-dark)] ${
                  isLeft ? 'left-0 border-r' : 'right-0 border-l'
                }`}
                initial={false}
                animate={{ x: revealed ? (isLeft ? '-102%' : '102%') : '0%' }}
                transition={{ duration: 1.5, ease: DOOR_EASE }}
              >
                <div className={`absolute inset-y-3 border border-inv-gold/40 ${isLeft ? 'right-0 left-3' : 'right-3 left-0'}`} />
                {/* Centred on the seam so each door carries half of the mandala */}
                <Mandala
                  className="absolute top-1/2 aspect-square w-[150%] -translate-y-1/2 text-inv-gold/40"
                  style={{ left: isLeft ? '25%' : '-75%' }}
                />
                <span
                  className={`absolute top-1/2 size-5 -translate-y-1/2 rounded-full border border-inv-gold-soft ${
                    isLeft ? 'right-5' : 'left-5'
                  }`}
                />
              </motion.div>
            )
          })}

          <AnimatePresence>
            {!revealed && (
              <motion.div
                key="seal"
                className="pointer-events-none absolute inset-0 grid place-items-center"
                exit={{ opacity: 0, scale: 1.35 }}
                transition={{ duration: 0.5 }}
              >
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  aria-label="Tap to reveal the wedding date"
                  className="group pointer-events-auto relative grid size-32 place-items-center rounded-full"
                >
                  <span aria-hidden="true" className="animate-seal-pulse absolute inset-0 rounded-full bg-inv-gold/40" />
                  <span
                    aria-hidden="true"
                    className="relative flex size-28 flex-col items-center justify-center rounded-full border border-inv-gold-soft bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklab,var(--color-inv-primary)_80%,white),var(--color-inv-primary-deep)_72%)] text-inv-gold-soft shadow-[0_12px_30px_rgba(41,28,26,0.4),inset_0_0_0_6px_rgba(181,150,90,0.35)] transition-transform duration-500 group-hover:scale-105"
                  >
                    <span className="font-script text-[1.9rem] leading-none">{monogram}</span>
                    <span className="eyebrow mt-2 text-[0.48rem] tracking-[0.2em]">Tap to reveal</span>
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
