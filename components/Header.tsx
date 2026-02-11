import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navLinks = ['About', 'Services', 'Testimonials', 'Books', 'Podcast', 'Contact'];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold font-serif">
                    <span className={scrolled ? 'text-gray-900' : 'text-white'}>
                        Chuka<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-400">.Inspires</span>
                    </span>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <button
                            key={link}
                            onClick={() => scrollToSection(link)}
                            className={`font-medium transition duration-300 hover:text-purple-500 ${scrolled ? 'text-gray-600' : 'text-white/90'
                                }`}
                        >
                            {link}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300"
                    >
                        Get Started
                    </button>
                </nav>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'}`}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white/98 backdrop-blur-md">
                    <nav className="flex flex-col items-center py-6 space-y-4">
                        {navLinks.map(link => (
                            <button
                                key={link}
                                onClick={() => scrollToSection(link)}
                                className="text-gray-600 hover:text-purple-600 font-medium transition duration-300"
                            >
                                {link}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
