import { MapPin, Star, Plane, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import destinations from "./destinationsData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const DestinationDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: `/destination-booking/${selectedDestination.id}`,
        },
      });
      return;
    }

    navigate(`/destination-booking/${selectedDestination.id}`);
  };
  // Find selected destination
  const selectedDestination = destinations.find(
    (item) => item.id === Number(id),
  );

  // If destination doesn't exist
  if (!selectedDestination) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto py-20 text-center"
      >
        <h1 className="text-4xl font-bold text-red-600">
          Destination Not Found
        </h1>

        <Link
          to="/destinations"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Destinations
        </Link>
      </motion.div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.img
          key={selectedDestination.id}
          src={selectedDestination.image}
          alt={selectedDestination.name}
          className="w-full h-[500px] object-cover"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-6 text-white w-full"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-5 py-3 rounded-lg mb-6 transition"
              >
                <ArrowLeft size={18} />
                Back
              </Link>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl font-bold">
              {selectedDestination.name}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-8 mt-5 text-lg"
            >
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                {selectedDestination.location}
              </div>

              <div className="flex items-center gap-2">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                {selectedDestination.rating}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Side */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold"
            >
              About {selectedDestination.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 mt-5 leading-8"
            >
              {selectedDestination.description}
            </motion.p>

            {/* Highlights */}
            <div className="mt-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-6"
              >
                Tour Highlights
              </motion.h3>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-5"
              >
                {[
                  "Luxury Accommodation",
                  "Professional Tour Guide",
                  "Airport Pickup & Drop",
                  "Breakfast Included",
                  "Free Wi-Fi",
                  "Sightseeing Tours",
                  "Photography Spots",
                  "24/7 Customer Support",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-green-600" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Gallery */}
            <div className="mt-14">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-6"
              >
                Gallery
              </motion.h3>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4 },
                      },
                    }}
                    className="overflow-hidden rounded-xl"
                  >
                    <motion.img
                      src={selectedDestination.image}
                      alt=""
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                      className="h-56 object-cover w-full"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 sticky top-24"
            >
              <h2 className="text-4xl font-bold text-blue-600">
                ${selectedDestination.price}
              </h2>

              <p className="text-gray-500 mb-6">Starting Price</p>

              <hr />

              <motion.div
                initial="hidden"
                animate="show"
                variants={staggerContainer}
                className="space-y-5 mt-6"
              >
                <motion.div variants={fadeUp} className="flex justify-between">
                  <span>Country</span>
                  <strong>{selectedDestination.country}</strong>
                </motion.div>

                <motion.div variants={fadeUp} className="flex justify-between">
                  <span>Rating</span>
                  <strong>{selectedDestination.rating} ⭐</strong>
                </motion.div>

                <motion.div variants={fadeUp} className="flex justify-between">
                  <span>Duration</span>
                  <strong>5 Days / 4 Nights</strong>
                </motion.div>

                <motion.div variants={fadeUp} className="flex justify-between">
                  <span>Best Season</span>
                  <strong>All Year</strong>
                </motion.div>

                <motion.div variants={fadeUp} className="flex justify-between">
                  <span>Guide</span>
                  <strong>Included</strong>
                </motion.div>
              </motion.div>

              {/* Book Now */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBookNow}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
                  className="flex"
                >
                  <Plane size={18} />
                </motion.span>
                Book Now
              </motion.button>

              {/* Contact */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="mt-4 w-full border border-blue-600 text-blue-600 py-4 rounded-xl hover:bg-blue-50 flex justify-center font-semibold transition"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationDetails;