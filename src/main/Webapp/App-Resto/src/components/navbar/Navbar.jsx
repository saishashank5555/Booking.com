import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaHotel,
  FaBuilding,
  FaUsers,
  FaTicketAlt,
  FaInfoCircle,
  FaPhoneAlt,
  FaRunning,
} from 'react-icons/fa';


import { useAuth } from '../context/AuthContext';
import MemberAvatarDropdown from '../member/MemberAvatarDropdown'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: 'Home', path: '/' },
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
    { name: 'Contact Us', path: '/contact' },
  ];

  const getIcon = (name) => {
    const iconMap = {
      Home: <FaHome className="mr-1 text-blue-500" />,
      Hotels: <FaHotel className="mr-1 text-blue-500" />,
      'Guest House': <FaUsers className="mr-1 text-green-500" />,
      'Service Apartments': <FaBuilding className="mr-1 text-purple-500" />,
      Activities: <FaRunning className="mr-1 text-orange-500" />,
      Coupons: <FaTicketAlt className="mr-1 text-pink-500" />,
      'Contact Us': <FaPhoneAlt className="mr-1 text-gray-500" />,
      'About Us': <FaInfoCircle className="mr-1 text-gray-500" />,
    };
    return iconMap[name] || null;
  };

  return (
    <nav className="bg-gray-200 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 space-x-5 flex justify-between items-center">
        {/* Logo */}
        <Link to={user ? "/member-home" : "/"} className="text-red-600 font-bold text-2xl flex items-center">
          Resto<span className="text-black">.com</span>
        </Link>

        {/* Desktop Navigation - only show if not logged in */}
        {!user && (
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex flex-row flex-nowrap items-center gap-2 xl:gap-4 2xl:gap-1 text-gray-700 text-sm font-medium w-full">
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
                        <Link to={item.path} className="flex items-center h-full">{item.name}</Link>
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
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-50 bg-white rounded-xl shadow-lg z-50 transition-all duration-200 ease-in transform ${hoveredItem === item.name
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
          </div>
        )}

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-2 relative ml-4">
          {user ? (
            <MemberAvatarDropdown />
          ) : (
            <>
              <button className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 text-sm transition-colors duration-150">
                Create Account
              </button>
              <button className="border border-black px-8 py-2 rounded-md hover:text-blue-700 text-sm transition-colors duration-150">
                Log in
              </button>

              {/* Join as Member Dropdown */}
              <div className="relative">
                <button
                  className="border border-black px-4 py-2 rounded-md hover:text-blue-700 text-sm flex items-center transition-colors duration-150"
                  onClick={() => setHoveredItem(hoveredItem === 'join' ? null : 'join')}
                  type="button"
                >
                  Join as Member
                  <svg
                    className={`ml-1 w-3 h-3 transition-transform duration-200 ${hoveredItem === 'join' ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {hoveredItem === 'join' && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
                    <ul className="py-2">
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                          onClick={() => {
                            setHoveredItem(null);
                            navigate('/login');
                          }}
                        >
                          Login
                        </button>
                      </li>
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg"
                          onClick={() => {
                            setHoveredItem(null);
                            navigate('/register');
                          }}
                        >
                          Register
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 shadow-lg space-y-4 w-full">
          {navItems.map((item) => (
            <div key={item.name} className="text-gray-800">
              {item.dropdown ? (
                <div className="">
                  <button
                    className="w-full flex items-center justify-between py-2 border-b focus:outline-none transition-colors duration-200 hover:bg-blue-50 rounded"
                    onClick={() => setHoveredItem(hoveredItem === item.name ? null : item.name)}
                    aria-expanded={hoveredItem === item.name}
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex items-center">{getIcon(item.name)}</span>
                      <span>{item.name}</span>
                    </span>
                    <svg
                      className={`ml-2 w-4 h-4 transform transition-transform duration-300 ${hoveredItem === item.name ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${hoveredItem === item.name ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ background: hoveredItem === item.name ? '#f8fafc' : 'transparent', borderRadius: '0.5rem' }}
                  >
                    <ul className="pl-6 py-2 space-y-1">
                      {item.dropdown.map((drop) => (
                        <li key={drop.label} className="w-full">
                          <Link
                            to={drop.path}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline py-1 px-2 rounded transition-colors duration-150"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span className="inline-block w-2"></span>{drop.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link to={item.path} className="flex items-center gap-2 py-2 border-b text-sm px-2 transition-colors duration-150 hover:bg-blue-50 rounded" onClick={() => setMenuOpen(false)}>
                  <span className="flex items-center">{getIcon(item.name)}</span>
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 border flex flex-col gap-2">
            <button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-150">
              Create Account
            </button>
            <button className="w-full border border-black py-2 rounded-md text-sm hover:text-blue-700 transition-colors duration-150">
              Log in
            </button>
            <div className="relative">
              <button
                className="w-full border border-black py-2 rounded-md text-sm flex items-center justify-between hover:text-blue-700 transition-colors duration-150"
                onClick={() => setHoveredItem(hoveredItem === 'join' ? null : 'join')}
                type="button"
              >
                <span>Join as Member</span>
                <svg className={`ml-1 w-3 h-3 transition-transform duration-200 ${hoveredItem === 'join' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {hoveredItem === 'join' && (
                <div className="absolute left-0 right-0 mt-2 w-full bg-white border rounded-xl shadow-lg z-50 animate-fade-in">
                  <ul className="py-2">
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-150" onClick={() => { setHoveredItem(null); navigate('/login'); }}>Login</button>
                    </li>
                    <li>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-150" onClick={() => { setHoveredItem(null); navigate('/register'); }}>Register</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
