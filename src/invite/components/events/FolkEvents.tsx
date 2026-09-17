'use client'

import { Clock, Shirt } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { EVENT_ICONS, EventActions, NativeName, dayNumber, type EventsLayoutProps } from './EventParts'

/** Folk — embroidered cards hung with a stitched mirror medallion for the day */
export function FolkEvents({ events, nativeLang, ...shared }: EventsLayoutProps) {
  return (
    <ul className="relative mx-auto mt-24 flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-20">
      {events.map((event, index) => {
        const Icon = EVENT_ICONS[event.icon]
        const main = event.isMain
        const chip = 'inline-flex items-center gap-1.5 border border-current/25 px-2.5 py-1'
        return (
          <li key={event.id} className="w-full max-w-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
            <Reveal delay={(index % 3) * 0.1} className="h-full">
              <article
                aria-labelledby={`event-${event.id}`}
                className={`frame relative flex h-full flex-col px-6 pt-14 pb-7 text-center ${
                  main ? 'bg-inv-cream text-inv-primary' : 'bg-inv-primary text-inv-cream'
                }`}
              >
                {/* Day medallion: a mirror set in running stitch */}
                <div aria-hidden="true" className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <span className="grid size-20 place-items-center rounded-full border-2 border-dashed border-inv-gold bg-inv-primary-deep text-inv-gold-soft shadow-[0_0_0_5px_var(--color-primary-deep)]">
                    <span className="leading-none">
                      <span className="display-name block text-[1.7rem]">{dayNumber(event.date)}</span>
                      <span className="mt-1 block text-[0.55rem] font-semibold tracking-[0.24em] uppercase">{event.day.slice(0, 3)}</span>
                    </span>
                  </span>
                </div>

                <p className="flex items-center justify-center gap-2 text-[0.62rem] font-semibold tracking-[0.26em] uppercase opacity-80">
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                  {main ? 'Shubh muhurat' : event.day}
                </p>
                <h3 id={`event-${event.id}`} className="display-name mt-3 text-[1.75rem] leading-tight">
                  {event.name}
                </h3>
                <NativeName lang={nativeLang} className={`mt-1 text-sm ${main ? 'text-inv-gold-deep' : 'text-inv-gold-soft'}`}>
                  {event.nativeName}
                </NativeName>
                <p className="mt-1 text-sm opacity-75">{event.subtitle}</p>

                <p className="sr-only">
                  {event.day}, {event.date}
                </p>
                <div className="mx-auto mt-5 flex flex-wrap justify-center gap-2 text-xs">
                  <span className={chip}>
                    <Clock aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">Time: </span>
                    {event.time}
                  </span>
                  <span className={chip}>
                    <Shirt aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">Dress code: </span>
                    {event.dressCode}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-relaxed opacity-85">{event.description}</p>
                <EventActions event={event} tone={main ? 'dark' : 'light'} className="mt-auto pt-7" {...shared} />
              </article>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
