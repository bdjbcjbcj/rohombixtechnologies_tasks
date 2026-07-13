import {
  ShieldCheck,
  BadgeDollarSign,
  Headset,
  Globe2,
  Clock3,
  Plane,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={34} />,
    title: "Safe & Secure Booking",
    description:
      "Your personal information and payments are protected with secure booking and trusted payment gateways.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: <BadgeDollarSign size={34} />,
    title: "Best Price Guarantee",
    description:
      "Enjoy competitive pricing with no hidden fees and great value travel packages for every budget.",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    icon: <Headset size={34} />,
    title: "24/7 Customer Support",
    description:
      "Our travel specialists are available around the clock to help before, during, and after your trip.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    icon: <Globe2 size={34} />,
    title: "Worldwide Destinations",
    description:
      "Explore hundreds of carefully selected destinations across the globe with expertly planned itineraries.",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 5,
    icon: <Clock3 size={34} />,
    title: "Fast Booking Process",
    description:
      "Book your dream vacation in just a few minutes with our simple and user-friendly booking experience.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 6,
    icon: <Plane size={34} />,
    title: "Tailor-Made Packages",
    description:
      "Customize your trip with flexible travel packages designed around your schedule and preferences.",
    color: "bg-pink-100 text-pink-600",
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
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-600 font-semibold uppercase tracking-widest"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Why Thousands of Travelers Trust Us
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-3xl mx-auto"
          >
            We combine years of travel expertise with excellent customer
            service, transparent pricing, and carefully planned experiences to
            make every journey enjoyable and stress-free.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
                y: -12,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-2xl"
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
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${feature.color}`}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-sky-500 rounded-3xl p-10 lg:p-14 text-center text-white"
        >
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-3xl font-bold"
          >
            Your Dream Vacation Starts Here
          </motion.h3>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-blue-100"
          >
            Let us take care of the planning while you focus on creating
            unforgettable memories. Discover amazing destinations at the best
            prices today.
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link to="/packages">
              <motion.button
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold"
              >
                Explore Packages
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;