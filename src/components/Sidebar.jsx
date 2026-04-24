import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  LogIn,
  Briefcase,
  Calendar,
  User,
  Home,
  MapPin,
  ShoppingCart,
  Search,
  ChevronDown
} from "lucide-react";
import { getUserFromToken } from "../utils/auth";
import { useState, useEffect } from "react";
import AuthDrawer from "../components/AuthDrawer";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const user = getUserFromToken();

  const [showAuth, setShowAuth] = useState(false);
  const [city, setCity] = useState(
    localStorage.getItem("userLocation") || "Select Location"
  );
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) setCity(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // ================= MENU BASED ON ROLE =================
  let menuItems = [];

  if (!user) {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={18} /> },
      { name: "Services", path: "/services", icon: <Briefcase size={18} /> }
    ];
  } else if (user.role === "provider") {
    menuItems = [
      { name: "Dashboard", path: "/provider-dashboard", icon: <LayoutDashboard size={18} /> },
      { name: "Bookings", path: "/manage-bookings", icon: <Calendar size={18} /> }
    ];
  } else {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={18} /> },
      { name: "Bookings", path: "/my-bookings", icon: <Calendar size={18} /> }
    ];
  }

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full bg-white border-b z-50">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-50 h-10 object-contain" />
            {/* <span className="text-xl font-bold text-indigo-600">Servist</span> */}
          </Link>

            {/* LOCATION */}
            <div className="hidden sm:flex items-center gap-1 text-sm cursor-pointer text-gray-600">
              <MapPin size={16} />
              {city}
            </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-6">


            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-4">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-1 text-sm ${
                      isActive ? "text-indigo-600 font-semibold" : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* CART */}
            {!user || user.role !== "provider" ? (
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white px-1 rounded-full">
                  2
                </span>
              </Link>
            ) : null}

            {/* LOGIN / PROFILE */}
            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAuth(true)}
                  className="text-sm text-gray-600 hover:text-indigo-600"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm"
                >
                  Signup
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 text-sm"
                >
                  <User size={18} />
                  <ChevronDown size={16} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>


      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50 flex justify-around py-2">

        {user?.role === "provider" ? (
          <>
            <Link
              to="/provider-dashboard"
              className={`flex flex-col items-center text-xs ${
                location.pathname === "/provider-dashboard"
                  ? "text-indigo-600 border-t-2 border-indigo-600 pt-1"
                  : "text-gray-500"
              }`}
            >
              <LayoutDashboard size={22} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/manage-bookings"
              className={`flex flex-col items-center text-xs ${
                location.pathname === "/manage-bookings"
                  ? "text-indigo-600 border-t-2 border-indigo-600 pt-1"
                  : "text-gray-500"
              }`}
            >
              <Calendar size={22} />
              <span>Bookings</span>
            </Link>

            <Link
              to="/provider-profile"
              className={`flex flex-col items-center text-xs ${
                location.pathname === "/provider-profile"
                  ? "text-indigo-600 border-t-2 border-indigo-600 pt-1"
                  : "text-gray-500"
              }`}
            >
              <User size={22} />
              <span>Profile</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className={`flex flex-col items-center text-xs ${
                location.pathname === "/"
                  ? "text-indigo-600 border-t-2 border-indigo-600 pt-1"
                  : "text-gray-500"
              }`}
            >
              <Home size={22} />
              <span>Home</span>
            </Link>

            <Link
              to="/my-bookings"
              className={`flex flex-col items-center text-xs ${
                location.pathname === "/my-bookings"
                  ? "text-indigo-600 border-t-2 border-indigo-600 pt-1"
                  : "text-gray-500"
              }`}
            >
              <Calendar size={22} />
              <span>Bookings</span>
            </Link>

            <Link
              to="/profile"
              className={`flex flex-col items-center text-xs ${
                location.pathname === "/profile"
                  ? "text-indigo-600 border-t-2 border-indigo-600 pt-1"
                  : "text-gray-500"
              }`}
            >
              <User size={22} />
              <span>Profile</span>
            </Link>
          </>
        )}

        {!user && (
          <button
            onClick={() => setShowAuth(true)}
            className="flex flex-col items-center text-xs text-gray-500"
          >
            <LogIn size={22} />
            <span>Login</span>
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