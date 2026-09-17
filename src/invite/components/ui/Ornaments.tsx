'use client'

import { useId, type CSSProperties } from 'react'

interface OrnamentProps {
  className?: string
  style?: CSSProperties
}

/** Horizontal rule with a lotus at its heart */
export function LotusDivider({ className = '' }: OrnamentProps) {
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
    >
      <path d="M10 13h84M146 13h84" />
      <path d="M2 13l4-3 4 3-4 3z M230 13l4-3 4 3-4 3z" fill="currentColor" stroke="none" />
      <circle cx="100" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="140" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <path d="M120 2c-4.5 4.5-5.5 11 0 17 5.5-6 4.5-12.5 0-17z" />
      <path d="M120 19c-3-5.5-9-9-16-8.5 2.5 5.5 8.5 8.5 16 8.5z" />
      <path d="M120 19c3-5.5 9-9 16-8.5-2.5 5.5-8.5 8.5-16 8.5z" />
      <path d="M106 22h28" />
    </svg>
  )
}

/** Concentric petal mandala, drawn procedurally */
export function Mandala({ className = '', style }: OrnamentProps) {
  const ring = (count: number, inner: number, outer: number, width: number) =>
    Array.from({ length: count }, (_, index) => {
      const mid = 100 - (inner + outer) / 2
      return (
        <path
          key={`${inner}-${index}`}
          d={`M100 ${100 - inner}Q${100 + width} ${mid} 100 ${100 - outer}Q${100 - width} ${mid} 100 ${100 - inner}z`}
          transform={`rotate(${(index * 360) / count} 100 100)`}
        />
      )
    })

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
    >
      <circle cx="100" cy="100" r="98" />
      <circle cx="100" cy="100" r="93" strokeDasharray="0.8 3" />
      {ring(36, 64, 90, 5)}
      <circle cx="100" cy="100" r="62" />
      {ring(18, 36, 60, 8)}
      <circle cx="100" cy="100" r="34" />
      {ring(9, 12, 32, 7)}
      <circle cx="100" cy="100" r="7" />
    </svg>
  )
}

/** Vine flourish for card corners — rotate with utility classes */
export function CornerFlourish({ className = '' }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M2 62V22C2 11 11 2 22 2h40" />
      <path d="M14 46c0-14 9-26 24-30" />
      <path d="M21 33c-7-2-10-8-7-15 7 1 10 8 7 15z" />
      <path d="M31 22c-2-7 2-13 9-14 1 7-3 12-9 14z" />
      <path d="M14 46c-5 0-8 3-8 7" />
      <circle cx="44" cy="15" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="52" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Hanging mango-leaf toran garland that tiles across its container */
export function Toran({ className = '' }: OrnamentProps) {
  const patternId = `toran-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="40">
      <defs>
        <pattern id={patternId} width="48" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 3Q24 20 48 3" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M24 11.5v5" stroke="currentColor" strokeWidth="0.8" />
          <path d="M24 16c-4.5 5.5-4.5 12 0 18 4.5-6 4.5-12.5 0-18z" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M24 19v12" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="3" r="2.2" fill="currentColor" />
          <circle cx="48" cy="3" r="2.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#${patternId})`} />
    </svg>
  )
}

/** Interlocked wedding rings */
export function Rings({ className = '' }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="24" cy="22" r="13" />
      <circle cx="40" cy="22" r="13" />
      <path d="M20 6l4-4 4 4-4 3z" fill="currentColor" stroke="none" />
    </svg>
  )
}
