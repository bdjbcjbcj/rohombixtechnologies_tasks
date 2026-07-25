"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}
          <div>
            <Image
              src={assets.logo_light}
              alt="Blog Logo"
              width={170}
              className="mb-6"
            />

            <p className="text-gray-400 leading-7">
              Discover inspiring stories, programming tutorials, startup ideas,
              and technology news from writers around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blogs
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>Technology</li>
              <li>Startup</li>
              <li>Business</li>
              <li>Lifestyle</li>
            </ul>
          </div>

          {/* Social */}
          <div>

            <h3 className="text-white text-lg font-semibold mb-5">
              Follow Us
            </h3>

            <p className="text-gray-400 mb-6">
              Stay connected through our social media channels.
            </p>

            <div className="flex gap-4">

              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-sky-500 transition"
              >
                <FaTwitter size={20} />
              </a>

              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-blue-700 transition"
              >
                <FaLinkedinIn size={20} />
              </a>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Blogger. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center gap-2 rounded-full border border-gray-700 px-5 py-2 hover:bg-white hover:text-black transition"
          >
            Back to Top
            <ArrowUp size={18} />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;