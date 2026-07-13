import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    country: "United Kingdom",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    rating: 5,
    review:
      "Our vacation was perfectly organized from start to finish. The hotel, flights, and sightseeing exceeded our expectations. Highly recommended!",
  },
  {
    id: 2,
    name: "Michael Brown",
    country: "Canada",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    rating: 5,
    review:
      "Booking was simple and the support team was available whenever we needed help. It was one of the best travel experiences we've had.",
  },
  {
    id: 3,
    name: "Emily Davis",
    country: "Australia",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    rating: 4,
    review:
      "Excellent value for money. The itinerary was well planned, and every destination was amazing. We'll definitely book again.",
  },
];

const stats = [
  { value: "15K+", label: "Happy Travelers" },
  { value: "120+", label: "Destinations" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Customer Satisfaction" },
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

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
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
            Testimonials
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            What Our Travelers Say
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Thousands of travelers trust us to create unforgettable journeys.
            Here's what some of our happy customers have to say.
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
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl"
            >
              {/* Rating */}
              <motion.div
                className="flex gap-1 mb-6"
                initial="hidden"
                whileInView="visible"
                variants={container}
              >
                {[...Array(item.rating)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      rotate: -180,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                      type: "spring",
                    }}
                  >
                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Review */}
              <motion.p
                variants={fadeUp}
                className="text-gray-600 leading-7 italic"
              >
                "{item.review}"
              </motion.p>

              {/* User */}
              <motion.div
                variants={fadeUp}
                className="flex items-center mt-8"
              >
                <motion.img
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {item.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.country}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{
                scale: 1.08,
              }}
            >
              <h3 className="text-4xl font-bold text-blue-600">
                {stat.value}
              </h3>

              <p className="mt-2 text-gray-600">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;