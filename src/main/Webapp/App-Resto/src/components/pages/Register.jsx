import React, { useState } from 'react';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!form.email || !form.password) {
            setError('Please enter both email and password.');
            return;
        }
        // Handle registration logic here
        alert('Registration submitted!');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
            <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register; 