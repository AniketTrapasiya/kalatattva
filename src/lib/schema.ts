import { site } from "@/lib/site";
import { faqs, films } from "@/lib/data";

/**
 * JSON-LD builders for SEO + GEO (AI search engines).
 * The base graph links LocalBusiness ↔ founders ↔ website by @id.
 */

const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

export function baseGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": businessId,
        name: site.name,
        description: site.description,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        priceRange: "₹₹₹",
        image: `${site.url}/og.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
        sameAs: [site.social.instagram, site.social.youtube],
        knowsAbout: [
          "Wedding photography",
          "Wedding cinematography",
          "Gujarati wedding rituals",
          "Marathi wedding rituals",
          "Pre-wedding shoots",
          "Shrimant and baby shower photography",
          "Garba and sangeet event photography",
        ],
        founder: site.founders.map((f, i) => ({ "@id": `${site.url}/#person-${i + 1}` })),
      },
      ...site.founders.map((f, i) => ({
        "@type": "Person",
        "@id": `${site.url}/#person-${i + 1}`,
        name: f.name,
        jobTitle: f.role,
        description: f.bio,
        worksFor: { "@id": businessId },
      })),
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function videoListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: films.map((f, i) => ({
      "@type": "VideoObject",
      position: i + 1,
      name: f.title,
      description: f.meta,
      thumbnailUrl: `https://i.ytimg.com/vi/${f.videoId}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/embed/${f.videoId}`,
      uploadDate: "2025-01-01",
    })),
  };
}
