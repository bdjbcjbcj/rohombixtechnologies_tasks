import {
  Users,
  Globe,
  MapPinned,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    icon: <Users size={36} />,
    number: "15K+",
    title: "Happy Travelers",
    description:
      "Customers who trusted us for unforgettable travel experiences.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: <Globe size={36} />,
    number: "120+",
    title: "Destinations",
    description:
      "Beautiful destinations across Asia, Europe, America, and beyond.",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    icon: <MapPinned size={36} />,
    number: "500+",
    title: "Travel Packages",
    description:
      "Carefully designed holiday packages for every type of traveler.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    icon: <Award size={36} />,
    number: "10+",
    title: "Years Experience",
    description:
      "Providing trusted travel services with exceptional customer care.",
    color: "bg-purple-100 text-purple-600",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
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

const Statistics = () => {
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
            Our Achievements
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Numbers That Speak for Themselves
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-3xl mx-auto"
          >
            Every successful journey reflects our commitment to delivering
            memorable travel experiences with trusted service and exceptional
            value.
          </motion.p>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              whileHover={{
                y: -12,
                scale: 1.04,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-2xl"
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
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${item.color}`}
              >
                {item.icon}
              </motion.div>

              <h3 className="text-4xl font-bold text-gray-900">
                {item.number}
              </h3>

              <h4 className="text-xl font-semibold mt-3 text-gray-800">
                {item.title}
              </h4>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl text-white p-10 lg:p-14"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeUp}
                className="text-3xl font-bold"
              >
                Your Next Adventure Starts Here
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-blue-100 leading-7"
              >
                Join thousands of satisfied travelers who have explored the
                world's most beautiful destinations with us.
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 text-center"
            >
              {[
                ["98%", "Customer Satisfaction"],
                ["24/7", "Customer Support"],
                ["4.9★", "Average Rating"],
                ["100%", "Secure Booking"],
              ].map(([value, label], index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.08,
                    y: -5,
                  }}
                >
                  <h2 className="text-5xl font-bold">{value}</h2>
                  <p className="text-blue-100 mt-2">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;