import React from 'react';
import { useContent } from '../hooks/useContent';
import { BlogPost } from '../types';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover bg-gray-200" />
            )}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-purple-600 text-sm font-semibold mb-2">{post.category}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif flex-grow">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
        </div>
    );
};


const BlogPreview: React.FC = () => {
    const { content } = useContent();
    const { blog } = content;

    return (
        <section id="blog" className="bg-stone-50 py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">{blog.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-teal-600 mb-12 mx-auto"></div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blog.items.map((post, index) => (
                        <BlogCard key={index} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;