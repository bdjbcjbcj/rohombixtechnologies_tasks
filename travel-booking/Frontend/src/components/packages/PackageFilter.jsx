import { motion } from "framer-motion";

const PackageFilter = ({
  selectedPrice,
  setSelectedPrice,
}) => {
  const filters = [
    {
      label: "All",
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
      <motion.div
        className="flex flex-wrap items-center gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
      >
        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          className="text-lg font-semibold text-gray-800"
        >
          Filter by Price
        </motion.h3>

        {filters.map((filter) => {
          const isActive = selectedPrice === filter.value;

          return (
            <motion.button
              key={filter.value}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPrice(filter.value)}
              className={`relative px-5 py-2 rounded-full border overflow-hidden ${
                isActive
                  ? "text-white border-blue-600"
                  : "border-gray-300 hover:bg-blue-50 hover:border-blue-500"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activePackageFilter"
                  className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {filter.label}
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default PackageFilter;