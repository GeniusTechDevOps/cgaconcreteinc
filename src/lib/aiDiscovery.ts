import type { RootObject, Service } from "../interfaces/dbData";
import FormatText from "../hooks/FormatText";
import { formatDomain } from "./formatDomain";

const removeTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export function getSiteOrigin(data: RootObject, requestUrl?: string): string {
  if (data.domain) {
    return removeTrailingSlash(formatDomain(data.domain));
  }

  if (requestUrl) {
    return new URL(requestUrl).origin;
  }

  return "";
}

export function getServiceUrl(siteOrigin: string, service: Service): string {
  return `${siteOrigin}/services/${FormatText(service.title)}`;
}

export function getPrimaryPhone(data: RootObject): string {
  return data.dataGeneral.phones[0]?.number ?? "";
}

export function getPrimaryEmail(data: RootObject): string {
  return data.dataGeneral.emails[0]?.email ?? "";
}

export function getServiceAreas(data: RootObject): string[] {
  const cities = data.dataGeneral.location.map((location) => location.city).filter(Boolean);
  const landingAreas = (data.landingLocations ?? [])
    .map((location: { title?: string; slug?: string }) => location.title ?? location.slug ?? "")
    .filter(Boolean);

  return [...new Set([...cities, ...landingAreas])];
}

export function getBusinessSummary(data: RootObject): string {
  const summaryParts = [
    `${data.name} provides ${data.services.map((service) => service.title).join(", ")}.`,
    data.valuesContent.whychooseUs,
    data.estimateFree ? `Free estimates: ${data.estimateFree}.` : "",
    data.yearsExperience ? `Experience: ${data.yearsExperience}.` : "",
  ].filter(Boolean);

  return summaryParts.join(" ");
}

export function buildBaseStructuredData(data: RootObject, siteOrigin: string) {
  const primaryPhone = getPrimaryPhone(data);
  const primaryEmail = getPrimaryEmail(data);
  const serviceAreas = getServiceAreas(data);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: siteOrigin,
      name: data.name,
      description: getBusinessSummary(data),
      inLanguage: data.languages || "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteOrigin}/#business`,
      name: data.name,
      url: siteOrigin,
      image: data.gallery[0] || data.logos.primary,
      logo: data.logos.primary,
      description: getBusinessSummary(data),
      telephone: primaryPhone ? `+1${primaryPhone.replace(/[^0-9]/g, "")}` : undefined,
      email: primaryEmail || undefined,
      address: data.businessAddress || undefined,
      areaServed: serviceAreas,
      serviceType: data.services.map((service) => service.title),
      openingHours: data.dataGeneral.openingHours.map((item) => `${item.days} ${item.hours}`),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${data.name} services`,
        itemListElement: data.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description[0]?.text || service.subtitle || "",
            url: getServiceUrl(siteOrigin, service),
          },
        })),
      },
      knowsAbout: data.services.map((service) => service.title),
    },
  ];
}

export function buildAiPageStructuredData(data: RootObject, siteOrigin: string) {
  const serviceAreas = getServiceAreas(data);
  const faqItems = [
    {
      question: `What services does ${data.name} provide?`,
      answer: data.services.map((service) => service.title).join(", "),
    },
    {
      question: `Where does ${data.name} work?`,
      answer: serviceAreas.length > 0 ? serviceAreas.join(", ") : "Please contact the business for service area details.",
    },
    {
      question: `Does ${data.name} offer free estimates?`,
      answer: data.estimateFree || "Please contact the business for estimate details.",
    },
    {
      question: `How can customers contact ${data.name}?`,
      answer: [getPrimaryPhone(data), getPrimaryEmail(data)].filter(Boolean).join(" | "),
    },
  ];

  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteOrigin}/local-profile#page`,
      url: `${siteOrigin}/local-profile`,
      name: `${data.name} Local Profile`,
      description: getBusinessSummary(data),
      about: data.services.map((service) => service.title),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${siteOrigin}/local-profile#services`,
      itemListElement: data.services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getServiceUrl(siteOrigin, service),
        name: service.title,
        description: service.description[0]?.text || service.subtitle || "",
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteOrigin}/local-profile#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function buildLlmsText(data: RootObject, siteOrigin: string): string {
  const serviceAreas = getServiceAreas(data);
  const serviceLines = data.services
    .map((service) => `- ${service.title}: ${service.description[0]?.text || service.subtitle || "Service available."}`)
    .join("\n");
  const areaLines = serviceAreas.length > 0 ? serviceAreas.map((area) => `- ${area}`).join("\n") : "- Contact the business for current service areas.";
  const contactLines = [
    getPrimaryPhone(data) ? `- Phone: ${getPrimaryPhone(data)}` : "",
    getPrimaryEmail(data) ? `- Email: ${getPrimaryEmail(data)}` : "",
    data.businessAddress ? `- Address: ${data.businessAddress}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const hoursLines = data.dataGeneral.openingHours.length > 0
    ? data.dataGeneral.openingHours.map((item) => `- ${item.days}: ${item.hours}`).join("\n")
    : "- Contact the business for current hours.";

  return [
    `# ${data.name}`,
    "",
    `> AI-readable business summary for ${data.name}.`,
    "",
    "## Overview",
    getBusinessSummary(data),
    "",
    "## Services",
    serviceLines,
    "",
    "## Service Areas",
    areaLines,
    "",
    "## Contact",
    contactLines || "- Contact details available on the website.",
    "",
    "## Hours",
    hoursLines,
    "",
    "## Important URLs",
    `- Website: ${siteOrigin}/`,
    `- Services: ${siteOrigin}/services`,
    `- Local Profile: ${siteOrigin}/local-profile`,
    `- Contact: ${siteOrigin}/contact`,
  ].join("\n");
}
