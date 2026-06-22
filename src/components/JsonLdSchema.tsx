import React from "react";

export default function JsonLdSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIA LAB",
    "url": "https://aialabcmr.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://aialabcmr.com/work/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIA LAB",
    "alternateName": "AIA LAB Agency",
    "description": "Studio et agence digitale d'élite spécialisée dans le branding de prestige, le design graphique de pointe, le développement Next.js sur-mesure et la stratégie de croissance.",
    "url": "https://aialabcmr.com/",
    "logo": "https://aialabcmr.com/images/logo.png",
    "email": "contact@aialab.com",
    "telephone": "+237690123456",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Vallée Nlongkak",
      "addressLocality": "Yaoundé",
      "addressRegion": "Centre",
      "addressCountry": "CM"
    },
    "sameAs": [
      "https://linkedin.com",
      "https://instagram.com",
      "https://dribbble.com"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
