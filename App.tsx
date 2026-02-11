import React, { useState } from 'react';
import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Books from './components/Books';
import Podcast from './components/Podcast';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdminMode(false);
    };

    return (
        <ContentProvider>
            <div className="bg-stone-50 text-gray-800 min-h-screen">
                {isAdminMode && !isLoggedIn && <AdminLogin onLoginSuccess={handleLoginSuccess} />}

                {isLoggedIn && <AdminPanel onLogout={handleLogout} />}

                <div className={`${isLoggedIn ? 'hidden' : ''}`}>
                    <Header />
                    <main>
                        <Hero />
                        <About />
                        <Services />
                        <Testimonials />
                        <Books />
                        <Podcast />
                        <Contact />
                    </main>
                    <Footer onAdminClick={() => setIsAdminMode(true)} />
                </div>
            </div>
        </ContentProvider>
    );
};

export default App;
