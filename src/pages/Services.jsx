import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Star, MapPin } from "lucide-react";
import axios from "axios";
import Footer from "../components/Footer";

export default function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const city = localStorage.getItem("userLocation");

  const categories = [
    { id: "all", name: "All Services" },
    { id: "cleaning", name: "Cleaning" },
    { id: "plumbing", name: "Plumbing" },
    { id: "electrical", name: "Electrical" },
    { id: "gardening", name: "Gardening" },
    { id: "carpentry", name: "Carpentry" },
  ];

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/services`,
        {
          params: {
            city,
            category: selectedCategory,
            search
          }
        }
      );

      setServices(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [selectedCategory, search, city]);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Services Near You
          </h1>
          <p className="text-gray-600 mt-2">
            Showing {services.length} services in {city}
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center flex-1 bg-gray-50 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-gray-100 transition">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Categories</h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-3 rounded-lg cursor-pointer transition ${
                    selectedCategory === category.id
                      ? "bg-indigo-100 text-indigo-600 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* Services Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <p>Loading services...</p>
            ) : services.length === 0 ? (
              <p>No services found in this location.</p>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-52 w-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full shadow text-sm font-semibold">
                      ₹{service.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {service.provider?.shopName}
                    </p>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {service.rating || 4.5}
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {service.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}