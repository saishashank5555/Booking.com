import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const GoogleLoginButton = ({ loading: parentLoading }) => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(false);
            try {
                // Fetch user info from Google
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                // Call AuthContext login with user info
                login({
                    name: res.data.name,
                    email: res.data.email,
                    avatar: res.data.picture,
                });
            } catch (err) {
                alert('Failed to fetch Google user info');
            }
        },
        onError: (error) => {
            setLoading(false);
            alert('Google login failed!');
        },
        flow: 'implicit',
    });

    return (
        <button
            type="button"
            onClick={() => {
                setLoading(true);
                googleLogin();
            }}
            disabled={loading || parentLoading}
            className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors duration-150 font-medium text-gray-700 disabled:opacity-60"
        >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
                <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.09 30.18 0 24 0 14.82 0 6.73 5.06 2.69 12.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.13 46.1 31.36 46.1 24.55z" />
                    <path fill="#FBBC05" d="M10.67 28.65c-1.13-3.36-1.13-6.99 0-10.35l-7.98-6.2C.99 16.36 0 20.06 0 24c0 3.94.99 7.64 2.69 10.9l7.98-6.25z" />
                    <path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.13-5.59l-7.19-5.59c-2.01 1.35-4.6 2.15-7.94 2.15-6.38 0-11.87-3.63-14.33-8.9l-7.98 6.25C6.73 42.94 14.82 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                </g>
            </svg>
            <span>{loading || parentLoading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>
    );
};

export default GoogleLoginButton; 