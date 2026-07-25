"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";
interface Social {
  label: string;
  href: string;
  icon: IconType;
}

interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  available: boolean;
  bio: string;
  socials: Social[];
}

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// Swap these for real values / pull from a CMS or env config
const PROFILE: Profile = {
  name: "Alex Rivera",
  role: "Writer & Full-Stack Developer",
  location: "Lahore, Pakistan",
  email: "hello@alexrivera.dev",
  phone: "+92 300 1234567",
  available: true,
  bio: "I write about web development, product design, and the occasional opinion on tabs vs. spaces. Open to freelance work and interesting conversations.",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: FaLinkedin,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      icon: FaXTwitter,
    },
  ],
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("sending");
    setError("");
    try {
      // Point this at your real endpoint, e.g. /api/contact
      await axios.post("/api/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14 text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          Get in touch
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
          Let&apos;s work together
        </h2>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          Questions, project ideas, or just want to say hello — the inbox is
          open.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* Personal info card */}
        <motion.div
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-8"
        >
          {/* Avatar + status */}
          <div className="mb-5 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-lg font-bold text-white flex items-center justify-center">
              {PROFILE.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {PROFILE.name}
              </h3>
              <p className="text-sm text-gray-500">{PROFILE.role}</p>
            </div>
          </div>

          {/* Signature: availability indicator */}
          <div className="mb-5 flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              {PROFILE.available && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                  PROFILE.available ? "bg-emerald-500" : "bg-gray-400"
                }`}
              />
            </span>
            <span className="text-xs font-medium text-gray-600">
              {PROFILE.available
                ? "Available for freelance work"
                : "Not currently available"}
            </span>
          </div>

          <p className="mb-6 text-sm leading-6 text-gray-600">{PROFILE.bio}</p>

          {/* Contact details */}
          <ul className="mb-6 space-y-3">
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Mail className="h-4 w-4" />
              </span>
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {PROFILE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Phone className="h-4 w-4" />
              </span>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {PROFILE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <MapPin className="h-4 w-4" />
              </span>
              {PROFILE.location}
            </li>
          </ul>

          {/* Socials */}
          <div className="flex gap-2 border-t border-gray-100 pt-5">
            {PROFILE.socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {status === "sent" ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-500" />
              <h3 className="text-xl font-bold text-gray-900">Message sent</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-500">
                Thanks for reaching out — expect a reply within a day or two.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me a bit about what you have in mind..."
                  required
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
