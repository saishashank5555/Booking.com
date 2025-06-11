import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaHotel, FaUsers, FaBuilding, FaRunning, FaTicketAlt, FaHeart, FaUserCircle, FaSignOutAlt, FaBook } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { name: 'Home', path: '/user-home' },
    {
        name: 'Hotels',
        dropdown: [
            { label: 'Luxury Hotels', path: '/hotels/luxury' },
            { label: 'Budget Hotels', path: '/hotels/budget' },
            { label: 'Hotel Deals', path: '/hotels/deals' },
        ],
    },
    {
        name: 'Guest House',
        dropdown: [
            { label: 'Family Guest Houses', path: '/guesthouses/family' },
            { label: 'Pet Friendly', path: '/guesthouses/pets' },
        ],
    },
    {
        name: 'Service Apartments',
        dropdown: [
            { label: 'City View Apartments', path: '/service-apartments/cityview' },
            { label: 'Premium Suites', path: '/service-apartments/premium' },
        ],
    },
    {
        name: 'Activities',
        dropdown: [
            { label: 'Adventure Tours', path: '/activities/adventure' },
            { label: 'City Walks', path: '/activities/citywalks' },
        ],
    },
    { name: 'Coupons', path: '/coupons' },
];

const getIcon = (name) => {
    const iconMap = {
        Home: <FaHome className="mr-1 text-blue-500" />,
        Hotels: <FaHotel className="mr-1 text-blue-500" />,
        'Guest House': <FaUsers className="mr-1 text-green-500" />,
        'Service Apartments': <FaBuilding className="mr-1 text-purple-500" />,
        Activities: <FaRunning className="mr-1 text-orange-500" />,
        Coupons: <FaTicketAlt className="mr-1 text-pink-500" />,
    };
    return iconMap[name] || null;
};

const UserNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [dropdownTimeout, setDropdownTimeout] = useState(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gray-200 shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-red-600 font-bold text-2xl flex items-center flex-shrink-0">
                    Resto<span className="text-black">.com</span>
                </Link>
                {/* Nav Items with Dropdowns */}
                <ul className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 text-gray-700 text-sm font-medium w-full">
                    {navItems.map((item) => {
                        const isSimple = !item.dropdown;
                        return (
                            <li
                                key={item.name}
                                className="relative group flex items-center h-full whitespace-nowrap"
                                onMouseEnter={() => {
                                    if (dropdownTimeout) clearTimeout(dropdownTimeout);
                                    if (!isSimple) setHoveredItem(item.name);
                                }}
                                onMouseLeave={() => {
                                    if (!isSimple) {
                                        const timeout = setTimeout(() => setHoveredItem(null), 200);
                                        setDropdownTimeout(timeout);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 px-2 py-1 transition-colors duration-150 h-full">
                                    <span className="flex items-center h-full">{getIcon(item.name)}</span>
                                    {isSimple ? (
                                        <Link to={item.name === 'Home' ? '/' : item.path} className="flex items-center h-full">{item.name}</Link>
                                    ) : (
                                        <>
                                            <span className="flex items-center h-full">{item.name}</span>
                                            <svg
                                                className="ml-1 w-3 h-3"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </>
                                    )}
                                </div>
                                {/* Dropdown */}
                                {item.dropdown && (
                                    <div
                                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg z-50 transition-all duration-200 ease-in transform ${hoveredItem === item.name
                                            ? 'opacity-100 translate-y-1 pointer-events-auto'
                                            : 'opacity-0 pointer-events-none'
                                            }`}
                                        onMouseEnter={() => {
                                            if (dropdownTimeout) clearTimeout(dropdownTimeout);
                                            setHoveredItem(item.name);
                                        }}
                                        onMouseLeave={() => {
                                            const timeout = setTimeout(() => setHoveredItem(null), 200);
                                            setDropdownTimeout(timeout);
                                        }}
                                    >
                                        <ul className="py-2">
                                            {item.dropdown.map((drop) => (
                                                <li key={drop.label} className="w-full">
                                                    <Link
                                                        to={drop.path}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg w-full text-left"
                                                        onClick={() => setHoveredItem(null)}
                                                    >
                                                        <span className="inline-block w-2"></span>{drop.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
                {/* Right Section: Wishlist, Avatar, Name, Dropdown */}
                <div className="flex items-center gap-x-4 relative ml-4">
                    <button className="text-red-500 hover:text-red-700 text-xl" title="Wishlist">
                        <FaHeart />
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer relative" onClick={() => setDropdownOpen((open) => !open)}>
                        <img src={user?.avatar || ''} alt={user?.name || ''} className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-sm object-cover" />
                        <span className="font-medium text-gray-800 hidden sm:inline-block">{user?.name || ''}</span>
                        {/* Dropdown */}
                        {dropdownOpen && (
                            <div className="absolute right-1 mt-48 w-48 bg-white rounded-xl shadow-lg z-50 transition-all duration-200 ease-in transform">
                                <ul className="py-2">
                                    <li>
                                        <button
                                            className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg gap-2"
                                            onClick={() => { setDropdownOpen(false); navigate('/user-profile'); }}
                                        >
                                            <FaUserCircle /> My Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg gap-2"
                                            onClick={() => { setDropdownOpen(false); navigate('/user-sources'); }}
                                        >
                                            <FaBook /> Sources
                                        </button>
                                    </li>
                                    <li><hr className="my-1 border-gray-200" /></li>
                                    <li>
                                        <button
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg gap-2"
                                            onClick={handleLogout}
                                        >
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar; 