import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";
import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import HeadlineReveal from "@/components/ui/HeadlineReveal";
import Magnetic from "@/components/ui/Magnetic";
import Marquee from "@/components/ui/Marquee";
import { marqueeWords } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-charcoal text-paper">
      {/* Marquee divider */}
      <div className="border-b border-paper/10 py-6">
        <Marquee slow>
          {marqueeWords.map((word) => (
            <span key={word} className="mx-6 flex items-center gap-12">
              <span className="font-display text-2xl italic text-paper/40">{word}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Big CTA */}
      <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 md:py-24">
        <Reveal y={16}>
          <p className="micro-label mb-6 text-gold">Your date is waiting</p>
        </Reveal>
        <HeadlineReveal
          inView
          as="h2"
          lines={["Shubh ghadi,", "framed forever."]}
          className="display-lg italic"
        />
        <Reveal delay={0.3} className="mt-10">
          <Magnetic>
            <Link
              href="/contact#enquiry-form"
              className="micro-label inline-block rounded-full border border-gold px-10 py-5 text-gold transition-all duration-300 hover:bg-gold hover:text-charcoal"
            >
              Inquire about your date
            </Link>
          </Magnetic>
        </Reveal>
      </div>

      {/* Info columns */}
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-paper/10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">
            Kala<span className="italic text-gold">tattva</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            Wedding photography &amp; films for Gujarati and Marathi celebrations —
            weddings, pre-weddings, shrimant, garba nights, home functions and
            grand events across India.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-paper/20 p-3 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-full border border-paper/20 p-3 transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="micro-label mb-5 text-gold">Explore</p>
          <ul className="space-y-3 text-sm text-paper/70">
            {[
              { href: "/", label: "Home" },
              { href: "/gallery", label: "Gallery" },
              { href: "/films", label: "Films" },
              { href: "/services", label: "Services" },
              { href: "/invitations", label: "Digital Invitations" },
              { href: "/about", label: "About & Journey" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors duration-300 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="micro-label mb-5 text-gold">Reach us</p>
          <ul className="space-y-3 text-sm text-paper/70">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-3.5 w-3.5" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold">
                <Mail className="h-3.5 w-3.5" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                {site.address.line}, {site.address.city}, {site.address.region}{" "}
                {site.address.postalCode}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-paper/40 md:flex-row md:px-10">
          <p>
            © {new Date().getFullYear()} {site.name}. All moments reserved.
          </p>
          <p>
            Serving {site.cities.slice(0, 5).join(" · ")} &amp; beyond
          </p>
        </div>
      </div>
    </footer>
  );
}
