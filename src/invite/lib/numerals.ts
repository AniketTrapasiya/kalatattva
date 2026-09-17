import type { NativeLang } from '../data/weddingData'

const DIGITS: Partial<Record<NativeLang, string>> = {
  gu: '૦૧૨૩૪૫૬૭૮૯',
  hi: '०१२३४५६७८९',
  mr: '०१२३४५६७८९',
}

/** 24 → २४ (Marathi/Hindi) or ૨૪ (Gujarati). Tamil invitations use Western digits, so they pass through. */
export const toNativeDigits = (value: string | number, lang: NativeLang) => {
  const digits = DIGITS[lang]
  return digits ? String(value).replace(/\d/g, (digit) => digits[Number(digit)]) : String(value)
}
