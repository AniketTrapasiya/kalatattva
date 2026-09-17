'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useScopedTradition } from '../context/TraditionContext'
import type { DesignKind, Tradition } from '../data/weddingData'
import { DesignDivider, Sparkle } from './ui/DesignOrnaments'

const TEMPLE_SIZES = '(max-width: 640px) 92vw, 44vh'
const EASE = [0.22, 1, 0.36, 1] as const

/** 2:3 artwork; height is capped so the names always keep the upper third of the sky */
const TEMPLE_BOX =
  'relative aspect-[2/3] h-[min(62svh,136vw,calc(100svh_-_21.5rem))] sm:h-[min(60svh,118vw,calc(100svh_-_24rem))]'

type Side = 'left' | 'right'

/** Each design sets its hero tagline differently */
const TAGLINE: Record<DesignKind, string> = {
  heritage: 'font-italiana text-[0.8rem] tracking-[0.34em] sm:text-sm',
  folk: 'font-display text-[0.95rem] tracking-[0.18em] sm:text-base',
  zari: 'font-display text-[0.7rem] font-medium tracking-[0.55em] sm:text-sm',
  royal: 'font-display text-[0.78rem] font-semibold tracking-[0.3em] sm:text-sm',
  paithani: 'font-display text-[0.95rem] font-semibold tracking-[0.16em] sm:text-base',
  temple: 'font-display text-[0.95rem] font-semibold tracking-[0.18em] sm:text-base',
}

/** How much wider each display face sets than Playfair italic, to keep one line of names on a phone */
const NAME_WIDTH: Record<DesignKind, number> = {
  heritage: 1,
  folk: 1.12,
  zari: 1.16,
  royal: 1.5,
  paithani: 1.08,
  temple: 1.12,
}

type HeroArt = Tradition['heroArt']

// Top clouds sit above the heading so the white type never lands on white cloud
const CLOUDS: { src: string; side: Side; className: string }[] = [
  { src: '/images/invitations/cloud-1.webp', side: 'left', className: '-left-[18%] -top-[3%] w-[48vw] max-w-[440px] opacity-90' },
  { src: '/images/invitations/cloud-3.webp', side: 'right', className: '-right-[22%] top-[1%] w-[56vw] max-w-[520px] opacity-80' },
  { src: '/images/invitations/cloud-2.webp', side: 'left', className: '-left-[30%] top-[42%] w-[80vw] max-w-[720px]' },
  { src: '/images/invitations/cloud-1.webp', side: 'right', className: '-right-[36%] top-[50%] w-[84vw] max-w-[780px] -scale-x-100' },
  { src: '/images/invitations/cloud-3.webp', side: 'left', className: '-left-[24%] -bottom-[2%] w-[96vw] max-w-[940px]' },
  { src: '/images/invitations/cloud-2.webp', side: 'right', className: '-right-[28%] bottom-[5%] w-[70vw] max-w-[680px] -scale-x-100' },
]

/*
 * Every scroll range below spans the full 0 → 1 domain. Framer Motion hands
 * scroll-linked opacity to a native ViewTimeline, and a range that stops short
 * of 0 or 1 makes the browser interpolate back toward the stale inline value.
 */

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const { heroArt } = useScopedTradition()
  // Progress runs 0 → 1 while the hero itself scrolls out of view — no pinned runway, no scroll locking.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  return (
    <header ref={ref} id="top" className="relative h-[100svh] min-h-[36rem] overflow-hidden">
      {reduceMotion ? <StaticScene art={heroArt} /> : <PortalScene art={heroArt} progress={scrollYProgress} />}
      <HeroText progress={scrollYProgress} reduceMotion={reduceMotion} />
    </header>
  )
}

