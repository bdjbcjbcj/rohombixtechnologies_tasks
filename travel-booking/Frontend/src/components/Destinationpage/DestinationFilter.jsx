import { motion } from "framer-motion";

const DestinationFilter = ({ selectedPrice, setSelectedPrice }) => {
  const priceOptions = [
    {
      label: "All Prices",
      value: "all",
    },
    {
      label: "Under $800",
      value: "under800",
    },
    {
      label: "$800 - $1200",
      value: "800to1200",
    },
    {
      label: "Above $1200",
      value: "above1200",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md p-6 mb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Filter by Price
        </h3>

        <motion.div
          className="flex flex-wrap gap-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
        >
          {priceOptions.map((option) => {
            const isActive = selectedPrice === option.value;

            return (
              <motion.button
                key={option.value}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPrice(option.value)}
                className={`relative px-5 py-2 rounded-full border overflow-hidden ${
                  isActive
                    ? "text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-500"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePriceFilter"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {option.label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DestinationFilter;