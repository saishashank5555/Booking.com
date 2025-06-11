import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/AuthContext';

export function UserNavbar() {
  const { user, setUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.navbar-dropdown')) {
        setDropdownOpen(null);
      }
    }
    if (dropdownOpen !== null) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // Helper to get user display name
  const getDisplayName = () => {
    if (!user) return '';
    if (user.displayName) return user.displayName;
    if (user.name) return user.name;
    if (user.email) return user.email.split('@')[0];
    return '';
  };

  const navItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    {
      label: 'Hotels', icon: '🏨', dropdown: [
        { label: 'Luxury Hotels', href: '/hotels/luxury' },
        { label: 'Budget Hotels', href: '/hotels/budget' },
        { label: 'Hotel Deals', href: '/hotels/deals' },
      ]
    },
    {
      label: 'Guest House', icon: '🏠', dropdown: [
        { label: 'Family Guest Houses', href: '/guest-house/family' },
        { label: 'Pet Friendly', href: '/guest-house/pet-friendly' },
      ]
    },
    {
      label: 'Service Apartments', icon: '🏢', dropdown: [
        { label: 'City View Apartments', href: '/service-apartments/city-view' },
        { label: 'Premium Suites', href: '/service-apartments/premium-suites' },
      ]
    },
    {
      label: 'Activities', icon: '🎯', dropdown: [
        { label: 'Adventure Tours', href: '/activities/adventure-tours' },
        { label: 'City Walks', href: '/activities/city-walks' },
      ]
    },
    { label: 'Coupons', href: '/coupons', icon: '🏷️' },
    { label: 'Bookings', href: '/bookings', icon: '📅' },
    {
      label: 'Account', icon: '👤', dropdown: [
        { label: 'Profile', href: '/user/profile' },
        { label: 'Settings', href: '/user/settings' },
      ]
    },
  ];

  // Only show Bookings and Account inline at md: and above
  const bookingsNavItem = navItems.find(item => item.label === 'Bookings');
  const accountNavItem = navItems.find(item => item.label === 'Account');
  // For mobile menu, filter out Bookings and Account at md: and above
  const mobileNavItems = window.innerWidth < 768
    ? navItems
    : navItems.filter(item => item.label !== 'Bookings' && item.label !== 'Account');

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 min-h-16">
        <div className="flex items-center space-x-4 w-full">
          <Link to="/dashboard" className="text-2xl font-bold text-blue-600">Resto.com</Link>
          {/* Inline nav: only Bookings and Account at md: and up */}
          <div className="hidden md:flex space-x-4 ml-6">
            {bookingsNavItem && (
              <Link to={bookingsNavItem.href} className="text-gray-700 hover:text-blue-600 flex items-center space-x-1">
                <span>{bookingsNavItem.icon}</span>
                <span>{bookingsNavItem.label}</span>
              </Link>
            )}
            {accountNavItem && (
              <div className="relative group navbar-dropdown">
                <button
                  className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
                  onClick={() => setDropdownOpen('account')}
                  onBlur={() => setDropdownOpen(null)}
                >
                  <span>{accountNavItem.icon}</span>
                  <span>{accountNavItem.label}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen === 'account' && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    {accountNavItem.dropdown.map((drop) => (
                      <Link
                        key={drop.label}
                        to={drop.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                        onClick={() => setDropdownOpen(null)}
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Show only user name, not email */}
          {user && <span className="text-gray-700 font-semibold max-w-[120px] truncate">{getDisplayName()}</span>}

          {/* when hovered, background color white text be red, border red-600 */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white border border-red-600 hover:bg-white hover:text-red-600 hover:border-red-600 px-2 py-1 rounded"
            type="button"
          >
            Logout
          </button>
          {/* Hamburger always visible at top-right */}
          <button
            className="flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100 ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu (all nav items, but Bookings/Account only on mobile) */}
      {mobileMenuOpen && (
        <div className="bg-white border-t border-gray-200 shadow-lg">
          {mobileNavItems.map((item, idx) => (
            item.dropdown ? (
              <div key={item.label} className="border-b border-gray-100 navbar-dropdown">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50"
                  onClick={() => setDropdownOpen(dropdownOpen === idx ? null : idx)}
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen === idx && (
                  <div className="pl-8 pb-2">
                    {item.dropdown.map((drop) => (
                      <Link
                        key={drop.label}
                        to={drop.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                        onClick={() => { setDropdownOpen(null); setMobileMenuOpen(false); }}
                      >
                        {drop.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-blue-100 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </Link>
            )
          ))}
          {/* Auth actions for mobile menu with signature colors */}
          <div className="border-t border-gray-200 mt-2 pt-2 flex flex-col gap-2 px-4 pb-4">
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/register'); }}
              className="bg-green-600 text-white border border-green-600 hover:bg-white hover:text-green-600 hover:border-green-600 px-2 py-1 rounded transition-colors"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate('/partner-login'); }}
              className="bg-purple-600 text-white border border-purple-600 hover:bg-white hover:text-purple-600 hover:border-purple-600 px-2 py-1 rounded transition-colors"
              type="button"
            >
              Partner Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
