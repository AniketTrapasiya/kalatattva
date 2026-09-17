'use client'

import { useId, type ReactNode } from 'react'
import type { DesignKind, NativeLang } from '../../data/weddingData'
import { GaneshMotif } from './GaneshMotif'
import { CornerFlourish, LotusDivider, Toran } from './Ornaments'

interface OrnamentProps {
  kind: DesignKind
  className?: string
}

const accent = { fill: 'var(--color-inv-accent)' }

function DividerShell({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 240 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

/** Four-point zari sparkle */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M10 0l1.9 8.1L20 10l-8.1 1.9L10 20l-1.9-8.1L0 10l8.1-1.9z" />
    </svg>
  )
}

/** Section divider in the tradition's own ornament */
export function DesignDivider({ kind, className = '' }: OrnamentProps) {
  switch (kind) {
    case 'folk':
      return (
        <DividerShell className={className}>
          <path d="M6 12h58M176 12h58" strokeDasharray="4 3" />
          <path d="M70 7l6 10 6-10 6 10 6-10" />
          <path d="M146 7l6 10 6-10 6 10 6-10" />
          <circle cx="120" cy="12" r="9.5" strokeDasharray="1.6 2" />
          <circle cx="120" cy="12" r="5" style={accent} strokeWidth="1.4" />
          <circle cx="104" cy="12" r="2" fill="currentColor" stroke="none" />
          <circle cx="136" cy="12" r="2" fill="currentColor" stroke="none" />
        </DividerShell>
      )
    case 'zari':
      return (
        <DividerShell className={className}>
          <path d="M6 12h86M148 12h86" />
          <path d="M6 15h70M164 15h70" strokeOpacity="0.45" />
          <path d="M120 2l12 8-12 12-12-12z" />
          <path d="M108 10h24M114 10l6 12 6-12M114 10l6-8 6 8" strokeOpacity="0.7" />
          <path d="M98 12l1.2 -3.5 1.2 3.5-1.2 3.5z M142 12l1.2-3.5 1.2 3.5-1.2 3.5z" style={accent} stroke="none" />
        </DividerShell>
      )
    case 'royal':
      return (
        <DividerShell className={className}>
          <path d="M6 18h92M142 18h92" />
          <path d="M20 14h72M148 14h72" strokeOpacity="0.45" />
          <path d="M102 20h36" />
          <path d="M106 20c0-8 6-12 14-15 8 3 14 7 14 15" />
          <path d="M112 20c0-5 3.5-8 8-10 4.5 2 8 5 8 10" strokeOpacity="0.55" />
          <path d="M120 5V1.5" />
          <circle cx="120" cy="1.8" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="94" cy="18" r="1.8" style={accent} stroke="none" />
          <circle cx="146" cy="18" r="1.8" style={accent} stroke="none" />
        </DividerShell>
      )
    case 'paithani':
      return (
        <DividerShell className={className}>
          <path d="M6 10h92M142 10h92M6 14h92M142 14h92" />
          <path d="M120 2.5c-6.5 5.5-7.5 11.5-5.5 17h11c2-5.5 1-11.5-5.5-17z" style={accent} />
          <path d="M120 7c-2.5 3-3 7-2 10.5M120 7c2.5 3 3 7 2 10.5" />
          <circle cx="104" cy="12" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="136" cy="12" r="1.8" fill="currentColor" stroke="none" />
        </DividerShell>
      )
    case 'temple':
      return (
        <DividerShell className={className}>
          <path d="M6 16h82M152 16h82" />
          <path d="M111 22h18M120 22v-7M110 12.5h20l-3.5 3h-13z" />
          <path d="M120 3c-2.4 2.6-2.6 5.4 0 7.4 2.6-2 2.4-4.8 0-7.4z" style={accent} />
          {[94, 100, 140, 146].map((x) => (
            <circle key={x} cx={x} cy="16" r="1.6" fill="currentColor" stroke="none" />
          ))}
          <path d="M20 12c4-5 8-5 12 0s8 5 12 0M196 12c4-5 8-5 12 0s8 5 12 0" strokeOpacity="0.5" />
        </DividerShell>
      )
    default:
      return <LotusDivider className={className} />
  }
}

