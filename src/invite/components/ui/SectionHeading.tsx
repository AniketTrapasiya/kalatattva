'use client'

import { useScopedTradition } from '../../context/TraditionContext'
import { DesignDivider } from './DesignOrnaments'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({ id, eyebrow, title, subtitle, tone = 'light', className = '' }: SectionHeadingProps) {
  const { design } = useScopedTradition()
  const dark = tone === 'dark'
  return (
    <Reveal className={`relative mx-auto max-w-2xl text-center ${className}`}>
      <p className={`eyebrow ${dark ? 'text-inv-gold-soft' : 'text-inv-gold-deep'}`}>{eyebrow}</p>
      <h2 id={id} className={`section-title mt-4 ${dark ? 'text-inv-cream' : 'text-inv-primary'}`}>
        {title}
      </h2>
      <DesignDivider kind={design.kind} className={`mx-auto mt-6 h-6 w-48 ${dark ? 'text-inv-gold-soft' : 'text-inv-gold'}`} />
      {subtitle && (
        <p className={`mx-auto mt-6 max-w-lg text-[0.98rem] ${dark ? 'text-inv-ivory/80' : 'text-inv-brown-soft'}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}
