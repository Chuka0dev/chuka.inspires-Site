import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { addFormSubmission } from '../db';

const Contact: React.FC = () => {
    const { content } = useContent();
    const { contact } = content;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const validateField = (name: keyof typeof formData, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Full Name is required.';
                return '';
            case 'email':
                if (!value.trim()) return 'Email Address is required.';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address.';
                }
                return '';
            case 'message':
                if (!value.trim()) return 'Message is required.';
                if (value.trim().length < 10) return 'Message must be at least 10 characters long.';
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof typeof formData;

        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));

        if (errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: ''
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof typeof formData;
        const error = validateField(fieldName, value);
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message)
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (!hasErrors) {
            setIsSubmitting(true);
            setSubmitStatus('idle');
            setErrorMessage('');

            try {
                await addFormSubmission({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                });

                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });

                // Reset success message after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } catch (error: any) {
                console.error('Error submitting form:', error);
                setSubmitStatus('error');
                setErrorMessage(error.message || 'Something went wrong. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                                    Get In Touch
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb">
                                    {contact.title}
                                </h2>
                                <p className-6 font-serif="text-gray-600 text-lg leading-relaxed">
                                    {contact.description}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contact.phone && (
                                    <a href={`tel:${contact.phone}`} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="text-lg font-semibold text-gray-900">{contact.phone}</p>
                                        </div>
                                    </a>
                                )}

                                {contact.email && (
                                    <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-lg font-semibold text-gray-900">{contact.email}</p>
                                        </div>
                                    </a>
                                )}

                                {contact.location && (
                                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="text-lg font-semibold text-gray-900">{contact.location}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            {submitStatus === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">Thank you for reaching out. I'll get back to you soon.</p>
                                    <button
                                        onClick={() => setSubmitStatus('idle')}
                                        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-label="Full Name"
                                            aria-required="true"
                                            aria-invalid={!!errors.name}
                                            aria-describedby="name-error"
                                            className={`w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 transition ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500 focus:border-purple-500'}`}
                                            placeholder="Your Name"
                                        />
                                        {errors.name && <p id="name-error" className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-label="Email Address"
                                            aria-required="true"
                                            aria-invalid={!!errors.email}
                                            aria-describedby="email-error"
                                            className={`w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500 focus:border-purple-500'}`}
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <p id="email-error" className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-label="Message"
                                            aria-required="true"
                                            aria-invalid={!!errors.message}
                                            aria-describedby="message-error"
                                            className={`w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 transition ${errors.message ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-500 focus:border-purple-500'}`}
                                            placeholder="Your message..."
                                        ></textarea>
                                        {errors.message && <p id="message-error" className="text-red-500 text-sm mt-2">{errors.message}</p>}
                                    </div>
                                    {submitStatus === 'error' && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-600 font-medium">Error: {errorMessage}</p>
                                            <p className="text-red-500 text-sm mt-1">Please make sure the Supabase tables are set up correctly.</p>
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold rounded-lg hover:from-purple-700 hover:to-teal-600 transform hover:scale-[1.02] transition duration-300 shadow-lg shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
