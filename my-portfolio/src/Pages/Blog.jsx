import React from "react";
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaPenNib,
  FaStar,
  FaGithub,
} from "react-icons/fa";
import { SiDevdotto, SiMedium } from "react-icons/si";

const blogs = [
  {
    title: "How I Built a Full Stack Todo App",
    description:
      "I explain how I designed and built a full-stack Todo application using React and Node.js with CRUD functionality.",
    link: "https://github.com/bdjbcjbcj",
    platform: "GitHub",
    rating: 5,
    tags: ["React", "Node.js", "CRUD"],
  },
  {
    title: "Understanding React Hooks in Simple Way",
    description:
      "A beginner-friendly explanation of useState, useEffect and custom hooks with real-world examples.",
    link: "https://github.com/bdjbcjbcj",
    platform: "Dev.to",
    rating: 5,
    tags: ["React", "Hooks", "Frontend"],
  },
  {
    title: "My Journey as a Web Developer",
    description:
      "From HTML to Next.js — my journey through learning and building real-world projects.",
    link: "https://github.com/bdjbcjbcj",
    platform: "Medium",
    rating: 5,
    tags: ["Career", "Web Dev", "Growth"],
  },
  {
    title: "Weather App Using React JS",
    description:
      "Built a real-time weather app using OpenWeather API with dynamic UI and API integration.",
    link: "https://github.com/bdjbcjbcj",
    platform: "GitHub",
    rating: 4,
    tags: ["API", "React", "Weather"],
  },
  {
    title: "Room Management System with Next.js",
    description:
      "Full-stack room booking system with authentication, dashboard, and booking features.",
    link: "https://github.com/bdjbcjbcj",
    platform: "GitHub",
    rating: 5,
    tags: ["Next.js", "Full Stack", "Auth"],
  },
  {
    title: "Building Responsive UI with Tailwind CSS",
    description:
      "How I design modern responsive UI components using Tailwind CSS for real-world apps.",
    link: "https://github.com/bdjbcjbcj",
    platform: "GitHub",
    rating: 4,
    tags: ["Tailwind", "UI", "Frontend"],
  },
];

const platformIcon = (platform) => {
  switch (platform) {
    case "GitHub":
      return <FaGithub className="text-white" />;
    case "Dev.to":
      return <SiDevdotto className="text-white" />;
    case "Medium":
      return <SiMedium className="text-white" />;
    default:
      return <FaPenNib className="text-white" />;
  }
};

export default function Blogs() {
  return (
    <div className="py-24 px-6 bg-gray-900 min-h-screen text-center">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-500 mb-14 flex justify-center items-center gap-2"
      >
        <FaPenNib /> Blogs & Projects
      </motion.h2>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.06 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-blue-500/40 transition text-left border border-gray-700"
          >

            {/* Platform + Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {platformIcon(blog.platform)}
                {blog.platform}
              </div>

              {/* Stars */}
              <div className="flex text-yellow-400">
                {Array.from({ length: blog.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3">
              {blog.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4">
              {blog.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <a
              href={blog.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
            >
              Read More <FaExternalLinkAlt />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}