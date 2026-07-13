import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import packages from "./packagesData";

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

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pkg = packages.find((item) => item.id === Number(id));

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    date: "",
  });

  if (!pkg) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto py-20 text-center"
      >
        <h1 className="text-3xl font-bold">Package Not Found</h1>
      </motion.div>
    );
  }

  const totalPrice = pkg.price * booking.travelers;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", {
        state: {
          from: `/packages/${pkg.id}`,
        },
      });

      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/package-booking",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            packageName: pkg.name,
            location: pkg.location,
            price: pkg.price,
            totalPrice,

            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            travelers: booking.travelers,
            date: booking.date,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

       navigate("/payment", {
  state: {
    booking: {
      ...booking,
      _id: data.booking._id,
      totalPrice,
      packageName: pkg.name,
      location: pkg.location,
      price: pkg.price,
      image: pkg.image,
      duration: pkg.duration,
    },
  },
});
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Package */}
        <motion.div initial="hidden" animate="show" variants={staggerContainer}>
          <motion.img
            variants={fadeUp}
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-96 object-cover rounded-2xl"
          />

          <motion.h1 variants={fadeUp} className="text-4xl font-bold mt-6">
            {pkg.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-600 mt-4">
            {pkg.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 space-y-2">
            <p>
              <strong>Location:</strong> {pkg.location}
            </p>

            <p>
              <strong>Duration:</strong> {pkg.duration}
            </p>

            <p>
              <strong>Price Per Person:</strong> ${pkg.price}
            </p>
          </motion.div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="bg-white shadow-lg rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6">Book This Package</h2>

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
              placeholder="Full Name"
              required
              className="w-full border rounded-xl p-3"
              onChange={(e) =>
                setBooking({
                  ...booking,
                  name: e.target.value,
                })
              }
            />

            <motion.input
              variants={fadeUp}
              whileFocus={{ scale: 1.01 }}
              type="email"
              placeholder="Email"
              required
              className="w-full border rounded-xl p-3"
              onChange={(e) =>
                setBooking({
                  ...booking,
                  email: e.target.value,
                })
              }
            />

            <motion.input
              variants={fadeUp}
              whileFocus={{ scale: 1.01 }}
              type="tel"
              placeholder="Phone Number"
              required
              className="w-full border rounded-xl p-3"
              onChange={(e) =>
                setBooking({
                  ...booking,
                  phone: e.target.value,
                })
              }
            />

            <motion.input
              variants={fadeUp}
              whileFocus={{ scale: 1.01 }}
              type="date"
              required
              className="w-full border rounded-xl p-3"
              onChange={(e) =>
                setBooking({
                  ...booking,
                  date: e.target.value,
                })
              }
            />

            <motion.input
              variants={fadeUp}
              whileFocus={{ scale: 1.01 }}
              type="number"
              min="1"
              value={booking.travelers}
              className="w-full border rounded-xl p-3"
              onChange={(e) =>
                setBooking({
                  ...booking,
                  travelers: Number(e.target.value),
                })
              }
            />

            <motion.div
              variants={fadeUp}
              layout
              className="bg-gray-100 rounded-xl p-5"
            >
              <h3 className="text-xl font-bold">
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
              </h3>
            </motion.div>

            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Proceed to Payment
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageDetails;