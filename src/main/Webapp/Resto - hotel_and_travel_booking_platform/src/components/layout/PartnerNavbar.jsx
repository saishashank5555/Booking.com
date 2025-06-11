import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../lib/AuthContext';

export function PartnerNavbar() {
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

  const navItems = [
    { label: 'Dashboard', href: '/partner/dashboard', icon: '📊' },
    {
      label: 'Properties', icon: '🏨', dropdown: [
        { label: 'My Properties', href: '/partner/properties' },
        { label: 'Add Property', href: '/partner/properties/add' },
      ]
    },
    {
      label: 'Bookings', icon: '📅', dropdown: [
        { label: 'All Bookings', href: '/partner/bookings' },
        { label: 'Reports', href: '/partner/dashboard/reports' },
      ]
    },
    { label: 'Settings', href: '/partner/settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link to="/partner/dashboard" className="text-2xl font-bold text-blue-600">Resto.com</Link>
          <div className="hidden lg:flex space-x-4">
            {navItems.map((item, idx) => (
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative group navbar-dropdown"
                  onMouseEnter={() => setDropdownOpen(idx)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <button
                    className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 laptop:text-sm laptop:px-2"
                    style={{ fontSize: 'clamp(0.85rem, 1vw, 1rem)' }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {dropdownOpen === idx && (
                    <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow-lg z-10">
                      {item.dropdown.map((drop) => (
                        <Link
                          key={drop.label}
                          to={drop.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-100 laptop:text-sm"
                          onClick={() => setDropdownOpen(null)}
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} to={item.href} className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 laptop:text-sm laptop:px-2" style={{ fontSize: 'clamp(0.85rem, 1vw, 1rem)' }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </div>
          {/* Hamburger for mobile and tablet */}
          <button
            className="lg:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100 ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{user?.email}</span>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </div>
      {/* Mobile menu (now for mobile and tablet) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          {navItems.map((item, idx) => (
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
        </div>
      )}
    </nav>
  );
}
