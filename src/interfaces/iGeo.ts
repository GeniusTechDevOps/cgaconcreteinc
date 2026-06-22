export interface GeoReviewHighlight {
    author?: string;
    rating?: number;
    text?: string;
}

export interface GeoSchemaItem {
    type?: string;
    jsonLd?: Record<string, any>;
}

export interface GeoSection {
    type?: string;
    title?: string;
    body?: string;
}

export interface GeoFaq {
    question?: string;
    answer?: string;
}

export interface GeoCta {
    title?: string;
    description?: string;
    phone?: string;
    buttonText?: string;
}

export interface GeoContractor {
    name?: string;
    industry?: string;
    phone?: string;
    website?: string;
    yearsInBusiness?: number;
    licensed?: boolean;
    insured?: boolean;
    bonded?: boolean;
    emergencyService?: boolean;
    freeEstimates?: boolean;
    rating?: number;
    reviewCount?: number;
}

export interface GeoService {
    name?: string;
    slug?: string;
    category?: string;
    commercial?: boolean;
    residential?: boolean;
}

export interface GeoLocation {
    city?: string;
    state?: string;
    stateCode?: string;
    country?: string;
}

export interface GeoSeo {
    title?: string;
    metaTitle?: string;
    metaDescription?: string;
    h1?: string;
    canonical?: string;
    keywords?: string[];
}

export interface GeoContent {
    summary?: string;
    intro?: string;
    sections?: GeoSection[];
    faqs?: GeoFaq[];
    cta?: GeoCta;
}

export interface GeoTrust {
    proofs?: string[];
    certifications?: string[];
    warranties?: string[];
    reviewHighlights?: GeoReviewHighlight[];
}

export interface IGeo {
    pageId: string;
    pageType?: string;
    slug?: string;
    url?: string;
    status?: "draft" | "published" | "archived";
    contractor?: GeoContractor;
    service?: GeoService;
    location?: GeoLocation;
    seo?: GeoSeo;
    content?: GeoContent;
    trust?: GeoTrust;
    schema?: GeoSchemaItem[];
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
}
