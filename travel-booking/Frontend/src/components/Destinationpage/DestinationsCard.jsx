import { MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DestinationsCard = ({ destination }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.span
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full"
        >
          {destination.country}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow"
        >
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">
            {destination.rating}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {destination.name}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <MapPin size={18} />
          <span>{destination.location}</span>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-3">
          {destination.description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <h4 className="text-3xl font-bold text-blue-600">
              ${destination.price}
            </h4>
          </div>

          <Link to={`/destinations/${destination.id}`}>
            <motion.div
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition-colors"
            >
              View Details
              <motion.span
                variants={{ hover: { x: 4 } }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationsCard;