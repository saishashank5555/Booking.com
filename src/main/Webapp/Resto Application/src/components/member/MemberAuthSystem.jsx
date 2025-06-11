import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaLayerGroup, FaLock, FaUser, FaCheck, FaTimes, FaSpinner, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import GoogleLoginButton from '../auth/GoogleLoginButton';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
];

const PasswordStrengthIndicator = ({ password }) => {
    const [strength, setStrength] = useState(0);
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    useEffect(() => {
        const newRequirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setRequirements(newRequirements);
        const score = Object.values(newRequirements).filter(Boolean).length;
        setStrength((score / 5) * 100);
    }, [password]);

    const getStrengthColor = () => {
        if (strength < 40) return 'bg-destructive';
        if (strength < 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getStrengthText = () => {
        if (strength < 40) return 'Weak';
        if (strength < 80) return 'Medium';
        return 'Strong';
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Password Strength</span>
                <span className={`font-medium ${strength < 40 ? 'text-destructive' : strength < 80 ? 'text-yellow-500' : 'text-green-500'}`}>{getStrengthText()}</span>
            </div>
            <div className={`h-2 rounded bg-border w-full overflow-hidden`}>
                <div className={`h-2 rounded transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${strength}%` }} />
            </div>
            <div className="grid grid-cols-1 gap-1 text-xs">
                {Object.entries(requirements).map(([key, met]) => (
                    <div key={key} className={`flex items-center gap-1 ${met ? 'text-green-600' : 'text-muted'}`}>
                        {met ? <FaCheck className="h-3 w-3" /> : <FaTimes className="h-3 w-3" />}
                        <span>
                            {key === 'length' && 'At least 8 characters'}
                            {key === 'uppercase' && 'One uppercase letter'}
                            {key === 'lowercase' && 'One lowercase letter'}
                            {key === 'number' && 'One number'}
                            {key === 'special' && 'One special character'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LoadingSpinner = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
    };
    return <FaSpinner className={`${sizeClasses[size]} animate-spin`} />;
};

const HotelAuthSystem = () => {
    const [activeTab, setActiveTab] = useState('email-login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [registrationStep, setRegistrationStep] = useState(1);
    const [loginData, setLoginData] = useState({
        email: '',
        phone: '',
        countryCode: '+1',
        password: '',
        rememberMe: false,
    });
    const [registrationData, setRegistrationData] = useState({
        hotelName: '',
        location: '',
        floors: '',
        email: '',
        phone: '',
        countryCode: '+1',
        password: '',
        confirmPassword: '',
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    // Validation functions (all JS, no types)
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return { isValid: false, message: 'Email is required' };
        if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email address' };
        return { isValid: true, message: '' };
    };
    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10,15}$/;
        if (!phone) return { isValid: false, message: 'Phone number is required' };
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) return { isValid: false, message: 'Please enter a valid phone number' };
        return { isValid: true, message: '' };
    };
    const validatePassword = (password) => {
        if (!password) return { isValid: false, message: 'Password is required' };
        if (password.length < 8) return { isValid: false, message: 'Password must be at least 8 characters' };
        return { isValid: true, message: '' };
    };
    const validateHotelName = (name) => {
        if (!name) return { isValid: false, message: 'Hotel name is required' };
        if (name.length < 3) return { isValid: false, message: 'Hotel name must be at least 3 characters' };
        if (name.length > 100) return { isValid: false, message: 'Hotel name must be less than 100 characters' };
        return { isValid: true, message: '' };
    };
    const validateFloors = (floors) => {
        const floorsNum = parseInt(floors);
        if (!floors) return { isValid: false, message: 'Number of floors is required' };
        if (isNaN(floorsNum) || floorsNum < 1 || floorsNum > 200) {
            return { isValid: false, message: 'Please enter a valid number of floors (1-200)' };
        }
        return { isValid: true, message: '' };
    };

    const handleInputChange = (field, value, formType) => {
        if (formType === 'login') {
            setLoginData(prev => ({ ...prev, [field]: value }));
        } else {
            setRegistrationData(prev => ({ ...prev, [field]: value }));
        }
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleEmailLogin = async () => {
        setIsLoading(true);
        setErrors({});

        const emailValidation = validateEmail(loginData.email);
        const passwordValidation = validatePassword(loginData.password);

        const newErrors = {};
        if (!emailValidation.isValid) newErrors.email = emailValidation.message;
        if (!passwordValidation.isValid) newErrors.password = passwordValidation.message;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            login({ ...loginData, role: 'member', name: loginData.email.split('@')[0] });
            navigate('/member-home');
            console.log('Email login successful', loginData);
        }, 2000);
    };

    const handlePhoneLogin = async () => {
        setIsLoading(true);
        setErrors({});

        const phoneValidation = validatePhone(loginData.phone);
        const passwordValidation = validatePassword(loginData.password);

        const newErrors = {};
        if (!phoneValidation.isValid) newErrors.phone = phoneValidation.message;
        if (!passwordValidation.isValid) newErrors.password = passwordValidation.message;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            login({ ...loginData, role: 'member', name: loginData.phone, email: loginData.email });
            navigate('/member-home');
            console.log('Phone login successful', loginData);
        }, 2000);
    };

    const handleRegistrationNext = () => {
        const newErrors = {};

        if (registrationStep === 1) {
            const hotelNameValidation = validateHotelName(registrationData.hotelName);
            const floorsValidation = validateFloors(registrationData.floors);

            if (!hotelNameValidation.isValid) newErrors.hotelName = hotelNameValidation.message;
            if (!registrationData.location) newErrors.location = 'Location is required';
            if (!floorsValidation.isValid) newErrors.floors = floorsValidation.message;
        } else if (registrationStep === 2) {
            const emailValidation = validateEmail(registrationData.email);
            const phoneValidation = validatePhone(registrationData.phone);
            const passwordValidation = validatePassword(registrationData.password);

            if (!emailValidation.isValid) newErrors.email = emailValidation.message;
            if (!phoneValidation.isValid) newErrors.phone = phoneValidation.message;
            if (!passwordValidation.isValid) newErrors.password = passwordValidation.message;
            if (registrationData.password !== registrationData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (registrationStep === 1) {
            setRegistrationStep(2);
        } else {
            handleRegistrationSubmit();
        }
    };

    const handleRegistrationSubmit = async () => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            login({ ...registrationData, role: 'member', name: registrationData.hotelName, email: registrationData.email });
            navigate('/member-home');
            console.log('Registration successful', registrationData);
        }, 2000);
    };

    const renderEmailLogin = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="email">Email Address</label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => handleInputChange('email', e.target.value, 'login')}
                        className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    />
                </div>
                {errors.email && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="password">Password</label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange('password', e.target.value, 'login')}
                        className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.password && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.password}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={loginData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked, 'login')}
                    />
                    <label htmlFor="remember" className="text-sm">Remember me</label>
                </div>
                <button className="px-0 text-sm">
                    Forgot password?
                </button>
            </div>

            <div className="space-y-3 mb-6">
                <GoogleLoginButton loading={isLoading} role="member" />
            </div>

            <button
                onClick={handleEmailLogin}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Sign In'}
            </button>
        </div>
    );

    const renderPhoneLogin = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="phone">Phone Number</label>
                <div className="flex space-x-2">
                    <select
                        value={loginData.countryCode}
                        onChange={(e) => handleInputChange('countryCode', e.target.value, 'login')}
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.flag} {country.code}
                            </option>
                        ))}
                    </select>
                    <div className="relative flex-1">
                        <FaPhone className="absolute left-3 top-3 h-4 w-4 text-muted" />
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={loginData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value, 'login')}
                            className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                        />
                    </div>
                </div>
                {errors.phone && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.phone}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="password-phone">Password</label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="password-phone"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange('password', e.target.value, 'login')}
                        className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.password && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.password}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <input
                        id="remember-phone"
                        type="checkbox"
                        checked={loginData.rememberMe}
                        onChange={(e) => handleInputChange('rememberMe', e.target.checked, 'login')}
                    />
                    <label htmlFor="remember-phone" className="text-sm">Remember me</label>
                </div>
                <button className="px-0 text-sm">
                    Forgot password?
                </button>
            </div>

            <button
                onClick={handlePhoneLogin}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Sign In'}
            </button>
        </div>
    );

    const renderRegistrationStep1 = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="hotel-name">Hotel Name</label>
                <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="hotel-name"
                        placeholder="Enter your hotel name"
                        value={registrationData.hotelName}
                        onChange={(e) => handleInputChange('hotelName', e.target.value, 'registration')}
                        className={`pl-10 ${errors.hotelName ? 'border-destructive' : ''}`}
                    />
                </div>
                {errors.hotelName && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.hotelName}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="location">Location</label>
                <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="location"
                        placeholder="Enter hotel location"
                        value={registrationData.location}
                        onChange={(e) => handleInputChange('location', e.target.value, 'registration')}
                        className={`pl-10 ${errors.location ? 'border-destructive' : ''}`}
                    />
                </div>
                {errors.location && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.location}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="floors">Number of Floors</label>
                <div className="relative">
                    <FaLayerGroup className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="floors"
                        type="number"
                        placeholder="Enter number of floors"
                        value={registrationData.floors}
                        onChange={(e) => handleInputChange('floors', e.target.value, 'registration')}
                        className={`pl-10 ${errors.floors ? 'border-destructive' : ''}`}
                    />
                </div>
                {errors.floors && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.floors}
                    </div>
                )}
            </div>

            <button onClick={handleRegistrationNext} className="w-full">
                Next Step <FaArrowRight className="ml-2 h-4 w-4" />
            </button>
        </div>
    );

    const renderRegistrationStep2 = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="reg-email">Email Address</label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="reg-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registrationData.email}
                        onChange={(e) => handleInputChange('email', e.target.value, 'registration')}
                        className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                    />
                </div>
                {errors.email && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.email}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="reg-phone">Phone Number</label>
                <div className="flex space-x-2">
                    <select
                        value={registrationData.countryCode}
                        onChange={(e) => handleInputChange('countryCode', e.target.value, 'registration')}
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.flag} {country.code}
                            </option>
                        ))}
                    </select>
                    <div className="relative flex-1">
                        <FaPhone className="absolute left-3 top-3 h-4 w-4 text-muted" />
                        <input
                            id="reg-phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={registrationData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value, 'registration')}
                            className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                        />
                    </div>
                </div>
                {errors.phone && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.phone}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="reg-password">Password</label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={registrationData.password}
                        onChange={(e) => handleInputChange('password', e.target.value, 'registration')}
                        className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                </div>
                {registrationData.password && (
                    <PasswordStrengthIndicator password={registrationData.password} />
                )}
                {errors.password && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.password}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 h-4 w-4 text-muted" />
                    <input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registrationData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value, 'registration')}
                        className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <div className="border-destructive bg-destructive-foreground/10 p-2 rounded">
                        {errors.confirmPassword}
                    </div>
                )}
            </div>

            <div className="space-y-3 mb-6">
                <GoogleLoginButton loading={isLoading} role="member" />
            </div>

            <div className="flex space-x-2">
                <button
                    type="button"
                    className="flex-1"
                    onClick={() => setRegistrationStep(1)}
                >
                    <FaArrowLeft className="mr-2 h-4 w-4" /> Back
                </button>
                <button
                    onClick={handleRegistrationNext}
                    disabled={isLoading}
                    className="flex-1"
                >
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <FaBuilding className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-foreground">Hotel Manager</h1>
                    <p className="text-muted-foreground mt-2">Manage your hotel with ease</p>
                </div>

                <div className="shadow-xl border-0">
                    <div className="space-y-1">
                        <h2 className="text-2xl text-center">Welcome</h2>
                        <p className="text-center">
                            Sign in to your account or create a new one
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="w-full">
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <span>Step {registrationStep} of 2</span>
                                <span>{registrationStep === 1 ? 'Hotel Details' : 'Account Details'}</span>
                            </div>
                            <div className="h-2 rounded bg-border w-full overflow-hidden">
                                <div className={`h-2 rounded transition-all duration-300 ${registrationStep === 1 ? 'bg-primary' : 'bg-primary'}`} style={{ width: `${registrationStep * 50}%` }} />
                            </div>
                        </div>

                        <div className="mt-6">
                            {activeTab === 'email-login' && renderEmailLogin()}
                            {activeTab === 'phone-login' && renderPhoneLogin()}
                            {activeTab === 'register' && (
                                <>
                                    {registrationStep === 1 && renderRegistrationStep1()}
                                    {registrationStep === 2 && renderRegistrationStep2()}
                                </>
                            )}
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                {activeTab === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
                                <button
                                    className="px-0 text-sm"
                                    onClick={() => setActiveTab(activeTab === 'register' ? 'email-login' : 'register')}
                                >
                                    {activeTab === 'register' ? 'Sign in' : 'Sign up'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-muted-foreground">
                    <p>© 2024 Hotel Manager. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default HotelAuthSystem;
