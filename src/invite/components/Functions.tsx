'use client'

import type { ComponentType } from 'react'
import { useScopedTradition } from '../context/TraditionContext'
import { coupleNames, daysOfJoy, venueLocation, type DesignKind } from '../data/weddingData'
import { ArchEvents } from './events/ArchEvents'
import type { EventsLayoutProps } from './events/EventParts'
import { FolkEvents } from './events/FolkEvents'
import { PatrikaEvents } from './events/PatrikaEvents'
import { RoyalEvents } from './events/RoyalEvents'
import { TempleEvents } from './events/TempleEvents'
import { ZariTimeline } from './events/ZariTimeline'
import { DesignBand } from './ui/DesignOrnaments'
import { Mandala } from './ui/Ornaments'
import { RegionPattern } from './ui/RegionPattern'
import { SectionHeading } from './ui/SectionHeading'

const LAYOUTS: Record<DesignKind, ComponentType<EventsLayoutProps>> = {
  heritage: ArchEvents,
  folk: FolkEvents,
  zari: ZariTimeline,
  royal: RoyalEvents,
  paithani: PatrikaEvents,
  temple: TempleEvents,
}

export function Functions() {
  const { wedding, nativeLang, theme, design } = useScopedTradition()
  const { events, venue } = wedding
  const Layout = LAYOUTS[design.kind]
  const days = new Set(events.map((event) => event.date)).size

  const subtitle =
    events.length > 8
      ? `${events.length} rituals across ${days} days — pick a day to plan your visit.`
      : 'Every ritual, every song, every blessing — we would love for you to be part of all of it.'

  return (
    <section
      id="celebrations"
      aria-labelledby="celebrations-title"
      className="on-dark surface-dark relative overflow-hidden px-4 pt-28 pb-24 text-inv-ivory sm:px-6 sm:pt-36 sm:pb-32"
    >
      <DesignBand kind={design.kind} className="absolute inset-x-0 top-0 text-inv-gold/80" />
      {design.kind === 'heritage' && (
        <Mandala className="pointer-events-none absolute top-1/2 left-1/2 size-[64rem] -translate-x-1/2 -translate-y-1/2 text-inv-gold/[0.07]" />
      )}

      <SectionHeading tone="dark" id="celebrations-title" eyebrow={daysOfJoy(events)} title="The Celebrations" subtitle={subtitle} />

      <Layout
        events={events}
        nativeLang={nativeLang}
        venueName={venue.name}
        mapUrl={venue.mapUrl}
        titlePrefix={coupleNames(wedding)}
        location={venueLocation(wedding)}
      />

      <RegionPattern kind={theme.pattern} className="absolute inset-x-0 bottom-0 text-inv-gold/60" />
    </section>
  )
}
