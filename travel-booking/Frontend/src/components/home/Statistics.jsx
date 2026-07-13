import {
  Users,
  Globe,
  Hotel,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const statistics = [
  {
    id: 1,
    icon: <Users size={36} />,
    number: "15,000+",
    title: "Happy Travelers",
    description:
      "Satisfied customers who trusted us with their dream vacations.",
  },
  {
    id: 2,
    icon: <Globe size={36} />,
    number: "120+",
    title: "Destinations",
    description:
      "Amazing destinations across Asia, Europe, America, and more.",
  },
  {
    id: 3,
    icon: <Hotel size={36} />,
    number: "500+",
    title: "Partner Hotels",
    description:
      "Premium hotels and resorts offering comfort and luxury.",
  },
  {
    id: 4,
    icon: <Award size={36} />,
    number: "10+",
    title: "Years Experience",
    description:
      "Delivering unforgettable travel experiences worldwide.",
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
    <section className="py-20 bg-blue-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center text-white mb-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold"
          >
            Our Achievements
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-blue-100 max-w-2xl mx-auto"
          >
            We are proud to help thousands of travelers discover amazing
            destinations with trusted travel services.
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
          {statistics.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              whileHover={{
                y: -12,
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl"
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
                className="w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-6"
              >
                {item.icon}
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="text-4xl font-bold text-blue-600"
              >
                {item.number}
              </motion.h3>

              <motion.h4
                variants={fadeUp}
                className="text-xl font-semibold text-gray-900 mt-3"
              >
                {item.title}
              </motion.h4>

              <motion.p
                variants={fadeUp}
                className="text-gray-600 mt-3 leading-7"
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;