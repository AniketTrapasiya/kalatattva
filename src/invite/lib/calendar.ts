import type { WeddingEvent } from '../data/weddingData'

/** 2026-11-24T09:00:00+05:30 → 20261124T033000Z */
const toUtcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const escapeIcs = (text: string) =>
  text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

export function googleCalendarUrl(event: WeddingEvent, titlePrefix: string, location: string) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${titlePrefix} · ${event.name}`,
    dates: `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`,
    details: event.description,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcs(events: WeddingEvent[], titlePrefix: string, location: string, filename: string) {
  const stamp = toUtcStamp(new Date().toISOString())
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events.flatMap((event) => [
      'BEGIN:VEVENT',
      `UID:${event.id}-${toUtcStamp(event.start)}@wedding-invitation`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toUtcStamp(event.start)}`,
      `DTEND:${toUtcStamp(event.end)}`,
      `SUMMARY:${escapeIcs(`${titlePrefix} · ${event.name}`)}`,
      `DESCRIPTION:${escapeIcs(event.description)}`,
      `LOCATION:${escapeIcs(location)}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeIcs(`${event.name} is tomorrow`)}`,
      'END:VALARM',
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ]

  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
