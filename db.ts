import { PageContent, FormSubmission, ImageRecord } from './types';
import { supabase } from './supabaseClient';

// --- Site Content ---
export const saveContent = async (data: { id: string, content: PageContent }): Promise<string> => {
    const { error } = await supabase
        .from('site_content')
        .upsert({ id: data.id, content: data.content });

    if (error) {
        console.error('Error saving content:', error);
        throw error;
    }
    return data.id;
};

export const getContent = async (id: string): Promise<{ id: string, content: PageContent } | null> => {
    const { data, error } = await supabase
        .from('site_content')
        .select('id, content')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // "The result contains 0 rows"
            return null;
        }
        console.error('Error getting content:', error);
        throw error;
    }

    return data as { id: string, content: PageContent };
};


// --- Images ---
export const saveImage = async (image: ImageRecord): Promise<number | undefined> => {
    const { data, error } = await supabase
        .from('images')
        .upsert(image)
        .select('id')
        .single();

    if (error) {
        console.error('Error saving image:', error);
        throw error;
    }
    return data?.id;
};

export const getImage = async (id: string): Promise<ImageRecord | null> => {
    const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error getting image:', error);
        throw error;
    }
    return data;
};

export const getImageByName = async (name: string): Promise<ImageRecord | null> => {
    const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('name', name)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null;
        }
        console.error('Error getting image by name:', error);
        throw error;
    }
    return data;
};

export const getAllImages = async (): Promise<ImageRecord[]> => {
    const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error getting all images:', error);
        throw error;
    }
    return data || [];
};

export const deleteImage = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};


// --- Form Submissions ---
export const addFormSubmission = async (submission: Omit<FormSubmission, 'id' | 'created_at'>): Promise<number> => {
    const { data, error } = await supabase
        .from('form_submissions')
        .insert([submission])
        .select('id')
        .single();


    if (error) {
        console.error('Error adding form submission:', error);
        throw error;
    }

    return data.id;
};

export const getAllFormSubmissions = async (): Promise<FormSubmission[]> => {
    const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error getting all form submissions:', error);
        throw error;
    }
    return data || [];
};