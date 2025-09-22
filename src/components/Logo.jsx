import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 hover:scale-105 transform transition duration-300"
    >
      {/* Logo Image with subtle glow */}
      <div className="relative">
        <img
          src={logo}
          alt="VisionCraft Logo"
          className="h-12 w-12 md:h-14 md:w-14 drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]"
        />
        {/* Optional pulsing dot for techy effect */}
        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      {/* Logo Text with Gradient */}
      <span className="font-extrabold text-xl md:text-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
        VisionCraft
      </span>
    </Link>
  );
};

export default Logo;
