'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, HandHeart, Heart, MessageCircle, Pencil, Send, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useScopedTradition } from '../context/TraditionContext'
import { mainEvent } from '../data/weddingData'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Mandala } from './ui/Ornaments'
import { RegionPattern } from './ui/RegionPattern'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

type Attendance = 'yes' | 'no'
type FieldName = 'attendance' | 'name' | 'phone' | 'guests' | 'events' | 'message'
type Errors = Partial<Record<FieldName, string>>

interface RsvpForm {
  name: string
  phone: string
  guests: string
  events: string[]
  message: string
}

interface StoredRsvp extends RsvpForm {
  attendance: Attendance
  submittedAt: string
}

const FIELD_ORDER: FieldName[] = ['attendance', 'name', 'phone', 'guests', 'events', 'message']
const MESSAGE_LIMIT = 300
const EASE = [0.22, 1, 0.36, 1] as const

const CHOICES: { value: Attendance; title: string; text: string; icon: LucideIcon }[] = [
  { value: 'yes', title: 'Joyfully accept', text: 'We’ll be there to celebrate', icon: Heart },
  { value: 'no', title: 'Regretfully decline', text: 'Sending our blessings from afar', icon: HandHeart },
]

const focusTarget = (field: FieldName) =>
  field === 'attendance' ? 'rsvp-attendance-yes' : field === 'events' ? 'rsvp-event-0' : `rsvp-${field}`

const isStoredRsvp = (value: unknown): value is StoredRsvp | null => {
  if (value === null) return true
  if (typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return (
    (entry.attendance === 'yes' || entry.attendance === 'no') &&
    typeof entry.name === 'string' &&
    typeof entry.phone === 'string' &&
    typeof entry.guests === 'string' &&
    Array.isArray(entry.events) &&
    typeof entry.message === 'string' &&
    typeof entry.submittedAt === 'string'
  )
}

export function validateRsvp(attendance: Attendance | null, form: RsvpForm): Errors {
  const errors: Errors = {}
  if (!attendance) errors.attendance = 'Please let us know whether you can join us.'

  const name = form.name.trim()
  if (name.length < 2) errors.name = 'Please enter your full name.'
  else if (name.length > 60) errors.name = 'Please keep your name under 60 characters.'
  else if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name)) errors.name = 'Please use letters only.'

  const phone = form.phone.trim()
  const digits = phone.replace(/\D/g, '')
  const phoneRequired = attendance !== 'no'
  if (!phone) {
    if (phoneRequired) errors.phone = 'Please share a phone number so the family can reach you.'
  } else if (!/^\+?[\d\s-]+$/.test(phone) || digits.length < 10 || digits.length > 13) {
    errors.phone = 'Enter a valid phone number, e.g. +91 98765 43210.'
  }

  if (attendance === 'yes') {
    const guests = Number(form.guests)
    if (!Number.isInteger(guests) || guests < 1 || guests > 10) errors.guests = 'Please choose between 1 and 10 guests.'
    if (form.events.length === 0) errors.events = 'Please choose at least one celebration.'
  }

  if (form.message.length > MESSAGE_LIMIT) errors.message = `Please keep your note under ${MESSAGE_LIMIT} characters.`
  return errors
}

