export interface HeroContent {
    headline: string;
    subheadline: string;
    ctaText: string;
    cta2Text: string;
    cta2Link: string;
    imageUrl?: string;
}

export interface AboutContent {
    title: string;
    paragraph1: string;
    paragraph2: string;
    imageUrl?: string;
}

export interface Service {
    icon: string; // Using string for icon name/path
    title: string;
    description: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    title: string;
}

export interface BlogPost {
    imageUrl?: string;
    category: string;
    title: string;
    excerpt: string;
}

export interface Podcast {
    imageUrl?: string;
    title: string;
    episode: string;
    description?: string;
    link: string;
}

export interface Book {
    title: string;
    author?: string;
    description: string;
    imageUrl?: string;
    link: string;
}

export interface ContactContent {
    title: string;
    description: string;
    imageUrl?: string;
    phone?: string;
    email?: string;
    location?: string;
}

export interface PageContent {
    hero: HeroContent;
    about: AboutContent;
    services: {
        title: string;
        items: Service[];
    };
    testimonials: {
        title: string;
        items: Testimonial[];
    };
    podcast: {
        title: string;
        items: Podcast[];
    };
    books: {
        title: string;
        items: Book[];
    };
    contact: ContactContent;
}

// FIX: Add missing ImageRecord and FormSubmission type definitions.
export interface ImageRecord {
    id?: number;
    name: string;
    url: string;
    category: string;
    description?: string;
    created_at?: string;
}

export interface FormSubmission {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
}
