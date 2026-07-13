import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

// =============================
// Animation Variants
// =============================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const contactItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const socialIcon = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =============================
  // Send Data to Backend
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);

        alert(data.message);

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
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
    <section className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <motion.div
        className="bg-blue-600 text-white py-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="mt-5 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            We'd love to hear from you. Whether you're planning your next trip
            or have questions about our travel packages, our team is ready to
            help.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Info */}

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >

            <motion.h2 variants={contactItem} className="text-3xl font-bold mb-8">
              Get In Touch
            </motion.h2>

            <div className="space-y-8">

              <motion.div variants={contactItem} className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Phone className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Phone
                  </h3>

                  <p className="text-gray-600">
                    +92 319 8608017
                  </p>
                </div>
              </motion.div>

              <motion.div variants={contactItem} className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Mail className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    zunair404@travelworld.com
                  </p>
                </div>
              </motion.div>

              <motion.div variants={contactItem} className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MapPin className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Address
                  </h3>

                  <p className="text-gray-600">
                    Main Boulevard, Lahore, Pakistan
                  </p>
                </div>
              </motion.div>

              <motion.div variants={contactItem} className="flex gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Clock className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl">
                    Office Hours
                  </h3>

                  <p className="text-gray-600">
                    Monday - Saturday
                  </p>

                  <p className="text-gray-600">
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Social Icons */}

            <motion.div variants={contactItem} className="mt-10">

              <h3 className="text-2xl font-semibold mb-4">
                Follow Us
              </h3>

              <motion.div
                className="flex gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
              >

                <motion.a
                  variants={socialIcon}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-blue-600 text-white p-3 rounded-full"
                >
                  <FaFacebookF />
                </motion.a>

                <motion.a
                  variants={socialIcon}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-pink-600 text-white p-3 rounded-full"
                >
                  <FaInstagram />
                </motion.a>

                <motion.a
                  variants={socialIcon}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-sky-500 text-white p-3 rounded-full"
                >
                  <FaTwitter />
                </motion.a>

                <motion.a
                  variants={socialIcon}
                  whileHover={{ scale: 1.15, rotate: -6 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="bg-blue-800 text-white p-3 rounded-full"
                >
                  <FaLinkedinIn />
                </motion.a>

              </motion.div>

            </motion.div>

          </motion.div>

          {/* Contact Form */}

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >

            <h2 className="text-3xl font-bold mb-8">
              Send a Message
            </h2>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-green-100 text-green-700 p-4 rounded-lg overflow-hidden"
                >
                  Message Sent Successfully!
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <motion.input
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <motion.textarea
                variants={fadeUp}
                whileFocus={{ scale: 1.01 }}
                rows="6"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
              ></motion.textarea>

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-2 disabled:bg-gray-400"
              >
                <motion.span
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={loading ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
                >
                  <Send size={18} />
                </motion.span>

                {loading ? "Sending..." : "Send Message"}
              </motion.button>

            </motion.form>

          </motion.div>

        </div>

        {/* Google Map */}

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >

          <h2 className="text-3xl font-bold text-center mb-8">
            Find Us
          </h2>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Contact;