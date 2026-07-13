import { ArrowRight, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-sky-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <div className="grid lg:grid-cols-2 items-center">
            {/* Left Content */}
            <motion.div
              variants={slideLeft}
              className="p-10 lg:p-16"
            >
              <motion.span
                variants={fadeUp}
                className="inline-block bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-full mb-5"
              >
                ✈️ Start Your Journey Today
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                Ready for Your Next Adventure?
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-gray-600 leading-8"
              >
                Whether you're planning a relaxing beach vacation, an exciting
                adventure, or a family holiday, our travel experts are here to
                help you every step of the way.
              </motion.p>

              {/* Buttons */}
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
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
                  >
                    Explore Packages
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <Link to="/contact">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition"
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                variants={container}
                className="mt-10 space-y-4"
              >
                <motion.div
                  variants={fadeUp}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Call Us</p>
                    <p className="font-semibold text-gray-900">
                      +92 (319) 860-8017
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-semibold text-gray-900">
                      zunair404@travelworld.com
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              variants={slideRight}
              className="h-full overflow-hidden"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200"
                alt="Travel Adventure"
                className="w-full h-full object-cover min-h-[500px]"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;