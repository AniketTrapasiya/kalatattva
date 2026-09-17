'use client'

import { ArrowUp, Phone } from 'lucide-react'
import { useScopedTradition } from '../context/TraditionContext'
import { DesignDivider, Kuthuvilakku } from './ui/DesignOrnaments'
import { GaneshMotif } from './ui/GaneshMotif'
import { Mandala } from './ui/Ornaments'
import { RegionPattern } from './ui/RegionPattern'

export function Footer() {
  const { wedding, nativeLang, theme, design } = useScopedTradition()
  const { couple, footer, contact, instagram, hero, weddingDateTime, venue } = wedding

  return (
    <footer className="paper relative overflow-hidden border-t border-inv-gold/40 px-4 pt-20 pb-28 text-center sm:px-6 sm:pt-28">
      <RegionPattern kind={theme.pattern} className="absolute inset-x-0 top-3 text-inv-gold/50" />
      <Mandala className="pointer-events-none absolute -bottom-80 left-1/2 size-[46rem] -translate-x-1/2 text-inv-gold/10" />

      <div className="relative mx-auto max-w-2xl">
        {design.kind === 'temple' ? (
          <Kuthuvilakku className="mx-auto h-16 w-11 text-inv-gold" />
        ) : (
          <GaneshMotif className="mx-auto h-14 w-14 text-inv-gold" />
        )}
        <p className="mt-6 font-script text-[length:calc(clamp(2.75rem,12vw,6rem)*var(--name-scale))] leading-tight text-inv-primary">
          {couple.groom.firstName} &amp; {couple.bride.firstName}
        </p>
        <DesignDivider kind={design.kind} className="mx-auto mt-4 h-6 w-48 text-inv-gold" />
        <p className="tabular mt-6 font-display text-sm tracking-[0.24em] text-inv-brown uppercase sm:text-base">
          <time dateTime={weddingDateTime.slice(0, 10)} className="block sm:inline">
            {hero.dateLabel}
          </time>
          <span aria-hidden="true" className="hidden sm:inline">
            {' '}
            ·{' '}
          </span>
          <span className="mt-1 block sm:mt-0 sm:inline">{venue.city}</span>
        </p>
        <p className="display-quote mx-auto mt-6 max-w-md text-lg text-inv-brown-soft">{footer.blessing}</p>

        <div className="mx-auto mt-10 max-w-xs border-y border-inv-gold/40 py-6">
          <p className="eyebrow text-inv-gold-deep">
            {contact.label} ·{' '}
            <span lang={nativeLang} className="font-native tracking-normal normal-case">
              {contact.nativeLabel}
            </span>
          </p>
          <p className="display-name mt-2 text-xl text-inv-primary not-italic">{contact.name}</p>
          <a
            href={`tel:${contact.phoneE164}`}
            className="tabular mt-1 inline-flex items-center gap-2 text-inv-brown-soft underline decoration-inv-gold/50 underline-offset-4 hover:text-inv-primary"
          >
            <Phone aria-hidden="true" className="size-3.5" />
            {contact.phoneDisplay}
          </a>
        </div>

        <p className="display-name mt-8 text-xl text-inv-primary">{instagram.hashtag}</p>

        <a href="#top" className="btn btn-outline mt-10">
          <ArrowUp aria-hidden="true" className="size-4" />
          Back to top
        </a>

        <p className="mt-12 text-xs tracking-[0.2em] text-inv-brown-soft uppercase">
          Made with love · {new Date(weddingDateTime).getFullYear()}
        </p>
      </div>
    </footer>
  )
}
