import React, { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { PageContent, Service, Testimonial, Podcast, Book, ContactContent, FormSubmission } from '../types';
import { supabase } from '../supabaseClient';
import { getAllFormSubmissions } from '../db';

interface AdminPanelProps {
    onLogout: () => void;
}

// Accessible Input component
const InputField: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}> = ({ label, value, onChange, placeholder, required }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 mb-1">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            aria-required={required}
        />
    </div>
);

// Accessible Textarea component
const TextareaField: React.FC<{
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    placeholder?: string;
    required?: boolean;
}> = ({ label, value, onChange, rows = 4, placeholder, required }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 mb-1">
            {label} {required && <span className="text-red-400">*</span>}
        </label>
        <textarea
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            required={required}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
            aria-required={required}
        />
    </div>
);

// Image Field component with preview
const ImageField: React.FC<{
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    alt?: string;
}> = ({ label, value, onChange, alt = 'Preview' }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter an image URL"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
        />
        {value && (
            <div className="mt-2 relative">
                <img
                    src={value}
                    alt={alt}
                    className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                />
                <button
                    onClick={() => onChange('')}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center hover:bg-red-600 transition"
                    aria-label="Remove image"
                >
                    ×
                </button>
            </div>
        )}
    </div>
);

// Collapsible Section component
const Section: React.FC<{
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    icon?: React.ReactNode;
    children: React.ReactNode;
}> = ({ title, isOpen, onToggle, icon, children }) => (
    <div className="border border-gray-700/50 rounded-xl mb-4 bg-gray-800/30 overflow-hidden">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center p-5 bg-gray-800/50 hover:bg-gray-700/50 transition rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-expanded={isOpen}
            aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
            <div className="flex items-center gap-3">
                {icon && <span className="text-2xl">{icon}</span>}
                <h3 className="text-lg font-bold text-white font-serif">{title}</h3>
            </div>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </span>
        </button>
        {isOpen && (
            <div id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`} className="p-6 animate-fadeIn">
                {children}
            </div>
        )}
    </div>
);

// Service Item Editor
const ServiceEditor: React.FC<{
    service: Service;
    index: number;
    onChange: (field: keyof Service, value: string) => void;
    onRemove: () => void;
}> = ({ service, index, onChange, onRemove }) => (
    <div className="p-5 border border-gray-700 rounded-lg space-y-4 bg-gray-900/30 relative group">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <button
                onClick={onRemove}
                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                aria-label={`Remove service ${index + 1}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div className="flex items-center gap-2 text-purple-400 font-semibold">
            <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
            <span>Service</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
                label="Icon URL"
                value={service.icon}
                onChange={(e) => onChange('icon', e.target.value)}
                placeholder="https://..."
            />
            <InputField
                label="Title"
                value={service.title}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="Service title"
            />
        </div>
        <TextareaField
            label="Description"
            value={service.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Describe this service..."
            rows={3}
        />
    </div>
);

// Testimonial Item Editor
const TestimonialEditor: React.FC<{
    testimonial: Testimonial;
    index: number;
    onChange: (field: keyof Testimonial, value: string) => void;
    onRemove: () => void;
}> = ({ testimonial, index, onChange, onRemove }) => (
    <div className="p-5 border border-gray-700 rounded-lg space-y-4 bg-gray-900/30 relative group">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <button
                onClick={onRemove}
                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                aria-label={`Remove testimonial ${index + 1}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div className="flex items-center gap-2 text-teal-400 font-semibold">
            <span className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
            <span>Testimonial</span>
        </div>
        <TextareaField
            label="Quote"
            value={testimonial.quote}
            onChange={(e) => onChange('quote', e.target.value)}
            placeholder="What the client said..."
            rows={3}
            required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
                label="Author Name"
                value={testimonial.author}
                onChange={(e) => onChange('author', e.target.value)}
                placeholder="Client name"
                required
            />
            <InputField
                label="Author Title"
                value={testimonial.title}
                onChange={(e) => onChange('title', e.target.value)}
                placeholder="e.g., Coaching Client"
            />
        </div>
    </div>
);

// Podcast Item Editor
const PodcastEditor: React.FC<{
    podcast: Podcast;
    index: number;
    onChange: (field: keyof Podcast, value: string) => void;
    onRemove: () => void;
}> = ({ podcast, index, onChange, onRemove }) => (
    <div className="p-5 border border-gray-700 rounded-lg space-y-4 bg-gray-900/30 relative group">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <button
                onClick={onRemove}
                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                aria-label={`Remove platform ${index + 1}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div className="flex items-center gap-2 text-blue-400 font-semibold">
            <span className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
            <span>Platform</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 mb-1">Platform Name</label>
                <select
                    value={podcast.title}
                    onChange={(e) => onChange('title', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                    <option value="Spotify">Spotify</option>
                    <option value="Apple">Apple Podcasts</option>
                    <option value="YouTube">YouTube</option>
                </select>
            </div>
            <InputField
                label="Display Text"
                value={podcast.episode}
                onChange={(e) => onChange('episode', e.target.value)}
                placeholder="e.g., Listen on Spotify"
            />
        </div>
        <InputField
            label="Link URL"
            value={podcast.link}
            onChange={(e) => onChange('link', e.target.value)}
            placeholder="https://..."
            required
        />
    </div>
);

// Book Item Editor
const BookEditor: React.FC<{
    book: Book;
    index: number;
    onChange: (field: keyof Book, value: string) => void;
    onRemove: () => void;
}> = ({ book, index, onChange, onRemove }) => (
    <div className="p-5 border border-gray-700 rounded-lg space-y-4 bg-gray-900/30 relative group">
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
            <button
                onClick={onRemove}
                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                aria-label={`Remove book ${index + 1}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <span className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
            <span>Book</span>
        </div>
        <ImageField
            label="Book Cover URL"
            value={book.imageUrl || ''}
            onChange={(value) => onChange('imageUrl', value)}
            alt={book.title}
        />
        <InputField
            label="Book Title"
            value={book.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Book title"
            required
        />
        <TextareaField
            label="Description"
            value={book.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Describe this book..."
            rows={3}
        />
        <InputField
            label="Purchase Link"
            value={book.link}
            onChange={(e) => onChange('link', e.target.value)}
            placeholder="https://..."
            required
        />
    </div>
);

// Form Submission Card
const SubmissionCard: React.FC<{ submission: FormSubmission; onDelete: (id: number) => void }> = ({ submission, onDelete }) => (
    <div className="p-5 bg-gray-800/60 rounded-lg border border-gray-700 relative group">
        <button
            onClick={() => onDelete(submission.id)}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition opacity-0 group-hover:opacity-100"
            aria-label={`Delete submission from ${submission.name}`}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
        </button>
        <div className="flex justify-between items-start mb-3 flex-wrap gap-2 pr-10">
            <div>
                <p className="font-semibold text-purple-300">{submission.name}</p>
                <a href={`mailto:${submission.email}`} className="text-gray-400 text-sm hover:text-purple-400 transition">
                    {submission.email}
                </a>
            </div>
            <time className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                {new Date(submission.created_at).toLocaleString()}
            </time>
        </div>
        <p className="text-gray-300 whitespace-pre-wrap bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
            {submission.message}
        </p>
    </div>
);

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
    const { content, setContent } = useContent();
    const [editableContent, setEditableContent] = useState<PageContent>(content);
    const [openSection, setOpenSection] = useState<string | null>('hero');
    const [showSuccess, setShowSuccess] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);

    useEffect(() => {
        setEditableContent(content);
    }, [content]);

    // Fetch submissions from Supabase
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const data = await getAllFormSubmissions();
                setSubmissions(data);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            } finally {
                setIsLoadingSubmissions(false);
            }
        };

        fetchSubmissions();

        // Real-time subscription for new submissions
        const subscription = supabase
            .channel('form_submissions')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'form_submissions'
            }, (payload) => {
                console.log('Real-time update:', payload);
                fetchSubmissions();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const handleToggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handleChange = <T extends keyof PageContent>(section: T, field: keyof PageContent[T], value: string) => {
        setEditableContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        setIsDirty(true);
    };

    const handleContactChange = (field: keyof ContactContent, value: string) => {
        setEditableContent(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value
            }
        }));
        setIsDirty(true);
    };

    const handleItemChange = <T extends 'services' | 'testimonials' | 'podcast' | 'books'>(section: T, index: number, field: keyof PageContent[T]['items'][0], value: string) => {
        setEditableContent(prev => {
            const items = [...prev[section].items];
            items[index] = { ...items[index], [field]: value };
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    items
                }
            };
        });
        setIsDirty(true);
    };

    const addItem = (section: 'services' | 'testimonials' | 'podcast' | 'books') => {
        setEditableContent(prev => {
            const newItems = [...prev[section].items];
            if (section === 'services') {
                (newItems as Service[]).push({ icon: '', title: 'New Service', description: 'Description' });
            } else if (section === 'testimonials') {
                (newItems as Testimonial[]).push({ quote: 'New testimonial quote...', author: 'Author', title: 'Client' });
            } else if (section === 'podcast') {
                (newItems as Podcast[]).push({ title: 'Spotify', episode: 'Listen on Spotify', link: '#' });
            } else if (section === 'books') {
                (newItems as Book[]).push({ title: 'New Book', description: 'Book description...', imageUrl: '', link: '#' });
            }
            return { ...prev, [section]: { ...prev[section], items: newItems } };
        });
        setIsDirty(true);
    };

    const removeItem = (section: 'services' | 'testimonials' | 'podcast' | 'books', index: number) => {
        setEditableContent(prev => {
            const items = prev[section].items.filter((_, i) => i !== index);
            return { ...prev, [section]: { ...prev[section], items } };
        });
        setIsDirty(true);
    };

    const handleSave = () => {
        setContent(editableContent);
        setShowSuccess(true);
        setIsDirty(false);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleReset = () => {
        setEditableContent(content);
        setIsDirty(false);
    };

    const handleDeleteSubmission = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            try {
                const { error } = await supabase
                    .from('form_submissions')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                setSubmissions(prev => prev.filter(s => s.id !== id));
            } catch (error) {
                console.error('Error deleting submission:', error);
                alert('Failed to delete submission');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 text-white z-50 overflow-y-auto">
            {/* Accessible Header */}
            <header className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700 z-20">
                <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h1 className="text-2xl font-bold font-serif">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-400">
                            Admin Panel
                        </span>
                    </h1>
                    <div className="flex items-center gap-4">
                        {isDirty && (
                            <span className="text-amber-400 text-sm flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                Unsaved changes
                            </span>
                        )}
                        <button
                            onClick={handleReset}
                            disabled={!isDirty}
                            className="px-4 py-2 text-gray-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Reset
                        </button>
                        <button
                            onClick={onLogout}
                            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 max-w-5xl">
                {/* Content Sections */}
                <nav aria-label="Content management sections">
                    <div className="space-y-4">
                        <Section
                            title="Hero Section"
                            isOpen={openSection === 'hero'}
                            onToggle={() => handleToggleSection('hero')}
                            icon="🎯"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Headline"
                                    value={editableContent.hero.headline}
                                    onChange={(e) => handleChange('hero', 'headline', e.target.value)}
                                    placeholder="Main headline"
                                    required
                                />
                                <TextareaField
                                    label="Subheadline"
                                    value={editableContent.hero.subheadline}
                                    onChange={(e) => handleChange('hero', 'subheadline', e.target.value)}
                                    placeholder="Supporting text"
                                    rows={3}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="Primary CTA Text"
                                        value={editableContent.hero.ctaText}
                                        onChange={(e) => handleChange('hero', 'ctaText', e.target.value)}
                                        placeholder="Button text"
                                    />
                                    <InputField
                                        label="Secondary CTA Text"
                                        value={editableContent.hero.cta2Text}
                                        onChange={(e) => handleChange('hero', 'cta2Text', e.target.value)}
                                        placeholder="e.g., Buy My Book"
                                    />
                                </div>
                                <InputField
                                    label="Secondary CTA Link"
                                    value={editableContent.hero.cta2Link}
                                    onChange={(e) => handleChange('hero', 'cta2Link', e.target.value)}
                                    placeholder="https://..."
                                />
                                <ImageField
                                    label="Background Image URL"
                                    value={editableContent.hero.imageUrl || ''}
                                    onChange={(value) => handleChange('hero', 'imageUrl', value)}
                                    alt="Hero background"
                                />
                            </div>
                        </Section>

                        <Section
                            title="About Section"
                            isOpen={openSection === 'about'}
                            onToggle={() => handleToggleSection('about')}
                            icon="👤"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Section Title"
                                    value={editableContent.about.title}
                                    onChange={(e) => handleChange('about', 'title', e.target.value)}
                                    placeholder="About title"
                                    required
                                />
                                <TextareaField
                                    label="Paragraph 1"
                                    value={editableContent.about.paragraph1}
                                    onChange={(e) => handleChange('about', 'paragraph1', e.target.value)}
                                    placeholder="First paragraph..."
                                    rows={5}
                                />
                                <TextareaField
                                    label="Paragraph 2"
                                    value={editableContent.about.paragraph2}
                                    onChange={(e) => handleChange('about', 'paragraph2', e.target.value)}
                                    placeholder="Second paragraph..."
                                    rows={5}
                                />
                                <ImageField
                                    label="Portrait Image URL"
                                    value={editableContent.about.imageUrl || ''}
                                    onChange={(value) => handleChange('about', 'imageUrl', value)}
                                    alt="Profile photo"
                                />
                            </div>
                        </Section>

                        <Section
                            title="Services Section"
                            isOpen={openSection === 'services'}
                            onToggle={() => handleToggleSection('services')}
                            icon="💼"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Section Title"
                                    value={editableContent.services.title}
                                    onChange={(e) => handleChange('services', 'title', e.target.value)}
                                    placeholder="Services title"
                                    required
                                />
                                <div className="space-y-4">
                                    {editableContent.services.items.map((item, index) => (
                                        <ServiceEditor
                                            key={index}
                                            service={item}
                                            index={index}
                                            onChange={(field, value) => handleItemChange('services', index, field, value)}
                                            onRemove={() => removeItem('services', index)}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => addItem('services')}
                                    className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-purple-500 transition flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Add New Service
                                </button>
                            </div>
                        </Section>

                        <Section
                            title="Testimonials Section"
                            isOpen={openSection === 'testimonials'}
                            onToggle={() => handleToggleSection('testimonials')}
                            icon="💬"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Section Title"
                                    value={editableContent.testimonials.title}
                                    onChange={(e) => handleChange('testimonials', 'title', e.target.value)}
                                    placeholder="Testimonials title"
                                    required
                                />
                                <div className="space-y-4">
                                    {editableContent.testimonials.items.map((item, index) => (
                                        <TestimonialEditor
                                            key={index}
                                            testimonial={item}
                                            index={index}
                                            onChange={(field, value) => handleItemChange('testimonials', index, field, value)}
                                            onRemove={() => removeItem('testimonials', index)}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => addItem('testimonials')}
                                    className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-teal-500 transition flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Add New Testimonial
                                </button>
                            </div>
                        </Section>

                        <Section
                            title="Books Section"
                            isOpen={openSection === 'books'}
                            onToggle={() => handleToggleSection('books')}
                            icon="📚"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Section Title"
                                    value={editableContent.books.title}
                                    onChange={(e) => handleChange('books', 'title', e.target.value)}
                                    placeholder="Books title"
                                    required
                                />
                                <div className="space-y-4">
                                    {editableContent.books.items.map((item, index) => (
                                        <BookEditor
                                            key={index}
                                            book={item}
                                            index={index}
                                            onChange={(field, value) => handleItemChange('books', index, field, value)}
                                            onRemove={() => removeItem('books', index)}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => addItem('books')}
                                    className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-amber-500 transition flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Add New Book
                                </button>
                            </div>
                        </Section>

                        <Section
                            title="Podcast Section"
                            isOpen={openSection === 'podcast'}
                            onToggle={() => handleToggleSection('podcast')}
                            icon="🎙️"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Podcast Title"
                                    value={editableContent.podcast.title}
                                    onChange={(e) => handleChange('podcast', 'title', e.target.value)}
                                    placeholder="Podcast name"
                                    required
                                />
                                <div className="space-y-4">
                                    {editableContent.podcast.items.map((item, index) => (
                                        <PodcastEditor
                                            key={index}
                                            podcast={item}
                                            index={index}
                                            onChange={(field, value) => handleItemChange('podcast', index, field, value)}
                                            onRemove={() => removeItem('podcast', index)}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() => addItem('podcast')}
                                    className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-blue-500 transition flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                    Add New Platform
                                </button>
                            </div>
                        </Section>

                        <Section
                            title="Contact Section"
                            isOpen={openSection === 'contact'}
                            onToggle={() => handleToggleSection('contact')}
                            icon="📬"
                        >
                            <div className="space-y-5">
                                <InputField
                                    label="Section Title"
                                    value={editableContent.contact.title}
                                    onChange={(e) => handleContactChange('title', e.target.value)}
                                    placeholder="Contact title"
                                    required
                                />
                                <TextareaField
                                    label="Description"
                                    value={editableContent.contact.description}
                                    onChange={(e) => handleContactChange('description', e.target.value)}
                                    placeholder="Contact section description..."
                                    rows={3}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField
                                        label="Phone"
                                        value={editableContent.contact.phone || ''}
                                        onChange={(e) => handleContactChange('phone', e.target.value)}
                                        placeholder="+234..."
                                    />
                                    <InputField
                                        label="Email"
                                        value={editableContent.contact.email || ''}
                                        onChange={(e) => handleContactChange('email', e.target.value)}
                                        placeholder="email@example.com"
                                    />
                                    <InputField
                                        label="Location"
                                        value={editableContent.contact.location || ''}
                                        onChange={(e) => handleContactChange('location', e.target.value)}
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>
                        </Section>

                        <Section
                            title={`Form Submissions (${submissions.length})`}
                            isOpen={openSection === 'submissions'}
                            onToggle={() => handleToggleSection('submissions')}
                            icon="📋"
                        >
                            <div className="space-y-4">
                                {isLoadingSubmissions ? (
                                    <div className="flex items-center justify-center py-12">
                                        <svg className="animate-spin w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                ) : submissions.length > 0 ? (
                                    <div className="space-y-4">
                                        {submissions.map((sub) => (
                                            <SubmissionCard
                                                key={sub.id}
                                                submission={sub}
                                                onDelete={handleDeleteSubmission}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                        </svg>
                                        <p>No submissions yet.</p>
                                        <p className="text-sm mt-2">Messages from the contact form will appear here.</p>
                                    </div>
                                )}
                            </div>
                        </Section>
                    </div>
                </nav>
            </main>

            {/* Sticky Save Button */}
            <div className="sticky bottom-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent">
                <div className="flex justify-end items-center gap-4">
                    {showSuccess && (
                        <div className="flex items-center gap-2 text-green-400 bg-green-900/30 px-4 py-2 rounded-lg border border-green-700 animate-fadeIn">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="font-medium">Content Updated!</span>
                        </div>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={!isDirty}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold rounded-full hover:scale-105 transform transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
