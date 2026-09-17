'use client'

import { Shirt } from 'lucide-react'
import { eventsByDay } from '../../data/weddingData'
import { toNativeDigits } from '../../lib/numerals'
import { Reveal } from '../ui/Reveal'
import { EventActions, NativeName, dayNumber, splitTime, type EventsLayoutProps } from './EventParts'

const PATRIKA_TITLE: Partial<Record<EventsLayoutProps['nativeLang'], string>> = {
  mr: 'कार्यक्रम पत्रिका',
  hi: 'कार्यक्रम विवरण',
  gu: 'કાર્યક્રમ',
}

/** Paithani — a printed patrika: the order of ceremonies, day by day, on a silk-bordered sheet */
export function PatrikaEvents({ events, nativeLang, ...shared }: EventsLayoutProps) {
  const groups = eventsByDay(events)
  return (
    <Reveal className="relative mx-auto mt-14 max-w-4xl">
      <div className="frame frame-lg bg-inv-cream px-5 py-10 text-inv-brown sm:px-12 sm:py-14">
        <div className="text-center">
          {PATRIKA_TITLE[nativeLang] && (
            <p lang={nativeLang} className="font-native text-xl text-inv-accent">
              {PATRIKA_TITLE[nativeLang]}
            </p>
          )}
          <p className="eyebrow mt-1 text-inv-gold-deep">Order of ceremonies</p>
        </div>

        {groups.map((group) => (
          <section key={group.date} aria-labelledby={`day-${group.date}`} className="mt-10">
            <h3 id={`day-${group.date}`} className="flex items-center gap-4">
              <span lang={nativeLang} className="font-display text-5xl leading-none font-semibold text-inv-primary">
                {toNativeDigits(dayNumber(group.date), nativeLang)}
              </span>
              <span>
                <span className="display-name block text-xl text-inv-primary">{group.day}</span>
                <span className="block text-sm text-inv-brown-soft">{group.date}</span>
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-inv-gold/50" />
            </h3>

            <ol className="mt-4 divide-y divide-inv-gold/30 border-y border-inv-gold/30">
              {group.events.map((event) => {
                const [clock, note] = splitTime(event.time)
                return (
                  <li
                    key={event.id}
                    className={`grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6 ${
                      event.isMain ? 'border-l-4 border-l-accent bg-inv-accent/5 pr-2 pl-4' : ''
                    }`}
                  >
                    <div>
                      <p className="font-display tabular text-xl font-semibold text-inv-primary">{clock}</p>
                      {note && <p className="eyebrow mt-0.5 text-[0.6rem] text-inv-accent">{note}</p>}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h4 className="display-name text-[1.35rem] text-inv-primary">{event.name}</h4>
                        <NativeName lang={nativeLang} className="text-inv-accent">
                          {event.nativeName}
                        </NativeName>
                      </div>
                      <p className="text-sm text-inv-brown-soft">{event.subtitle}</p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed">{event.description}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs tracking-[0.12em] text-inv-brown-soft uppercase">
                        <Shirt aria-hidden="true" className="size-3.5" />
                        <span className="sr-only">Dress code: </span>
                        {event.dressCode}
                      </p>
                      <EventActions event={event} tone="dark" compact className="mt-2 text-inv-primary" {...shared} />
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>
    </Reveal>
  )
}
