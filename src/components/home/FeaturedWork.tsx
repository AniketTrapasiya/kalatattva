import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItem, type GalleryItem } from "@/lib/data";

const stories: { item: GalleryItem; title: string; place: string }[] = [
  { item: galleryItem("wedding-05"), title: "The garlands meet", place: "Ahmedabad" },
  { item: galleryItem("couple-01"), title: "Golden hour, before the vows", place: "Udaipur" },
  { item: galleryItem("garba-01"), title: "Nine nights of garba", place: "Vadodara" },
];

function StoryCard({
  story,
  large = false,
  sizes,
}: {
  story: (typeof stories)[number];
  large?: boolean;
  sizes: string;
}) {
  return (
    <Link
      href="/gallery"
      className={`group relative block overflow-hidden bg-charcoal ${
        large ? "aspect-[3/4] lg:aspect-auto lg:h-full" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={story.item.src}
        alt={story.item.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 ease-luxe md:translate-y-8 md:p-8 md:group-hover:translate-y-0">
        <p className="micro-label mb-2 text-gold">
          {story.item.category} — {story.place}
        </p>
        <p className={`font-display text-paper ${large ? "text-2xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
          {story.title}
        </p>
        <span className="micro-label mt-3 inline-flex items-center gap-2 text-paper/70 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
          View the story <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

/** Three editorial story cards — one tall lead, two stacked beside it. */
export default function FeaturedWork() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-8 md:mb-14">
          <SectionHeading
            label="Featured stories"
            lines={["Every wedding is", "a feature film."]}
          />
          <Reveal delay={0.2} y={12}>
            <Link
              href="/gallery"
              className="group micro-label relative inline-flex items-center gap-2 pb-1 text-charcoal"
            >
              All stories
              <ArrowRight className="h-3.5 w-3.5 text-gold transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
              <span className="absolute bottom-0 left-0 h-px w-full bg-line" />
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-luxe group-hover:w-full" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <Reveal className="lg:row-span-2 lg:h-full">
            <StoryCard story={stories[0]} large sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={0.12}>
            <StoryCard story={stories[1]} sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={0.24}>
            <StoryCard story={stories[2]} sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
