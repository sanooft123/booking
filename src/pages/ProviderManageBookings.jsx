import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User
} from "lucide-react";

export default function ProviderManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROVIDER BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    const interval = setInterval(() => {
      fetchBookings();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Manage Bookings
        </h1>

        <div className="space-y-6">

          {bookings.length === 0 && (
            <div className="text-gray-500 text-center py-20">
              No bookings yet.
            </div>
          )}

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col lg:flex-row justify-between gap-6"
            >
              {/* LEFT */}
              <div className="flex gap-6 flex-1">

                <img
                  src={booking.service?.image}
                  alt="service"
                  className="w-28 h-28 rounded-xl object-cover border"
                />

                <div>
                  <h3 className="text-xl font-semibold">
                    {booking.service?.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <User className="w-4 h-4" />
                    {booking.customer?.name}
                  </div>

                  <div className="flex gap-6 text-gray-600 text-sm mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {booking.timeSlot}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-4 items-start lg:items-end">

                {/* Status Badge */}
                {booking.status === "completed" ? (
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                    Completed
                  </span>
                ) : booking.status === "cancelled" ? (
                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm">
                    Cancelled
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm">
                    {booking.status}
                  </span>
                )}

                {/* Action Buttons */}
                {booking.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        updateStatus(booking._id, "confirmed")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(booking._id, "cancelled")
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {booking.status === "confirmed" && (
                  <button
                    onClick={() =>
                      updateStatus(booking._id, "in-progress")
                    }
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Start Service
                  </button>
                )}

                {booking.status === "in-progress" && (
                  <button
                    onClick={() =>
                      updateStatus(booking._id, "completed")
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}