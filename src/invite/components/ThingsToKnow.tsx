'use client'

import { BellRing, CalendarPlus, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useScopedTradition } from '../context/TraditionContext'
import { coupleNames, venueLocation } from '../data/weddingData'
import { downloadIcs } from '../lib/calendar'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

interface InfoCardProps {
  icon: LucideIcon
  title: string
  delay: number
  children: ReactNode
  actions: ReactNode
}

function InfoCard({ icon: Icon, title, delay, children, actions }: InfoCardProps) {
  return (
    <li>
      <Reveal delay={delay} className="h-full">
        <article className="frame flex h-full flex-col items-center bg-inv-ivory px-6 py-10 text-center sm:px-8">
          <span className="grid size-14 place-items-center rounded-full border border-inv-gold/60 text-inv-primary">
            <Icon aria-hidden="true" className="size-6" strokeWidth={1.25} />
          </span>
          <h3 className="mt-5 font-display text-2xl text-inv-primary">{title}</h3>
          <span aria-hidden="true" className="my-5 h-px w-12 bg-inv-gold/60" />
          <div className="flex-1">{children}</div>
          <div className="mt-8 flex w-full flex-wrap justify-center gap-3">{actions}</div>
        </article>
      </Reveal>
    </li>
  )
}

export function ThingsToKnow() {
  const { wedding, nativeLang } = useScopedTradition()
  const { venue, contact, reminder, events } = wedding
  const titlePrefix = coupleNames(wedding)

  return (
    <section id="details" aria-labelledby="details-title" className="bg-inv-cream px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading id="details-title" eyebrow="Before you arrive" title="Things to Know" />

      <ul className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        <InfoCard
          icon={MapPin}
          title="The Venue"
          delay={0}
          actions={
            <a className="btn btn-outline" href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
              <Navigation aria-hidden="true" className="size-4" />
              Get directions
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          }
        >
          <p lang={nativeLang} className="font-native text-sm text-inv-gold-deep">
            {venue.nativeName}
          </p>
          <p className="mt-2 font-display text-xl text-inv-primary">{venue.name}</p>
          <address className="mt-2 text-inv-brown-soft not-italic">
            {venue.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </InfoCard>

        <InfoCard
          icon={Phone}
          title="Contact"
          delay={0.1}
          actions={
            <>
              <a className="btn btn-outline" href={`tel:${contact.phoneE164}`}>
                <Phone aria-hidden="true" className="size-4" />
                Call
              </a>
              <a
                className="btn btn-outline"
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          }
        >
          <p className="eyebrow text-inv-gold-deep">
            {contact.label} ·{' '}
            <span lang={nativeLang} className="font-native tracking-normal normal-case">
              {contact.nativeLabel}
            </span>
          </p>
          <p className="mt-2 font-display text-xl text-inv-primary">{contact.name}</p>
          <a
            href={`tel:${contact.phoneE164}`}
            className="tabular mt-2 inline-block text-inv-brown-soft underline decoration-inv-gold/50 underline-offset-4 hover:text-inv-primary"
          >
            {contact.phoneDisplay}
          </a>
        </InfoCard>

        <InfoCard
          icon={BellRing}
          title="A Gentle Reminder"
          delay={0.2}
          actions={
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => downloadIcs(events, titlePrefix, venueLocation(wedding), 'wedding-celebrations.ics')}
            >
              <CalendarPlus aria-hidden="true" className="size-4" />
              Add all to calendar
            </button>
          }
        >
          <ul className="space-y-3 text-left text-inv-brown-soft">
            {reminder.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 rotate-45 bg-inv-gold" />
                {note}
              </li>
            ))}
          </ul>
        </InfoCard>
      </ul>
    </section>
  )
}
