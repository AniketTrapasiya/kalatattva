'use client'

import {
  CalendarHeart,
  CalendarPlus,
  Clock,
  Crown,
  Drum,
  Flame,
  Flower2,
  Gift,
  Hand,
  HandHeart,
  House,
  MapPin,
  Moon,
  Music2,
  Navigation,
  PartyPopper,
  Shirt,
  Sparkles,
  Sun,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import type { EventIcon, NativeLang, WeddingEvent } from '../../data/weddingData'
import { googleCalendarUrl } from '../../lib/calendar'

export const EVENT_ICONS: Record<EventIcon, LucideIcon> = {
  flower: Flower2,
  music: Music2,
  flame: Flame,
  sun: Sun,
  drum: Drum,
  crown: Crown,
  sparkles: Sparkles,
  moon: Moon,
  utensils: Utensils,
  gift: Gift,
  hand: Hand,
  home: House,
  blessing: HandHeart,
  party: PartyPopper,
}

export interface EventsLayoutProps {
  events: WeddingEvent[]
  venueName: string
  mapUrl: string
  titlePrefix: string
  location: string
  nativeLang: NativeLang
}

/** "9:00 AM · Muhurat" → ["9:00 AM", "Muhurat"] */
export const splitTime = (time: string) => {
  const [clock, ...note] = time.split(' · ')
  return [clock, note.join(' · ')] as const
}

export const dayNumber = (date: string) => date.split(' ')[0]

interface EventActionsProps extends Pick<EventsLayoutProps, 'venueName' | 'mapUrl' | 'titlePrefix' | 'location'> {
  event: WeddingEvent
  /** light = for dark cards, dark = for light cards */
  tone: 'light' | 'dark'
  compact?: boolean
  className?: string
}

export function EventActions({ event, venueName, mapUrl, titlePrefix, location, tone, compact = false, className = '' }: EventActionsProps) {
  const calendar = googleCalendarUrl(event, titlePrefix, location)

  if (compact) {
    const link =
      'inline-flex min-h-9 items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.16em] uppercase underline decoration-current/35 underline-offset-4 transition-colors hover:decoration-current'
    return (
      <div className={`flex flex-wrap gap-x-5 gap-y-1 ${className}`}>
        <a className={link} href={calendar} target="_blank" rel="noopener noreferrer">
          <CalendarPlus aria-hidden="true" className="size-3.5" />
          Save
          <span className="sr-only"> {event.name} to Google Calendar (opens in a new tab)</span>
        </a>
        <a className={link} href={mapUrl} target="_blank" rel="noopener noreferrer">
          <Navigation aria-hidden="true" className="size-3.5" />
          Directions
          <span className="sr-only"> to {venueName} (opens in a new tab)</span>
        </a>
      </div>
    )
  }

  const button = `btn ${tone === 'light' ? 'btn-light' : 'btn-outline'} flex-1 px-4`
  return (
    <div className={`flex w-full flex-col gap-3 sm:flex-row md:flex-col xl:flex-row ${className}`}>
      <a className={button} href={mapUrl} target="_blank" rel="noopener noreferrer">
        <Navigation aria-hidden="true" className="size-4" />
        Directions
        <span className="sr-only"> to {venueName} (opens in a new tab)</span>
      </a>
      <a className={button} href={calendar} target="_blank" rel="noopener noreferrer">
        <CalendarPlus aria-hidden="true" className="size-4" />
        Save
        <span className="sr-only"> {event.name} to Google Calendar (opens in a new tab)</span>
      </a>
    </div>
  )
}

export function EventDetails({ event, venueName, className = '' }: { event: WeddingEvent; venueName: string; className?: string }) {
  const details = [
    { icon: CalendarHeart, label: 'Date', value: event.date },
    { icon: Clock, label: 'Time', value: event.time },
    { icon: MapPin, label: 'Venue', value: venueName },
    { icon: Shirt, label: 'Dress code', value: event.dressCode },
  ]
  return (
    <dl className={`space-y-2 text-[0.93rem] ${className}`}>
      {details.map((detail) => (
        <div key={detail.label} className="flex items-center justify-center gap-2.5">
          <dt>
            <detail.icon aria-hidden="true" className="size-4 opacity-80" strokeWidth={1.5} />
            <span className="sr-only">{detail.label}</span>
          </dt>
          <dd>{detail.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function NativeName({ children, lang, className = '' }: { children: string; lang: NativeLang; className?: string }) {
  return (
    <p lang={lang} className={`font-native ${className}`}>
      {children}
    </p>
  )
}
