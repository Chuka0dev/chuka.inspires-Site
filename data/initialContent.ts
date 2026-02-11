import { PageContent } from '../types';

export const initialContent: PageContent = {
    hero: {
        headline: "Unlock Your Potential, Walk in Your Purpose",
        subheadline: "I'm here to help you live a life of profound meaning, impact, and divine alignment. Your transformational journey to greatness starts now.",
        ctaText: "Book a Discovery Call",
        cta2Text: "Buy My Latest Book",
        cta2Link: "https://selar.com/tltl",
        imageUrl: "/img/hero-bg.jpg"
    },
    about: {
        title: "Meet Chuka Michael Nwaezuoke",
        paragraph1: "Hello, I'm Chuka Michael Nwaezuoke. I am a Life Coach and Author, but before that, I am a believer in the power of the human spirit. I operate on a simple, unshakeable conviction: your life isn't an accident. It is a unique story waiting to be told and a purpose waiting to be lived.",
        paragraph2: "My journey didn't start on a big stage; it started in the quiet service of my local church. There, working side-by-side with children and teenagers, I saw the raw reality of growing up in today's world. I saw their struggles, but I also saw their incredible potential. That experience sparked a fire in me to become more than just an observer—I became a mentor, dedicated to equipping the next generation with character, confidence, and a faith that can weather any storm.",
        imageUrl: "/img/Chuka.jpg"
    },
    services: {
        title: "How I Can Serve You",
        items: [
            {
                icon: "MIC",
                title: "Keynote Speaking",
                description: "Dynamic and inspiring talks for your events, conferences, and congregations, tailored to ignite passion and purpose."
            },
            {
                icon: "USERS",
                title: "One-on-One Coaching",
                description: "Bespoke one-on-one sessions designed to provide laser-focused clarity, actionable strategy, and unwavering accountability for your personal and spiritual growth."
            },
            {
                icon: "BOOK",
                title: "Authorship & Books",
                description: "Explore my collection of books filled with wisdom, practical advice, and faith-based encouragement to guide you."
            },
            {
                icon: "GROUP",
                title: "Workshops & Seminars",
                description: "Interactive and engaging workshops that equip your team or group with tools for growth, resilience, and leadership."
            }
        ]
    },
    testimonials: {
        title: "What Clients Are Saying",
        items: [
            {
                quote: "Working with Chuka was a pivotal moment in my life. The guidance is rooted in profound wisdom, helping me find the clarity and courage I desperately needed to move forward. It was truly life-changing.",
                author: "Jane D.",
                title: "Coaching Client"
            },
            {
                quote: "His keynote at our annual conference was the most electrifying talk we've ever had. He captivated the audience and left us all inspired to take action. Truly unforgettable.",
                author: "Mark T.",
                title: "Event Organizer"
            },
            {
                quote: "This book felt like it was written just for me. The insights are profound yet practical. It's a must-read for anyone on a journey of faith.",
                author: "Sarah L.",
                title: "Reader"
            }
        ]
    },
    books: {
        title: "My Books",
        items: [
            {
                title: "The Love That Lasts",
                description: "A powerful guide to building lasting relationships grounded in faith and love.",
                imageUrl: "/Books/Img/The Love That Lasts.png",
                link: "https://selar.com/tltl"
            },
            {
                title: "Spiritual Nuggets to Nurture",
                description: "Daily wisdom to nourish your spirit and strengthen your faith journey.",
                imageUrl: "/Books/Img/Spiritual Nuggets to Nurture.jpg",
                link: "https://selar.com/763f"
            },
            {
                title: "Lets Make it Work",
                description: "Practical principles for success in every area of your life.",
                imageUrl: "/Books/Img/Let us make it work.jpg",
                link: "https://selar.com/LetsMakeitWork"
            }
        ]
    },
    podcast: {
        title: "Circles of Connections",
        items: [
            {
                title: "Spotify",
                episode: "Listen on Spotify",
                link: "https://open.spotify.com/show/5YYmf6UzJxvjMPCkrtKM59"
            },
            {
                title: "Apple",
                episode: "Listen on Apple Podcasts",
                link: "https://podcasts.apple.com/gb/podcast/circles-of-connection/id1765101004"
            },
            {
                title: "YouTube",
                episode: "Watch on YouTube",
                link: "https://www.youtube.com/playlist?list=PLfW-dG5IGzfYY870nY79JUs1n6EuTqEXo"
            }
        ]
    },
    contact: {
        title: "Let's Connect",
        description: "Ready to take the next step in your journey? Reach out to book a speaking engagement, inquire about coaching, or simply to say hello.",
        phone: "+234 8023041236",
        email: "nwaezuokechuka@gmail.com",
        location: "Lagos, Nigeria"
    }
};
