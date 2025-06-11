import React, { useState, useRef } from 'react';
// import { useAuth } from '';
import {useAuth} from '../context/AuthContext'; // Adjust the import path as necessary
import { Link, useNavigate } from 'react-router-dom';

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff';

const MemberAvatarDropdown = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        if (open) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center focus:outline-none"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="User menu"
            >
                <img
                    src={user?.avatar || defaultAvatar}
                    alt={user?.name || 'User'}
                    className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-sm object-cover"
                />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 animate-fade-in">
                    <ul className="py-2">
                        <li>
                            <Link
                                to="/member-my-account"
                                className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                                onClick={() => setOpen(false)}
                            >
                                My Account
                            </Link>
                        </li>
                        <li><hr className="my-1 border-gray-200" /></li>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg"
                                onClick={() => {
                                    setOpen(false);
                                    logout();
                                    navigate('/');
                                }}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MemberAvatarDropdown; 