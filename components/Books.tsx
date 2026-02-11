import React from 'react';
import { useContent } from '../hooks/useContent';
import { Book } from '../types';

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="group">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Book Cover */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    {book.imageUrl ? (
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-serif font-bold text-center px-4">{book.title}</span>
                        </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <a
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-gray-900 font-bold rounded-lg hover:bg-purple-600 hover:text-white transition-colors duration-300"
                            >
                                <span>Get Your Copy</span>
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif group-hover:text-purple-600 transition-colors">
                        {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {book.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Books: React.FC = () => {
    const { content } = useContent();
    const { books } = content;

    return (
        <section id="books" className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
                        My Publications
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                        {books.title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover books that will transform your life and deepen your faith
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {books.items.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Books;
