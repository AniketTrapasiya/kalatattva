'use client'

import { useScopedTradition } from '../context/TraditionContext'
import { DesignDivider, InvitationCorners, InvocationMark, JharokhaCrown, Sparkle } from './ui/DesignOrnaments'
import { Mandala, Rings } from './ui/Ornaments'
import { RegionPattern } from './ui/RegionPattern'
import { Reveal } from './ui/Reveal'

export function Invitation() {
  const { wedding, nativeLang, design, theme } = useScopedTradition()
  const kind = design.kind
  const { invitation, couple } = wedding

  return (
    <section
      id="invitation"
      aria-labelledby="invitation-title"
      className="paper relative overflow-hidden px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32"
    >
      <Mandala className="pointer-events-none absolute -top-48 -right-48 size-[34rem] text-inv-gold/15" />
      <Mandala className="pointer-events-none absolute -bottom-56 -left-56 size-[38rem] text-inv-gold/10" />

      <div
        className={`frame frame-lg relative mx-auto max-w-3xl bg-inv-cream/80 px-5 pb-14 text-center sm:px-14 sm:pb-20 ${
          kind === 'royal' ? 'mt-12 pt-16 sm:pt-24' : 'pt-14 sm:pt-20'
        }`}
      >
        {kind === 'royal' && <JharokhaCrown className="absolute -top-[3.4rem] left-1/2 w-56 -translate-x-1/2" />}
        {kind === 'folk' && (
          <RegionPattern kind={theme.pattern} className="absolute inset-x-4 top-4 w-[calc(100%-2rem)] text-inv-primary/70" />
        )}
        {kind === 'paithani' && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-3 bg-inv-accent" />}
        <InvitationCorners kind={kind} />

        <Reveal>
          <InvocationMark kind={kind} invocation={invitation.invocation} lang={nativeLang} />
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-xl">
          <p className="display-quote text-lg leading-relaxed text-inv-brown sm:text-xl">{invitation.blessing}</p>
          <p lang={nativeLang} className="mt-2 font-native text-sm text-inv-brown-soft">
            {invitation.blessingNative}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <p className="display-name text-xl text-inv-primary not-italic sm:text-2xl">{invitation.hostFamily.names}</p>
          <p className="eyebrow mt-2 text-[0.6rem] text-inv-gold-deep">{invitation.hostFamily.native}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <h2
            id="invitation-title"
            className={`font-script leading-[0.95] text-inv-primary ${
              kind === 'heritage' || kind === 'royal' || kind === 'zari' ? 'text-[clamp(4rem,17vw,6.5rem)]' : 'text-[clamp(3rem,13vw,5rem)]'
            }`}
          >
            {invitation.inviteWord}
          </h2>
          <p lang={nativeLang} className="font-native text-sm text-inv-gold-deep">
            {invitation.inviteNative}
          </p>
          <p className="mt-2 text-inv-brown-soft">{invitation.request}</p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <p className="display-name text-[length:calc(clamp(3.2rem,14vw,5.5rem)*var(--name-scale))] leading-none text-inv-primary">
            {couple.groom.firstName}
          </p>
          <p lang={nativeLang} className="mt-2 font-native text-sm text-inv-gold-deep">
            {couple.groom.nativeName}
          </p>

          <div aria-hidden="true" className="my-6 flex items-center justify-center gap-4 text-inv-gold">
            <span className="h-px w-14 bg-inv-gold/60 sm:w-20" />
            {kind === 'zari' ? <Sparkle className="animate-twinkle size-6 text-inv-accent" /> : <Rings className="h-8 w-12" />}
            <span className="h-px w-14 bg-inv-gold/60 sm:w-20" />
          </div>
          <p className="sr-only">and</p>

          <p className="display-name text-[length:calc(clamp(3.2rem,14vw,5.5rem)*var(--name-scale))] leading-none text-inv-primary">
            {couple.bride.firstName}
          </p>
          <p lang={nativeLang} className="mt-2 font-native text-sm text-inv-gold-deep">
            {couple.bride.nativeName}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-inv-brown-soft">{invitation.brideFamily.intro}</p>
          <p className="display-name mt-1 text-xl text-inv-primary not-italic sm:text-2xl">{invitation.brideFamily.names}</p>
          <p className="eyebrow mt-2 text-[0.6rem] text-inv-gold-deep">{invitation.brideFamily.native}</p>
        </Reveal>

        <Reveal className="mt-12">
          <DesignDivider kind={kind} className="mx-auto h-6 w-48 text-inv-gold" />
          <p className="display-quote mx-auto mt-6 max-w-md text-lg text-inv-brown">{invitation.closing}</p>
          <p lang={nativeLang} className="mt-2 font-native text-sm text-inv-brown-soft">
            {invitation.closingNative}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
