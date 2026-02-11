import React from 'react';
import { useContent } from '../hooks/useContent';

const SpotifyIcon: React.FC = () => (
    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
);

const ApplePodcastIcon: React.FC = () => (
    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 0 0 0 5.34v13.32A5.328 5.328 0 0 0 5.34 24h13.32A5.328 5.328 0 0 0 24 18.66V5.34A5.328 5.328 0 0 0 18.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.24 1.176-.83 1.296-.59.12-1.177-.24-1.297-.83-.263-1.32-.794-2.379-1.71-3.331-1.296-1.356-2.903-2.036-4.752-2.036-1.89 0-3.636.755-4.928 2.128-.904.96-1.416 2.04-1.68 3.24-.12.59-.706.95-1.296.83-.59-.12-.95-.706-.83-1.296.349-1.62 1.04-3.013 2.161-4.347 1.62-1.74 3.853-2.633 6.142-2.633h.7zm.126 4.264c2.558 0 4.634 2.078 4.634 4.634 0 2.557-2.078 4.634-4.634 4.634-2.558 0-4.634-2.078-4.634-4.634 0-2.557 2.078-4.634 4.634-4.634zm0 2.108a2.526 2.526 0 0 0-2.526 2.526 2.526 2.526 0 0 0 2.526 2.526 2.526 2.526 0 0 0 2.526-2.526 2.526 2.526 0 0 0-2.526-2.526z" />
    </svg>
);

const YouTubeIcon: React.FC = () => (
    <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const Podcast: React.FC = () => {
    const { content } = useContent();
    const { podcast } = content;

    return (
        <section id="podcast" className="py-24 bg-gradient-to-br from-gray-900 to-purple-900">
            <div className="container mx-auto px-6 text-center">
                <span className="inline-block px-4 py-2 bg-white/10 text-purple-300 rounded-full text-sm font-semibold mb-4">
                    Listen & Watch
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
                    {podcast.title}
                </h2>
                <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
                    Listen to "{podcast.title}" on your favorite platform
                </p>

                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                    {podcast.items.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center"
                        >
                            <div
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-2xl"
                                style={{
                                    backgroundColor: item.title === 'Spotify' ? '#1DB954' : item.title === 'Apple' ? '#872EC4' : item.title === 'YouTube' ? '#FF0000' : '#white'
                                }}
                            >
                                {item.title === 'Spotify' && <SpotifyIcon />}
                                {item.title === 'Apple' && <ApplePodcastIcon />}
                                {item.title === 'YouTube' && <YouTubeIcon />}
                            </div>
                            <span className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                                {item.title}
                            </span>
                            <span className="text-sm text-gray-400">{item.episode}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Podcast;
