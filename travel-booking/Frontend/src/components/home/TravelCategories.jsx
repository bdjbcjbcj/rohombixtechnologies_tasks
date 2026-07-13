import {
  Umbrella,
  Mountain,
  Building2,
  Trees,
  Waves,
  Landmark,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    title: "Beach Holidays",
    description:
      "Relax on beautiful beaches with luxury resorts and crystal-clear waters.",
    icon: <Umbrella size={34} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Adventure Trips",
    description:
      "Experience hiking, trekking, camping, and thrilling outdoor adventures.",
    icon: <Mountain size={34} />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "City Tours",
    description:
      "Discover iconic landmarks, museums, shopping districts, and local culture.",
    icon: <Building2 size={34} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Nature Escapes",
    description:
      "Reconnect with nature through forests, lakes, waterfalls, and wildlife.",
    icon: <Trees size={34} />,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 5,
    title: "Cruise Vacations",
    description:
      "Enjoy unforgettable cruises with luxury accommodations and entertainment.",
    icon: <Waves size={34} />,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 6,
    title: "Historical Tours",
    description:
      "Visit famous monuments, ancient cities, and UNESCO World Heritage sites.",
    icon: <Landmark size={34} />,
    color: "bg-orange-100 text-orange-600",
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

const TravelCategories = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-600 font-semibold uppercase tracking-wider"
          >
            Travel Categories
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Find Your Perfect Travel Style
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Whether you're looking for relaxation, adventure, or cultural
            experiences, we have the perfect trip for every traveler.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.04,
                rotate: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-2xl"
            >
              {/* Icon */}
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
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${category.color}`}
              >
                {category.icon}
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="text-2xl font-semibold text-gray-900 mb-3"
              >
                {category.title}
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-gray-600 leading-7"
              >
                {category.description}
              </motion.p>

              <motion.button
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-6 text-blue-600 font-semibold"
              >
                Explore →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TravelCategories;