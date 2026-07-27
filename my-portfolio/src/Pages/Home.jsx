import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, animate } from "framer-motion";
import { projects } from "../assets/assets.js";

import zoni from "../assets/zoni.png";
import Skills from "../Components/Skills.jsx";
import Testimonials from "./Testimonials.jsx";

/* ─── Reusable fade-up reveal wrapper ─── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) { if (node) node.textContent = Math.floor(v) + suffix; },
    });
    return () => controls.stop();
  }, [inView, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Animated skill bar ─── */
function SkillBar({ label, percent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <span className="font-semibold text-xl w-24 shrink-0">{label}</span>
      <div className="relative h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-orange-500 to-violet-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : {}}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-sm text-blue-400 w-10 text-right">{percent}%</span>
    </motion.div>
  );
}

export default function Home() {
  
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-center items-center text-center h-screen px-4 overflow-hidden">

        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        </motion.div>

        {/* Floating particles (CSS only) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/40"
              style={{ left: `${8 + i * 8}%`, top: `${20 + (i % 5) * 15}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>

        <motion.p
          className="text-sm tracking-widest text-blue-400 uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Hi, I&apos;m{" "}
          <motion.span
            className="text-blue-500 inline-block relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
          >
            Zunair
            {/* Underline draw */}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left", width: "100%" }}
            />
          </motion.span>{" "}
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 20, -8, 20, -4, 0] }}
            transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            👋
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          I&apos;m a MERN Stack Developer passionate about building modern web applications.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <motion.a
            href="#projects"
            className="bg-blue-500 px-6 py-2.5 rounded-lg text-white font-medium relative overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(59,130,246,0.4)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            View Projects
          </motion.a>

          <motion.a
            href="#contact"
            className="border border-white/40 px-6 py-2.5 rounded-lg font-medium"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.7)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {[0, 0.2, 0.4].map((d, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-blue-400"
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: d }}
            />
          ))}
        </motion.div>
      </section>

      {/* ── SKILLS COMPONENT ── */}
      <Skills />

      {/* ── SKILL LEVEL ── */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <FadeUp>
          <h1 className="text-4xl font-bold text-center text-blue-500 mb-12">
            Skills Level
          </h1>
        </FadeUp>

        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">

          {/* Profile image with reveal */}
          <FadeUp delay={0.1} className="flex-1 flex justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 blur-md" />
              <img
                src={zoni}
                alt="Profile"
                className="relative w-72 h-80 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </FadeUp>

          {/* Skill bars */}
          <div className="flex-1 flex flex-col gap-6">
            <FadeUp delay={0.15}>
              <p className="text-gray-200 text-lg leading-relaxed mb-4">
                I specialize in building modern, responsive and scalable web applications
                using MERN stack technologies. My focus is on clean UI, smooth user
                experience, and strong backend performance.
              </p>
            </FadeUp>
            <div className="flex flex-col gap-5">
              <SkillBar label="HTML"    percent={95} />
              <SkillBar label="CSS"     percent={80} />
              <SkillBar label="ReactJS"   percent={75} />
              <SkillBar label="NodeJS"  percent={60} />
              <SkillBar label="NextJS"  percent={70} />
              <SkillBar label="MongoDB" percent={65} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-gray-800/50">
        <div className="flex items-center justify-between text-center max-w-4xl mx-auto px-4">

          {[
            { target: 90,  label: "Projects Completed" },
            { target: 140, label: "Happy Clients" },
            { target: 5,   label: "Years Experience" },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && (
                <div className="h-16 w-px bg-gradient-to-b from-orange-500 to-violet-500 opacity-60" />
              )}
              <FadeUp delay={i * 0.15}>
                <motion.div
                  className="flex flex-col items-center cursor-default"
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <h2 className="text-3xl font-bold text-orange-400">
                    <Counter target={stat.target} suffix="+" />
                  </h2>
                  <p className="text-gray-400 text-xl mt-1">{stat.label}</p>
                </motion.div>
              </FadeUp>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-16 text-center px-4">
        <FadeUp>
          <h2 className="text-4xl font-semibold text-blue-500 mb-10">My Projects</h2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <FadeUp key={project.id} delay={i * 0.08}>
              <motion.div
                className="bg-gray-800 rounded-xl shadow-md overflow-hidden h-full"
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
                  borderColor: "rgba(59,130,246,0.3)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={project.img}
                    alt={project.title}
                    className="w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      <Testimonials/>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 bg-gray-800 text-center px-4">
        <FadeUp>
          <h2 className="text-3xl font-semibold text-blue-500 mb-8">Contact Me</h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <motion.form
            className="max-w-md mx-auto flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {["text", "email"].map((type, i) => (
              <motion.input
                key={type}
                type={type}
                placeholder={type === "text" ? "Your Name" : "Your Email"}
                className="p-3 rounded-lg bg-gray-700 outline-none border border-transparent text-white placeholder-gray-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileFocus={{ borderColor: "rgba(59,130,246,0.6)", backgroundColor: "#374151" }}
              />
            ))}

            <motion.textarea
              placeholder="Your Message"
              rows={4}
              className="p-3 rounded-lg bg-gray-700 outline-none border border-transparent text-white placeholder-gray-500 resize-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileFocus={{ borderColor: "rgba(59,130,246,0.6)", backgroundColor: "#374151" }}
            />

            <motion.button
              type="submit"
              className="bg-blue-500 py-3 rounded-lg font-medium text-white"
              whileHover={{ scale: 1.03, backgroundColor: "#2563eb", boxShadow: "0 8px 24px rgba(59,130,246,0.35)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </FadeUp>
      </section>

    </div>
  );
}
