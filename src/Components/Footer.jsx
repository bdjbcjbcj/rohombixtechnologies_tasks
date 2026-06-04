import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email!");
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <div >
    <footer className="bg-gray-900 text-white mt-40 px-5">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-blue-500 mb-2">Zunair</h1>
          <p className="text-gray-400">
            MERN Stack Developer passionate about building modern web apps.They have cost Effective Open Source Tool.
          </p>
          <div className="flex gap-4 mt-4 justify-center md:justify-start text-xl">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaGithub /></a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaLinkedin /></a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link to="/projects" className="hover:text-blue-400 transition">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
          <p className="text-gray-400 mb-4">Get updates about my latest projects</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none flex-1"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition">
              Subscribe
            </button>
          </form>
          <div>
          <p className="  text-lg font-semibold mt-3">GET IN TOUCH</p>
          <ul className="flex flex-col gap-4 text-gray-500">
            <li>📞 +92 823 6492383</li>
            
          </ul>
        </div>
        </div>

      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-6" />

      {/* Bottom Section */}
      <div className="text-center text-gray-500 pb-4">
        © {new Date().getFullYear()} Zunair. All rights reserved.
      </div>
    </footer>
    </div>
  );
}

export default Footer;