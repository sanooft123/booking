import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Hash
} from "lucide-react";
import Footer from "../components/Footer";

export default function MyBookings() {
  const [bookingToCancel, setBookingToCancel] = useState(null);
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

  /* ================= REALTIME AUTO REFRESH ================= */
  useEffect(() => {
    fetchBookings();

    const interval = setInterval(() => {
      fetchBookings();
    }, 5000); // refresh every 5 sec

    return () => clearInterval(interval);
  }, []);


  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") {
      return booking.status !== "completed" && booking.status !== "cancelled";
    }
    return booking.status === activeTab;
  });

  // cancel filter
  const canCancel = (booking) => {
    const startTimeString = booking.timeSlot.split("-")[0];

    const convertTo24Hour = (time) => {
      const match = time.match(/(\d+):(\d+)(AM|PM)/);
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3];

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      return { hours, minutes };
    };

    const { hours, minutes } = convertTo24Hour(startTimeString);

    // 🔥 IMPORTANT: Create local date properly
    const [year, month, day] = booking.date.split("-");

    const bookingDateTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      hours,
      minutes,
      0
    );

    const now = new Date();

    const diffInHours = (bookingDateTime - now) / (1000 * 60 * 60);

    return diffInHours >= 4;
  };

  /* ================= CANCEL ================= */
  const cancelBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setBookingToCancel(null);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Cancellation failed");
    }
  };


  /* ================= DATE FORMAT ================= */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading your bookings...
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
            Track and manage your service appointments
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

        {/* Cards */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col lg:flex-row gap-6 justify-between"
            >
              {/* LEFT */}
              <div className="flex gap-6 flex-1">

                {/* Service Image */}
                <img
                  src={booking.service?.image}
                  alt="service"
                  className="w-28 h-28 rounded-xl object-cover border"
                />

                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {booking.service?.title}
                  </h3>

                  <p className="text-gray-500">
                    {booking.provider?.shopName}
                  </p>

                  {/* Booking ID */}
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                    <Hash className="w-4 h-4" />
                    {booking._id.slice(-6)}
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-6 text-gray-600 text-sm mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(booking.date)}
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
              </div>

              {/* RIGHT */}
              <div className="flex flex-col lg:items-end gap-4">

                {/* Status */}
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

                {/* Price */}
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900">
                    ₹{booking.service?.price}
                  </p>
                  <p className="text-gray-500 text-sm">Total</p>
                </div>

                {/* Actions */}
                {booking.status === "pending" && (
                  <button
                    onClick={() => setBookingToCancel(booking)}
                    disabled={!canCancel(booking)}
                    className={`px-6 py-2 rounded-lg transition ${
                      canCancel(booking)
                        ? "border hover:bg-gray-100"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {canCancel(booking)
                      ? "Cancel Booking"
                      : "Cannot Cancel (<4 hrs)"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center text-gray-500 py-20 text-lg">
              No {activeTab} bookings found.
            </div>
          )}
        </div>
      </div>

      {/* ================= CANCEL CONFIRMATION MODAL ================= */}
      {bookingToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Cancel Booking?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking for{" "}
              <span className="font-medium">
                {bookingToCancel.service?.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setBookingToCancel(null)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                No
              </button>

              <button
                onClick={() => cancelBooking(bookingToCancel._id)}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}