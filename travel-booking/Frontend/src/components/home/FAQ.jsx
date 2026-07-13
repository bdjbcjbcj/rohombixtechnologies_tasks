import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const faqs = [
  {
    id: 1,
    question: "How can I book a travel package?",
    answer:
      "Simply browse our travel packages, choose your preferred destination, click 'Book Now', fill in your details, and complete the payment process.",
  },
  {
    id: 2,
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes. You can cancel or modify your booking based on the cancellation policy associated with your selected package.",
  },
  {
    id: 3,
    question: "Do your packages include flights and hotels?",
    answer:
      "Most of our packages include flights, hotel accommodations, airport transfers, and selected sightseeing activities. Please check the package details before booking.",
  },
  {
    id: 4,
    question: "Are there any hidden charges?",
    answer:
      "No. We believe in transparent pricing. All applicable charges are displayed before you confirm your booking.",
  },
  {
    id: 5,
    question: "How do I contact customer support?",
    answer:
      "Our support team is available 24/7 via phone, email, and live chat to help you with bookings and travel-related questions.",
  },
  {
    id: 6,
    question: "Is my payment secure?",
    answer:
      "Yes. We use secure payment gateways and encrypted transactions to ensure your personal and payment information remains protected.",
  },
];

const container = {
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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const FAQ = () => {
  const [activeId, setActiveId] = useState(1);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-600 font-semibold uppercase tracking-wider"
          >
            Frequently Asked Questions
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Got Questions? We've Got Answers
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-600 mt-4"
          >
            Find answers to the most common questions about booking, payments,
            cancellations, and our travel services.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{
                    rotate: activeId === faq.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {activeId === faq.id ? (
                    <ChevronUp
                      size={22}
                      className="text-blue-600"
                    />
                  ) : (
                    <ChevronDown
                      size={22}
                      className="text-gray-500"
                    />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-14 bg-blue-600 rounded-3xl p-10 text-center text-white"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold"
          >
            Still Have Questions?
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 text-blue-100"
          >
            Our travel experts are available 24/7 to help you plan your perfect
            trip.
          </motion.p>

          <Link to="/contact">
            <motion.button
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-8 bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Contact Support
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;