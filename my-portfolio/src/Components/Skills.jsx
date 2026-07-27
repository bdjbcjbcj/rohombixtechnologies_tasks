import React from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiExpress } from "react-icons/si";

function Skills() {
  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-xl" /> },
    { name: "React", icon: <FaReact className="text-cyan-400 text-xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-xl" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400 text-xl" /> },
    { name: "Express.js", icon: <SiExpress className="text-white text-xl" /> },
  ];

  return (
    <section className="py-16 bg-gray-800 text-center">
      <h2 className="text-4xl font-semibold text-blue-500 mb-8">
        My Skills
      </h2>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transition duration-300 cursor-pointer"
          >
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;