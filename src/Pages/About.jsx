import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import zoni from "../assets/zoni.png";
import Skills from "../Components/Skills";

/* ─── Reusable scroll-reveal ─── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated gradient heading ─── */
function GradientHeading({ children, className = "" }) {
  return (
    <motion.h2
      className={`font-semibold text-center bg-gradient-to-r from-blue-600 via-violet-500 to-orange-500 bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  );
}

/* ─── Animated underline divider ─── */
function Divider({ delay = 0 }) {
  return (
    <motion.div
      className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-orange-400 mb-12"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
    />
  );
}

const whyCards = [
  {
    title: "Career Opportunities & Innovation",
    body: "High demand in tech industry for developers and engineers. Skills from both fields open doors to innovation and entrepreneurship.",
    icon: "🚀",
  },
  {
    title: "Strong Tech Foundation",
    body: "CS teaches algorithms, data structures, and problem-solving. Web development applies this knowledge to build real projects.",
    icon: "⚙️",
  },
  {
    title: "Creativity Meets Logic",
    body: "Web development lets you design interactive websites and apps. CS enhances logical thinking for efficient and scalable solutions.",
    icon: "🎨",
  },
];

export default function About() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-4 py-24 overflow-x-hidden">

      {/* ══ HEADING ══ */}
      <FadeUp>
        <motion.h1
          className="text-5xl font-bold text-center my-8 bg-gradient-to-r from-blue-600 via-violet-500 to-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          About Me
        </motion.h1>
        <Divider delay={0.2} />
      </FadeUp>

      {/* ══ HERO: IMAGE + BIO ══ */}
      <div
        ref={heroRef}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-24"
      >
        {/* Profile image — slide in from left */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Rotating ring */}
            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-orange-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ padding: 3 }}
            />
            {/* Static white gap ring */}
            <div className="absolute -inset-1 rounded-full bg-gray-900" />
            {/* Glow */}
            <div className="absolute -inset-4 rounded-full bg-blue-500/15 blur-xl" />
            <motion.img
              src={zoni}
              alt="Zunair - MERN Stack Developer"
              className="relative w-64 h-64 rounded-full object-cover border-4 border-gray-900 z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
            />
            {/* Badge */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              MERN Stack Developer
            </motion.div>
          </div>
        </motion.div>

        {/* Bio text — slide in from right */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 60 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-2xl font-semibold mb-5"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            I&apos;m Zunair{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 20, -8, 20, -4, 0] }}
              transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
            >
              👋
            </motion.span>
          </motion.h2>

          {/* Paragraphs stagger in */}
          {[
            {
              text: "I am a passionate MERN Stack Developer who loves building modern, responsive and user-friendly web applications. I enjoy solving problems and continuously learning new technologies.",
              color: "text-gray-300",
            },
            {
              text: "Currently, I am working on improving my backend skills and building full stack projects using MongoDB, Express, React and Node.js.",
              color: "text-gray-400",
            },
            {
              text: "My goal is to become a professional Website developer and work on real-world applications.",
              color: "text-gray-400",
            },
          ].map((para, i) => (
            <motion.p
              key={i}
              className={`${para.color} mb-4 leading-relaxed`}
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.55, ease: "easeOut" }}
            >
              {para.text}
            </motion.p>
          ))}

          {/* Quick info chips */}
          <motion.div
            className="flex flex-wrap gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            {["📍 Sargodha, Pakistan", "🎓 BS CS 2022–2026", "💼 Open to Work"].map((chip, i) => (
              <motion.span
                key={chip}
                className="text-xs bg-gray-800 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.75 + i * 0.08, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.08, borderColor: "rgba(139,92,246,0.5)" }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ══ SKILLS COMPONENT ══ */}
      <FadeUp className="mt-20">
        <Skills />
      </FadeUp>

      {/* ══ WHY CHOOSE US ══ */}
      <div className="mt-24">
        <GradientHeading className="text-3xl mb-3">Why Choose Us</GradientHeading>
        <Divider delay={0.15} />

        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto mb-20 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {whyCards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.12}>
              <motion.div
                className="bg-gray-900 px-10 py-12 flex flex-col gap-4 h-full border border-white/5 hover:border-violet-500/30 transition-colors duration-300"
                whileHover={{ backgroundColor: "rgba(139,92,246,0.05)", y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span
                  className="text-3xl"
                  whileHover={{ scale: 1.3, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {card.icon}
                </motion.span>
                <b className="text-white text-sm font-semibold">{card.title}</b>
                <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
                <motion.div
                  className="h-px bg-gradient-to-r from-blue-500/0 via-violet-500/50 to-orange-400/0 mt-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ══ EDUCATION ══ */}
      <div className="mt-16 max-w-4xl mx-auto">
        <GradientHeading className="text-3xl mb-3">Education</GradientHeading>
        <Divider delay={0.15} />

        <FadeUp delay={0.1}>
          <motion.div
            className="bg-gray-800 p-7 rounded-xl border border-white/5 relative overflow-hidden"
            whileHover={{ borderColor: "rgba(59,130,246,0.35)", y: -4 }}
            transition={{ type: "spring", stiffness: 280 }}
          >
            {/* Left accent bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-blue-500 via-violet-500 to-orange-400"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />

            <div className="pl-4">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <h3 className="text-xl font-bold text-white">BS Computer Science</h3>
                <motion.span
                  className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-full font-medium"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  In Progress
                </motion.span>
              </div>
              <p className="text-violet-400 text-sm mt-1 font-medium">
                Superior University Sargodha &nbsp;·&nbsp; 2022 – 2026
              </p>
              <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                Currently studying software development, data structures, and web technologies.
              </p>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Degree Progress</span>
                  <span>~85%</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-orange-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </FadeUp>
      </div>

    </div>
  );
}
