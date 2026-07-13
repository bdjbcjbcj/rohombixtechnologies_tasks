import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPlaneDeparture,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaShieldAlt,
  FaRegClock,
  FaPercent,
  FaWallet,
  FaChevronDown,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Icon aliases so the rest of the file (written against generic names)
// maps cleanly onto react-icons/fa
const Facebook = FaFacebookF;
const Instagram = FaInstagram;
const Twitter = FaTwitter;
const Linkedin = FaLinkedinIn;
const PlaneTakeoff = FaPlaneDeparture;
const MapPin = FaMapMarkerAlt;
const Phone = FaPhoneAlt;
const Mail = FaEnvelope;
const Send = FaPaperPlane;
const ShieldCheck = FaShieldAlt;
const Clock3 = FaRegClock;
const BadgePercent = FaPercent;
const Wallet = FaWallet;
const ChevronDown = FaChevronDown;
const Smartphone = FaMobileAlt;

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');";

const TRUST_ITEMS = [
  {
    icon: BadgePercent,
    title: "Best price guarantee",
    desc: "Found it cheaper? We'll match it.",
  },
  {
    icon: Clock3,
    title: "24/7 trip support",
    desc: "Real humans, any hour, any timezone.",
  },
  {
    icon: ShieldCheck,
    title: "Free cancellation",
    desc: "Plans change. Most bookings flex with you.",
  },
  {
    icon: Wallet,
    title: "Secure checkout",
    desc: "Encrypted payments, every booking.",
  },
];

const LINK_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Packages", to: "/packages" },
      { label: "Destinations", to: "/destinations" },
      { label: "Deals", to: "/deals" },
      { label: "Gift cards", to: "/gift-cards" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Partner with us", to: "/partners" },
      { label: "Affiliates", to: "/affiliates" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/help" },
      { label: "Contact us", to: "/contact" },
      { label: "Cancellation options", to: "/cancellations" },
      { label: "Trust & safety", to: "/trust-safety" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
];

const DESTINATIONS = [
  { flag: "🇫🇷", name: "Paris" },
  { flag: "🇯🇵", name: "Tokyo" },
  { flag: "🇦🇪", name: "Dubai" },
  { flag: "🇹🇭", name: "Bangkok" },
  { flag: "🇮🇹", name: "Rome" },
  { flag: "🇬🇷", name: "Santorini" },
];

const PAYMENT_BADGES = ["VISA", "MC", "AMEX", "PayPal", "GPay"];

function TicketDivider() {
  return (
    <div className="relative flex items-center py-1" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#0B1220] border border-[#1E293B] -ml-1.5" />
      <span className="flex-1 border-t border-dashed border-[#233047] mx-2" />
      <span className="h-3 w-3 rounded-full bg-[#0B1220] border border-[#1E293B] -mr-1.5" />
    </div>
  );
}

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer
      className="text-[#CBD5E1]"
      style={{ backgroundColor: "#0B1220", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{FONT_IMPORT}</style>

      {/* Boarding-pass style trust strip */}
      <div className="border-b border-[#1E293B]" style={{ backgroundColor: "#0F1B2E" }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "rgba(20,184,166,0.12)" }}
                >
                  <Icon size={18} style={{ color: "#2DD4BF" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {title}
                  </p>
                  <p className="text-xs mt-0.5 text-[#8095AD] leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter band */}
      <div className="border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3
                className="text-xl md:text-2xl font-semibold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Fare drops land in your inbox first.
              </h3>
              <p className="text-sm text-[#8095AD] mt-1">
                One email a week. No spam, unsubscribe anytime.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md items-stretch gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-lg px-4 py-3 text-sm text-white placeholder-[#5B6B82] outline-none border border-[#233047] focus:border-[#2DD4BF] transition"
                style={{ backgroundColor: "#0F1B2E" }}
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg px-4 py-3 text-sm font-semibold flex items-center gap-2 transition hover:brightness-110"
                style={{ backgroundColor: "#F2B807", color: "#0B1220" }}
              >
                <Send size={15} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
          {submitted && (
            <p className="text-xs mt-3" style={{ color: "#2DD4BF" }}>
              You're on the list — first deal lands soon.
            </p>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="text-2xl" style={{ color: "#2DD4BF" }} />
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                TravelGo
              </h2>
            </div>

            <p className="mt-4 leading-7 text-sm text-[#8095AD]">
              Discover breathtaking destinations, book unforgettable
              adventures, and explore the world with confidence.
            </p>

            <div className="space-y-3 mt-6 text-sm">
              <div className="flex gap-3 items-start">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#2DD4BF" }} />
                <p>Lahore, Pakistan</p>
              </div>
              <div className="flex gap-3 items-start">
                <Phone size={16} className="mt-0.5 shrink-0" style={{ color: "#2DD4BF" }} />
                <p>+92 300 1234567</p>
              </div>
              <div className="flex gap-3 items-start">
                <Mail size={16} className="mt-0.5 shrink-0" style={{ color: "#2DD4BF" }} />
                <p>support@travelgo.com</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-[#233047] transition hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h3
                className="text-sm font-semibold text-white mb-4 tracking-wide uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.04em" }}
              >
                {col.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="hover:text-[#2DD4BF] transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Destinations + app */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-semibold text-white mb-4 tracking-wide uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.04em" }}
            >
              Popular destinations
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 text-sm mb-6">
              {DESTINATIONS.map((d) => (
                <li key={d.name} className="flex items-center gap-2">
                  <span>{d.flag}</span>
                  <span className="hover:text-[#2DD4BF] transition cursor-pointer">
                    {d.name}
                  </span>
                </li>
              ))}
            </ul>

            <h3
              className="text-sm font-semibold text-white mb-3 tracking-wide uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.04em" }}
            >
              Get the app
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg border border-[#233047] px-3 py-2 text-xs hover:border-[#2DD4BF] transition"
              >
                <Smartphone size={16} style={{ color: "#2DD4BF" }} />
                <span>
                  <span className="block text-[10px] text-[#8095AD]">Download on the</span>
                  <span className="block font-semibold text-white">App Store</span>
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg border border-[#233047] px-3 py-2 text-xs hover:border-[#2DD4BF] transition"
              >
                <Smartphone size={16} style={{ color: "#2DD4BF" }} />
                <span>
                  <span className="block text-[10px] text-[#8095AD]">Get it on</span>
                  <span className="block font-semibold text-white">Google Play</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <TicketDivider />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <p className="text-xs text-[#5B6B82]">
            © {new Date().getFullYear()} TravelGo. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex gap-4 text-xs">
              <Link to="/privacy-policy" className="hover:text-[#2DD4BF] transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[#2DD4BF] transition">
                Terms & Conditions
              </Link>
              <Link to="/sitemap" className="hover:text-[#2DD4BF] transition">
                Sitemap
              </Link>
            </div>

            {/* language / currency */}
            <button className="flex items-center gap-1.5 text-xs rounded-md border border-[#233047] px-2.5 py-1.5 hover:border-[#2DD4BF] transition">
              <span>English</span>
              <span className="text-[#5B6B82]">/</span>
              <span>USD</span>
              <ChevronDown size={12} />
            </button>

            {/* payment badges */}
            <div className="flex items-center gap-2">
              {PAYMENT_BADGES.map((p) => (
                <span
                  key={p}
                  className="text-[10px] font-semibold px-2 py-1 rounded border border-[#233047] text-[#8095AD]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;