export function RSVP() {
  const { wedding, id: traditionId, theme } = useScopedTradition()
  const { events, contact, reminder, couple } = wedding
  const [saved, setSaved] = useLocalStorage<StoredRsvp | null>(`wedding-rsvp:${traditionId}`, null, isStoredRsvp)
  const [editing, setEditing] = useState(saved === null)
  const [attendance, setAttendance] = useState<Attendance | null>(saved?.attendance ?? null)
  const [form, setForm] = useState<RsvpForm>(() =>
    saved
      ? { name: saved.name, phone: saved.phone, guests: saved.guests, events: saved.events, message: saved.message }
      : { name: '', phone: '', guests: '1', events: [mainEvent(events).id], message: '' },
  )
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const thanksRef = useRef<HTMLDivElement>(null)
  const focusThanks = useRef(false)

  useEffect(() => {
    if (!editing && focusThanks.current) {
      focusThanks.current = false
      thanksRef.current?.focus()
    }
  }, [editing])

  const update = <K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (attempted) setErrors(validateRsvp(attendance, next))
  }

  const choose = (value: Attendance) => {
    setAttendance(value)
    if (attempted) setErrors(validateRsvp(value, form))
  }

  const toggleEvent = (id: string) =>
    update('events', form.events.includes(id) ? form.events.filter((item) => item !== id) : [...form.events, id])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAttempted(true)
    const result = validateRsvp(attendance, form)
    setErrors(result)
    const firstInvalid = FIELD_ORDER.find((field) => result[field])
    if (firstInvalid || !attendance) {
      if (firstInvalid) document.getElementById(focusTarget(firstInvalid))?.focus()
      return
    }
    setSaved({
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      events: attendance === 'yes' ? form.events : [],
      attendance,
      submittedAt: new Date().toISOString(),
    })
    focusThanks.current = true
    setEditing(false)
  }

  const describedBy = (field: FieldName, extra?: string) =>
    [extra, errors[field] ? `rsvp-${field}-error` : undefined].filter(Boolean).join(' ') || undefined

  const fieldProps = (field: FieldName, extra?: string) => ({
    id: `rsvp-${field}`,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(field, extra),
  })

  const errorText = (field: FieldName) =>
    errors[field] ? (
      <p id={`rsvp-${field}-error`} className="error-text">
        {errors[field]}
      </p>
    ) : null

  const eventNames = (ids: string[]) =>
    events
      .filter((item) => ids.includes(item.id))
      .map((item) => item.name)
      .join(', ')

  const whatsappLink = (entry: StoredRsvp) => {
    const lines = [
      `Namaste! RSVP for ${couple.groom.firstName} & ${couple.bride.firstName}'s wedding`,
      `Name: ${entry.name}`,
      entry.attendance === 'yes'
        ? `Attending — ${entry.guests} guest(s): ${eventNames(entry.events)}`
        : 'Regretfully unable to attend',
      entry.phone && `Phone: ${entry.phone}`,
      entry.message && `Note: ${entry.message}`,
    ].filter(Boolean)
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-title"
      className="on-dark relative overflow-hidden bg-inv-primary [background-image:var(--texture-dark)] px-4 py-24 sm:px-6 sm:py-32"
    >
      <RegionPattern kind={theme.pattern} className="absolute inset-x-0 top-0 text-inv-gold/50" />
      <Mandala className="pointer-events-none absolute -top-40 -left-40 size-[36rem] text-inv-gold/10" />
      <Mandala className="pointer-events-none absolute -right-48 -bottom-48 size-[40rem] text-inv-gold/10" />

      <SectionHeading
        tone="dark"
        id="rsvp-title"
        eyebrow="Kindly respond"
        title="Will You Join Us?"
        subtitle={`We would be honoured by your presence. Please reply by ${reminder.rsvpBy}.`}
      />

      <Reveal className="relative mx-auto mt-14 max-w-2xl">
        <div className="frame bg-inv-ivory px-5 py-10 text-inv-brown sm:px-12 sm:py-14">
          <AnimatePresence mode="wait" initial={false}>
            {!editing && saved ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div ref={thanksRef} tabIndex={-1} role="status" className="text-center outline-none">
                  <span className="mx-auto grid size-16 place-items-center rounded-full border border-inv-gold text-inv-primary">
                    <Check aria-hidden="true" className="size-7" strokeWidth={1.25} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-inv-primary">
                    {saved.attendance === 'yes'
                      ? `Thank you, ${saved.name.split(' ')[0]}!`
                      : `We’ll miss you, ${saved.name.split(' ')[0]}`}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-inv-brown-soft">
                    {saved.attendance === 'yes'
                      ? `We can’t wait to celebrate with you — ${saved.guests} ${saved.guests === '1' ? 'guest' : 'guests'} for ${eventNames(saved.events)}.`
                      : 'Thank you for letting us know. Your blessings mean the world to us.'}
                  </p>
                  <p className="mx-auto mt-6 max-w-md text-sm text-inv-brown-soft">
                    Your response is saved on this device. Send it to the family on WhatsApp so they can count you in.
                  </p>
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <a className="btn btn-primary" href={whatsappLink(saved)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle aria-hidden="true" className="size-4" />
                      Send on WhatsApp
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <button type="button" className="btn btn-outline" onClick={() => setEditing(true)}>
                      <Pencil aria-hidden="true" className="size-4" />
                      Change response
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <fieldset>
                  <legend className="w-full text-center font-display text-2xl text-inv-primary sm:text-[1.75rem]">
                    Will you celebrate with us?
                  </legend>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {CHOICES.map((choice) => (
                      <label key={choice.value} className="block cursor-pointer">
                        <input
                          id={`rsvp-attendance-${choice.value}`}
                          type="radio"
                          name="attendance"
                          value={choice.value}
                          checked={attendance === choice.value}
                          onChange={() => choose(choice.value)}
                          aria-describedby={describedBy('attendance')}
                          className="peer sr-only"
                        />
                        <span className="flex h-full flex-col items-center gap-2 border border-inv-gold/50 bg-inv-cream px-4 py-6 text-center transition-colors duration-300 peer-checked:border-inv-primary peer-checked:bg-inv-primary peer-checked:text-inv-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-inv-gold hover:border-inv-primary">
                          <choice.icon aria-hidden="true" className="size-6" strokeWidth={1.25} />
                          <span className="font-display text-xl">{choice.title}</span>
                          <span className="text-sm opacity-80">{choice.text}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.attendance && (
                    <p id="rsvp-attendance-error" className="error-text text-center">
                      {errors.attendance}
                    </p>
                  )}
                </fieldset>

                <AnimatePresence initial={false}>
                  {attendance && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="-mx-2 overflow-hidden px-2"
                    >
                      <div className="space-y-6 pt-10 pb-2">
                        <div>
                          <label htmlFor="rsvp-name" className="label">
                            Full name
                          </label>
                          <input
                            {...fieldProps('name')}
                            type="text"
                            autoComplete="name"
                            className="field"
                            value={form.name}
                            maxLength={60}
                            onChange={(event) => update('name', event.target.value)}
                          />
                          {errorText('name')}
                        </div>

                        <div>
                          <label htmlFor="rsvp-phone" className="label">
                            Phone number {attendance === 'no' && <span className="tracking-normal normal-case">(optional)</span>}
                          </label>
                          <input
                            {...fieldProps('phone')}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+91 98765 43210"
                            className="field"
                            value={form.phone}
                            onChange={(event) => update('phone', event.target.value)}
                          />
                          {errorText('phone')}
                        </div>

                        {attendance === 'yes' && (
                          <>
                            <div>
                              <label htmlFor="rsvp-guests" className="label">
                                Guests, including you
                              </label>
                              <input
                                {...fieldProps('guests')}
                                type="number"
                                inputMode="numeric"
                                min={1}
                                max={10}
                                className="field max-w-[8rem]"
                                value={form.guests}
                                onChange={(event) => update('guests', event.target.value)}
                              />
                              {errorText('guests')}
                            </div>

                            <fieldset aria-describedby={describedBy('events')}>
                              <legend className="label">Which celebrations will you attend?</legend>
                              <div className="grid gap-2">
                                {events.map((item, index) => (
                                  <label
                                    key={item.id}
                                    htmlFor={`rsvp-event-${index}`}
                                    className="flex cursor-pointer items-center gap-3 border border-inv-gold/40 bg-inv-cream px-4 py-3 transition-colors has-checked:border-inv-primary"
                                  >
                                    <input
                                      id={`rsvp-event-${index}`}
                                      type="checkbox"
                                      className="size-4 accent-inv-primary"
                                      checked={form.events.includes(item.id)}
                                      onChange={() => toggleEvent(item.id)}
                                    />
                                    <span className="font-display text-lg text-inv-primary">{item.name}</span>
                                    <span className="ml-auto text-xs text-inv-brown-soft">
                                      {item.day.slice(0, 3)}, {item.date.split(' ').slice(0, 2).join(' ')}
                                    </span>
                                  </label>
                                ))}
                              </div>
                              {errorText('events')}
                            </fieldset>
                          </>
                        )}

                        <div>
                          <label htmlFor="rsvp-message" className="label">
                            A note for the couple <span className="tracking-normal normal-case">(optional)</span>
                          </label>
                          <textarea
                            {...fieldProps('message', 'rsvp-message-count')}
                            rows={3}
                            className="field resize-y"
                            value={form.message}
                            onChange={(event) => update('message', event.target.value)}
                          />
                          <div className="flex justify-between gap-4">
                            {errorText('message') ?? <span />}
                            <p
                              id="rsvp-message-count"
                              className={`tabular mt-1.5 text-xs ${form.message.length > MESSAGE_LIMIT ? 'text-[#9b2238]' : 'text-inv-brown-soft'}`}
                            >
                              {form.message.length}/{MESSAGE_LIMIT}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button type="submit" className="btn btn-primary mt-8 w-full">
                  <Send aria-hidden="true" className="size-4" />
                  Send RSVP
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
