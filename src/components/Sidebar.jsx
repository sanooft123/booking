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
import { useState, useEffect } from "react";
import AuthDrawer from "../components/AuthDrawer";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const user = getUserFromToken();

  const [showAuth, setShowAuth] = useState(false);

  // ✅ LOCATION STATE
  const [city, setCity] = useState(
    localStorage.getItem("userLocation") || "Select Location"
  );

  const [loading, setLoading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  // 🔎 SEARCH STATE
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Sync on load
  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) setCity(saved);
  }, []);

  // ================= 📍 AUTO DETECT LOCATION =================
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

          localStorage.setItem("userLocation", cityName);
          setCity(cityName);
          setShowLocationModal(false);
        } catch (err) {
          console.error(err);
          alert("Failed to fetch location");
        }

        setLoading(false);
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  // ================= 🔎 SEARCH LOCATION =================
  const searchLocation = async (query) => {
    setSearch(query);

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= ✅ SELECT SEARCH =================
  const selectSearchLocation = (place) => {
    const cityName =
      place.address?.city ||
      place.address?.town ||
      place.address?.village ||
      place.display_name.split(",")[0];

    localStorage.setItem("userLocation", cityName);
    setCity(cityName);
    setShowLocationModal(false);
  };

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
      { name: "Bookings", path: "/manage-bookings", icon: <Calendar size={20} /> },
      { name: "Service", path: "/my-services", icon: <Calendar size={20} /> },
      { name: "Staff", path: "/manage-staff", icon: <Calendar size={20} /> },
      { name: "Profile", path: "/provider-profile", icon: <User size={20} /> }
    ];
  } else {
    menuItems = [
      { name: "Home", path: "/", icon: <Home size={20} /> },
      { name: "Bookings", path: "/my-bookings", icon: <Calendar size={20} /> },
      { name: "Profile", path: "/profile", icon: <User size={20} /> }
    ];
  }

  return (
    <>
      {/* ================= TOP NAV ================= */}
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-8 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl md:text-2xl font-bold text-indigo-600">
            <img src={logo} alt="" className="w-24 md:w-32" />
          </Link>

          {/* LOCATION */}
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
                className={`flex items-center gap-2 font-medium ${
                  isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
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

        {/* MOBILE LOCATION */}
        <div className="md:hidden">
          {(!user || user.role !== "provider") && (
            <div
              onClick={() => setShowLocationModal(true)}
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <MapPin size={16} />
              {loading ? "..." : city}
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
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

      {/* ================= LOCATION MODAL ================= */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">

            <h2 className="text-lg font-semibold mb-4">Select Location</h2>

            {/* 📍 AUTO DETECT */}
            <button
              onClick={detectLocation}
              className="w-full mb-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {loading ? "Detecting..." : "📍 Use Current Location"}
            </button>

            {/* 🔎 SEARCH */}
            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) => searchLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
            />

            {/* Suggestions */}
            <div className="max-h-40 overflow-y-auto">
              {suggestions.map((place, index) => (
                <div
                  key={index}
                  onClick={() => selectSearchLocation(place)}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {place.display_name}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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