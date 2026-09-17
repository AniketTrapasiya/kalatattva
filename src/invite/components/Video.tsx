'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'
import { useScopedTradition } from '../context/TraditionContext'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/** Privacy-friendly YouTube embed: a poster until the guest presses play */
export function Video() {
  const { wedding, heroArt } = useScopedTradition()
  const { video } = wedding
  const [playing, setPlaying] = useState(false)
  const videoId = video.youtubeId.trim()
  const hasVideo = videoId.length > 0

  return (
    <section
      id="film"
      aria-labelledby="film-title"
      className="on-dark surface-dark relative overflow-hidden px-4 py-24 text-inv-ivory sm:px-6 sm:py-32"
    >
      <SectionHeading tone="dark" id="film-title" eyebrow="Pre-wedding film" title="A Glimpse of Forever" subtitle={video.caption} />

      <Reveal className="mx-auto mt-14 max-w-4xl">
        <div className="frame relative aspect-video overflow-hidden bg-inv-brown">
          {playing && hasVideo ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&playsinline=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={hasVideo ? `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg` : heroArt.src}
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 size-full object-cover ${hasVideo ? '' : 'object-[50%_42%] opacity-60'}`}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-inv-primary-deep via-inv-primary-deep/45 to-inv-primary-deep/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
                {hasVideo ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${video.title}`}
                    className="grid size-20 place-items-center rounded-full border border-inv-gold-soft bg-inv-primary-deep/60 text-inv-cream transition-colors duration-300 hover:bg-inv-cream hover:text-inv-primary sm:size-24"
                  >
                    <Play aria-hidden="true" className="ml-1 size-7 fill-current" />
                  </button>
                ) : (
                  <span aria-hidden="true" className="grid size-20 place-items-center rounded-full border border-inv-gold-soft/70 text-inv-gold-soft sm:size-24">
                    <Play className="ml-1 size-7" strokeWidth={1.25} />
                  </span>
                )}
                <div>
                  <p className="display-name text-xl text-inv-cream sm:text-2xl">{video.title}</p>
                  <p className="eyebrow mt-2 text-inv-gold-soft">{hasVideo ? 'Watch the film' : 'Premiering soon'}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </section>
  )
}
