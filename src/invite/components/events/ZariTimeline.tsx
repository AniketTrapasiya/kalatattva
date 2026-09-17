'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Shirt } from 'lucide-react'
import { useState } from 'react'
import { eventsByDay } from '../../data/weddingData'
import { Sparkle } from '../ui/DesignOrnaments'
import { EVENT_ICONS, EventActions, NativeName, dayNumber, splitTime, type EventsLayoutProps } from './EventParts'

const EASE = [0.22, 1, 0.36, 1] as const

/** Zari — a day-by-day timeline strung on a gold thread; made for weddings with many rituals */
export function ZariTimeline({ events, nativeLang, ...shared }: EventsLayoutProps) {
  const groups = eventsByDay(events)
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? groups : groups.filter((group) => group.date === active)
  const shownCount = visible.reduce((total, group) => total + group.events.length, 0)

  return (
    <div className="relative mx-auto mt-12 max-w-5xl">
      <div role="group" aria-label="Show celebrations by day" className="flex flex-wrap justify-center gap-2 text-inv-gold-soft">
        <button type="button" className="chip" aria-pressed={active === 'all'} onClick={() => setActive('all')}>
          All days <span className="tabular opacity-70">{events.length}</span>
        </button>
        {groups.map((group, index) => (
          <button key={group.date} type="button" className="chip" aria-pressed={active === group.date} onClick={() => setActive(group.date)}>
            Day {index + 1} · {group.day.slice(0, 3)} {dayNumber(group.date)}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shownCount} {shownCount === 1 ? 'celebration' : 'celebrations'}
      </p>

      <div className="relative mt-12">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-[1.1rem] w-px bg-linear-to-b from-inv-gold/0 via-inv-gold/60 to-inv-gold/0 md:left-1/2"
        />
        <ol className="space-y-14">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((group) => {
              const dayIndex = groups.indexOf(group)
              return (
                <motion.li
                  key={group.date}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <h3 className="relative flex items-center gap-4 md:flex-col md:gap-3">
                    <span
                      aria-hidden="true"
                      className="relative z-10 ml-[0.35rem] grid size-8 shrink-0 rotate-45 place-items-center border border-inv-gold bg-inv-primary-deep md:ml-0 md:size-12"
                    >
                      <span className="display-name -rotate-45 text-sm text-inv-gold-soft md:text-lg">{dayNumber(group.date)}</span>
                    </span>
                    <span className="bg-inv-primary-deep/80 px-2 text-left md:text-center">
                      <span className="eyebrow block text-inv-gold-soft">Day {dayIndex + 1}</span>
                      <span className="display-name block text-xl text-inv-cream">
                        {group.day}, {group.date.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </span>
                  </h3>

                  <ol className="mt-8 space-y-8">
                    {group.events.map((event) => {
                      const right = events.indexOf(event) % 2 === 1
                      const main = event.isMain
                      const [clock, note] = splitTime(event.time)
                      const Icon = EVENT_ICONS[event.icon]
                      return (
                        <li key={event.id} className="relative pl-12 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
                          <span
                            aria-hidden="true"
                            className={`absolute top-8 left-[1.1rem] z-10 size-3 -translate-x-1/2 rotate-45 border border-inv-gold md:left-1/2 ${
                              main ? 'bg-inv-gold-soft' : 'bg-inv-accent'
                            }`}
                          />
                          <article
                            aria-labelledby={`event-${event.id}`}
                            className={`frame px-6 py-6 sm:px-8 ${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'} ${
                              main ? 'bg-inv-gold-soft text-inv-primary-deep' : 'bg-inv-primary text-inv-cream'
                            }`}
                          >
                            <p className={`flex items-center gap-2 ${right ? '' : 'md:justify-end'}`}>
                              <Icon aria-hidden="true" className={`size-4 ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`} strokeWidth={1.5} />
                              <span className={`display-name tabular text-2xl ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`}>{clock}</span>
                              {main && <Sparkle className="animate-twinkle size-3.5 text-inv-accent" />}
                            </p>
                            {note && <p className="eyebrow mt-1 text-[0.58rem] opacity-80">{note}</p>}
                            <h4 id={`event-${event.id}`} className="display-name mt-2 text-[1.6rem] leading-tight">
                              {event.name}
                            </h4>
                            <NativeName lang={nativeLang} className={`text-sm ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`}>
                              {event.nativeName}
                            </NativeName>
                            <p className="text-sm opacity-75">{event.subtitle}</p>
                            <p className="mt-3 text-sm leading-relaxed opacity-90">{event.description}</p>
                            <p className={`mt-3 flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase opacity-75 ${right ? '' : 'md:justify-end'}`}>
                              <Shirt aria-hidden="true" className="size-3.5" />
                              <span className="sr-only">Dress code: </span>
                              {event.dressCode}
                            </p>
                            <EventActions event={event} tone={main ? 'dark' : 'light'} compact className={`mt-3 ${right ? '' : 'md:justify-end'}`} {...shared} />
                          </article>
                        </li>
                      )
                    })}
                  </ol>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ol>
      </div>
    </div>
  )
}
