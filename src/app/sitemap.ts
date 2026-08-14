import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Sitemap for all public routes. Served at /sitemap.xml.
 * URLs derive from site.url (set NEXT_PUBLIC_SITE_URL in production).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.9 },
    { path: "/films", changeFrequency: "weekly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
