import React from "react";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";
import Bano from "../assets/Bano.jpeg";

export default function Certification() {
  return (
    <div className="py-16 px-6 bg-gray-900 min-h-screen text-center">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-orange-300 mb-12 flex justify-center items-center gap-2"
      >
        <FaCertificate /> Certifications
      </motion.h2>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
        className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700"
      >

        {/* Image */}
        <img
          src={Bano} 
          alt="Bano Qabil Certificate"
          className="w-full h-2/5 object-cover"
        />

        {/* Content */}
        <div className="p-6 text-left">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Web Development Course - Bano Qabil Sargodha
          </h3>

          <p className="text-gray-300 mb-4">
            Successfully completed a professional Web Development course from
            Bano Qabil Sargodha. Learned HTML, CSS, JavaScript, React.js and
            built multiple real-world projects including portfolio, e-commerce,
            and booking systems.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {["HTML", "CSS", "JavaScript", "React.js", "Next.js"].map(
              (skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-700 text-blue-300 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}