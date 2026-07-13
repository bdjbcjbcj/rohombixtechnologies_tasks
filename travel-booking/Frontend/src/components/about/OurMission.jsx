import {
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const missionData = [
  {
    id: 1,
    title: "Our Mission",
    icon: <Target size={36} />,
    color: "bg-blue-100 text-blue-600",
    description:
      "Our mission is to make travel simple, affordable, and unforgettable by offering carefully curated travel packages, secure bookings, and exceptional customer service for every traveler.",
  },
  {
    id: 2,
    title: "Our Vision",
    icon: <Eye size={36} />,
    color: "bg-green-100 text-green-600",
    description:
      "We aspire to become one of the world's most trusted travel platforms, connecting people with incredible destinations while promoting sustainable and responsible tourism.",
  },
  {
    id: 3,
    title: "Our Values",
    icon: <HeartHandshake size={36} />,
    color: "bg-orange-100 text-orange-600",
    description:
      "Integrity, transparency, innovation, customer satisfaction, and passion for travel are the values that guide every decision we make and every journey we help create.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const OurMission = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-600 font-semibold uppercase tracking-widest"
          >
            Mission & Vision
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Driven by Passion, Guided by Purpose
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-3xl mx-auto"
          >
            We believe travel changes lives. Every destination, every journey,
            and every customer inspires us to provide memorable experiences with
            trusted services and outstanding value.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {missionData.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotate: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-2xl"
            >
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                }}
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${item.color}`}
              >
                {item.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="mt-16 bg-blue-600 rounded-3xl p-10 lg:p-14 text-center text-white"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold"
          >
            Every Journey Begins with Trust
          </motion.h3>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="mt-4 max-w-2xl mx-auto text-blue-100"
          >
            From planning your vacation to returning home with unforgettable
            memories, we're committed to providing a seamless and enjoyable
            travel experience every step of the way.
          </motion.p>

          <Link to="/packages">
            <motion.button
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Start Your Journey
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;