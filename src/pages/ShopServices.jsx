import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Star, MapPin } from "lucide-react";
import axios from "axios";
import Footer from "../components/Footer";

export default function ShopServices() {

  const { shopId } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [search, setSearch] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SERVICES OF SHOP ================= */

  const fetchServices = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `https://servist.onrender.com/api/services/provider/${shopId}`
      );

      const data = res.data;

      setServices(data);
      setFilteredServices(data);

      if (data.length > 0) {
        setShopName(data[0].provider?.shopName || "Shop");
        setLocation(data[0].provider?.location || "");
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchServices();
  }, [shopId]);

  /* ================= SEARCH FILTER ================= */

  useEffect(() => {

    const filtered = services.filter(service =>
      service.title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredServices(filtered);

  }, [search, services]);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Shop Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            {shopName}
          </h1>

          <p className="flex items-center gap-2 text-gray-600 mt-2">
            <MapPin className="w-4 h-4" />
            {location}
          </p>

        </div>

        {/* Search */}

        <div className="bg-white p-4 rounded-xl shadow-sm mb-10 flex items-center gap-3">

          <Search className="w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search services in this shop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />

        </div>

        {/* Services Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading ? (
            <p>Loading services...</p>
          ) : filteredServices.length === 0 ? (
            <p>No services available.</p>
          ) : (

            filteredServices.map((service) => (

              <div
                key={service._id}
                onClick={() => navigate(`/booking/${service._id}`)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200 cursor-pointer"
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

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600">

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {service.rating || "4.5"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {service.duration} mins
                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      <Footer />

    </div>
  );
}