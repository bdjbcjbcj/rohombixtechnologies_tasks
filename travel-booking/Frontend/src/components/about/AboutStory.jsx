import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Trusted by over 15,000 happy travelers worldwide",
  "Affordable travel packages with no hidden charges",
  "Secure online booking and flexible payment options",
  "24/7 customer support before and during your trip",
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

const AboutStory = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Image */}
          <motion.div
            variants={slideLeft}
            className="relative"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900"
              alt="Travelers exploring the world"
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              animate={{
                y: [0, -8, 0],
              }}
              style={{
                animationDuration: "3s",
              }}
              className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-6 py-5"
            >
              <h3 className="text-4xl font-bold text-blue-600">10+</h3>

              <p className="text-gray-600 mt-1">
                Years of Travel Experience
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={slideRight}>
            <motion.span
              variants={fadeUp}
              className="text-blue-600 font-semibold uppercase tracking-widest"
            >
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold text-gray-900 mt-3 leading-tight"
            >
              Helping People Discover the World Since Day One
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mt-6 leading-8"
            >
              Our journey began with a simple mission: make travel easier,
              safer, and more affordable for everyone. What started as a small
              team of passionate travelers has grown into a trusted travel
              company serving thousands of customers around the world.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mt-5 leading-8"
            >
              Whether you're planning a relaxing beach holiday, an adventurous
              mountain trip, or an unforgettable international vacation, we
              carefully design every package to provide exceptional value and
              memorable experiences.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={container}
              className="mt-8 space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{
                    x: 8,
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={22}
                    className="text-blue-600 mt-1 flex-shrink-0"
                  />

                  <p className="text-gray-700">{feature}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              className="mt-10"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;