/** Decorative band along the top of a dark section: toran, bunting, lace, gota, woven border, temple border */
export function DesignBand({ kind, className = '' }: OrnamentProps) {
  const id = `band-${kind}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  const tiles: Partial<Record<DesignKind, { width: number; height: number; body: ReactNode }>> = {
    folk: {
      width: 60,
      height: 40,
      body: (
        <>
          <path d="M0 4Q15 10 30 4T60 4" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M5 6L15 30 25 6Z" fill="currentColor" />
          <path d="M35 6L45 30 55 6Z" style={accent} />
          <circle cx="15" cy="13" r="2.6" style={accent} />
          <circle cx="45" cy="13" r="2.6" fill="currentColor" />
          <path d="M15 30v5M45 30v5" stroke="currentColor" strokeWidth="1" />
        </>
      ),
    },
    zari: {
      width: 28,
      height: 30,
      body: (
        <>
          <path d="M0 3H28" stroke="currentColor" strokeWidth="1" />
          <path d="M0 3A14 13 0 0 0 28 3" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M3 3A11 9 0 0 0 25 3" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
          <path d="M14 18l3 4-3 5-3-5z" style={accent} />
        </>
      ),
    },
    royal: {
      width: 36,
      height: 40,
      body: (
        <>
          <path d="M0 3H36" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 3Q9 20 18 3T36 3" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1" />
          <path d="M18 3v20" stroke="currentColor" strokeWidth="0.8" />
          <path d="M18 23c-3 3-3 8 0 12 3-4 3-9 0-12z" style={accent} />
          <circle cx="18" cy="22" r="1.6" fill="currentColor" />
        </>
      ),
    },
    paithani: {
      width: 28,
      height: 30,
      body: (
        <>
          <rect width="28" height="22" style={accent} />
          <path d="M0 2.5H28M0 19.5H28" stroke="currentColor" strokeWidth="1" />
          <path d="M14 5c-4 3.5-4.6 7-3.4 10.5h6.8C18.6 12 18 8.5 14 5z" fill="currentColor" />
          <path d="M0 22l3.5 6 3.5-6 3.5 6 3.5-6 3.5 6 3.5-6 3.5 6 3.5-6" fill="none" stroke="currentColor" strokeWidth="0.9" />
        </>
      ),
    },
    temple: {
      width: 24,
      height: 30,
      body: (
        <>
          <rect width="24" height="6" fill="currentColor" fillOpacity="0.3" />
          <path d="M0 6L6 20 12 6 18 20 24 6Z" fill="currentColor" />
          <circle cx="6" cy="24" r="2.2" style={accent} />
          <circle cx="18" cy="24" r="2.2" fill="currentColor" />
        </>
      ),
    },
  }

  const tile = tiles[kind]
  if (!tile) return <Toran className={className} />

  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height={tile.height}>
      <defs>
        <pattern id={id} width={tile.width} height={tile.height} patternUnits="userSpaceOnUse">
          {tile.body}
        </pattern>
      </defs>
      <rect width="100%" height={tile.height} fill={`url(#${id})`} />
    </svg>
  )
}

/** Kuthuvilakku — the tall brass lamp of Tamil homes and temples */
export function Kuthuvilakku({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 120"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M40 6c-4 5-4.5 10 0 13.5 4.5-3.5 4-8.5 0-13.5z" style={accent} />
      <path d="M40 19v5M30 24h20M26 30c4 5 24 5 28 0M22 30h36" />
      {[18, 62].map((x) => (
        <path key={x} d={`M${x} 30c0-4 2-6 4-6`} />
      ))}
      <path d="M40 34v44M36 46h8M34 58h12M36 70h8" />
      <path d="M40 78c-10 4-14 12-14 18h28c0-6-4-14-14-18zM20 96h40l4 8H16z" />
      <path d="M12 112h56" />
    </svg>
  )
}

