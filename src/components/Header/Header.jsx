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
  console.log("userStatus", userStatus);
  console.log("adminStatus", adminStatus);

  // Navigation Items
  const navConfig = {
    guest: [
      { name: "Home", slug: "/" },
      { name: "About", slug: "/about" },
      { name: "Login", slug: "/login" },
      { name: "Signup", slug: "/signup" },
    ],
    user: [
      { name: "Home", slug: "/" },
      { name: "Products", slug: "/products" },
      { name: "Profile", slug: "/profile" },
    ],
    admin: [{ name: "Dashboard", slug: "/admin/dashboard" }],
  };

  const moreConfig = [
    { name: "About", slug: "/about", hideForAdmin: true },
    { name: "FAQ", slug: "/faq", hideForAdmin: true },
    { name: "Terms & Conditions", slug: "/terms", hideForAdmin: true },
    { name: "Optical News", slug: "/news", hideForAdmin: true },

    // Admin
    { name: "Manage Products", slug: "/admin/products", adminOnly: true },
    { name: "Manage Users", slug: "/admin/users", adminOnly: true },
    { name: "Manage Orders", slug: "/admin/orders", adminOnly: true },
    { name: "Manage News", slug: "/admin/news", adminOnly: true },
    { name: "Settings", slug: "/admin/settings", adminOnly: true },
  ];

  // Determine active nav
  const navItems = adminStatus
    ? navConfig.admin
    : userStatus
    ? navConfig.user
    : navConfig.guest;

  // Filter more menu based on role
  const moreNavItems = moreConfig.filter((item) => {
    if (item.adminOnly && !adminStatus) return false;
    if (item.hideForAdmin && adminStatus) return false;
    return true;
  });

  // Reusable Button Component
  const NavButton = ({ item, onClick }) => (
    <button
      onClick={() => onClick(item.slug)}
      className="px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 w-full text-left md:w-auto md:text-center"
    >
      {item.name}
    </button>
  );

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
          <span className="font-extrabold text-lg md:text-2xl bg-linear-to-br from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            VisionCraft
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden hover:text-blue-400 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavButton key={item.name} item={item} onClick={navigate} />
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="px-4 py-2 flex items-center gap-1 rounded-full hover:bg-blue-600 transition"
            >
              More <ChevronDown size={18} />
            </button>

            {moreOpen && (
              <ul className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {moreNavItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-700 last:border-0">
                    <NavButton
                      item={item}
                      onClick={(slug) => {
                        navigate(slug);
                        setMoreOpen(false);
                      }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(userStatus || adminStatus) && <LogoutBtn />}
          {userStatus && <ShoppingCartButton />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 pb-4 pt-2">
          <ul className="mt-4 space-y-3">
            {[...navItems, ...moreNavItems].map((item) => (
              <li key={item.name}>
                <NavButton
                  item={item}
                  onClick={(slug) => {
                    navigate(slug);
                    setIsOpen(false);
                  }}
                />
              </li>
            ))}

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