import { Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    id: 1,
    name: "John Anderson",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
    description:
      "John has over 15 years of experience in the travel industry and is passionate about helping people explore the world.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Travel Consultant",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
    description:
      "Sarah specializes in creating personalized travel itineraries and luxury vacation experiences.",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
    description:
      "Michael ensures every booking is handled efficiently, providing a smooth travel experience for our customers.",
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Customer Support Lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
    description:
      "Emily leads our 24/7 customer support team, making sure travelers receive assistance whenever they need it.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
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

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const TeamSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span
            variants={fadeUp}
            className="text-blue-600 font-semibold uppercase tracking-widest"
          >
            Our Team
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900 mt-3"
          >
            Meet the Travel Experts
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-gray-600 mt-4 max-w-3xl mx-auto"
          >
            Behind every unforgettable journey is a dedicated team of travel
            professionals committed to making your experience exceptional.
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariant}
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
              }}
              className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {member.name}
                </h3>

                <p className="text-blue-600 font-medium mt-1">
                  {member.role}
                </p>

                <p className="text-gray-600 mt-4 leading-7 text-sm">
                  {member.description}
                </p>

                {/* Social Icons */}
                <motion.div
                  variants={container}
                  className="flex gap-3 mt-6"
                >
                  {[
                    {
                      icon: <FaFacebookF size={18} />,
                      bg: "bg-blue-100",
                      text: "text-blue-600",
                      hover: "hover:bg-blue-600 hover:text-white",
                    },
                    {
                      icon: <FaTwitter size={18} />,
                      bg: "bg-sky-100",
                      text: "text-sky-600",
                      hover: "hover:bg-sky-600 hover:text-white",
                    },
                    {
                      icon: <FaLinkedinIn size={18} />,
                      bg: "bg-indigo-100",
                      text: "text-indigo-600",
                      hover: "hover:bg-indigo-600 hover:text-white",
                    },
                    {
                      icon: <Mail size={18} />,
                      bg: "bg-red-100",
                      text: "text-red-600",
                      hover: "hover:bg-red-600 hover:text-white",
                    },
                  ].map((social, index) => (
                    <motion.button
                      key={index}
                      variants={fadeUp}
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition ${social.bg} ${social.text} ${social.hover}`}
                    >
                      {social.icon}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-blue-600 rounded-3xl text-white p-10 lg:p-14 text-center"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold"
          >
            Passionate About Travel, Dedicated to You
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-blue-100 leading-7"
          >
            Our experienced team works tirelessly to design unforgettable
            travel experiences, ensuring every journey is seamless, enjoyable,
            and filled with lasting memories.
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
              className="mt-8 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
            >
              Meet Our Team
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;