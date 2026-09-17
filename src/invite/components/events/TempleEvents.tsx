'use client'

import { Shirt } from 'lucide-react'
import { ShapedFrame } from '../ui/ShapedFrame'
import { EVENT_ICONS, EventActions, NativeName, splitTime, type EventsLayoutProps } from './EventParts'

/** Temple — gopuram-stepped tiles that swipe on phones and tile on larger screens */
export function TempleEvents({ events, nativeLang, ...shared }: EventsLayoutProps) {
  return (
    <div className="relative mt-14">
      <ul
        aria-label="Celebrations — scroll sideways for more"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[9%] pt-2 pb-8 sm:-mx-6 md:mx-auto md:max-w-6xl md:flex-wrap md:justify-center md:overflow-visible md:px-0"
      >
        {events.map((event) => {
          const Icon = EVENT_ICONS[event.icon]
          const main = event.isMain
          const [clock, note] = splitTime(event.time)
          return (
            <li key={event.id} className="w-[82%] shrink-0 snap-center sm:w-[58%] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.9rem)]">
              <ShapedFrame
                shape="gopuram"
                className="h-full"
                fillClassName={main ? 'bg-inv-gold text-inv-primary-deep' : 'bg-inv-primary text-inv-cream'}
                lineClassName={main ? 'text-inv-primary-deep/50' : 'text-inv-gold'}
                weight={1.5}
              >
                <article aria-labelledby={`event-${event.id}`} className="flex h-full flex-col items-center px-6 pt-16 pb-8 text-center">
                  <Icon aria-hidden="true" className={`size-6 ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`} strokeWidth={1.4} />
                  <p className="mt-3 text-[0.65rem] font-semibold tracking-[0.24em] uppercase opacity-80">
                    {event.day} · {event.date.split(' ').slice(0, 2).join(' ')}
                  </p>
                  <p className={`display-name tabular mt-2 text-4xl ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`}>{clock}</p>
                  {note && <p className="text-xs tracking-[0.2em] uppercase opacity-80">{note}</p>}
                  <h3 id={`event-${event.id}`} className="display-name mt-3 text-2xl leading-tight">
                    {event.name}
                  </h3>
                  <NativeName lang={nativeLang} className={`mt-1 text-sm ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`}>
                    {event.nativeName}
                  </NativeName>
                  <span aria-hidden="true" className="my-4 flex gap-2">
                    {[0, 1, 2, 3, 4].map((dot) => (
                      <span key={dot} className={`size-1.5 rounded-full ${dot === 2 ? 'bg-inv-accent' : 'bg-current opacity-50'}`} />
                    ))}
                  </span>
                  <p className="text-sm opacity-80">{event.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed opacity-85">{event.description}</p>
                  <p className="mt-3 flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase opacity-75">
                    <Shirt aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">Dress code: </span>
                    {event.dressCode}
                  </p>
                  <EventActions event={event} tone={main ? 'dark' : 'light'} className="mt-auto pt-6" {...shared} />
                </article>
              </ShapedFrame>
            </li>
          )
        })}
      </ul>
      <p aria-hidden="true" className="eyebrow text-center text-[0.6rem] text-inv-gold-soft md:hidden">
        Swipe to see all {events.length} →
      </p>
    </div>
  )
}
