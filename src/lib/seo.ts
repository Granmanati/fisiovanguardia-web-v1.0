import type { BlogPost } from "@/data/blog";
import { faqItems, siteConfig } from "@/data/site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    areaServed: siteConfig.areas,
    medicalSpecialty: "Physiotherapy",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      addressCountry: "ES"
    },
    founder: siteConfig.founders.map((name) => ({ "@type": "Person", name }))
  };
}

export function personSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: "Fisioterapeuta",
    worksFor: { "@type": "MedicalBusiness", name: siteConfig.name },
    description
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    datePublished: post.date,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`
  };
}
