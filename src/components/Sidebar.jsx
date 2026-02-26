import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogIn,
  UserPlus,
  Briefcase,
  Calendar,
  User,
  LogOut,
  Home,
  MapPin
} from "lucide-react";
import { getUserFromToken } from "../utils/auth";

function Navbar() {
  const location = useLocation();
  const user = getUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  let menuItems = [];

  if (!user) {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={20} /> },
      { name: "Services", path: "/services", icon: <Briefcase size={20} /> },
      { name: "Login", path: "/customer-login", icon: <LogIn size={20} /> },
      { name: "Register", path: "/customer-register", icon: <UserPlus size={20} /> }
    ];
  } else if (user.role === "provider") {
    menuItems = [
      { name: "Dashboard", path: "/provider-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Services", path: "/my-services", icon: <Briefcase size={20} /> },
      { name: "Bookings", path: "/my-bookings", icon: <Calendar size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> }
    ];
  } else {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={20} /> },
      { name: "Services", path: "/services", icon: <Briefcase size={20} /> },
      { name: "Bookings", path: "/my-bookings", icon: <Calendar size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> }
    ];
  }

  return (
    <>
      {/* ================= DESKTOP TOP NAV ================= */}
      <div className="hidden md:flex fixed top-0 left-0 w-full bg-white shadow z-50 px-8 py-4 items-center justify-between">

        <h1 className="text-xl font-bold text-indigo-600">
          BookingApp
        </h1>

        <div className="flex items-center gap-6 justify-center">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-2 font-medium transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 text-sm bg-gray-50">
              <MapPin className="w-4 h-4 text-gray-500" />
              New York, NY
            </div>
          </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-inner z-50 flex justify-around py-2">

        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Navbar;