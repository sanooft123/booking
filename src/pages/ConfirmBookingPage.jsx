import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ConfirmBookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const { selectedDate, selectedSlot, notes } = location.state || {};

  /* ================= FETCH SERVICE ================= */
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/services/${id}`
        );
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  /* ================= PLACE BOOKING ================= */
  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: id,
          date: selectedDate,
          timeSlot: selectedSlot,
          notes
        })
      });

      alert("Booking Confirmed 🎉");
      navigate("/my-bookings");

    } catch (error) {
      alert("Failed to book service");
    }
  };

  if (!selectedDate || !selectedSlot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-lg">
          Booking details missing. Please go back.
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading service details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-32 px-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-semibold mb-8">
          Confirm Booking
        </h1>

        {/* Service Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 flex gap-6">
          <img
            src={service?.image || "/default-service.jpg"}
            alt={service?.title}
            className="w-32 h-32 object-cover rounded-lg"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {service?.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {service?.description}
            </p>

            <p className="mt-3 font-semibold text-indigo-600">
              ₹ {service?.price}
            </p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">

          <div className="flex justify-between">
            <span className="font-medium">Date</span>
            <span>{selectedDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Time Slot</span>
            <span>{selectedSlot}</span>
          </div>

          {notes && (
            <div>
              <span className="font-medium block mb-1">
                Notes
              </span>
              <p className="text-gray-600 text-sm">
                {notes}
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md py-4 px-6">

        <div className="max-w-4xl mx-auto flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 rounded-lg"
          >
            Back
          </button>

          <div className="hidden sm:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              Booking
            </div>

            <div className="w-16 h-[2px] bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
              Confirm booking
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Confirm
          </button>

        </div>
      </div>

    </div>
  );
}

export default ConfirmBookingPage;