import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

const slideLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const slideRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/newsletter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEmail("");
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
    <section className="py-20 bg-blue-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -180,
                }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                }}
                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6"
              >
                <Mail size={32} />
              </motion.div>

              <motion.span
                variants={fadeUp}
                className="text-blue-600 font-semibold uppercase tracking-wider"
              >
                Newsletter
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="text-4xl font-bold mt-3"
              >
                Stay Updated with Travel Deals
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-gray-600 mt-5"
              >
                Subscribe to our newsletter and receive exclusive travel offers,
                holiday discounts and travel news.
              </motion.p>
            </motion.div>

            {/* Right */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                className="bg-gray-50 rounded-2xl p-8 shadow-md"
              >
                <motion.h3
                  variants={fadeUp}
                  className="text-2xl font-bold mb-6"
                >
                  Subscribe Now
                </motion.h3>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <motion.input
                    variants={fadeUp}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <motion.button
                    variants={fadeUp}
                    whileHover={{
                      scale: 1.03,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-2 disabled:bg-gray-400"
                  >
                    <Send size={18} />
                    {loading ? "Subscribing..." : "Subscribe"}
                  </motion.button>
                </form>

                <motion.p
                  variants={fadeUp}
                  className="text-sm text-gray-500 mt-5 text-center"
                >
                  We respect your privacy. No spam.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;