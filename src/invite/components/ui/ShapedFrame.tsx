'use client'

import type { ReactNode } from 'react'
import type { DesignKind } from '../../data/weddingData'

export type ShapeKind = 'arch' | 'scallop' | 'gem' | 'diamond' | 'jharokha' | 'gopuram' | 'circle' | 'rect'

const n = (value: number) => Number(value.toFixed(4))

/** Multifoil jharokha arch: scalloped lobes on an elliptical head above straight jambs */
function jharokhaPath(spring = 0.28, lobes = 7) {
  let d = `M0,1 V${spring}`
  let previous = [0, spring]
  for (let i = 1; i <= lobes; i++) {
    const angle = Math.PI - (Math.PI * i) / lobes
    const point = [0.5 + 0.5 * Math.cos(angle), spring - spring * Math.sin(angle)]
    const radius = Math.hypot(point[0] - previous[0], point[1] - previous[1]) * 0.6
    d += ` A${n(radius)},${n(radius)} 0 0 1 ${n(point[0])},${n(point[1])}`
    previous = point
  }
  return `${d} V1 Z`
}

function scallopPath(count = 5) {
  let d = 'M0,1 V0.07'
  for (let i = 0; i < count; i++) d += ` Q${n((i + 0.5) / count)},-0.02 ${n((i + 1) / count)},0.07`
  return `${d} V1 Z`
}

/** Paths in objectBoundingBox units (0–1), so one definition fits any element size */
export const SHAPES: Record<ShapeKind, string> = {
  arch: 'M0,1 V0.3 C0,0.12 0.22,0 0.5,0 C0.78,0 1,0.12 1,0.3 V1 Z',
  scallop: scallopPath(),
  gem: 'M0.5,0 L1,0.13 V0.94 L0.93,1 H0.07 L0,0.94 V0.13 Z',
  diamond: 'M0.5,0 L1,0.5 L0.5,1 L0,0.5 Z',
  jharokha: jharokhaPath(),
  gopuram: 'M0,1 V0.17 H0.1 V0.12 H0.2 V0.07 H0.32 V0.025 H0.68 V0.07 H0.8 V0.12 H0.9 V0.17 H1 V1 Z',
  circle: 'M0.5,0 A0.5,0.5 0 1,1 0.5,1 A0.5,0.5 0 1,1 0.5,0 Z',
  rect: 'M0,0 H1 V1 H0 Z',
}

/** Which silhouette each design uses for portraits and countdown tiles */
export const DESIGN_SHAPES: Record<DesignKind, { portrait: ShapeKind; tile: ShapeKind }> = {
  heritage: { portrait: 'arch', tile: 'rect' },
  folk: { portrait: 'scallop', tile: 'circle' },
  zari: { portrait: 'gem', tile: 'diamond' },
  royal: { portrait: 'jharokha', tile: 'jharokha' },
  paithani: { portrait: 'rect', tile: 'rect' },
  temple: { portrait: 'gopuram', tile: 'gopuram' },
}

/** Rendered once: the clip paths every ShapedFrame refers to */
export function ShapeDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <defs>
        {Object.entries(SHAPES).map(([kind, d]) => (
          <clipPath key={kind} id={`shape-${kind}`} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        ))}
      </defs>
    </svg>
  )
}

interface ShapedFrameProps {
  shape: ShapeKind
  /** Size and layout of the frame */
  className?: string
  /** Background and padding of the clipped surface */
  fillClassName?: string
  /** Outline colour, e.g. text-inv-gold */
  lineClassName?: string
  double?: boolean
  weight?: number
  children?: ReactNode
}

/**
 * A panel cut to a cultural silhouette, with a crisp outline that follows the cut.
 * The outline is drawn with non-scaling strokes, so it stays hairline at any size.
 */
export function ShapedFrame({
  shape,
  className = '',
  fillClassName = '',
  lineClassName = 'text-inv-gold/70',
  double = true,
  weight = 1.3,
  children,
}: ShapedFrameProps) {
  const clip = `url(#shape-${shape})`
  return (
    <div className={`relative ${className}`}>
      <div className={`h-full ${fillClassName}`} style={{ clipPath: clip, WebkitClipPath: clip }}>
        {children}
      </div>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-0 size-full overflow-visible ${lineClassName}`}
      >
        <path d={SHAPES[shape]} fill="none" stroke="currentColor" strokeWidth={weight} vectorEffect="non-scaling-stroke" />
        {double && (
          <path
            d={SHAPES[shape]}
            transform="translate(0.04 0.03) scale(0.92 0.94)"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.5}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  )
}
