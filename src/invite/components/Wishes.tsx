'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Feather, Quote, Send, Trash2 } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { useScopedTradition } from '../context/TraditionContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

interface Wish {
  id: string
  name: string
  message: string
  createdAt: string
}

const NAME_LIMIT = 40
const MESSAGE_LIMIT = 280
const MAX_WISHES = 60

const isWishList = (value: unknown): value is Wish[] =>
  Array.isArray(value) &&
  value.every((item) => {
    if (typeof item !== 'object' || item === null) return false
    const wish = item as Record<string, unknown>
    return (
      typeof wish.id === 'string' &&
      typeof wish.name === 'string' &&
      typeof wish.message === 'string' &&
      typeof wish.createdAt === 'string'
    )
  })

const makeId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const formatDate = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
}

export function Wishes() {
  const { wedding, id } = useScopedTradition()
  const { couple } = wedding
  const [wishes, setWishes] = useLocalStorage<Wish[]>(`wedding-wishes:${id}`, [], isWishList)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})
  const [announcement, setAnnouncement] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next: typeof errors = {}
    const trimmedName = name.trim()
    const trimmedMessage = message.trim()
    if (trimmedName.length < 2) next.name = 'Please add your name.'
    else if (trimmedName.length > NAME_LIMIT) next.name = `Please keep your name under ${NAME_LIMIT} characters.`
    if (trimmedMessage.length < 3) next.message = 'Write a few words for the couple.'
    else if (trimmedMessage.length > MESSAGE_LIMIT) next.message = `Please keep your wish under ${MESSAGE_LIMIT} characters.`
    setErrors(next)

    if (next.name) return nameRef.current?.focus()
    if (next.message) return messageRef.current?.focus()

    setWishes((current) =>
      [{ id: makeId(), name: trimmedName, message: trimmedMessage, createdAt: new Date().toISOString() }, ...current].slice(
        0,
        MAX_WISHES,
      ),
    )
    setMessage('')
    setAnnouncement(`Thank you, ${trimmedName}. Your wish is on the wall.`)
  }

  const removeWish = (wish: Wish) => {
    setWishes((current) => current.filter((item) => item.id !== wish.id))
    setAnnouncement(`Removed the wish from ${wish.name}.`)
  }

  return (
    <section id="wishes" aria-labelledby="wishes-title" className="paper px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        id="wishes-title"
        eyebrow="Blessings & wishes"
        title="The Wishes Wall"
        subtitle={`Leave a blessing for ${couple.groom.firstName} & ${couple.bride.firstName}. Wishes are kept on this device.`}
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <Reveal>
          <form noValidate onSubmit={onSubmit} className="frame bg-inv-cream px-5 py-8 sm:px-8 sm:py-10 lg:sticky lg:top-8">
            <h3 className="font-display text-2xl text-inv-primary">Write a wish</h3>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="wish-name" className="label">
                  Your name
                </label>
                <input
                  ref={nameRef}
                  id="wish-name"
                  type="text"
                  autoComplete="name"
                  className="field bg-inv-ivory"
                  value={name}
                  maxLength={NAME_LIMIT}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'wish-name-error' : undefined}
                />
                {errors.name && (
                  <p id="wish-name-error" className="error-text">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="wish-message" className="label">
                  Your wish
                </label>
                <textarea
                  ref={messageRef}
                  id="wish-message"
                  rows={4}
                  className="field resize-y bg-inv-ivory"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={['wish-message-count', errors.message && 'wish-message-error'].filter(Boolean).join(' ')}
                />
                <div className="flex justify-between gap-4">
                  {errors.message ? (
                    <p id="wish-message-error" className="error-text">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <p
                    id="wish-message-count"
                    className={`tabular mt-1.5 text-xs ${message.length > MESSAGE_LIMIT ? 'text-[#9b2238]' : 'text-inv-brown-soft'}`}
                  >
                    {message.length}/{MESSAGE_LIMIT}
                  </p>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-6 w-full">
              <Send aria-hidden="true" className="size-4" />
              Add to the wall
            </button>
          </form>
        </Reveal>

        <div>
          <p className="sr-only" aria-live="polite">
            {announcement}
          </p>
          {wishes.length === 0 ? (
            <Reveal className="frame grid h-full min-h-64 place-items-center bg-inv-cream/60 px-6 py-14 text-center">
              <div>
                <Feather aria-hidden="true" className="mx-auto size-8 text-inv-gold" strokeWidth={1.25} />
                <p className="display-name mt-4 text-2xl text-inv-primary">Be the first to bless the couple</p>
                <p className="mx-auto mt-2 max-w-xs text-sm text-inv-brown-soft">Your words will be the first on the wall.</p>
              </div>
            </Reveal>
          ) : (
            <ul className="columns-1 gap-5 sm:columns-2" aria-label="Wishes for the couple">
              <AnimatePresence initial={false}>
                {wishes.map((wish) => (
                  <motion.li
                    key={wish.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-5 break-inside-avoid"
                  >
                    <article className="frame bg-inv-cream px-6 pt-6 pb-4">
                      <Quote aria-hidden="true" className="size-5 text-inv-gold/80" strokeWidth={1.25} />
                      <p className="display-quote mt-2 text-lg leading-relaxed whitespace-pre-line text-inv-brown">
                        {wish.message}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-inv-gold/30 pt-3">
                        <div>
                          <p className="font-medium text-inv-primary">{wish.name}</p>
                          <time dateTime={wish.createdAt} className="text-xs text-inv-brown-soft">
                            {formatDate(wish.createdAt)}
                          </time>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeWish(wish)}
                          aria-label={`Remove wish from ${wish.name}`}
                          className="grid size-10 place-items-center text-inv-brown-soft transition-colors hover:text-inv-primary"
                        >
                          <Trash2 aria-hidden="true" className="size-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </article>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
