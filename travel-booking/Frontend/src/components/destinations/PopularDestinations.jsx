import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    description:
      "Experience the romance, art, and culture of the City of Light.",
    price: 999,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Dubai",
    country: "United Arab Emirates",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    description:
      "Luxury shopping, modern architecture, and desert adventures await.",
    price: 899,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Maldives",
    country: "Maldives",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800",
    description:
      "Relax in overwater villas surrounded by crystal-clear waters.",
    price: 1499,
    rating: 5.0,
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
    description:
      "Discover tropical beaches, temples, and lush green landscapes.",
    price: 799,
    rating: 4.8,
  },
  {
    id: 5,
    name: "Istanbul",
    country: "Turkey",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800",
    description:
      "Explore historic mosques, bustling bazaars, and rich traditions.",
    price: 850,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
    description:
      "Enjoy breathtaking sunsets and stunning whitewashed villages.",
    price: 1199,
    rating: 4.9,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

const cardVariants = {
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

const PopularDestinations = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-600 font-semibold uppercase tracking-widest"
          >
            Top Destinations
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Popular Destinations
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Explore the world's most loved travel destinations and create
            unforgettable memories with our exclusive travel packages.
          </motion.p>
        </motion.div>

        {/* Destination Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
            >
              <DestinationCard destination={destination} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link to="/destinations">
            <motion.button
              whileHover={{
                scale: 1.08,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
            >
              View All Destinations
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularDestinations;