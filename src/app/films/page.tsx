import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/ui/PageHero";
import FilmGrid from "@/components/films/FilmGrid";
import Deliverables from "@/components/films/Deliverables";
import YoutubeCta from "@/components/films/YoutubeCta";
import BookFilmCta from "@/components/films/BookFilmCta";
import { heroImages } from "@/lib/data";
import { breadcrumbSchema, videoListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Wedding Films",
  description:
    "Cinematic Gujarati and Marathi wedding films by Kalatattva — highlight trailers, full-length features and Instagram reels from Ahmedabad, Udaipur, Pune and beyond.",
  alternates: { canonical: "/films" },
};

export default function FilmsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Films", path: "/films" },
        ])}
      />
      <JsonLd data={videoListSchema()} />

      <PageHero
        image={heroImages.films}
        alt="Garba dancers mid-swirl — the energy our wedding films capture"
        label="Wedding Films"
        lines={["Your baraat deserves", "an epic."]}
      />

      <FilmGrid />
      <Deliverables />
      <YoutubeCta />
      <BookFilmCta />
    </>
  );
}
