'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useScopedTradition } from '../context/TraditionContext'
import { mainEvent, type DesignKind } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'
import { toNativeDigits } from '../lib/numerals'
import { Mandala } from './ui/Ornaments'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { DESIGN_SHAPES, ShapedFrame } from './ui/ShapedFrame'

/** Tile proportions and colours per design — medallions, diamonds, jharokhas, gopurams */
const TILE: Record<DesignKind, { aspect: string; fill: string; digits: string; line: string }> = {
  heritage: { aspect: '', fill: '', digits: 'text-inv-primary', line: '' },
  paithani: { aspect: '', fill: '', digits: 'text-inv-primary', line: '' },
  folk: { aspect: 'aspect-square', fill: 'bg-inv-primary', digits: 'text-inv-cream', line: 'text-inv-gold' },
  zari: { aspect: 'aspect-square', fill: 'bg-inv-cream', digits: 'text-inv-primary', line: 'text-inv-gold' },
  royal: { aspect: 'aspect-[3/4]', fill: 'bg-inv-primary', digits: 'text-inv-gold-soft', line: 'text-inv-gold' },
  temple: { aspect: 'aspect-[3/4]', fill: 'bg-inv-primary', digits: 'text-inv-gold-soft', line: 'text-inv-gold' },
}

function Digits({ value, className }: { value: number; className: string }) {
  return (
    <span className={`tabular relative block h-[1em] overflow-hidden leading-none ${className}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="block"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Countdown() {
  const { wedding, design, nativeLang } = useScopedTradition()
  const { weddingDateTime, events, couple, countdownTitle } = wedding
  const { days, hours, minutes, seconds, isPast } = useCountdown(weddingDateTime)
  const ceremony = mainEvent(events)
  const kind = design.kind
  const tile = TILE[kind]
  const framed = kind === 'heritage' || kind === 'paithani'

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]
  const digitSize = `display-name not-italic ${kind === 'zari' ? 'text-[clamp(1.5rem,6.5vw,3.5rem)]' : 'text-[clamp(1.7rem,8vw,4.25rem)]'}`

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="paper relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <Mandala className="pointer-events-none absolute top-1/2 left-1/2 size-[48rem] -translate-x-1/2 -translate-y-1/2 text-inv-gold/10" />

      <SectionHeading
        id="countdown-title"
        eyebrow="Counting the moments"
        title={isPast ? 'Happily Married' : countdownTitle}
        subtitle={
          isPast
            ? `${couple.groom.firstName} & ${couple.bride.firstName} are married. Thank you for every blessing.`
            : `${ceremony.day}, ${ceremony.date} · ${ceremony.time}`
        }
      />

      {!isPast && (
        <Reveal className="relative mx-auto mt-14 max-w-3xl">
          <div role="timer" aria-labelledby="countdown-title" className={`grid grid-cols-4 ${kind === 'zari' ? 'gap-3 sm:gap-8' : 'gap-2 sm:gap-5'}`}>
            {units.map((unit) =>
              framed ? (
                <div key={unit.label} className="frame flex flex-col items-center bg-inv-cream px-1 py-6 sm:py-10">
                  <Digits value={unit.value} className={`${digitSize} ${tile.digits}`} />
                  <span className="eyebrow mt-3 text-[0.52rem] tracking-[0.18em] text-inv-gold-deep sm:text-[0.68rem] sm:tracking-[0.3em]">
                    {unit.label}
                  </span>
                  {kind === 'paithani' && (
                    <span lang={nativeLang} aria-hidden="true" className="mt-1 font-native text-sm text-inv-accent sm:text-base">
                      {toNativeDigits(String(unit.value).padStart(2, '0'), nativeLang)}
                    </span>
                  )}
                </div>
              ) : (
                <div key={unit.label} className="flex flex-col items-center">
                  <ShapedFrame
                    shape={DESIGN_SHAPES[kind].tile}
                    className={`w-full ${tile.aspect}`}
                    fillClassName={`grid place-items-center ${tile.fill}`}
                    lineClassName={tile.line}
                    weight={1.5}
                  >
                    {kind === 'folk' && (
                      <span aria-hidden="true" className="absolute inset-[12%] rounded-full border border-dashed border-inv-gold/70" />
                    )}
                    <Digits
                      value={unit.value}
                      className={`${digitSize} ${tile.digits} ${kind === 'royal' || kind === 'temple' ? 'mt-[35%]' : ''}`}
                    />
                  </ShapedFrame>
                  <span className="eyebrow mt-3 text-[0.52rem] tracking-[0.18em] text-inv-gold-deep sm:text-[0.68rem] sm:tracking-[0.3em]">
                    {unit.label}
                  </span>
                </div>
              ),
            )}
          </div>
        </Reveal>
      )}
    </section>
  )
}