function HeroText({ progress, reduceMotion }: { progress: MotionValue<number>; reduceMotion: boolean }) {
  const { wedding, design } = useScopedTradition()
  const { hero, weddingDateTime, venue } = wedding
  const opacity = useTransform(progress, [0, 0.2, 1], [1, 0, 0])
  const y = useTransform(progress, [0, 0.25, 1], ['0px', '-70px', '-70px'])
  const cueOpacity = useTransform(progress, [0, 0.06, 1], [1, 0, 0])
  // Long name pairs ("Karthik weds Meenakshi") shrink so the single line always fits a phone
  const nameVw = Math.min(11.5, 138 / (hero.groom.length + hero.bride.length)) / NAME_WIDTH[design.kind]

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.3, delay, ease: EASE },
  })

  return (
    <motion.div
      className="text-shadow-sky relative z-20 flex flex-col items-center px-5 pt-[max(10svh,4.25rem)] text-center text-white sm:pt-[max(8svh,4.25rem)]"
      style={reduceMotion ? undefined : { opacity, y }}
    >
      <motion.p {...entrance(0.2)} className={`flex items-center gap-3 uppercase ${TAGLINE[design.kind]}`}>
        {design.kind === 'zari' && <Sparkle className="animate-twinkle size-3" />}
        {hero.tagline}
        {design.kind === 'zari' && <Sparkle className="animate-twinkle size-3 [animation-delay:-1.6s]" />}
      </motion.p>

      <motion.h1
        {...entrance(0.4)}
        className="display-name mt-4 flex items-baseline justify-center gap-[0.2em] leading-none whitespace-nowrap"
        style={{ fontSize: `clamp(1.75rem, min(${nameVw.toFixed(2)}vw, 13svh), 6.5rem)` }}
      >
        <span>{hero.groom}</span>
        <span className="font-script text-[0.5em] font-normal tracking-normal normal-case not-italic">{hero.joiner}</span>
        <span>{hero.bride}</span>
      </motion.h1>

      <motion.div {...entrance(0.55)} aria-hidden="true">
        <DesignDivider kind={design.kind} className="mt-3 h-5 w-40 text-white/85" />
      </motion.div>

      <motion.div {...entrance(0.65)} className="mt-3 flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-white/70 sm:w-12" />
        <time
          dateTime={weddingDateTime.slice(0, 10)}
          className="tabular font-display text-[0.9rem] tracking-[0.24em] uppercase sm:text-base"
        >
          {hero.dateLabel}
        </time>
        <span aria-hidden="true" className="h-px w-8 bg-white/70 sm:w-12" />
      </motion.div>

      <motion.p {...entrance(0.8)} className="eyebrow mt-2.5 text-[0.6rem] text-white/90">
        {venue.addressLines[venue.addressLines.length - 1]}
      </motion.p>

      <motion.div style={reduceMotion ? undefined : { opacity: cueOpacity }}>
        <motion.a
          {...entrance(1.1)}
          href="#invitation"
          className="eyebrow mt-5 flex flex-col items-center gap-2 px-3 py-1 text-[0.58rem] text-white/95"
        >
          {hero.scrollCue}
          <span aria-hidden="true" className="relative h-8 w-px overflow-hidden bg-white/35">
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" />
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

/**
 * Scroll-linked portal: the temple grows as if the visitor walks toward it, splits
 * into two halves that swing outward like doors, warm light floods through the
 * opening, and the layer dissolves onto the ivory invitation waiting beneath it.
 */
function PortalScene({ art, progress }: { art: HeroArt; progress: MotionValue<number> }) {
  const layerOpacity = useTransform(progress, [0, 0.78, 0.97, 1], [1, 1, 0, 0])
  const visibility = useTransform(progress, (value) => (value >= 0.995 ? 'hidden' : 'visible'))

  const cloudsLeftX = useTransform(progress, [0, 0.7, 1], ['0vw', '-38vw', '-38vw'])
  const cloudsRightX = useTransform(progress, [0, 0.7, 1], ['0vw', '38vw', '38vw'])
  const cloudScale = useTransform(progress, [0, 0.7, 1], [1, 1.3, 1.3])
  // Light from the doorway washes the sky to warm ivory rather than letting it fade to grey
  const veilOpacity = useTransform(progress, [0, 0.3, 0.64, 1], [0, 0, 1, 1])

  const templeScale = useTransform(progress, [0, 0.4, 1], [1, 1.5, 1.95])
  const leftX = useTransform(progress, [0, 0.28, 0.9, 1], ['0vw', '0vw', '-34vw', '-34vw'])
  const rightX = useTransform(progress, [0, 0.28, 0.9, 1], ['0vw', '0vw', '34vw', '34vw'])
  const leftRotate = useTransform(progress, [0, 0.28, 0.9, 1], [0, 0, 32, 32])
  const rightRotate = useTransform(progress, [0, 0.28, 0.9, 1], [0, 0, -32, -32])

  const doorwayGlow = useTransform(progress, [0, 0.04, 0.22, 0.36, 0.5, 1], [0, 0, 1, 1, 0, 0])
  const coreOpacity = useTransform(progress, [0, 0.2, 0.4, 0.8, 0.96, 1], [0, 0, 1, 1, 0, 0])
  const coreScale = useTransform(progress, [0, 0.2, 0.9, 1], [0.55, 0.55, 3.6, 3.6])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-10 h-[100lvh] overflow-hidden"
      style={{ opacity: layerOpacity, visibility }}
    >
      <div className="sky absolute inset-0">
        <Clouds leftX={cloudsLeftX} rightX={cloudsRightX} scale={cloudScale} />
      </div>

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_78%,#fffcf4_0%,var(--color-cream)_38%,var(--color-ivory)_75%)]"
        style={{ opacity: veilOpacity }}
      />

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <motion.div
          className={TEMPLE_BOX}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{ scale: templeScale, transformOrigin: `50% ${art.doorY * 100 + 3}%`, perspective: 1400 }}
        >
          {/* Warm light behind the doors, revealed as the halves part */}
          <motion.div
            className="absolute left-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fffaf0_0%,rgba(255,228,176,0.95)_28%,rgba(250,200,120,0.45)_50%,rgba(250,190,110,0)_70%)]"
            style={{ top: `${(art.doorY - 0.04) * 100}%`, opacity: coreOpacity, scale: coreScale }}
          />
          <TempleHalf art={art} side="left" x={leftX} rotateY={leftRotate} />
          <TempleHalf art={art} side="right" x={rightX} rotateY={rightRotate} />
          {/* Lamplight kindling inside the doorway as the visitor approaches */}
          <motion.div
            className="absolute left-1/2 h-[16%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,244,210,1)_0%,rgba(255,208,122,0.9)_30%,rgba(255,172,72,0.35)_56%,rgba(255,160,60,0)_72%)]"
            style={{ top: `${(art.doorY + 0.03) * 100}%`, opacity: doorwayGlow }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

interface TempleHalfProps {
  art: HeroArt
  side: Side
  x: MotionValue<string>
  rotateY: MotionValue<number>
}

function TempleHalf({ art, side, x, rotateY }: TempleHalfProps) {
  const isLeft = side === 'left'
  return (
    <motion.img
      src={art.src}
      srcSet={art.srcSet}
      sizes={TEMPLE_SIZES}
      alt=""
      width={1024}
      height={1536}
      fetchPriority="high"
      draggable={false}
      className="absolute inset-0 size-full object-contain object-bottom select-none will-change-transform"
      style={{
        x,
        rotateY,
        transformOrigin: isLeft ? '0% 50%' : '100% 50%',
        // Halves overlap by a pixel so no seam shows before the doors open
        clipPath: isLeft ? 'inset(0 calc(50% - 0.5px) 0 0)' : 'inset(0 0 0 calc(50% - 0.5px))',
      }}
    />
  )
}

/** Reduced-motion hero: the same composition, perfectly still */
function StaticScene({ art }: { art: HeroArt }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="sky absolute inset-0">
        <Clouds />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className={TEMPLE_BOX}>
          <img
            src={art.src}
            srcSet={art.srcSet}
            sizes={TEMPLE_SIZES}
            alt=""
            width={1024}
            height={1536}
            fetchPriority="high"
            className="absolute inset-0 size-full object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  )
}

interface CloudsProps {
  leftX?: MotionValue<string>
  rightX?: MotionValue<string>
  scale?: MotionValue<number>
}

function Clouds({ leftX, rightX, scale }: CloudsProps) {
  return (
    <div className="hero-clouds absolute inset-0">
      {(['left', 'right'] as const).map((side) => (
        <motion.div key={side} className="absolute inset-0" style={{ x: side === 'left' ? leftX : rightX, scale }}>
          {CLOUDS.filter((cloud) => cloud.side === side).map((cloud, index) => (
            <img
              key={`${cloud.src}-${index}`}
              src={cloud.src}
              alt=""
              draggable={false}
              decoding="async"
              className={`hero-cloud animate-cloud-drift absolute h-auto select-none ${cloud.className}`}
              style={{ animationDelay: `${index * -9}s` }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  )
}
