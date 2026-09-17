'use client'

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import {
  findTradition,
  traditions,
  type Tradition,
  type TraditionId,
  type WeddingContent,
} from '../data/weddingData'

interface TraditionContextValue {
  tradition: Tradition
  traditions: Tradition[]
  select: (id: TraditionId) => void
}

const TraditionContext = createContext<TraditionContextValue | null>(null)

/**
 * Palette, paper, fonts, sky and cloud tint are CSS variables, so every Tailwind utility
 * follows the tradition; `data-design` switches the frames, textures and shapes in invite.css.
 *
 * Ported note: in the standalone app these were written to <html>. Here the invitation is one
 * page inside the studio site, whose own theme tokens share several of these names — so they
 * are set on the .invite-root wrapper instead. Nothing outside the invitation is restyled.
 */
function applyTheme(tradition: Tradition, root: HTMLElement) {
  const { theme, design } = tradition
  const vars: Record<string, string> = {
    '--color-inv-primary': theme.primary,
    '--color-inv-primary-deep': theme.primaryDeep,
    '--color-inv-gold': theme.gold,
    '--color-inv-gold-soft': theme.goldSoft,
    '--color-inv-gold-deep': theme.goldDeep,
    '--color-inv-ivory': design.paper,
    '--color-inv-cream': design.paperLight,
    '--color-inv-brown': design.ink,
    '--color-inv-brown-soft': design.inkSoft,
    '--color-inv-accent': design.accent,
    '--font-inv-display': design.displayFont,
    '--font-inv-script': design.scriptFont,
    '--sky': theme.sky,
    '--cloud-filter': theme.cloudFilter,
    '--cloud-opacity': String(theme.cloudOpacity),
    '--hero-shadow': theme.heroShadow,
  }
  for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value)
  root.dataset.design = design.kind
}

/**
 * Ported note: the standalone app kept the active tradition in React state and rewrote the
 * URL. Here each tradition is its own route (/invitations/<id>), so the route is the source
 * of truth — the server renders the right invitation, and links are shareable and indexable.
 * Selecting a tradition navigates instead of mutating state.
 */
export function TraditionProvider({ tradition, children }: { tradition: Tradition; children: ReactNode }) {
  const router = useRouter()

  const select = useCallback(
    (id: TraditionId) => {
      if (findTradition(id)) router.push(`/invitations/${id}`)
    },
    [router],
  )

  const value = useMemo(() => ({ tradition, traditions, select }), [tradition, select])
  return <TraditionContext.Provider value={value}>{children}</TraditionContext.Provider>
}

export function useTradition() {
  const context = useContext(TraditionContext)
  if (!context) throw new Error('useTradition must be used inside <TraditionProvider>')
  return context
}

const ScopeContext = createContext<Tradition | null>(null)

/**
 * Pins one tradition for a page subtree and owns the `.invite-root` wrapper that scopes
 * every invitation style. While the old page fades out it keeps rendering its own
 * tradition, and the theme is applied only when the new page mounts.
 *
 * `data-design` and the palette live on this element (not <html>), so the surrounding
 * studio site keeps its own theme. The inline style is the pre-paint default for the
 * first render, before the layout effect runs.
 */
export function TraditionScope({ tradition, children }: { tradition: Tradition; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) applyTheme(tradition, ref.current)
  }, [tradition])

  return (
    <ScopeContext.Provider value={tradition}>
      <div
        ref={ref}
        className="invite-root"
        data-design={tradition.design.kind}
        style={
          {
            '--color-inv-primary': tradition.theme.primary,
            '--color-inv-primary-deep': tradition.theme.primaryDeep,
            '--color-inv-gold': tradition.theme.gold,
            '--color-inv-gold-soft': tradition.theme.goldSoft,
            '--color-inv-gold-deep': tradition.theme.goldDeep,
            '--color-inv-ivory': tradition.design.paper,
            '--color-inv-cream': tradition.design.paperLight,
            '--color-inv-brown': tradition.design.ink,
            '--color-inv-brown-soft': tradition.design.inkSoft,
            '--color-inv-accent': tradition.design.accent,
            '--font-inv-display': tradition.design.displayFont,
            '--font-inv-script': tradition.design.scriptFont,
            '--sky': tradition.theme.sky,
            '--cloud-filter': tradition.theme.cloudFilter,
            '--cloud-opacity': String(tradition.theme.cloudOpacity),
            '--hero-shadow': tradition.theme.heroShadow,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ScopeContext.Provider>
  )
}

export function useScopedTradition(): Tradition {
  const tradition = useContext(ScopeContext)
  if (!tradition) throw new Error('useScopedTradition must be used inside <TraditionScope>')
  return tradition
}

export function useWedding(): WeddingContent {
  return useScopedTradition().wedding
}
