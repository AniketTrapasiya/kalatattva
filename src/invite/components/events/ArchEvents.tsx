'use client'

import { Reveal } from '../ui/Reveal'
import { EVENT_ICONS, EventActions, EventDetails, NativeName, type EventsLayoutProps } from './EventParts'

/** Heritage — carved sandstone arches, one per ritual */
export function ArchEvents({ events, nativeLang, ...shared }: EventsLayoutProps) {
  return (
    <ul className="relative mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-10 lg:gap-x-8">
      {events.map((event, index) => {
        const Icon = EVENT_ICONS[event.icon]
        return (
          <li key={event.id} className="w-full max-w-md md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)]">
            <Reveal delay={(index % 3) * 0.12} className="h-full">
              <article
                aria-labelledby={`event-${event.id}`}
                className="arch frame relative flex h-full flex-col items-center bg-inv-primary px-6 pt-14 pb-8 text-center text-inv-cream"
              >
                {event.isMain && (
                  <span className="eyebrow absolute top-5 left-1/2 -translate-x-1/2 bg-inv-gold px-3 py-1 text-[0.55rem] text-inv-primary-deep">
                    The wedding
                  </span>
                )}
                <span className="mt-4 grid size-14 place-items-center rounded-full border border-inv-gold/60 text-inv-gold-soft">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.25} />
                </span>
                <p className="eyebrow mt-6 text-inv-gold-soft">{event.day}</p>
                <h3 id={`event-${event.id}`} className="display-name mt-2 text-[1.9rem] leading-tight">
                  {event.name}
                </h3>
                <NativeName lang={nativeLang} className="mt-1 text-sm text-inv-gold-soft">
                  {event.nativeName}
                </NativeName>
                <p className="mt-1 text-sm text-inv-ivory/70">{event.subtitle}</p>
                <span aria-hidden="true" className="my-6 h-px w-14 bg-inv-gold/60" />
                <EventDetails event={event} venueName={shared.venueName} className="text-inv-ivory/90" />
                <p className="mt-6 text-sm leading-relaxed text-inv-ivory/75">{event.description}</p>
                <EventActions event={event} tone="light" className="mt-auto pt-8" {...shared} />
              </article>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
