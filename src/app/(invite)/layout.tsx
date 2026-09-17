/**
 * Layout for the ported wedding invitations.
 *
 * Deliberately bare: no header, footer, Lenis smooth-scroll or WhatsApp button.
 * An invitation is a guest-facing page that stands on its own, and the ported
 * app brings its own scroll behaviour, hero and footer.
 */
export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
