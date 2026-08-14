import { site } from "@/lib/site";
import { InstagramIcon, YoutubeIcon } from "@/components/icons";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

/** Charcoal grain band — pointing to the full archive on YouTube. */
export default function YoutubeCta() {
  return (
    <section className="grain relative overflow-hidden bg-charcoal py-16 md:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center md:px-10">
        <SectionHeading
          label="Keep Watching"
          lines={["More films", "on YouTube."]}
          align="center"
          dark
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-paper/70">
            New wedding trailers, garba aftermovies and behind-the-scenes
            moments land on our channel every season — and the daily frames
            live on Instagram.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium text-charcoal"
              >
                <YoutubeIcon className="h-5 w-5" />
                Watch on YouTube
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-paper/25 px-8 py-4 text-sm text-paper"
              >
                <InstagramIcon className="h-5 w-5" />
                Follow on Instagram
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
