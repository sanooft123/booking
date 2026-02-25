import { useEffect, useState } from "react";
import axios from "axios";

function ProviderDashboard() {
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("daily");

  const fetchData = async (selectedFilter) => {
    const res = await axios.get(
      `http://localhost:5000/api/dashboard?filter=${selectedFilter}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setStats(res.data);
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Provider Dashboard</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h3 className="text-2xl font-bold">
            {stats.totalBookings || 0}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Upcoming</p>
          <h3 className="text-2xl font-bold text-blue-600">
            {stats.upcomingBookings || 0}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Completed</p>
          <h3 className="text-2xl font-bold text-green-600">
            {stats.completedBookings || 0}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Revenue</p>
          <h3 className="text-2xl font-bold text-purple-600">
            ₹{stats.revenue || 0}
          </h3>
        </div>

      </div>
    </div>
  );
}

export default ProviderDashboard;