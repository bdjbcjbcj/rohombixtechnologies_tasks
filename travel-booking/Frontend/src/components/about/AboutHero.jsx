import { Globe, Plane, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
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
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardVariant = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Content */}
          <motion.div variants={fadeUp}>
            <motion.span
              variants={fadeUp}
              className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              ✈️ About Our Company
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              Creating
              <span className="block text-yellow-300">
                Unforgettable Journeys
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg text-blue-100 leading-8 max-w-xl"
            >
              We help travelers discover incredible destinations, book
              unforgettable vacations, and create lifelong memories with
              affordable travel packages and exceptional customer service.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link to="/packages">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold"
                >
                  Explore Packages
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-6"
          >
            <motion.div
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <Globe size={28} />
              </div>

              <h3 className="text-3xl font-bold">120+</h3>

              <p className="text-gray-600 mt-2">
                Destinations Around the World
              </p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg mt-8"
            >
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-5">
                <Plane size={28} />
              </div>

              <h3 className="text-3xl font-bold">15K+</h3>

              <p className="text-gray-600 mt-2">
                Happy Travelers
              </p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.05,
              }}
              className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-5">
                <MapPinned size={28} />
              </div>

              <h3 className="text-3xl font-bold">500+</h3>

              <p className="text-gray-600 mt-2">
                Premium Hotels
              </p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-lg mt-8"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
                alt="Travel"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;