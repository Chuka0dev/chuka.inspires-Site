import React from 'react';
import { useContent } from '../hooks/useContent';

const Hero: React.FC = () => {
    const { content } = useContent();
    const { hero } = content;

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const heroBgStyle = hero.imageUrl ? { backgroundImage: `url(${hero.imageUrl})` } : {};

    return (
        <section
            id="home"
            className="relative bg-gray-900 bg-cover bg-center text-white min-h-screen flex items-center"
            style={heroBgStyle}
            aria-label="Hero section"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent"></div>
            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="max-w-3xl">
                    <span className="inline-block px-4 py-2 bg-purple-600/30 rounded-full text-purple-300 text-sm font-semibold mb-6 border border-purple-500/30">
                        Life Coach & Author
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif">
                        {hero.headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                        {hero.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={scrollToContact}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold rounded-lg hover:from-purple-700 hover:to-teal-600 transform hover:scale-105 transition duration-300 shadow-lg shadow-purple-600/30"
                        >
                            {hero.ctaText}
                        </button>
                        <a
                            href={hero.cta2Link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transform hover:scale-105 transition duration-300 border border-white/20 text-center"
                        >
                            {hero.cta2Text}
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
