import React from 'react';
import { useContent } from '../hooks/useContent';

const ServiceCard: React.FC<{ service: { icon: string; title: string; description: string } }> = ({ service }) => {
    // Map service icons to free image URLs
    const getIconImage = () => {
        switch (service.icon) {
            case 'MIC':
                return 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=100&h=100&fit=crop';
            case 'USERS':
                return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop';
            case 'BOOK':
                return 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=100&fit=crop';
            case 'GROUP':
                return 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop';
            default:
                return '';
        }
    };

    return (
        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 group-hover:scale-110 transition-transform duration-300">
                <img
                    src={getIconImage()}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
            <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                <span>Learn More</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>
        </div>
    );
};

const Services: React.FC = () => {
    const { content } = useContent();
    const { services } = content;

    return (
        <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                        What I Offer
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                        {services.title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Transform your life with personalized coaching and inspiring speaking engagements
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.items.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
