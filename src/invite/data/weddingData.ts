/**
 * Wedding configuration — start here.
 *
 * Each tradition preset (src/data/traditions/*.ts) carries its own couple, rituals,
 * venue, colours and hero artwork. `defaultTradition` is the invitation guests see;
 * the tradition filter lets visitors preview the other styles (?tradition=marwadi).
 */
import { gujarati } from './traditions/gujarati'
import { kathiyawadi } from './traditions/kathiyawadi'
import { marathi } from './traditions/marathi'
import { marwadi } from './traditions/marwadi'
import { surati } from './traditions/surati'
import { tamil } from './traditions/tamil'
import type { Tradition, TraditionId, WeddingContent, WeddingEvent } from './types'

export type * from './types'

export const traditions: Tradition[] = [kathiyawadi, surati, gujarati, marwadi, marathi, tamil]

export const weddingConfig = {
  /** Which preset guests see by default */
  defaultTradition: 'kathiyawadi' as TraditionId,
  /** Show the floating tradition filter. Set false for a single, locked invitation */
  showTraditionFilter: true,
  site: {
    /** EDIT: set your deployed URL so Open Graph images resolve to absolute links */
    url: '',
    ogImage: '/og-image.jpg',
    locale: 'en_IN',
  },
  music: {
    /** EDIT: path to an mp3 in /public (e.g. '/audio/shehnai.mp3'). Empty = soft generated tanpura drone */
    src: '',
    title: 'Tanpura drone',
  },
}

export const findTradition = (id: string | null | undefined): Tradition | undefined =>
  traditions.find((tradition) => tradition.id === id)

export const defaultTradition = findTradition(weddingConfig.defaultTradition) ?? traditions[0]

export const mainEvent = (events: WeddingEvent[]) => events.find((event) => event.isMain) ?? events[events.length - 1]

export const venueLocation = (wedding: WeddingContent) =>
  [wedding.venue.name, ...wedding.venue.addressLines].join(', ')

export const coupleNames = (wedding: WeddingContent) =>
  `${wedding.couple.groom.firstName} & ${wedding.couple.bride.firstName}`

export const siteTitle = (wedding: WeddingContent) =>
  `${wedding.hero.groom} ${wedding.hero.joiner} ${wedding.hero.bride} · ${wedding.hero.dateLabel}`

export const siteDescription = (wedding: WeddingContent) =>
  `${coupleNames(wedding)} are getting married in ${wedding.venue.city} on ${wedding.hero.dateLabel}. ${wedding.footer.blessing}.`

const NUMBER_WORDS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven']

/** "Three days of joy" — counted from the distinct event dates */
export const daysOfJoy = (events: WeddingEvent[]) => {
  const days = new Set(events.map((event) => event.date)).size
  return days === 1 ? 'A day of joy' : `${NUMBER_WORDS[days - 1] ?? days} days of joy`
}

/** Events grouped by date, in order */
export const eventsByDay = (events: WeddingEvent[]) => {
  const groups: { date: string; day: string; events: WeddingEvent[] }[] = []
  for (const event of events) {
    const group = groups.find((item) => item.date === event.date)
    if (group) group.events.push(event)
    else groups.push({ date: event.date, day: event.day, events: [event] })
  }
  return groups
}
