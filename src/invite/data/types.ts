export type TraditionId = 'kathiyawadi' | 'surati' | 'gujarati' | 'marwadi' | 'marathi' | 'tamil'

/** BCP 47 code for the tradition's own script, used on `lang` attributes */
export type NativeLang = 'gu' | 'hi' | 'mr' | 'ta'

/**
 * A complete visual language: typography, frames, textures, dividers,
 * card shapes and the layout used for the celebrations.
 *
 * - folk      — Kathiyawadi abhla (mirror-work) embroidery, stitched frames, cloth bunting
 * - zari      — Surat's zari & diamonds: faceted frames, sparkle, a day-by-day timeline
 * - heritage  — Patola & Modhera sandstone: classical arches and ikat lattice
 * - royal     — Rajputana: jharokha arches, jaali lattice, regal capitals
 * - paithani  — Paithani silk borders and a printed patrika schedule
 * - temple    — Dravidian temple borders, gopuram steps and kolam dots
 */
export type DesignKind = 'folk' | 'zari' | 'heritage' | 'royal' | 'paithani' | 'temple'

export type EventIcon =
  | 'flower'
  | 'music'
  | 'flame'
  | 'sun'
  | 'drum'
  | 'crown'
  | 'sparkles'
  | 'moon'
  | 'utensils'
  | 'gift'
  | 'hand'
  | 'home'
  | 'blessing'
  | 'party'

export type PatternKind = 'abhla' | 'zari' | 'patola' | 'leheriya' | 'paithani' | 'kolam'

export interface Person {
  firstName: string
  fullName: string
  nativeName: string
  role: 'The Groom' | 'The Bride'
  relation: string
  parents: string
  native: string
  bio: string
}

export interface WeddingEvent {
  id: string
  name: string
  nativeName: string
  subtitle: string
  icon: EventIcon
  day: string
  date: string
  time: string
  /** ISO 8601 with offset — used for calendar invites */
  start: string
  end: string
  dressCode: string
  description: string
  /** The ceremony itself: drives the countdown, date reveal and SEO */
  isMain?: boolean
}

export interface StorySlide {
  src: string
  alt: string
  title: string
  date: string
  caption: string
}

export interface WeddingContent {
  hero: {
    tagline: string
    groom: string
    bride: string
    joiner: string
    dateLabel: string
    scrollCue: string
  }
  /** Countdown target — the muhurat */
  weddingDateTime: string
  countdownTitle: string
  invitation: {
    invocation: string
    blessing: string
    blessingNative: string
    hostFamily: { names: string; native: string }
    inviteWord: string
    inviteNative: string
    request: string
    brideFamily: { intro: string; names: string; native: string }
    closing: string
    closingNative: string
  }
  couple: { groom: Person; bride: Person }
  story: StorySlide[]
  events: WeddingEvent[]
  venue: {
    name: string
    nativeName: string
    addressLines: string[]
    city: string
    mapUrl: string
  }
  contact: {
    label: string
    nativeLabel: string
    name: string
    phoneDisplay: string
    phoneE164: string
    whatsapp: string
  }
  instagram: { hashtag: string; url: string }
  video: { youtubeId: string; title: string; caption: string }
  reminder: { rsvpBy: string; notes: string[] }
  footer: { blessing: string }
}

export interface Tradition {
  id: TraditionId
  label: string
  nativeLabel: string
  nativeLang: NativeLang
  state: string
  region: string
  /** One line for the filter card */
  highlights: string
  /** Real details, or sample content that shows the style */
  isSample: boolean
  theme: {
    primary: string
    primaryDeep: string
    gold: string
    goldSoft: string
    goldDeep: string
    /** CSS background for the hero sky */
    sky: string
    /** CSS filter + opacity that tint the white clouds to suit the sky */
    cloudFilter: string
    cloudOpacity: number
    /** Shadow colour behind the white hero type */
    heroShadow: string
    pattern: PatternKind
  }
  design: {
    kind: DesignKind
    /** Shown on the filter card, e.g. "Abhla folk" */
    name: string
    displayFont: string
    scriptFont: string
    /** Page, card and text colours — each tradition prints on its own paper */
    paper: string
    paperLight: string
    ink: string
    inkSoft: string
    /** Second highlight colour: mirror silver, rani pink, saffron, pallu magenta… */
    accent: string
  }
  heroArt: {
    /** Transparent 2:3 artwork, doorway at bottom-centre. Generated with docs/hero-image-prompts.md */
    src: string
    srcSet: string
    /** Vertical centre of the doorway (0–1) — where the portal light pours through */
    doorY: number
    description: string
  }
  wedding: WeddingContent
}
