import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import GoogleLoginButton from '../auth/GoogleLoginButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.email) {
            newErrors.email = 'Email is required.';
        } else if (!validateEmail(form.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!form.password) {
            newErrors.password = 'Password is required.';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        // Simulate async login
        setTimeout(() => {
            setLoading(false);
            alert('Login submitted!');
        }, 1200);
    };

    useEffect(() => {
        if (user) {
            navigate('/member-home');
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
            <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.email ? 'border-red-400' : 'border-blue-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white`}
                            placeholder="Enter your email"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby="email-error"
                        />
                        {errors.email && <div id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-400' : 'border-blue-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white pr-10`}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            aria-invalid={!!errors.password}
                            aria-describedby="password-error"
                        />
                        <button
                            type="button"
                            className="absolute right-5 inset-y-0 flex items-center text-gray-500 hover:text-blue-600 focus:outline-none mt-1"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                        {errors.password && <div id="password-error" className="text-red-500 text-xs mt-1">{errors.password}</div>}
                        <div className="flex justify-end mt-1">
                            <button
                                type="button"
                                className="text-xs text-blue-600 hover:underline focus:outline-none"
                                onClick={() => alert('Forgot password flow!')}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-300" />
                        <span className="mx-3 text-gray-400 text-xs">or</span>
                        <div className="flex-grow h-px bg-gray-300" />
                    </div>
                    <GoogleLoginButton loading={false} />
                </form>
            </div>
        </div>
    );
};

export default Login; 