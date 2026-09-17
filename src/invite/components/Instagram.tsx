'use client'

import { Camera, Check, Copy, ExternalLink, Heart, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useWedding } from '../context/TraditionContext'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API is unavailable on insecure origins — fall back to a hidden textarea
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const copied = document.execCommand('copy')
    area.remove()
    return copied
  }
}

export function Instagram() {
  const { instagram } = useWedding()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2400)
    return () => window.clearTimeout(id)
  }, [copied])

  const steps = [
    { icon: Camera, title: 'Capture', text: 'Candid smiles, twirling lehengas, the dhol at midnight — every moment counts.' },
    { icon: Tag, title: 'Tag', text: `Add ${instagram.hashtag} to your posts, stories and reels.` },
    { icon: Heart, title: 'Relive', text: 'We will gather them into a family album to treasure for years to come.' },
  ]

  return (
    <section id="instagram" aria-labelledby="instagram-title" className="bg-inv-cream px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        id="instagram-title"
        eyebrow="Share the love"
        title="Capture Every Moment"
        subtitle="Tag your photos so we can see the celebrations through your eyes."
      />

      <Reveal className="mx-auto mt-14 max-w-3xl">
        <div className="frame bg-inv-ivory px-5 py-12 text-center sm:px-12 sm:py-16">
          <p className="eyebrow text-inv-gold-deep">Our wedding hashtag</p>
          <p
            className="display-name mt-4 leading-tight break-words text-inv-primary"
            // Long hashtags shrink to stay on one line on a phone
            style={{ fontSize: `calc(clamp(1.5rem, ${Math.min(9, 150 / instagram.hashtag.length).toFixed(2)}vw, 4.5rem) * var(--name-scale))` }}
          >
            {instagram.hashtag}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="btn btn-primary min-w-52"
              onClick={async () => setCopied(await copyText(instagram.hashtag))}
            >
              {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
              {copied ? 'Copied' : 'Copy hashtag'}
            </button>
            <a className="btn btn-outline min-w-52" href={instagram.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink aria-hidden="true" className="size-4" />
              Open Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied ? 'Hashtag copied to clipboard' : ''}
          </p>
        </div>
      </Reveal>

      <ol className="mx-auto mt-16 grid max-w-5xl gap-12 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 0.1} className="text-center">
              <span aria-hidden="true" className="display-name tabular text-3xl text-inv-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <step.icon aria-hidden="true" className="mx-auto mt-3 size-5 text-inv-primary" strokeWidth={1.5} />
              <h3 className="mt-3 font-display text-2xl text-inv-primary">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-inv-brown-soft">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
