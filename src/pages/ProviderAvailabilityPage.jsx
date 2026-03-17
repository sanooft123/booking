import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

function ProviderAvailabilityPage() {

  const navigate = useNavigate();
  const user = getUserFromToken();
  const token = localStorage.getItem("token");

  const [shopOpen, setShopOpen] = useState("");
  const [shopClose, setShopClose] = useState("");
  const [loading, setLoading] = useState(false);

  /* Protect Route */

  useEffect(() => {
    if (!user || user.role !== "provider") {
      navigate("/");
    }
  }, [user, navigate]);

  /* Fetch Provider Settings */

  useEffect(() => {

    const fetchProvider = async () => {

      const res = await fetch(
        "https://servist.onrender.com/api/users/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      setShopOpen(data.shopOpen || "09:00");
      setShopClose(data.shopClose || "17:00");

    };

    fetchProvider();

  }, [token]);

  /* Save Shop Timing */

  const saveTiming = async () => {

    if (!shopOpen || !shopClose) {
      alert("Please select shop timings");
      return;
    }

    setLoading(true);

    await fetch(
      "https://servist.onrender.com/api/users/shop-timing",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          shopOpen,
          shopClose
        })
      }
    );

    setLoading(false);

    alert("Shop timings updated");

  };

  return (

    <div className="min-h-screen bg-gray-50 pt-28 px-6">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-semibold mb-8">
          Shop Working Hours
        </h1>

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Shop Opening Time
          </label>

          <input
            type="time"
            value={shopOpen}
            onChange={(e)=>setShopOpen(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        <div className="mb-8">

          <label className="block mb-2 font-medium">
            Shop Closing Time
          </label>

          <input
            type="time"
            value={shopClose}
            onChange={(e)=>setShopClose(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>

        <button
          onClick={saveTiming}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save Timings"}
        </button>

      </div>

    </div>

  );

}

export default ProviderAvailabilityPage;