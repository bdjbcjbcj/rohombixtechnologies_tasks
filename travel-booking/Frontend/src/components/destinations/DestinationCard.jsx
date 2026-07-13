import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DestinationCard = ({ destination }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.5 }}
        />

        {/* Rating */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 250,
          }}
          className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg"
        >
          <Star
            size={16}
            className="text-yellow-500 fill-yellow-500"
          />
          <span className="font-medium">
            {destination.rating}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-gray-500 mb-2"
        >
          <MapPin size={18} />
          <span>{destination.country}</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {destination.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mt-3 leading-7"
        >
          {destination.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-center mt-6"
        >
          <div>
            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <motion.h4
              whileHover={{ scale: 1.08 }}
              className="text-2xl font-bold text-blue-600"
            >
              ${destination.price}
            </motion.h4>
          </div>

          <Link to="/destinations">
            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: "#1d4ed8",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
            >
              Explore →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;