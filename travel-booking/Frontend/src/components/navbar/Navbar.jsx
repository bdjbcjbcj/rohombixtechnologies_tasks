import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlaneDeparture } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg"
            : "bg-white/90 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <FaPlaneDeparture
              className="text-3xl text-blue-600"
            />

            <span className="text-2xl font-bold text-slate-800">
              TravelGo
            </span>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden items-center gap-8 lg:flex">
            <NavLinks />

            <Link
              to="/login"
              className="rounded-lg border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Register
            </Link>
          </nav>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="text-3xl text-slate-700 lg:hidden"
          >
            {open ? <HiX /> : <HiMenuAlt3 />}
          </button>

        </div>

        <MobileMenu
          open={open}
          closeMenu={() => setOpen(false)}
        />

      </header>
    </>
  );
};

export default Navbar;