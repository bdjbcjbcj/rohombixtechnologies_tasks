"use client";

import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Calendar, User, ArrowLeft, Clock, Link as LinkIcon, Check } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Blog {
  id?: number;
  _id?: string;
  title: string;
  description: string;
  image: string;
  author: string;
  author_img?: string;
  date?: string;
}

const Page = () => {
  const params = useParams();

  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const fetchBlogData = async () => {
    try {
      setLoading(true);

      // Check local blog
      const localBlog = blog_data.find(
        (item) => item.id.toString() === params.id
      );

      if (localBlog) {
        setData(localBlog as Blog);
        return;
      }

      // Fetch from MongoDB
      const response = await axios.get("/api/blog", {
        params: {
          id: params.id,
        },
      });

      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchBlogData();
    }
  }, [params?.id]);

  // Reading progress bar — tracks scroll through the article body
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [data]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const wordCount = data
    ? (data.description || "").trim().split(/\s+/).filter(Boolean).length + 260
    : 0;
  const readMins = Math.max(1, Math.round(wordCount / 200));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-[#F4F5F1]">
        <div className="w-10 h-10 rounded-full border-[3px] border-[#14171F]/15 border-t-[#245B49] animate-spin" />
        <p className="font-mono text-xs tracking-widest text-[#14171F]/50 uppercase">
          loading_article<span className="animate-pulse">_</span>
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F4F5F1] px-6 text-center">
        <p className="font-mono text-xs tracking-widest text-[#C1440E] uppercase mb-3">
          error 404
        </p>
        <h1 className="text-4xl font-serif font-semibold text-[#14171F]">
          Article not found
        </h1>
        <p className="mt-3 text-[#14171F]/60 max-w-sm">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#14171F] text-[#F4F5F1] px-6 py-3 rounded-full font-medium hover:bg-[#245B49] transition-colors"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Reading progress rail */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent">
        <div
          className="h-full bg-[#245B49] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="bg-[#F4F5F1] text-[#14171F] font-sans selection:bg-[#E8B94A]/40">
        {/* Navbar */}
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="shrink-0">
            <Image
              src={assets.logo}
              alt="Logo"
              width={150}
              className="w-32 md:w-40"
            />
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 border border-[#14171F]/15 px-5 py-2.5 rounded-full text-sm font-medium hover:border-[#14171F] transition-colors"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 pt-10 pb-12">
          {/* terminal-style meta strip — signature element */}
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-wide text-[#14171F]/55 border border-[#14171F]/12 bg-white/60 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#245B49]" />
            <span>{data.date || "latest"}</span>
            <span className="text-[#14171F]/25">/</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {readMins} min read
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.08] tracking-tight">
            {data.title}
          </h1>

          <div className="flex items-center gap-3 mt-8">
            <Image
              src={data.author_img || "/authorImg.png"}
              alt={data.author}
              width={44}
              height={44}
              className="rounded-full border border-[#14171F]/10 object-cover"
            />
            <div className="leading-tight">
              <p className="font-medium text-sm">{data.author}</p>
              <p className="text-xs text-[#14171F]/50">Contributing writer</p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-2xl border border-[#14171F]/8">
            <Image
              src={data.image}
              alt={data.title}
              width={1200}
              height={700}
              priority
              className="object-cover w-full"
            />
          </div>
        </div>

        {/* Article + share rail */}
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-[56px_1fr] gap-10">
          {/* Sticky share rail — desktop only */}
          <aside className="hidden md:block">
            <div className="sticky top-24 flex flex-col items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest text-[#14171F]/40 rotate-180 [writing-mode:vertical-lr] mb-1">
                SHARE
              </span>
              <button
                aria-label="Share on Facebook"
                className="w-10 h-10 rounded-full border border-[#14171F]/12 flex items-center justify-center text-[#14171F]/70 hover:bg-[#14171F] hover:text-white hover:border-[#14171F] transition-colors"
              >
                <FaFacebookF size={14} />
              </button>
              <button
                aria-label="Share on X"
                className="w-10 h-10 rounded-full border border-[#14171F]/12 flex items-center justify-center text-[#14171F]/70 hover:bg-[#14171F] hover:text-white hover:border-[#14171F] transition-colors"
              >
                <FaXTwitter size={14} />
              </button>
              <button
                aria-label="Share on LinkedIn"
                className="w-10 h-10 rounded-full border border-[#14171F]/12 flex items-center justify-center text-[#14171F]/70 hover:bg-[#14171F] hover:text-white hover:border-[#14171F] transition-colors"
              >
                <FaLinkedinIn size={14} />
              </button>
              <button
                aria-label="Copy link"
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-full border border-[#14171F]/12 flex items-center justify-center text-[#14171F]/70 hover:bg-[#245B49] hover:text-white hover:border-[#245B49] transition-colors"
              >
                {copied ? <Check size={14} /> : <LinkIcon size={14} />}
              </button>
            </div>
          </aside>

          <div ref={articleRef}>
            <article className="max-w-none">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                Introduction
              </h2>
              <p className="text-[17px] leading-[1.75] text-[#14171F]/85 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:float-left first-letter:pr-3 first-letter:leading-[0.85] first-letter:text-[#245B49]">
                {data.description}
              </p>

              <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-12 mb-4">
                Why it matters
              </h2>
              <p className="text-[17px] leading-[1.75] text-[#14171F]/85">
                Every successful project starts with proper planning and clear
                goals. Whether you're learning web development, building a
                startup, or improving your skills, consistency and continuous
                learning are the keys to success.
              </p>

              <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-12 mb-4">
                Best practices
              </h2>
              <ul className="space-y-3">
                {[
                  "Write clean and maintainable code.",
                  "Use reusable components.",
                  "Keep your UI responsive.",
                  "Optimize images and performance.",
                  "Test before deployment.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.7] text-[#14171F]/85">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#E8B94A] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="font-serif text-2xl md:text-3xl font-semibold mt-12 mb-4">
                Conclusion
              </h2>
              <p className="text-[17px] leading-[1.75] text-[#14171F]/85">
                Technology evolves rapidly, so keep learning and building real
                projects. Every project helps improve your experience and
                prepares you for larger challenges.
              </p>
            </article>

            {/* Mobile share row */}
            <div className="md:hidden border-t border-[#14171F]/10 mt-14 pt-8">
              <p className="font-mono text-xs tracking-widest text-[#14171F]/40 uppercase mb-4">
                Share this article
              </p>
              <div className="flex gap-3">
                <button className="w-11 h-11 rounded-full bg-[#14171F] text-white flex items-center justify-center">
                  <FaFacebookF size={16} />
                </button>
                <button className="w-11 h-11 rounded-full bg-[#14171F] text-white flex items-center justify-center">
                  <FaXTwitter size={16} />
                </button>
                <button className="w-11 h-11 rounded-full bg-[#14171F] text-white flex items-center justify-center">
                  <FaLinkedinIn size={16} />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-11 h-11 rounded-full bg-[#245B49] text-white flex items-center justify-center"
                >
                  {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                </button>
              </div>
            </div>

            {/* Author card */}
            <div className="mt-16 bg-white/70 border border-[#14171F]/8 rounded-2xl p-7 flex items-center gap-5">
              <Image
                src={data.author_img || "/authorImg.png"}
                alt={data.author}
                width={64}
                height={64}
                className="rounded-full border border-[#14171F]/10 object-cover"
              />
              <div>
                <div className="flex items-center gap-2 text-[#14171F]/40 mb-1">
                  <User size={13} />
                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    Author
                  </span>
                </div>
                <h3 className="font-serif font-semibold text-xl">
                  {data.author}
                </h3>
                <p className="text-[#14171F]/60 text-sm mt-1.5 leading-relaxed">
                  Passionate writer sharing knowledge about technology,
                  programming, and modern web development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Page;