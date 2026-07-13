import {
  ShieldCheck,
  BadgeDollarSign,
  Headset,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    icon: <Plane size={34} />,
    title: "Worldwide Destinations",
    description:
      "Explore hundreds of carefully selected destinations across the globe with affordable travel packages.",
  },
  {
    id: 2,
    icon: <BadgeDollarSign size={34} />,
    title: "Best Price Guarantee",
    description:
      "We provide competitive prices with no hidden charges, ensuring the best value for your money.",
  },
  {
    id: 3,
    icon: <ShieldCheck size={34} />,
    title: "Safe & Secure Booking",
    description:
      "Book your flights, hotels, and holiday packages through our secure and trusted booking platform.",
  },
  {
    id: 4,
    icon: <Headset size={34} />,
    title: "24/7 Customer Support",
    description:
      "Our experienced travel experts are available around the clock to help you before and during your trip.",
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

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
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
            Why Choose Us
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            We Make Every Journey Special
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-600 mt-5 max-w-3xl mx-auto"
          >
            We are committed to providing unforgettable travel experiences with
            affordable prices, trusted services, and dedicated customer support.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.04,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center hover:shadow-2xl"
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
                className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6"
              >
                {feature.icon}
              </motion.div>

              <motion.h3
                variants={fadeUp}
                className="text-xl font-bold text-gray-900 mb-4"
              >
                {feature.title}
              </motion.h3>

              <motion.p
                variants={fadeUp}
                className="text-gray-600 leading-relaxed"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-blue-600 rounded-3xl p-10 lg:p-14 text-center text-white"
        >
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-3xl font-bold"
          >
            Ready for Your Next Adventure?
          </motion.h3>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-blue-100"
          >
            Let us help you plan your dream vacation with exclusive deals,
            premium accommodations, and unforgettable experiences.
          </motion.p>

          <Link to="/packages">
            <motion.button
              whileHover={{
                scale: 1.08,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Explore Packages
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;