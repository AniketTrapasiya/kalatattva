'use client'

import { useId, type ReactNode } from 'react'
import type { PatternKind } from '../../data/weddingData'

interface RegionPatternProps {
  kind: PatternKind
  className?: string
}

const TILE: Record<PatternKind, { width: number; body: ReactNode }> = {
  // Kathiyawadi abhla bharat — mirror discs set in stitched diamonds
  abhla: {
    width: 32,
    body: (
      <>
        <path d="M16 3l11 9-11 9-11-9z" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="16" cy="12" r="3.4" fill="currentColor" />
        <circle cx="16" cy="12" r="5.6" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1 1.6" />
        <circle cx="0" cy="12" r="1.3" fill="currentColor" />
        <circle cx="32" cy="12" r="1.3" fill="currentColor" />
      </>
    ),
  },
  // Surat zari — a chain of faceted diamonds on a gold thread
  zari: {
    width: 30,
    body: (
      <>
        <path d="M0 12H30" stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6" />
        <path d="M15 4l7 8-7 8-7-8z" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <path d="M8 12h14M11.5 8l3.5 12 3.5-12" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M0 9.5l1 2.5-1 2.5-1-2.5zM30 9.5l1 2.5-1 2.5-1-2.5z" fill="currentColor" />
      </>
    ),
  },
  // Patan patola — stepped ikat diamonds
  patola: {
    width: 28,
    body: (
      <>
        <path d="M14 2l3 3h3v3l3 4-3 4v3h-3l-3 3-3-3H8v-3l-3-4 3-4V5h3z" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <path d="M14 8l4 4-4 4-4-4z" fill="currentColor" />
        <path d="M0 10v4M28 10v4" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  },
  // Rajasthani leheriya — rippling waves with bandhej dots
  leheriya: {
    width: 24,
    body: (
      <>
        <path d="M0 8q6-5 12 0t12 0M0 16q6-5 12 0t12 0" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="6" cy="12" r="1.1" fill="currentColor" />
        <circle cx="18" cy="12" r="1.1" fill="currentColor" />
        <circle cx="12" cy="20.5" r="0.9" fill="currentColor" />
        <circle cx="0" cy="3.5" r="0.9" fill="currentColor" />
        <circle cx="24" cy="3.5" r="0.9" fill="currentColor" />
      </>
    ),
  },
  // Paithani narali border — coconut-shaped buttas along a zari line
  paithani: {
    width: 30,
    body: (
      <>
        <path d="M0 21h30" stroke="currentColor" strokeWidth="0.9" />
        <path d="M15 4c-6 6-7 11-5 17h10c2-6 1-11-5-17z" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <path d="M15 9c-2.5 3-3 7-2 12M15 9c2.5 3 3 7 2 12" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="0" cy="12" r="1.4" fill="currentColor" />
        <circle cx="30" cy="12" r="1.4" fill="currentColor" />
      </>
    ),
  },
  // Kolam — a line looping around a row of dots
  kolam: {
    width: 24,
    body: (
      <>
        <path d="M0 12C4 3 8 3 12 12S20 21 24 12" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <path d="M0 12C4 21 8 21 12 12S20 3 24 12" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="6" cy="12" r="1.3" fill="currentColor" />
        <circle cx="18" cy="12" r="1.3" fill="currentColor" />
      </>
    ),
  },
}

/** A narrow woven band in the tradition's textile or floor-art pattern */
export function RegionPattern({ kind, className = '' }: RegionPatternProps) {
  const patternId = `region-${kind}-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const tile = TILE[kind]
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="24">
      <defs>
        <pattern id={patternId} width={tile.width} height="24" patternUnits="userSpaceOnUse">
          {tile.body}
        </pattern>
      </defs>
      <rect width="100%" height="24" fill={`url(#${patternId})`} />
    </svg>
  )
}
