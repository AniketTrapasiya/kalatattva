import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Robots rules, served at /robots.txt.
 * The whole site is public; AI/answer-engine crawlers are explicitly
 * welcomed so the studio can be cited in AI search results (GEO).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
