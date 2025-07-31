import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartButton, Logo, LogoutBtn, SearchBar } from '../index.js';
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const userStatus = useSelector((state) => state.auth.status);
  const adminStatus = useSelector((state) => state.adminAuth.status);

  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Navigation items for different users
  const guestNavItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'About', slug: '/about', active: true },
    { name: 'Login', slug: '/login', active: true },
    { name: 'Signup', slug: '/signup', active: true }
  ];

  const userNavItems = [
    { name: 'Home', slug: '/', active: userStatus },
    { name: 'Products', slug: '/products', active: userStatus },
    { name: 'Profile', slug: '/profile', active: userStatus }
  ];

  const adminNavItems = [
    { name: 'Dashboard', slug: '/admin/dashboard', active: adminStatus },
  ];

  const moreNavItems = [
    { name: 'About', slug: '/about', active: !adminStatus },
    { name: 'FAQ', slug: '/faq', active: !adminStatus },
    { name: 'Terms & Conditions', slug: '/terms', active: !adminStatus },
    { name: 'Optical News', slug: '/news', active: !adminStatus },
    { name: 'Manage Products', slug: '/admin/products', active: adminStatus },
    { name: 'Manage Users', slug: '/admin/users', active: adminStatus },
    { name: 'Manage Orders', slug: '/admin/orders', active: adminStatus },
    { name: 'Manage News', slug: '/admin/news', active: adminStatus },
    { name: 'Settings', slug: '/admin/settings', active: adminStatus }
  ];

  let navItems = guestNavItems;
  if (userStatus) navItems = userNavItems;
  else if (adminStatus) navItems = adminNavItems;

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <nav className="flex items-center justify-between px-4 py-3 md:container md:mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo width="70px" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none md:hidden transition-colors duration-200 hover:text-blue-400"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Desktop SearchBar */}
          <SearchBar />

          {navItems.map(item => 
            item.active && (
              <button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                {item.name}
              </button>
            )
          )}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="px-4 py-2 flex items-center gap-1 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              More <ChevronDown size={18} />
            </button>
            {moreOpen && (
              <ul className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
                {moreNavItems.map(item =>
                  item.active && (
                    <li key={item.name} className="border-b border-gray-700 last:border-0">
                      <button
                        onClick={() => {
                          navigate(item.slug);
                          setMoreOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-blue-600 transition duration-150"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          {(userStatus || adminStatus) && (
            <button className="px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out">
              <LogoutBtn />
            </button>
          )}
          {userStatus && (
            <div className="ml-2">
              <ShoppingCartButton />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 pb-4 pt-2 shadow-lg transition-all duration-300">
          <SearchBar />
          <ul className="mt-4 space-y-3">
            {navItems.map(item => 
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {moreNavItems.map(item => 
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
                  >
                    {item.name}
                  </button>
                </li>
              )
            )}
            {(userStatus || adminStatus) && (
              <li>
                <div className="mt-2">
                  <LogoutBtn />
                </div>
              </li>
            )}
            {userStatus && (
              <li>
                <div className="mt-2">
                  <ShoppingCartButton />
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
