'use client'

interface GaneshMotifProps {
  className?: string
  title?: string
}

/** Minimal line-art Shri Ganesh — the auspicious opening of every invitation */
export function GaneshMotif({ className = '', title }: GaneshMotifProps) {
  return (
    <svg
      viewBox="0 0 120 132"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* mukut */}
      <circle cx="60" cy="6" r="2.4" />
      <path d="M44 41C46 28 53 18 60 9c7 9 14 19 16 32" />
      <path d="M52 30q8-6 16 0" />
      <circle cx="60" cy="33.5" r="1.3" fill="currentColor" stroke="none" />
      <path d="M41 42h38M43 46.5h34" />
      {/* ears */}
      <path d="M43 50C30 41 13 47 13 65c0 16 13 27 31 21" />
      <path d="M77 50c13-9 30-3 30 15 0 16-13 27-31 21" />
      <path d="M40 56c-9-4-17 1-17 9 0 9 7 14 16 12" opacity="0.55" />
      <path d="M80 56c9-4 17 1 17 9 0 9-7 14-16 12" opacity="0.55" />
      {/* face */}
      <path d="M43 47c-2 13 0 26 7 35M77 47c2 13 0 26-7 35" />
      {/* tilak */}
      <path d="M60 49v6M56.5 50.5q3.5 3.5 7 0" />
      {/* eyes */}
      <path d="M48 62q4-3.5 8 0-4 2.5-8 0zM64 62q4-3.5 8 0-4 2.5-8 0z" />
      {/* trunk */}
      <path d="M55 66c-1 16-5 29-7 39-2 12 8 20 18 16 8-4 6-14-2-12" />
      <path d="M65 66c0 14-3 26-5 35-1 6 0 10 4 10" />
      <path d="M54 78q5.5 2.5 10.5 0M52 90q5 2.5 9.5 0" opacity="0.6" />
      {/* tusks */}
      <path d="M50 82c-2 6-6 10-11 10M70 82c1 3 2.5 5 4.5 6" />
    </svg>
  )
}