/** The auspicious mark that opens the invitation */
export function InvocationMark({ kind, invocation, lang, className = '' }: OrnamentProps & { invocation: string; lang: NativeLang }) {
  if (kind === 'temple') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <span lang={lang} className="font-native text-5xl leading-none text-inv-primary">
          {invocation}
        </span>
        <Kuthuvilakku className="mt-3 h-20 w-14 text-inv-gold" />
      </div>
    )
  }
  return (
    <div className={className}>
      <GaneshMotif className="mx-auto h-24 w-24 text-inv-gold sm:h-28 sm:w-28" />
      <p lang={lang} className="mt-4 font-native text-lg text-inv-primary">
        {invocation}
      </p>
    </div>
  )
}

/** Card corner ornaments for the invitation, in each design's idiom */
export function InvitationCorners({ kind }: { kind: DesignKind }) {
  const positions = ['left-3 top-3', 'right-3 top-3 rotate-90', 'right-3 bottom-3 rotate-180', 'left-3 bottom-3 -rotate-90']

  if (kind === 'heritage') {
    return positions.map((position) => (
      <CornerFlourish key={position} className={`pointer-events-none absolute size-12 text-inv-gold/70 sm:size-16 ${position}`} />
    ))
  }
  if (kind === 'zari') {
    return ['left-5 top-5', 'right-5 top-5', 'right-5 bottom-5', 'left-5 bottom-5'].map((position, index) => (
      <Sparkle
        key={position}
        className={`animate-twinkle pointer-events-none absolute size-4 ${index % 2 ? 'text-inv-accent' : 'text-inv-gold'} ${position}`}
      />
    ))
  }
  if (kind === 'temple') {
    return ['left-4 top-6', 'right-4 top-6', 'right-4 bottom-6', 'left-4 bottom-6'].map((position) => (
      <svg key={position} viewBox="0 0 40 40" aria-hidden="true" className={`pointer-events-none absolute size-9 text-inv-gold ${position}`}>
        <g fill="currentColor">
          {[
            [20, 8],
            [8, 20],
            [32, 20],
            [20, 32],
            [20, 20],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
          ))}
        </g>
        <path
          d="M20 3c9 0 17 8 17 17s-8 17-17 17S3 29 3 20 11 3 20 3zM20 8c3 6 6 9 12 12-6 3-9 6-12 12-3-6-6-9-12-12 6-3 9-6 12-12z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.6"
        />
      </svg>
    ))
  }
  // folk and royal corners come from the .frame styles; paithani has its woven border
  return null
}

/** A cusped jharokha crown that sits on top of a royal card */
export function JharokhaCrown({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 70" className={className} aria-hidden="true" focusable="false">
      <path
        d="M10 68V52h14c4-14 12-24 24-30 6-12 18-20 32-22h60c14 2 26 10 32 22 12 6 20 16 24 30h14v16z"
        fill="var(--color-inv-cream)"
        stroke="var(--color-inv-gold)"
        strokeWidth="1.5"
      />
      <path
        d="M36 68c3-12 10-20 20-24 5-10 14-16 25-18h58c11 2 20 8 25 18 10 4 17 12 20 24"
        fill="none"
        stroke="var(--color-inv-gold)"
        strokeOpacity="0.55"
      />
      <path d="M104 26c0-8 3-13 6-16 3 3 6 8 6 16z" fill="var(--color-inv-gold)" />
      <circle cx="110" cy="7" r="3" fill="var(--color-inv-accent)" />
      {[70, 150].map((x) => (
        <circle key={x} cx={x} cy="46" r="3" fill="var(--color-inv-accent)" />
      ))}
    </svg>
  )
}
