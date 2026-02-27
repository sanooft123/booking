import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import AuthDrawer from "../components/AuthDrawer";

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const location = localStorage.getItem("selectedLocation") || "";

  /* ================= FETCH SERVICES ================= */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/api/services?category=${category}&location=${location}`
        );

        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category, location]);

  /* ================= FILTER SEARCH ================= */
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= HANDLE BOOK ================= */
  const handleBook = (serviceId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSelectedService(serviceId);
      setShowAuth(true);
    } else {
      navigate(`/booking/${serviceId}`);
    }
  };

  /* ================= AFTER LOGIN SUCCESS ================= */
  const handleAuthSuccess = () => {
    setShowAuth(false);

    if (selectedService) {
      navigate(`/booking/${selectedService}`);
      setSelectedService(null);
    }
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Loading services...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold capitalize">
          {category} Services
        </h1>
        <p className="mt-3 text-lg">
          Showing services in {location || "all locations"}
        </p>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* No Services */}
        {filteredServices.length === 0 && (
          <div className="text-center text-gray-500">
            No services available in this category.
          </div>
        )}

        {/* ================= SERVICE CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex"
            >
              {/* Image */}
              <div className="relative w-1/3 h-40 bg-gray-100">
                <img
                  src={service.image || "/default-service.jpg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = "/default-service.jpg")
                  }
                />

                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  ₹ {service.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 w-2/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {service.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {service.provider?.shopName || service.provider?.name}
                  </p>
                </div>

                <button
                  onClick={() => handleBook(service._id)}
                  className="mt-3 bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= AUTH DRAWER ================= */}
      <AuthDrawer
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default CategoryPage;