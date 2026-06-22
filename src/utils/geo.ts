import type { IGeo } from "../interfaces/iGeo";

export type NormalizedGeoPage = IGeo & {
    slug: string;
    title: string;
    description: string;
    city: string;
    state: string;
    serviceName: string;
    canonical: string;
    keywords: string[];
    sections: NonNullable<IGeo["content"]>["sections"];
    faqs: NonNullable<IGeo["content"]>["faqs"];
    proofs: string[];
};

export function normalizeGeoPages(input: unknown): NormalizedGeoPage[] {
    const items = Array.isArray(input) ? input : input ? [input] : [];

    return items
        .map((item) => normalizeGeoPage(item))
        .filter((item): item is NormalizedGeoPage => Boolean(item))
        .filter((item) => item.status !== "archived");
}

export function normalizeGeoPage(input: unknown): NormalizedGeoPage | null {
    if (!input || typeof input !== "object") return null;

    const page = input as IGeo;
    const rawSlug = String(page.slug ?? "").trim();
    if (!rawSlug) return null;

    const sections = Array.isArray(page.content?.sections) ? page.content.sections : [];
    const faqs = Array.isArray(page.content?.faqs) ? page.content.faqs : [];
    const proofs = Array.isArray(page.trust?.proofs) ? page.trust.proofs.filter(Boolean) as string[] : [];
    const keywords = Array.isArray(page.seo?.keywords) ? page.seo.keywords.filter(Boolean) as string[] : [];

    return {
        ...page,
        slug: rawSlug,
        title: String(page.seo?.h1 || page.seo?.metaTitle || page.seo?.title || page.service?.name || rawSlug).trim(),
        description: String(page.seo?.metaDescription || page.content?.summary || page.content?.intro || "").trim(),
        city: String(page.location?.city || "").trim(),
        state: String(page.location?.state || page.location?.stateCode || "").trim(),
        serviceName: String(page.service?.name || "").trim(),
        canonical: String(page.seo?.canonical || page.url || "").trim(),
        keywords,
        sections,
        faqs,
        proofs,
    };
}

export function findGeoPageBySlug(pages: NormalizedGeoPage[], slug: string | undefined): NormalizedGeoPage | null {
    const incoming = String(slug ?? "").trim().toLowerCase();
    if (!incoming) return null;

    return (
        pages.find((page) => page.slug.toLowerCase() === incoming) ??
        null
    );
}
