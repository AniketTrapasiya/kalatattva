import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const rowClass =
  "group flex items-center justify-between gap-6 border-b border-line py-6 md:py-7";
const labelClass =
  "micro-label mb-2 text-ink-soft transition-colors duration-500 group-hover:text-gold";
const valueClass =
  "font-display text-xl leading-snug text-charcoal transition-colors duration-500 group-hover:text-gold md:text-2xl";
const iconClass =
  "h-5 w-5 shrink-0 text-ink-soft transition-colors duration-500 group-hover:text-gold";

/** Left-column contact channels — generous editorial rows, hover gold. */
export default function ContactChannels() {
  const tel = site.phone.replace(/\s+/g, "");
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi Kalatattva! We have a function coming up…"
  )}`;

  return (
    <div className="border-t border-line">
      <Reveal>
        <a href={`tel:${tel}`} className={rowClass}>
          <div>
            <p className={labelClass}>Call us</p>
            <p className={valueClass}>{site.phone}</p>
          </div>
          <Phone className={iconClass} />
        </a>
      </Reveal>

      <Reveal delay={0.06}>
        <a href={`mailto:${site.email}`} className={rowClass}>
          <div className="min-w-0">
            <p className={labelClass}>Write to us</p>
            <p className={`${valueClass} break-words`}>{site.email}</p>
          </div>
          <Mail className={iconClass} />
        </a>
      </Reveal>

      <Reveal delay={0.12}>
        <a href={waHref} target="_blank" rel="noopener noreferrer" className={rowClass}>
          <div>
            <p className={labelClass}>WhatsApp</p>
            <p className={valueClass}>Message us your date</p>
          </div>
          <WhatsAppIcon className={iconClass} />
        </a>
      </Reveal>

      <Reveal delay={0.18}>
        <div className={rowClass}>
          <div>
            <p className={labelClass}>The studio</p>
            <p className={valueClass}>
              {site.address.line},
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
          </div>
          <MapPin className={iconClass} />
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <div className={rowClass}>
          <p className={labelClass.replace(" mb-2", "")}>Follow the work</p>
          <div className="flex items-center gap-6">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kalatattva on Instagram"
              className="text-ink-soft transition-colors duration-500 hover:text-gold"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kalatattva on YouTube"
              className="text-ink-soft transition-colors duration-500 hover:text-gold"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
