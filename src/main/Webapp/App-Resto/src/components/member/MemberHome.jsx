import React from 'react';
import { useAuth } from '../../context/AuthContext';

const MemberHome = () => {
    const { user } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
            <div className="w-full max-w-lg bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Welcome, {user?.name || 'Member'}!</h1>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    You are in the <span className="font-semibold text-blue-600">member login home page</span>.
                </p>
                <div className="bg-white rounded-lg p-4 shadow w-full text-center">
                    <p className="text-gray-600">This is your exclusive member dashboard. Here you can access member-only features, view your account, and more.</p>
                </div>
            </div>
        </div>
    );
};

export default MemberHome; 