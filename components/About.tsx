import React from 'react';
import { useContent } from '../hooks/useContent';

const About: React.FC = () => {
    const { content } = useContent();
    const { about } = content;

    return (
        <section id="about" className="bg-gradient-to-b from-white to-gray-50 py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-5/12">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-teal-500 rounded-2xl transform rotate-3"></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                {about.imageUrl && (
                                    <img
                                        src={about.imageUrl}
                                        alt="Chuka Michael Nwaezuoke"
                                        className="w-full h-auto object-cover"
                                    />
                                )}
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-600 to-teal-500 rounded-full opacity-20 blur-2xl"></div>
                        </div>
                    </div>
                    <div className="lg:w-7/12">
                        <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                            About Me
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-serif leading-tight">
                            {about.title}
                        </h2>
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {about.paragraph1}
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {about.paragraph2}
                            </p>
                        </div>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-teal-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-gray-900">500+ People</p>
                                <p className="text-gray-500">Impacted through coaching</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
