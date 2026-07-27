import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";

import profile_icon from '../assets/profile_icon.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 left-0 z-50 backdrop-blur-lg bg-gradient-to-r from-gray-900/90 to-gray-800/90 shadow-lg border-b border-gray-700">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center  px-17 py-4">
        
        {/* 🔥 Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold shadow-md">
            Z
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Zunair
          </h1>
        </div>

        {/* 💻 Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-md font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`relative transition duration-300 ${
                  location.pathname === link.path
                    ? "text-blue-400"
                    : "text-white hover:text-blue-400"
                }`}
              >
                {link.name}
                {/* Active underline */}
                {location.pathname === link.path && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-400"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* 🍔 Hamburger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </div>
            {/* Social Icons */}
          
          
        
        <div className="flex items-center gap-5 text-xl ">
             <Link to={'/login'}>
           <button className="text-white  bg-blue-500 px-2 py-1 text-sm rounded cursor-pointer hover:bg-blue-700 transition ease-in-out duration-300 " >Sign In</button>
          </Link>
          <a
            href="https://github.com/bdjbcjbcj"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/zunairhafez"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 text-white"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 text-white"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    

      {/* 📱 Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="bg-gray-900/95 backdrop-blur-md flex flex-col items-center gap-6 py-6 text-lg">
          {navLinks.map((link, index) => (
            <li key={index} onClick={() => setMenuOpen(false)}>
              <Link
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? "text-blue-400"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;