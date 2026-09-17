import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { gallery, heroImages, invitationFormats } from "@/lib/data";

/**
 * Sitemap for all public routes, served at /sitemap.xml.
 * URLs derive from site.url (Vercel domain until a real one is set).
 * Each route lists its key images so Google Images indexes the work.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const abs = (p: string) => `${site.url}${p}`;

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    images?: string[];
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1, images: [abs(heroImages.home)] },
    {
      path: "/gallery",
      changeFrequency: "weekly",
      priority: 0.9,
      images: gallery.map((g) => abs(g.src)),
    },
    { path: "/films", changeFrequency: "weekly", priority: 0.8, images: [abs(heroImages.films)] },
    { path: "/services", changeFrequency: "monthly", priority: 0.8, images: [abs(heroImages.services)] },
    {
      path: "/invitations",
      changeFrequency: "monthly",
      priority: 0.7,
      images: invitationFormats.map((f) => abs(f.image)),
    },
    { path: "/about", changeFrequency: "monthly", priority: 0.7, images: [abs(heroImages.about)] },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6, images: [abs(heroImages.contact)] },
  ];

  return routes.map(({ path, changeFrequency, priority, images }) => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
    images,
  }));
}
