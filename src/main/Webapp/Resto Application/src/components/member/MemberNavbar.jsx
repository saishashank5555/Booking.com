import React from 'react';
import { Link } from 'react-router-dom';
import MemberAvatarDropdown from './MemberAvatarDropdown';
import { useAuth } from '../context/AuthContext';

const MemberNavbar = () => {
    const { user } = useAuth();
    return (
        <nav className="bg-gray-200 shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 space-x-5 flex justify-between items-center">
                {/* Logo */}
                <Link to="/member-home" className="text-red-600 font-bold text-2xl flex items-center">
                    Resto<span className="text-black">.com</span>
                </Link>

                {/* Center section for future member links */}
                <div className="flex-1 flex justify-center">
                    {/* Add member-only nav items here if needed */}
                    {/* let's show the member name, who loggined in */}
                    <h1 className="text-2xl font-bold text-blue-700 text-center">Welcome, {user.name}</h1>
                </div>

                {/* Right Section: Avatar Dropdown */}
                <div className="flex items-center space-x-2 relative ml-4">
                    <MemberAvatarDropdown />
                </div>
            </div>
        </nav>
    );
};

export default MemberNavbar; 