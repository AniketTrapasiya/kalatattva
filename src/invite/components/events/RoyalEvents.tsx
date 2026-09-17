'use client'

import { DesignDivider } from '../ui/DesignOrnaments'
import { Reveal } from '../ui/Reveal'
import { ShapedFrame } from '../ui/ShapedFrame'
import { EVENT_ICONS, EventActions, EventDetails, NativeName, type EventsLayoutProps } from './EventParts'

/** Royal — each ritual framed in a cusped jharokha window */
export function RoyalEvents({ events, nativeLang, ...shared }: EventsLayoutProps) {
  return (
    <ul className="relative mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-10">
      {events.map((event, index) => {
        const Icon = EVENT_ICONS[event.icon]
        const main = event.isMain
        return (
          <li key={event.id} className="w-full max-w-sm sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
            <Reveal delay={(index % 3) * 0.12} className="h-full">
              <ShapedFrame
                shape="jharokha"
                className="h-full"
                fillClassName={main ? 'bg-inv-gold-soft text-inv-primary-deep' : 'bg-inv-primary text-inv-cream'}
                lineClassName={main ? 'text-inv-gold' : 'text-inv-gold/80'}
                weight={1.6}
              >
                <article aria-labelledby={`event-${event.id}`} className="flex h-full flex-col items-center px-7 pt-[4.75rem] pb-9 text-center">
                  <span
                    className={`grid size-12 place-items-center rounded-full border ${
                      main ? 'border-inv-primary/40 text-inv-primary' : 'border-inv-gold/60 text-inv-gold-soft'
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.3} />
                  </span>
                  <p className={`eyebrow mt-5 ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`}>{main ? 'Shubh vivah' : event.day}</p>
                  <h3 id={`event-${event.id}`} className="display-name mt-2 text-[1.35rem] leading-snug">
                    {event.name}
                  </h3>
                  <NativeName lang={nativeLang} className={`mt-1 text-sm ${main ? 'text-inv-primary' : 'text-inv-gold-soft'}`}>
                    {event.nativeName}
                  </NativeName>
                  <p className="mt-1 text-sm opacity-75">{event.subtitle}</p>
                  <DesignDivider kind="royal" className={`my-5 h-5 w-36 ${main ? 'text-inv-primary/60' : 'text-inv-gold/80'}`} />
                  <EventDetails event={event} venueName={shared.venueName} className="opacity-90" />
                  <p className="mt-5 text-sm leading-relaxed opacity-80">{event.description}</p>
                  <EventActions event={event} tone={main ? 'dark' : 'light'} className="mt-auto pt-7" {...shared} />
                </article>
              </ShapedFrame>
            </Reveal>
          </li>
        )
      })}
    </ul>
  )
}
