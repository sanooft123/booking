import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, Clock, User } from "lucide-react";

export default function ProviderManageBookings() {

  const [bookings, setBookings] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState("");

  /* FILTER STATES */
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const token = localStorage.getItem("token");

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {
    try {

      const res = await axios.get(
        "https://servist.onrender.com/api/bookings/my",
        {
          headers: { Authorization: `Bearer ${token}` }
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

  /* ================= FILTER BOOKINGS ================= */

  const filteredBookings = bookings.filter((booking) => {

    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false;
    }

    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0];
      if (booking.date !== today) {
        return false;
      }
    }

    return true;
  });

  /* ================= FETCH AVAILABLE STAFF ================= */

  const fetchAvailableStaff = async (booking) => {

    try {

      const res = await axios.get(
        "https://servist.onrender.com/api/bookings/available-staff",
        {
          params: {
            date: booking.date,
            timeSlot: booking.timeSlot
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStaffList(res.data);

    } catch (error) {
      console.error("Failed to fetch available staff", error);
    }

  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `https://servist.onrender.com/api/bookings/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchBookings();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to update");
    }
  };

  /* ================= OPEN ASSIGN STAFF POPUP ================= */

  const openAssignPopup = (booking) => {

    setSelectedBooking(booking);
    setSelectedStaffId("");
    setShowStaffModal(true);

    fetchAvailableStaff(booking);

  };

  /* ================= ASSIGN STAFF ================= */

  const assignStaff = async () => {

    if (!selectedStaffId) {
      alert("Please select staff");
      return;
    }

    try {

      await axios.put(
        `https://servist.onrender.com/api/bookings/assign-staff/${selectedBooking._id}`,
        { staffId: selectedStaffId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShowStaffModal(false);
      setSelectedStaffId("");
      fetchBookings();

    } catch (error) {
      alert(error.response?.data?.message || "Assignment failed");
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

        <h1 className="text-4xl font-bold mb-6">
          Manage Bookings
        </h1>

        {/* ================= FILTERS ================= */}

        <div className="flex flex-wrap gap-4 mb-10">

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="assigned">Assigned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
          </select>

        </div>

        <div className="space-y-6">

          {filteredBookings.length === 0 && (
            <div className="text-gray-500 text-center py-20">
              No bookings found for this filter
            </div>
          )}

          {filteredBookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col lg:flex-row justify-between gap-6"
            >

              {/* LEFT SECTION */}

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

                  {booking.staffAssigned && (
                    <p className="text-sm text-gray-500 mt-3">
                      Staff: {booking.staffAssigned.name}
                    </p>
                  )}

                </div>

              </div>

              {/* RIGHT SECTION */}

              <div className="flex flex-col gap-4 items-start lg:items-end">

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

                {booking.status === "pending" && (

                  <div className="flex gap-3">

                    <button
                      onClick={() => updateStatus(booking._id, "confirmed")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(booking._id, "cancelled")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </div>

                )}

                {booking.status === "confirmed" && (

                  <button
                    onClick={() => openAssignPopup(booking)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Assign Staff
                  </button>

                )}

                {booking.status === "assigned" && (

                  <button
                    onClick={() => updateStatus(booking._id, "in-progress")}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Start Service
                  </button>

                )}

                {booking.status === "in-progress" && (

                  <button
                    onClick={() => updateStatus(booking._id, "completed")}
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

      {/* ================= STAFF ASSIGN MODAL ================= */}

      {showStaffModal && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

          <div className="bg-white rounded-xl p-6 w-96">

            <h2 className="text-xl font-semibold mb-4">
              Assign Staff
            </h2>

            <select
              className="w-full border rounded-lg p-2 mb-4"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
            >

              <option value="">Select Staff</option>

              {staffList.length === 0 ? (
                <option disabled>No staff available for this time</option>
              ) : (
                staffList.map((staff) => (
                  <option key={staff._id} value={staff._id}>
                    {staff.name}
                  </option>
                ))
              )}

            </select>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowStaffModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={assignStaff}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Assign
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}