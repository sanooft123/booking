import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogIn,
  Briefcase,
  Calendar,
  User,
  Home,
  MapPin
} from "lucide-react";
import { getUserFromToken } from "../utils/auth";
import { useState } from "react";
import AuthDrawer from "../components/AuthDrawer";
import logo from "../assets/logo.png"

function Navbar() {
  const location = useLocation();
  const user = getUserFromToken();

  const [showAuth, setShowAuth] = useState(false);
  const [city] = useState(
    localStorage.getItem("userLocation") || "Select Location"
  );
  const [loading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

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
      // { name: "Services", path: "/my-services", icon: <Briefcase size={20} /> },
      // { name: "Manage Slots", path: "/provider/manage-availability", icon: <Calendar size={20} /> },
      { name: "Bookings", path: "/manage-bookings", icon: <Calendar size={20} /> },
      { name: "Service", path: "/my-services", icon: <Calendar size={20} /> },
      { name: "Staff", path: "/manage-staff", icon: <Calendar size={20} /> },
      { name: "Profile", path: "/provider-profile", icon: <User size={20} /> }
    ];
  } else {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={20} /> },
      // { name: "Services", path: "/services", icon: <Briefcase size={20} /> },
      { name: "Bookings", path: "/my-bookings", icon: <Calendar size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> }
    ];
  }

  return (
    <>
      {/* ================= TOP NAV (ALL DEVICES) ================= */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-8 py-4 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-indigo-600"
          >
            <img src={logo} alt="" className="w-24 md:w-32" />
          </Link>

          {/* Location (Only for customer/guest) */}
          {(!user || user.role !== "provider") && (
            <div
              onClick={() => setShowLocationModal(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1 border rounded-full text-gray-700 text-sm bg-gray-50 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gray-500" />
              {loading ? "Detecting..." : city}
            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* MOBILE LOCATION SMALL */}
        <div className="md:hidden">
          {(!user || user.role !== "provider") && (
            <div
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <MapPin size={16} />
              {city}
            </div>
          )}
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