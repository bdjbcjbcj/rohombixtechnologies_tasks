import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

function Contact() {
  const [enquiryList, SetEnquiryList] = useState({});
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill all required fields!");
      return;
    }
    setLoading(true);
    axios.post("http://localhost:8040/api/website/enquiry/insert", formData)
      .then((res) => {
        toast.success("Enquiry saved Successfully");
        setFormData({ name: "", email: "", phone: "", message: "" });
        getAllEnquiry();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  let getAllEnquiry = () => {
    axios.get("http://localhost:8040/api/website/enquiry/view")
      .then((res) => res.data)
      .then((finalData) => {
        if (finalData.status) SetEnquiryList(finalData.EnquiryList);
      })
      .catch((err) => console.log(err));
  };

  let getValue = (e) => {
    let oldData = { ...formData };
    oldData[e.target.name] = e.target.value;
    setFormData(oldData);
  };

  useEffect(() => { getAllEnquiry(); }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-14">
      <ToastContainer />

      {/* Animated Heading */}
      <motion.h1
        className="text-5xl font-bold text-center my-7 bg-gradient-to-r from-blue-800 via-violet-500 to-orange-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Contact Us
      </motion.h1>

      {/* Animated Form Card */}
      <motion.div
        className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <motion.form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Name + Email Row */}
          <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeUp}>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={getValue}
              className="p-3 rounded-md bg-gray-700 text-white outline-none flex-1 focus:ring-2 focus:ring-blue-500 transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={getValue}
              className="p-3 rounded-md bg-gray-700 text-white outline-none flex-1 focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </motion.div>

          {/* Phone */}
          <motion.input
            type="text"
            name="phone"
            placeholder="Your Number"
            value={formData.phone}
            onChange={getValue}
            className="p-3 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
            variants={fadeUp}
          />

          {/* Message */}
          <motion.textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={getValue}
            className="p-3 rounded-md bg-gray-700 text-white outline-none h-32 resize-none focus:ring-2 focus:ring-blue-500 transition"
            required
            variants={fadeUp}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 py-3 rounded-md font-semibold transition ease-in-out duration-300 relative overflow-hidden"
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                Sending...
              </motion.span>
            ) : (
              "Send Message"
            )}
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Animated Contact Info */}
      <motion.div
        className="max-w-3xl mx-auto mt-12 text-center text-gray-400"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {[
          { label: "Email:", value: "zunairhafeez404@email.com" },
          { label: "Phone:", value: "+92 319 8608017" },
          { label: "Location:", value: "Sargodha, Pakistan" },
        ].map((item, i) => (
          <motion.p key={i} variants={fadeUp} custom={i}>
            {item.label}{" "}
            <span className="text-blue-500">{item.value}</span>
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

export default Contact;