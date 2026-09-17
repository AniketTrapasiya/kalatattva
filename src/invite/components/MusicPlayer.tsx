'use client'

import { Music2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../data/weddingData'
import { createFileAudio, createTanpura, type AmbientAudio } from '../lib/audio'

/** Floating music toggle. Audio only starts on an explicit tap — never autoplay. */
export function MusicPlayer() {
  const engine = useRef<AmbientAudio | null>(null)
  const [playing, setPlaying] = useState(false)
  const [pending, setPending] = useState(false)

  useEffect(() => () => engine.current?.stop(), [])

  const toggle = async () => {
    if (pending) return
    engine.current ??= weddingConfig.music.src ? createFileAudio(weddingConfig.music.src) : createTanpura()

    if (playing) {
      engine.current.stop()
      setPlaying(false)
      return
    }

    setPending(true)
    try {
      await engine.current.start()
      setPlaying(true)
    } catch {
      setPlaying(false)
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={`Background music: ${weddingConfig.music.title}`}
      title={playing ? 'Pause music' : 'Play music'}
      className="on-dark fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 grid size-12 place-items-center rounded-full border border-inv-gold bg-inv-primary-deep text-inv-gold-soft shadow-[0_12px_30px_-12px_rgba(41,28,26,0.7)] transition-colors duration-300 hover:bg-inv-primary sm:right-6 sm:bottom-6 sm:size-14"
    >
      {playing ? (
        <span aria-hidden="true" className="flex h-5 items-end gap-[3px]">
          {[0, 0.35, 0.7, 0.2].map((delay) => (
            <span
              key={delay}
              className="animate-eq h-full w-[3px] origin-bottom bg-inv-gold-soft"
              style={{ animationDelay: `-${delay}s` }}
            />
          ))}
        </span>
      ) : (
        <Music2 aria-hidden="true" className="size-5" strokeWidth={1.5} />
      )}
    </button>
  )
}
