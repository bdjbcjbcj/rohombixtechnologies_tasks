import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { FaCode, FaPaintBrush, FaMobileAlt, FaServer } from "react-icons/fa";
import { FaTrophy, FaProjectDiagram, FaUsers, FaStar } from "react-icons/fa";
import Certification from "../Components/Certification";

/* ─── Data ─── */
const services = [
  {
    id: 1,
    icon: <FaCode />,
    title: "Web Development",
    description:
      "Building fast, scalable and responsive websites using modern technologies like React and MERN stack.",
    color: "from-orange-500/20 to-orange-500/5",
    border: "hover:border-orange-500/40",
    iconColor: "text-orange-400",
  },
  {
    id: 2,
    icon: <FaPaintBrush />,
    title: "UI/UX Design",
    description:
      "Designing clean and user-friendly interfaces with modern UI trends and smooth user experience.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "hover:border-violet-500/40",
    iconColor: "text-violet-400",
  },
  {
    id: 3,
    icon: <FaMobileAlt />,
    title: "Responsive Design",
    description:
      "Making websites fully responsive for mobile, tablet, and desktop devices.",
    color: "from-blue-500/20 to-blue-500/5",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
  },
  {
    id: 4,
    icon: <FaServer />,
    title: "Backend Development",
    description:
      "Creating secure and efficient backend systems using Node.js, Express, and MongoDB.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "hover:border-emerald-500/40",
    iconColor: "text-emerald-400",
  },
];

const achievements = [
  { icon: <FaProjectDiagram />, number: "90+",  label: "Projects Completed", target: 90,  suffix: "+" },
  { icon: <FaUsers />,          number: "140+", label: "Happy Clients",       target: 140, suffix: "+" },
  { icon: <FaTrophy />,         number: "5+",   label: "Years Experience",    target: 5,   suffix: "+" },
  { icon: <FaStar />,           number: "4.9",  label: "Client Rating",       target: 4.9, suffix: "", decimals: 1 },
];

/* ─── Reusable scroll reveal ─── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    const ctrl = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (node) node.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => ctrl.stop();
  }, [inView, target, suffix, decimals]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Gradient heading ─── */
function GradientHeading({ children, className = "" }) {
  return (
    <h1
      className={`font-bold text-center bg-gradient-to-r from-orange-400 to-violet-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h1>
  );
}

export default function Services() {
  const workRef = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-gray-900 text-white py-28 px-4 overflow-x-hidden">

      {/* ══ MY SERVICES ══ */}
      <FadeUp>
        <GradientHeading className="text-5xl mb-4">My Services</GradientHeading>
        {/* Animated divider */}
        <motion.div
          className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-violet-500 mb-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </FadeUp>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {services.map((service, i) => (
          <FadeUp key={service.id} delay={i * 0.1}>
            <motion.div
              className={`bg-gray-800 p-6 rounded-2xl shadow-lg border border-white/5 ${service.border} h-full cursor-pointer transition-colors duration-300`}
              whileHover={{
                y: -10,
                boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Icon with animated background */}
              <motion.div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${service.color} text-2xl ${service.iconColor}`}
                whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>

              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>

              {/* Bottom border reveal on hover */}
              <motion.div
                className={`h-0.5 mt-4 rounded-full bg-gradient-to-r from-orange-400 to-violet-500`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </FadeUp>
        ))}
      </div>

      {/* ══ MY WORK ══ */}
      <div className="mt-32">
        <FadeUp>
          <GradientHeading className="text-4xl mb-4">My Work</GradientHeading>
          <motion.div
            className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-violet-500 mb-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          />
        </FadeUp>

        <div className="flex flex-col md:flex-row items-center gap-14 max-w-7xl mx-auto">

          {/* Image with reveal + floating effect */}
          <motion.div
            ref={workRef}
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={workInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow behind image */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-violet-500/20 blur-xl" />
              <motion.img
                src="https://www.flexjobs.com/blog/wp-content/uploads/2025/04/What-Is-Freelancing-A-Complete-Guide-to-Freelance-Jobs.jpg"
                alt="Work"
                className="relative w-auto h-96 object-cover rounded-2xl shadow-xl"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            className="flex-1 text-gray-300 leading-relaxed text-lg"
            initial={{ opacity: 0, x: 60 }}
            animate={workInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated left accent bar */}
            <motion.div
              className="w-1 h-12 rounded-full bg-gradient-to-b from-orange-400 to-violet-500 mb-6"
              initial={{ scaleY: 0 }}
              animate={workInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ transformOrigin: "top" }}
            />

            <p className="mb-6">
              I have been working as a dedicated web developer for five years,
              delivering high-quality projects to clients worldwide. Alongside my
              development work, I actively engage in freelancing, helping businesses
              build modern, scalable, and user-friendly web applications.
            </p>

            {/* Hire Me button */}
            <motion.button
              className="relative px-4 py-4 rounded-full font-semibold text-white group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-violet-500 rounded-full"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ filter: "blur(6px)" }}
              />
              <span className="relative bg-gray-900 px-6 py-3 rounded-full inline-block">
                Hire Me
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ══ ACHIEVEMENTS ══ */}
      <div className="mt-28">
        <FadeUp>
          <GradientHeading className="text-3xl mb-4">Achievements</GradientHeading>
          <motion.div
            className="h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-violet-500 mb-14"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          />
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {achievements.map((item, i) => (
            <FadeUp key={item.label} delay={i * 0.1}>
              <motion.div
                className="bg-gray-800 p-6 rounded-2xl text-center shadow-lg border border-white/5 hover:border-orange-500/30 transition-colors duration-300 cursor-default"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 48px rgba(0,0,0,0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon with spin on hover */}
                <motion.div
                  className="text-4xl text-orange-400 mx-auto mb-4 w-fit"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-2xl font-bold text-white">
                  <Counter
                    target={item.target}
                    suffix={item.suffix}
                    decimals={item.decimals || 0}
                  />
                </h3>
                <p className="text-gray-400 text-sm mt-1">{item.label}</p>

                {/* Bottom shimmer line */}
                <motion.div
                  className="h-px mt-4 rounded-full bg-gradient-to-r from-orange-400/0 via-orange-400/60 to-orange-400/0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                />
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
      <Certification/>

    </section>
  );
}
