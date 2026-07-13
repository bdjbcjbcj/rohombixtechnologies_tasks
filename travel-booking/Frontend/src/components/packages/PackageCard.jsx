import { MapPin, Calendar, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PackageCard = ({ pkg }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          Popular
        </span>

        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{pkg.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>

        <div className="flex items-center gap-2 mt-3 text-gray-500">
          <MapPin size={18} />
          <span>{pkg.location}</span>
        </div>

        <div className="flex items-center justify-between mt-5 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{pkg.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{pkg.people}</span>
          </div>
        </div>

        <p className="mt-5 text-gray-600">{pkg.description}</p>

        <div className="flex justify-between items-center mt-8">
          <div>
            <p className="text-sm text-gray-500">Starting From</p>

            <h2 className="text-3xl font-bold text-blue-600">${pkg.price}</h2>
          </div>

          <Link to={`/packages/${pkg.id}`}>
            <motion.span
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Book Now
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;