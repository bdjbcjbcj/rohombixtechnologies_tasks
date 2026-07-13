import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MobileMenu = ({ open, closeMenu }) => {
  return (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ${
        open ? "max-h-[500px]" : "max-h-0"
      }`}
    >
      <div className="border-t bg-white px-6 py-4 shadow-md">

        <div className="flex flex-col gap-2">

          <NavLinks mobile onClick={closeMenu} />

          <Link
            to="/login"
            onClick={closeMenu}
            className="mt-3 rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={closeMenu}
            className="rounded-lg border border-blue-600 px-5 py-3 text-center font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Register
          </Link>

        </div>

      </div>
    </div>
  );
};

export default MobileMenu;