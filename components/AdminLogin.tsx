import React, { useState } from 'react';

interface AdminLoginProps {
    onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (username.trim() === '' || password.trim() === '') {
            setError('Please enter a username and password.');
            return;
        }

        // Specific authentication check
        if (username === "Chuka.inspires29" && password === "Godloves222") {
            setError('');
            onLoginSuccess();
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm border border-purple-700">
                <h2 className="text-2xl font-bold text-white text-center mb-6 font-serif">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                     <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-700 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            placeholder="Chuka.inspires29"
                            aria-required="true"
                        />
                    </div>
                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            placeholder="password"
                             aria-required="true"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center" role="alert">{error}</p>}
                    <button type="submit" className="w-full mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-bold rounded-full hover:scale-105 transform transition duration-300 shadow-lg">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;