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
import { useState } from "react";
import AuthDrawer from "../components/AuthDrawer";

function Navbar() {
  const location = useLocation();
  const user = getUserFromToken();

  const [showAuth, setShowAuth] = useState(false);

  const [city, setCity] = useState(
    localStorage.getItem("userLocation") || "Select Location"
  );
  const [loading, setLoading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  let menuItems = [];

  if (!user) {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={20} /> },
      { name: "Services", path: "/services", icon: <Briefcase size={20} /> }
    ];
  } else if (user.role === "provider") {
    menuItems = [
      { name: "Dashboard", path: "/provider-dashboard", icon: <LayoutDashboard size={20} /> },
      { name: "Services", path: "/my-services", icon: <Briefcase size={20} /> },
      { name: "Manage Slots", path: "/provider/manage-availability", icon: <Calendar size={20} /> },
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
      {/* ================= DESKTOP NAV ================= */}
      <div className="hidden md:flex fixed top-0 left-0 w-full bg-white shadow z-50 px-8 py-4 items-center">

        {/* Logo */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-indigo-600">
            BookingApp
          </h1>
        </div>

        {/* Center Menu */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6">
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

          {/* Login/Register OR Logout */}
          {!user && (
          <button
            onClick={() => setShowAuth(true)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
          >
            <LogIn size={20} />
            Login
          </button>
        )}
        </div>

        {/* Location */}
        <div className="flex-1 flex justify-end">
          <div
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-700 text-sm bg-gray-50 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-gray-500" />
            {loading ? "Detecting..." : city}
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
                isActive ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}

        {!user && (
          <button
            onClick={() => setShowAuth(true)}
            className="flex flex-col items-center text-xs text-gray-500"
          >
            <LogIn size={20} />
            Login
          </button>
        )}
      </div>

      {/* ================= AUTH DRAWER ================= */}
      <AuthDrawer
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}

export default Navbar;