import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaPhone, FaCheck, FaTimes } from 'react-icons/fa';
import GoogleLoginButton from '../auth/GoogleLoginButton';

const UserAuthenticationPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [usePhoneLogin, setUsePhoneLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const getPasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { score: score * 20, label: 'Weak', color: 'bg-red-500' };
        if (score <= 3) return { score: score * 20, label: 'Fair', color: 'bg-yellow-500' };
        if (score <= 4) return { score: score * 20, label: 'Good', color: 'bg-blue-500' };
        return { score: 100, label: 'Strong', color: 'bg-green-500' };
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!usePhoneLogin && !formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (usePhoneLogin && !formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (!isLogin) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        return newErrors;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (touched[field]) {
            const newErrors = validateForm();
            setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
        }
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const newErrors = validateForm();
        setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        setTouched({
            fullName: true,
            email: true,
            password: true,
            confirmPassword: true,
            phone: true
        });

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
            console.log('Form submitted:', formData);
        }
    };

    const handleSocialAuth = (provider) => {
        console.log(`Authenticating with ${provider}`);
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div className="min-h-screen flex items-center justify-center font-['Inter']">
            <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-8 sm:p-8 md:p-12 transition-all duration-300 ease-in-out">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-base leading-relaxed text-gray-600">
                        {isLogin ? 'Login to your premium booking account' : 'Join our premium booking platform'}
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                    <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-2 px-4 text-sm font-medium tracking-wide rounded-md transition-all duration-300 ease-in-out ${isLogin
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-2 px-4 text-sm font-medium tracking-wide rounded-md transition-all duration-300 ease-in-out ${!isLogin
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Social Authentication */}
                <div className="space-y-3 mb-6">
                    <GoogleLoginButton loading={isLoading} />
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="block text-gray-600 text-sm font-light mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    onBlur={() => handleBlur('fullName')}
                                    autoComplete="name"
                                    className={`w-full pl-10 pr-4 py-4 border-[0.5px] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-200 min-h-[44px] ${errors.fullName
                                        ? 'border-red-300 bg-red-50'
                                        : touched.fullName && !errors.fullName
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-gray-200'
                                        }`}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <FaTimes className="w-3 h-3" />
                                    {errors.fullName}
                                </p>
                            )}
                        </div>
                    )}

                    {usePhoneLogin ? (
                        <div>
                            <label className="block text-gray-600 text-sm font-light mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    autoComplete="tel"
                                    className={`w-full pl-10 pr-4 py-4 border-[0.5px] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-200 min-h-[44px] ${errors.phone
                                        ? 'border-red-300 bg-red-50'
                                        : touched.phone && !errors.phone
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-gray-200'
                                        }`}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <FaTimes className="w-3 h-3" />
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-gray-600 text-sm font-light mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                    autoComplete="email"
                                    className={`w-full pl-10 pr-4 py-4 border-[0.5px] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-200 min-h-[44px] ${errors.email
                                        ? 'border-red-300 bg-red-50'
                                        : touched.email && !errors.email && formData.email
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-gray-200'
                                        }`}
                                    placeholder="Enter your email"
                                />
                                {touched.email && !errors.email && formData.email && (
                                    <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                                )}
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <FaTimes className="w-3 h-3" />
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-600 text-sm font-light mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                onBlur={() => handleBlur('password')}
                                autoComplete="current-password"
                                className={`w-full pl-10 pr-12 py-4 border-[0.5px] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-200 min-h-[44px] ${errors.password
                                    ? 'border-red-300 bg-red-50'
                                    : touched.password && !errors.password && formData.password
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-gray-200'
                                    }`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                            </button>
                        </div>
                        {formData.password && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-500">Password strength</span>
                                    <span className={`text-xs font-medium ${passwordStrength.label === 'Strong' ? 'text-green-600' :
                                        passwordStrength.label === 'Good' ? 'text-blue-600' :
                                            passwordStrength.label === 'Fair' ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div
                                        className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                        style={{ width: `${passwordStrength.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <FaTimes className="w-3 h-3" />
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-gray-600 text-sm font-light mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        onBlur={() => handleBlur('confirmPassword')}
                                        autoComplete="new-password"
                                        className={`w-full pl-10 pr-12 py-4 border-[0.5px] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-200 min-h-[44px] ${errors.confirmPassword
                                            ? 'border-red-300 bg-red-50'
                                            : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword
                                                ? 'border-green-200 bg-green-50'
                                                : 'border-gray-200'
                                            }`}
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                    </button>
                                    {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
                                        <FaCheck className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                                    )}
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                        <FaTimes className="w-3 h-3" />
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm font-light mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full pl-10 pr-4 py-4 border-[0.5px] border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-200 min-h-[44px]"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {isLogin && (
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-gray-500 hover:text-gray-700 underline-offset-4 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 min-h-[44px] transform hover:scale-[1.02] ${isLoading ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {isLogin ? 'Logging In...' : 'Creating Account...'}
                            </div>
                        ) : (
                            isLogin ? 'Login' : 'Create Account'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setUsePhoneLogin(!usePhoneLogin)}
                        className="text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
                    >
                        {usePhoneLogin ? 'Login using email?' : 'Login using phone number?'}
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 hover:text-blue-700 font-medium underline-offset-4 hover:underline"
                        >
                            {isLogin ? 'Sign up instead' : 'Login instead'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserAuthenticationPage;
