import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DestinationSearch = ({
  searchTerm,
  setSearchTerm,
  totalResults,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md p-6 mb-10"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Search Input */}
        <motion.div
          className="relative flex-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            type="text"
            placeholder="Search destinations by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              >
                <X size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-center min-w-[180px]"
        >
          <p className="text-sm">Available Destinations</p>
          <AnimatePresence mode="wait">
            <motion.h3
              key={totalResults}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="text-2xl font-bold"
            >
              {totalResults}
            </motion.h3>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Search Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-gray-500 text-sm mt-4"
      >
        Search destinations like{" "}
        <span className="font-medium">
          Dubai, Paris, Maldives, Bali, Tokyo
        </span>
      </motion.p>
    </motion.div>
  );
};

export default DestinationSearch;