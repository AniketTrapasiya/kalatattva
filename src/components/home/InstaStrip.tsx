import Image from "next/image";
import { InstagramIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import Magnetic from "@/components/ui/Magnetic";
import { instaPosts } from "@/lib/data";
import { site } from "@/lib/site";

/** Six-square Instagram strip — curtain-wipe reveals, hover to follow. */
export default function InstaStrip() {
  return (
    <section className="border-t border-line bg-ivory">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Reveal y={12}>
              <p className="micro-label mb-4 text-gold">Instagram</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-md text-charcoal">
                Fresh from shaadi season.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} y={12}>
            <Magnetic>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="micro-label inline-flex items-center gap-3 rounded-full border border-gold px-6 py-3.5 text-gold transition-all duration-300 hover:bg-gold hover:text-ivory"
              >
                <InstagramIcon className="h-4 w-4" />
                @kalatattvaphotography
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instaPosts.map((item, i) => (
            <ImageReveal key={item.src} delay={i * 0.07}>
              <a
                href={`https://www.instagram.com/p/${item.shortcode}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.alt} — open on Instagram`}
                className="group relative block aspect-square overflow-hidden bg-cream"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6 text-paper" />
                </span>
              </a>
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
