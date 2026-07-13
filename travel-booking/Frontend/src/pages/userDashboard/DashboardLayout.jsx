import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  XCircle,
  CreditCard,
  LogOut,
} from "lucide-react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-700 text-white p-6 flex flex-col">
        <div>
          <h2 className="text-3xl font-bold mb-10">
            User Dashboard
          </h2>

          <nav className="space-y-3">
            <NavLink
              end
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-white text-blue-700"
                    : "hover:bg-blue-600"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/bookings"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-white text-blue-700"
                    : "hover:bg-blue-600"
                }`
              }
            >
              <CalendarDays size={20} />
              My Bookings
            </NavLink>

            <NavLink
              to="/dashboard/cancel-booking"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-white text-blue-700"
                    : "hover:bg-blue-600"
                }`
              }
            >
              <XCircle size={20} />
              Cancel Booking
            </NavLink>
            <NavLink
  to="/dashboard/payment-history"
  className={({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg ${
      isActive
        ? "bg-white text-blue-700"
        : "hover:bg-blue-600"
    }`
  }
>
  <CreditCard size={20} />
  Payment History
</NavLink>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;