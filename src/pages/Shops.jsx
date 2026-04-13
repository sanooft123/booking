import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Shops() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(
    localStorage.getItem("userLocation")
  );

  // ✅ Fetch shops
  const fetchShops = async () => {
    try {
      setLoading(true);

      const storedCity = localStorage.getItem("userLocation");

      console.log("📍 Sending location:", storedCity);

      // ✅ Only send location if valid
      const url =
        storedCity && storedCity !== "Select Location"
          ? `https://servist.onrender.com/api/services/shops/${category}?location=${storedCity}`
          : `https://servist.onrender.com/api/services/shops/${category}`;

      const res = await fetch(url);
      const data = await res.json();

      console.log("🧾 Shops received:", data);

      setShops(data);
      setCity(storedCity);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load + category change
  useEffect(() => {
    fetchShops();
  }, [category]);

  // ✅ Auto update when location changes (IMPORTANT)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("🔄 Location changed → refreshing shops");
      fetchShops();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* ✅ Title */}
        <h1 className="text-3xl font-semibold mb-10">
          Shops {city && city !== "Select Location" && `in ${city}`}
        </h1>

        {/* 🔄 Loading */}
        {loading && (
          <p className="text-gray-500">Loading shops...</p>
        )}

        {/* ❌ No Shops */}
        {!loading && shops.length === 0 && (
          <p className="text-gray-500">
            No shops available in this location 😕
          </p>
        )}

        {/* ✅ Shops Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop._id}
              onClick={() => navigate(`/shop-services/${shop._id}`)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">
                {shop.shopName}
              </h3>

              <p className="text-gray-500 mt-2">
                📍 {shop.location || "Unknown"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Shops;