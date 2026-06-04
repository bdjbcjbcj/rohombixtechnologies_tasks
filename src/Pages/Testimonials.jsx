import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    name: "Ali Raza",
    role: "Frontend Developer",
    rating: 5,
    message:
      "Working with you was amazing. Your React skills and attention to detail are impressive.",
  },
  {
    name: "Sara Khan",
    role: "UI/UX Designer",
    rating: 5,
    message:
      "Great collaboration! The project was delivered on time with excellent design quality.",
  },
  {
    name: "John Smith",
    role: "Project Manager",
    rating: 4,
    message:
      "Very professional and skilled developer. Highly recommended for web projects.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <div className="py-10 px-6 text-center bg-gray-900 min-h-screen">
      
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-500 mb-12"
      >
        Testimonials
      </motion.h2>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-blue-500/30 transition"
          >
            {/* Stars */}
            <div className="flex justify-center mb-3 text-yellow-400">
              {Array.from({ length: item.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Message */}
            <p className="italic text-gray-300 mb-5">
              "{item.message}"
            </p>

            {/* User */}
            <div className="flex items-center justify-center gap-2 text-white">
              <FaUserCircle className="text-xl text-blue-400" />
              <h4 className="font-semibold">{item.name}</h4>
            </div>

            <span className="text-sm text-gray-400">
              {item.role}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}