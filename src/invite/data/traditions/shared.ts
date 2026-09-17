import type { StorySlide, TraditionId } from '../types'

export const heroArt = (id: TraditionId) => ({
  src: `/images/invitations/hero/${id}-1024.webp`,
  srcSet: `/images/invitations/hero/${id}-720.webp 720w, /images/invitations/hero/${id}-1024.webp 1024w`,
})

export const mapSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

type SlideText = Pick<StorySlide, 'title' | 'date' | 'caption'>

/** The four story illustrations are shared; each tradition writes its own chapter text */
export const storySlides = (families: SlideText, promise: SlideText, festivities: SlideText, vows: SlideText): StorySlide[] => [
  {
    src: '/images/invitations/story-families.svg',
    alt: 'Illustration of two lit diyas facing each other above a rangoli',
    ...families,
  },
  {
    src: '/images/invitations/story-chandlo.svg',
    alt: 'Illustration of a puja thali with kumkum, rice and a glowing diya',
    ...promise,
  },
  {
    src: '/images/invitations/story-sangeet.svg',
    alt: 'Illustration of a dholak drum beneath strings of marigold garlands',
    ...festivities,
  },
  {
    src: '/images/invitations/story-mandap.svg',
    alt: 'Illustration of a wedding mandap with a sacred fire, kalash and hanging toran',
    ...vows,
  },
]

/** Sample presets use an unassigned number so no real phone rings */
export const sampleContact = {
  label: 'Contact',
  phoneDisplay: '+91 12345 67890',
  phoneE164: '+911234567890',
  whatsapp: '911234567890',
}
