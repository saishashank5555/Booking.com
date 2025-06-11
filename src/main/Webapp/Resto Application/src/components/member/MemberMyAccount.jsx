import React from 'react';
import { useAuth } from '../context/AuthContext';

const MemberMyAccount = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
            <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">My Account</h1>
                {user ? (
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-20 h-20 rounded-full border-2 border-blue-500 shadow object-cover"
                        />
                        <div className="text-lg font-semibold text-gray-800">{user.name}</div>
                        <div className="text-gray-600">{user.email}</div>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">No user info available.</div>
                )}
            </div>
        </div>
    );
};

export default MemberMyAccount; 