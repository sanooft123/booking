import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Footer from "../components/Footer";

export default function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOKINGS ================= */
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

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {
    fetchBookings();

    const interval = setInterval(() => {
      fetchBookings();
    }, 5000); // refresh every 5 sec

    return () => clearInterval(interval);
  }, []);

  /* ================= STATUS MAPPING ================= */
  const mapStatusToTab = (status) => {
    if (status === "completed") return "completed";
    if (status === "cancelled") return "cancelled";
    return "upcoming"; // pending, accepted, in-progress
  };

  const filteredBookings = bookings.filter(
    (booking) => mapStatusToTab(booking.status) === activeTab
  );

  /* ================= CANCEL BOOKING ================= */
  const cancelBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/status`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      fetchBookings();

    } catch (error) {
      console.error(error);
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage your service bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="inline-flex bg-white rounded-xl shadow-sm p-2 mb-10">
          {["upcoming", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition capitalize ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">

          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >

              {/* Left Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {booking.service?.title}
                </h3>

                <p className="text-gray-500 mb-4">
                  {booking.provider?.shopName}
                </p>

                <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {booking.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {booking.timeSlot}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {booking.provider?.location}
                  </div>
                </div>
              </div>

              {/* Status + Price */}
              <div className="flex flex-col lg:items-end gap-4">

                {/* Booking Status */}
                <div>
                  {booking.status === "completed" ? (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  ) : booking.status === "cancelled" ? (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      {booking.status}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900">
                    ₹{booking.service?.price}
                  </p>
                  <p className="text-gray-500 text-sm">Total</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                    View Details
                  </button>

                  {booking.status === "pending" && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              No {activeTab} bookings found.
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}