"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

const Header = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/email", {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Subscribed Successfully!");
        setEmail("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Already Subscribed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl"></div>
      <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-8">

        {/* Navbar */}
       <nav className="flex items-center justify-between">
  <Image
    src={assets.logo}
    alt="Logo"
    width={180}
    className="w-36 md:w-44"
  />

  <div className="flex items-center gap-3">
    <Link
      href="/login"
      className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-black"
    >
      Log in
    </Link>

    <Link
      href="/register"
      className="hidden sm:inline-block rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-900 transition-all duration-300 hover:border-black hover:bg-gray-50"
    >
      Register
    </Link>

    <Link
      href="/admin"
      className="group flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 font-medium transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl"
    >
      Admin Panel
      <ArrowRight
        size={18}
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  </div>
</nav>

        {/* Hero Section */}
        <div className="text-center py-20 lg:py-28">

          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-indigo-700 font-medium mb-8">
            <Sparkles size={18} />
            Welcome to our Blog
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900">

            Discover Amazing
            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Stories & Ideas
            </span>

          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg text-gray-600 leading-8">
            Stay updated with the latest technology, startups, business,
            lifestyle, programming tutorials, and inspiring stories from
            industry experts.
          </p>

          {/* Subscribe Form */}

          <form
            onSubmit={handleSubscribe}
            className="mt-12 mx-auto max-w-2xl"
          >

            <div className="flex flex-col sm:flex-row items-center rounded-2xl bg-white p-2 shadow-2xl border border-gray-200">

              <div className="flex items-center w-full px-4">

                <Mail
                  className="text-gray-400 mr-3"
                  size={22}
                />

                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-4 outline-none text-gray-700 placeholder:text-gray-400"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto mt-2 sm:mt-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>

            </div>

          </form>

          <div className="mt-8 flex justify-center gap-8 text-gray-500">

            <div>
              <h3 className="text-3xl font-bold text-gray-900">500+</h3>
              <p>Articles</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900">50K+</h3>
              <p>Readers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900">120+</h3>
              <p>Authors</p>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;