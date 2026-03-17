import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function ProviderDashboard() {
  const [data, setData] = useState({});
  const [trend, setTrend] = useState([]);
  const [filter, setFilter] = useState("daily");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  /* ================= FETCH DASHBOARD ================= */
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://servist.onrender.com/api/dashboard?filter=${filter}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH TREND ================= */
  const fetchTrend = async () => {
    try {
      const res = await axios.get(
        "https://servist.onrender.com/api/dashboard/revenue-trend",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTrend(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= SOCKET REAL-TIME ================= */
  useEffect(() => {
    const socket = io("https://servist.onrender.com");

    socket.on("new-booking", (payload) => {
      if (payload.providerId === userId) {
        alert("🔔 New Booking Received!");
        fetchDashboard();
        fetchTrend();
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    fetchDashboard();
    fetchTrend();
  }, [filter]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Provider Dashboard</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="daily">Today</option>
          <option value="weekly">Last 7 Days</option>
          <option value="monthly">Last 30 Days</option>
        </select>
      </div>

      {/* STATS */}
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-5 gap-6 mb-10">
            <Card title="Total Bookings" value={data.totalBookings} />
            <Card title="New Today" value={data.newBookings} color="text-blue-600" />
            <Card title="Upcoming" value={data.upcomingBookings} color="text-yellow-600" />
            <Card title="Completed" value={data.completedBookings} color="text-green-600" />
            <Card title="Revenue" value={`₹${data.revenue}`} color="text-purple-600" />
          </div>

          {/* REVENUE GRAPH */}
          <RevenueGraph trend={trend} />

          {/* RECENT BOOKINGS */}
          <div className="bg-white shadow rounded-2xl p-6 mt-10">
            <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>

            {data.recentBookings?.length === 0 && (
              <p className="text-gray-500">No recent bookings</p>
            )}

            <div className="space-y-4">
              {data.recentBookings?.map((booking) => (
                <div
                  key={booking._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">{booking.customer?.name}</p>
                    <p className="text-sm text-gray-500">
                      {booking.service?.title}
                    </p>
                    <p className="text-sm text-gray-400">
                      {booking.date} | {booking.timeSlot}
                    </p>
                  </div>

                  <div className="text-right">
                    <StatusBadge status={booking.status} />
                    <p className="text-yellow-500 text-sm mt-1">
                      ⭐ {booking.rating || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
const Card = ({ title, value, color }) => (
  <div className="bg-white shadow-md rounded-2xl p-6">
    <p className="text-gray-500">{title}</p>
    <h3 className={`text-2xl font-bold ${color || ""}`}>
      {value || 0}
    </h3>
  </div>
);

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${colors[status]}`}>
      {status}
    </span>
  );
};

/* ================= REVENUE GRAPH ================= */
const RevenueGraph = ({ trend }) => {

  const data = {
    labels: trend.map(item => item._id),
    datasets: [
      {
        label: "Revenue",
        data: trend.map(item => item.revenue),
        borderColor: "#7c3aed",
        backgroundColor: "#ede9fe",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-4">
        Revenue Trend (Last 7 Days)
      </h3>
      <Line data={data} />
    </div>
  );
};

export default ProviderDashboard;