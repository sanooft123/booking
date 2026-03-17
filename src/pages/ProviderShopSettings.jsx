import { useEffect, useState } from "react";
import axios from "axios";

function ProviderShopSettings() {

  const token = localStorage.getItem("token");

  const [shopOpen, setShopOpen] = useState("");
  const [shopClose, setShopClose] = useState("");

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH PROVIDER ================= */

  const fetchProvider = async () => {
    try {

      const res = await axios.get(
        "https://servist.onrender.com/api/users/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShopOpen(res.data.shopOpen || "09:00");
      setShopClose(res.data.shopClose || "17:00");

    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FETCH SERVICES ================= */

  const fetchServices = async () => {
    try {

      const res = await axios.get(
        "https://servist.onrender.com/api/services/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setServices(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProvider();
    fetchServices();
  }, []);

  /* ================= UPDATE SHOP TIMING ================= */

  const saveTiming = async () => {

    try {

      setLoading(true);

      await axios.put(
        "https://servist.onrender.com/api/users/shop-timing",
        { shopOpen, shopClose },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Shop timing updated");

    } catch (error) {
      console.error(error);
    }

    setLoading(false);

  };

  /* ================= UPDATE SERVICE DURATION ================= */

  const updateDuration = async (serviceId, duration) => {

    try {

      await axios.put(
        `https://servist.onrender.com/api/services/${serviceId}/duration`,
        { duration },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

    } catch (error) {
      console.error(error);
      alert("Failed to update duration");
    }

  };

  const handleDurationChange = (index, value) => {

    const updated = [...services];
    updated[index].duration = value;
    setServices(updated);

  };

  return (

    <div className="min-h-screen bg-gray-50 pt-28 px-6 pb-20">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-semibold mb-10">
          Shop Settings
        </h1>

        {/* ================= SHOP TIMINGS ================= */}

        <div className="bg-white p-6 rounded-xl shadow mb-10">

          <h2 className="text-xl font-medium mb-6">
            Shop Timings
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 text-sm font-medium">
                Opening Time
              </label>

              <input
                type="time"
                value={shopOpen}
                onChange={(e)=>setShopOpen(e.target.value)}
                className="border w-full px-4 py-3 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Closing Time
              </label>

              <input
                type="time"
                value={shopClose}
                onChange={(e)=>setShopClose(e.target.value)}
                className="border w-full px-4 py-3 rounded-lg"
              />
            </div>

          </div>

          <button
            onClick={saveTiming}
            disabled={loading}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            {loading ? "Saving..." : "Save Timings"}
          </button>

        </div>

        {/* ================= SERVICE DURATIONS ================= */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-medium mb-6">
            Service Durations
          </h2>

          {services.length === 0 && (
            <p className="text-gray-500">No services found</p>
          )}

          <div className="space-y-4">

            {services.map((service, index)=>(
              
              <div
                key={service._id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >

                <div>
                  <h3 className="font-medium">
                    {service.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">

                  <input
                    type="number"
                    min="5"
                    value={service.duration || ""}
                    onChange={(e)=>
                      handleDurationChange(index, e.target.value)
                    }
                    onBlur={(e)=>
                      updateDuration(service._id, e.target.value)
                    }
                    className="border px-3 py-2 w-20 rounded-lg"
                  />

                  <span className="text-sm text-gray-500">
                    minutes
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProviderShopSettings;