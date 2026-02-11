import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { PageContent, ImageRecord } from '../types';
import { initialContent } from '../data/initialContent';
import { getAllImages, getContent } from '../db';
import { supabase } from '../supabaseClient';

interface ContentContextType {
    content: PageContent;
    setContent: React.Dispatch<React.SetStateAction<PageContent>>;
    images: Record<string, string>;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
    children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
    const [content, setContent] = useState<PageContent>(initialContent);
    const [images, setImages] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Fetch site content from Supabase if exists
                const dbContent = await getContent('main');
                if (dbContent) {
                    setContent(dbContent.content);
                }

                // Fetch images from Supabase
                const dbImages = await getAllImages();
                const imageMap: Record<string, string> = {};

                dbImages.forEach((img: ImageRecord) => {
                    imageMap[img.name] = img.url;
                });

                // Also listen for real-time updates
                const channel = supabase
                    .channel('images-changes')
                    .on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'images'
                    }, () => {
                        loadContent();
                    })
                    .subscribe();

                setImages(imageMap);
            } catch (error) {
                console.error('Error loading content:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadContent();
    }, []);

    // Merge initial content with Supabase images
    const mergedContent = {
        ...content,
        hero: {
            ...content.hero,
            imageUrl: images['hero-bg'] || content.hero.imageUrl
        },
        about: {
            ...content.about,
            imageUrl: images['chuka-portrait'] || content.about.imageUrl
        },
        books: {
            ...content.books,
            items: content.books.items.map((item, index) => {
                const imageNames = ['book-love-lasts', 'book-spiritual', 'book-make-work'];
                const imageName = imageNames[index] || '';
                return {
                    ...item,
                    imageUrl: images[imageName] || item.imageUrl
                };
            })
        }
    };

    return (
        <ContentContext.Provider value={{ content: mergedContent, setContent, images }}>
            {children}
        </ContentContext.Provider>
    );
};
