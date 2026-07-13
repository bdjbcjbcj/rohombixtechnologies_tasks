import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Packages", path: "/packages" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavLinks = ({ mobile = false, onClick }) => {
  return (
    <>
      {links.map((link) => (
        <motion.div
          key={link.path}
          variants={
            !mobile
              ? {
                  hidden: { opacity: 0, y: -10 },
                  show: { opacity: 1, y: 0 },
                }
              : undefined
          }
          className="relative"
        >
          <NavLink
            to={link.path}
            onClick={onClick}
            className={({ isActive }) =>
              `relative ${
                mobile
                  ? "block py-3 text-lg"
                  : "text-sm font-medium"
              }
              ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }
              transition`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && !mobile && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>
      ))}
    </>
  );
};

export default NavLinks;