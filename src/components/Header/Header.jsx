import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCartButton, LogoutBtn } from "../index.js";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const userStatus = useSelector((state) => state.auth.status);
  const adminStatus = useSelector((state) => state.adminAuth.status);

  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  //console.log("userStatus", userStatus);
  //console.log("adminStatus", adminStatus);

  // Guest Navigation
  const guestNavItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "Login", slug: "/login", active: !userStatus && !adminStatus },
    { name: "Signup", slug: "/signup", active: !userStatus && !adminStatus },
  ];

  // User Navigation
  const userNavItems = [
    { name: "Home", slug: "/", active: userStatus },
    { name: "Products", slug: "/products", active: userStatus },
    { name: "Profile", slug: "/profile", active: userStatus },
  ];

  // Admin Navigation
  const adminNavItems = [
    { name: "Dashboard", slug: "/admin/dashboard", active: adminStatus },
  ];

  // More Dropdown Items
  const moreNavItems = [
    { name: "About", slug: "/about", active: !adminStatus },
    { name: "FAQ", slug: "/faq", active: !adminStatus },
    { name: "Terms & Conditions", slug: "/terms", active: !adminStatus },
    { name: "Optical News", slug: "/news", active: !adminStatus },

    // Admin Items
    { name: "Manage Products", slug: "/admin/products", active: adminStatus },
    { name: "Manage Users", slug: "/admin/users", active: adminStatus },
    { name: "Manage Orders", slug: "/admin/orders", active: adminStatus },
    { name: "Manage News", slug: "/admin/news", active: adminStatus },
    { name: "Settings", slug: "/admin/settings", active: adminStatus },
  ];

  // Determine which navbar to show
  let navItems = guestNavItems;
  if (adminStatus) navItems = adminNavItems;
  else if (userStatus) navItems = userNavItems;

  return (
    <header className="bg-gray-900 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <nav className="flex items-center justify-between px-4 py-3 md:container md:mx-auto">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transform transition duration-300"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full shadow-md border-2 border-indigo-500 hover:scale-110 hover:shadow-lg transition duration-300"
          />

          <span className="font-extrabold text-lg md:text-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            VisionCraft
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden hover:text-blue-400 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(
            (item) =>
              item.active && (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className="px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  {item.name}
                </button>
              )
          )}

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="px-4 py-2 flex items-center gap-1 rounded-full hover:bg-blue-600 transition"
            >
              More <ChevronDown size={18} />
            </button>

            {moreOpen && (
              <ul className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {moreNavItems.map(
                  (item) =>
                    item.active && (
                      <li
                        key={item.name}
                        className="border-b border-gray-700 last:border-0"
                      >
                        <button
                          onClick={() => {
                            navigate(item.slug);
                            setMoreOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-blue-600 transition"
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}
              </ul>
            )}
          </div>

          {/* Auth Buttons */}
          {(userStatus || adminStatus) && <LogoutBtn />}
          {userStatus && (
            <div className="ml-2">
              <ShoppingCartButton />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 pb-4 pt-2">
          <ul className="mt-4 space-y-3">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* More items also appear on mobile */}
            {moreNavItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        setIsOpen(false);
                      }}
                      className="block w-full px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {(userStatus || adminStatus) && (
              <li className="mt-2">
                <LogoutBtn />
              </li>
            )}

            {userStatus && (
              <li className="mt-2">
                <ShoppingCartButton />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
