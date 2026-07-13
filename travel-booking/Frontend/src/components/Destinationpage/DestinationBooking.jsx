import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import destinations from "./destinationsData";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const DestinationBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const destination = destinations.find((item) => item.id === Number(id));

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    date: "",
  });

  const [loading, setLoading] = useState(false);

  if (!destination) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto py-20 text-center"
      >
        <h1 className="text-3xl font-bold text-red-600">
          Destination Not Found
        </h1>
      </motion.div>
    );
  }

  const totalPrice = destination.price * booking.travelers;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBooking((prev) => ({
      ...prev,
      [name]: name === "travelers" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({
          destination: destination.name,
          country: destination.country,
          location: destination.location,
          price: destination.price,
          totalPrice,

          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          travelers: booking.travelers,
          date: booking.date,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

   navigate("/payment", {
  state: {
    booking: {
      ...booking,
      _id: data.booking._id,
      totalPrice: totalPrice,
      destination: destination.name,
      country: destination.country,
      location: destination.location,
      price: destination.price,
    },
  },
});
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Destination Details */}

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.img
              variants={fadeUp}
              src={destination.image}
              alt={destination.name}
              className="w-full h-96 rounded-2xl object-cover shadow-lg"
            />

            <motion.h1 variants={fadeUp} className="text-4xl font-bold mt-6">
              {destination.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-500 mt-2">
              {destination.location}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mt-6 leading-8"
            >
              {destination.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="bg-white rounded-xl shadow p-6 mt-8"
            >
              <h3 className="text-2xl font-semibold mb-4">Tour Details</h3>

              <div className="space-y-3">
                <p>
                  <strong>Country:</strong> {destination.country}
                </p>

                <p>
                  <strong>Rating:</strong> ⭐ {destination.rating}
                </p>

                <p>
                  <strong>Duration:</strong> 5 Days / 4 Nights
                </p>

                <p>
                  <strong>Price Per Person:</strong> ${destination.price}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Form */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Book Your Destination</h2>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
            >
              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={booking.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={booking.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={booking.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="date"
                name="date"
                required
                value={booking.date}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="number"
                name="travelers"
                min="1"
                value={booking.travelers}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <motion.div
                variants={fadeUp}
                layout
                className="bg-blue-50 border border-blue-200 rounded-xl p-5"
              >
                <h3 className="text-xl font-bold text-blue-700">
                  Booking Summary
                </h3>

                <div className="mt-3 space-y-2">
                  <p>
                    Destination:
                    <strong> {destination.name}</strong>
                  </p>

                  <p>
                    Travelers:
                    <AnimatePresence mode="wait">
                      <motion.strong
                        key={booking.travelers}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block ml-1"
                      >
                        {booking.travelers}
                      </motion.strong>
                    </AnimatePresence>
                  </p>

                  <p>
                    Price Per Person:
                    <strong> ${destination.price}</strong>
                  </p>

                  <hr />

                  <p className="text-2xl font-bold text-green-600">
                    Total: $
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={totalPrice}
                        initial={{ opacity: 0, y: -8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="inline-block"
                      >
                        {totalPrice}
                      </motion.span>
                    </AnimatePresence>
                  </p>
                </div>
              </motion.div>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold transition"
              >
                {loading ? "Booking..." : "Proceed to Payment"}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DestinationBooking;