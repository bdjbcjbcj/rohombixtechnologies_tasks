import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "./PackageCard";

const PackageGrid = ({ packages }) => {
  if (packages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center py-20"
      >
        <h2 className="text-3xl font-bold text-gray-700">
          No Packages Found
        </h2>

        <p className="text-gray-500 mt-3">
          Try searching with another package name or change the price filter.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <PackageCard pkg={pkg} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PackageGrid;