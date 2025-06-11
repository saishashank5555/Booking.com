import React, { useState, Suspense, lazy } from 'react';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { Link } from "react-router-dom";

const FeaturedSection = lazy(() => import('../home/FeaturedSection'));

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authUserType, setAuthUserType] = useState('user');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const openAuthModal = (mode, userType) => {
    setAuthMode(mode);
    setAuthUserType(userType);
    setIsAuthModalOpen(true);
  };

  // Dropdown structure
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
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 gap-4 xl:gap-8">
      <Link to="/" className="text-2xl font-bold text-blue-600 whitespace-nowrap mr-4">Resto.com</Link>
      {/* Spacer to push auth buttons to the right at md (768px), but not at lg (1024px) and above */}
      <div className="flex-1 md:hidden" />
      {/* Hamburger and auth buttons in a single flex row at md (768px) and lg (1024px), right-aligned, no duplication */}
      <div className="hidden md:flex xl:hidden items-center space-x-2 ml-auto">
        <Button onClick={() => openAuthModal('login', 'user')} className="bg-blue-600 border border-blue-600 text-white font-semibold hover:bg-blue-700 hover:border-blue-700 transition-colors px-4 py-2 rounded">Login</Button>
        <Button onClick={() => openAuthModal('login', 'partner')} className="bg-purple-600 border border-purple-600 text-white font-semibold hover:bg-purple-700 hover:border-purple-700 transition-colors px-4 py-2 rounded">Partner Login</Button>
        <button
          className="block flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Nav links: visible at xl (1280px) and above, flex-1 for spacing, prevent overlap, no scroll bar */}
      <div className="hidden xl:flex flex-1 flex-nowrap gap-2 min-w-0">
        {navItems.map((item, idx) => (
          item.dropdown ? (
            <div
              key={item.label}
              className="relative group navbar-dropdown"
              onMouseEnter={() => setDropdownOpen(idx)}
              onMouseLeave={(e) => {
                const relatedTarget = e.relatedTarget;
                if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                  setDropdownOpen(null);
                }
              }}
            >
              <button
                className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 whitespace-nowrap px-2"
                style={{ fontSize: 'clamp(0.8rem, 0.95vw, 1rem)' }}
              >
                <span>{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen === idx && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded shadow-lg z-10 transition-transform transition-opacity duration-300 ease-in-out transform opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-2"
                  onMouseEnter={() => setDropdownOpen(idx)}
                  onMouseLeave={(e) => {
                    const relatedTarget = e.relatedTarget;
                    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                      setDropdownOpen(null);
                    }
                  }}
                >
                  {item.dropdown.map((drop) => (
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
          ) : (
            <Link key={item.label} to={item.href} className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 whitespace-nowrap px-2" style={{ fontSize: 'clamp(0.8rem, 0.95vw, 1rem)' }}>
              <span>{item.icon}</span>
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          ))
        )}
      </div>
      {/* Auth buttons: always at top-right at xl (1280px) and above */}
      <div className="hidden xl:flex items-center space-x-2 ml-4 shrink-0">
        <Button onClick={() => openAuthModal('login', 'user')} className="bg-blue-600 border border-blue-600 text-white font-semibold hover:bg-blue-700 hover:border-blue-700 transition-colors px-4 py-2 rounded">Login</Button>
        <Button onClick={() => openAuthModal('login', 'partner')} className="bg-purple-600 border border-purple-600 text-white font-semibold hover:bg-purple-700 hover:border-purple-700 transition-colors px-4 py-2 rounded">Partner Login</Button>
      </div>
      {/* Hamburger menu: only visible below md (768px) */}
      <div className="flex-1 flex justify-end md:hidden">
        <button
          className="block flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100 ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
          style={{ marginLeft: '1rem' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
    {/* Mobile/Tablet Hamburger Menu (for <xl) */}
    {mobileMenuOpen && (
      <div className="xl:hidden bg-white border-t border-gray-200 shadow-lg absolute top-16 left-0 w-full z-50">
        {/* Nav links in hamburger at lg and below */}
        <div className="flex flex-col">
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
            ))
          )}
        </div>
        {/* Auth actions at bottom of hamburger menu, only show below md (mobile only) */}
        <div className="border-t border-gray-200 mt-2 pt-2 md:hidden">
          <Button
            onClick={() => { setMobileMenuOpen(false); openAuthModal('login', 'user'); }}
            className="w-full mb-2 bg-blue-600 border border-blue-600 text-white font-semibold hover:bg-blue-700 hover:border-blue-700 transition-colors px-4 py-2 rounded"
          >
            Login
          </Button>
          <Button
            onClick={() => { setMobileMenuOpen(false); openAuthModal('login', 'partner'); }}
            className="w-full bg-purple-600 border border-purple-600 text-white font-semibold hover:bg-purple-700 hover:border-purple-700 transition-colors px-4 py-2 rounded"
          >
            Partner Login
          </Button>
        </div>
      </div>
    )}
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      mode={authMode}
      userType={authUserType}
      onModeChange={setAuthMode}
      onUserTypeChange={setAuthUserType}
    />
  </nav>
  );
}

// Example: Render a carousel below the navbar, lazy loaded
export default function NavbarWithCarousel() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="w-full flex justify-center py-12">Loading featured content...</div>}>
        <FeaturedSection />
      </Suspense>
    </>
  );
}
