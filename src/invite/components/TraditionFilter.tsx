'use client'

import { motion } from 'framer-motion'
import { Check, Palette, X } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTradition } from '../context/TraditionContext'
import { coupleNames, type Tradition } from '../data/weddingData'

const ALL = 'All'

/** Floating filter that previews the invitation in each regional wedding tradition */
export function TraditionFilter() {
  const { tradition: active, traditions, select } = useTradition()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState(ALL)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  const states = useMemo(() => [ALL, ...new Set(traditions.map((item) => item.state))], [traditions])
  const visible = state === ALL ? traditions : traditions.filter((item) => item.state === state)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const choose = (item: Tradition) => {
    setOpen(false)
    if (item.id !== active.id) select(item.id)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="on-dark fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-50 flex size-12 items-center justify-center gap-2 border border-inv-gold bg-inv-primary-deep text-inv-gold-soft shadow-[0_12px_30px_-12px_rgba(41,28,26,0.7)] transition-colors duration-300 hover:bg-inv-primary sm:bottom-6 sm:left-6 sm:h-14 sm:w-auto sm:px-5"
      >
        <Palette aria-hidden="true" className="size-5 sm:size-4" strokeWidth={1.5} />
        <span className="sr-only">Wedding tradition: {active.label}</span>
        <span aria-hidden="true" className="eyebrow hidden text-[0.6rem] tracking-[0.2em] sm:inline">
          {active.label}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          // A click on the dialog element itself is a click on the backdrop
          if (event.target === event.currentTarget) setOpen(false)
        }}
        className="fixed inset-auto bottom-0 left-0 m-0 h-[88svh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-inv-brown/55 sm:top-0 sm:right-0 sm:left-auto sm:h-full sm:w-[28rem]"
      >
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-full flex-col border-t-2 border-inv-gold bg-inv-ivory sm:border-t-0 sm:border-l-2"
          >
            <div className="flex items-start justify-between gap-4 px-5 pt-6 pb-4 sm:px-7 sm:pt-8">
              <div>
                <p className="eyebrow text-inv-gold-deep">Filter by region</p>
                <h2 id={titleId} className="mt-2 font-display text-3xl text-inv-primary">
                  Wedding Traditions
                </h2>
                <p className="mt-2 text-sm text-inv-brown-soft">
                  Each style changes the artwork, colours, rituals, language and place.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid size-10 shrink-0 place-items-center border border-inv-gold/50 text-inv-primary transition-colors hover:bg-inv-primary hover:text-inv-cream"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>

            <div role="group" aria-label="Filter traditions by state" className="flex gap-2 overflow-x-auto px-5 pb-4 sm:flex-wrap sm:px-7">
              {states.map((item) => {
                const count = item === ALL ? traditions.length : traditions.filter((entry) => entry.state === item).length
                const pressed = state === item
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setState(item)}
                    className={`shrink-0 border px-3 py-1.5 text-xs tracking-[0.12em] uppercase transition-colors ${
                      pressed
                        ? 'border-inv-primary bg-inv-primary text-inv-cream'
                        : 'border-inv-gold/50 text-inv-brown-soft hover:border-inv-primary hover:text-inv-primary'
                    }`}
                  >
                    {item} <span className="tabular opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>

            <ul className="flex-1 space-y-3 overflow-y-auto border-t border-inv-gold/30 px-5 py-5 sm:px-7">
              {visible.map((item) => (
                <li key={item.id}>
                  <TraditionCard tradition={item} active={item.id === active.id} onSelect={() => choose(item)} />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </dialog>
    </>
  )
}

function TraditionCard({ tradition, active, onSelect }: { tradition: Tradition; active: boolean; onSelect: () => void }) {
  const { theme, wedding } = tradition
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={`group flex w-full gap-4 border bg-inv-cream p-3 text-left transition-colors ${
        active ? 'border-inv-primary' : 'border-inv-gold/40 hover:border-inv-primary'
      }`}
    >
      <span className="relative block aspect-[3/4] w-20 shrink-0 overflow-hidden" style={{ background: theme.sky }}>
        <img
          src={tradition.heroArt.src.replace('-1024.', '-720.')}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 bottom-0 h-[88%] w-full object-contain object-bottom"
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-start justify-between gap-2">
          <span>
            <span lang={tradition.nativeLang} className="block font-native text-sm leading-tight" style={{ color: theme.goldDeep }}>
              {tradition.nativeLabel}
            </span>
            <span className="block text-xl leading-tight" style={{ color: theme.primary, fontFamily: tradition.design.displayFont }}>
              {tradition.label}
            </span>
          </span>
          {active && (
            <span className="grid size-6 shrink-0 place-items-center text-inv-cream" style={{ background: theme.primary }}>
              <Check aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(current)</span>
            </span>
          )}
        </span>
        <span className="mt-1 text-xs tracking-[0.14em] text-inv-brown-soft uppercase">
          {tradition.region} · {wedding.venue.city}
        </span>
        <span className="mt-1 text-[0.72rem] font-medium tracking-[0.12em] uppercase" style={{ color: theme.goldDeep }}>
          {tradition.design.name} design · {wedding.events.length} events
        </span>
        <span className="mt-1.5 text-[0.82rem] leading-snug text-inv-brown-soft">{tradition.highlights}</span>
        <span className="mt-2 flex items-center justify-between gap-2">
          <span className="text-sm text-inv-brown" style={{ fontFamily: tradition.design.displayFont }}>
            {coupleNames(wedding)}
          </span>
          <span className="flex items-center gap-1" aria-hidden="true">
            {[theme.primary, theme.gold, theme.primaryDeep].map((color) => (
              <span key={color} className="size-3 border border-black/10" style={{ background: color }} />
            ))}
          </span>
        </span>
        {tradition.isSample && <span className="mt-1 text-[0.68rem] tracking-[0.18em] text-inv-gold-deep uppercase">Sample invitation</span>}
      </span>
    </button>
  )
}
