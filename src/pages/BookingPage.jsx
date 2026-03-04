import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH AVAILABILITY ================= */
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/availability/${id}`
        );

        if (!res.ok) throw new Error("Failed to fetch availability");

        const rawData = await res.json();

        if (!Array.isArray(rawData)) {
          setAvailability([]);
          return;
        }

        const normalized = rawData.map((item) => ({
          ...item,
          date: new Date(item.date).toISOString().split("T")[0],
        }));

        setAvailability(normalized);

        if (normalized.length > 0) {
          setSelectedDate(normalized[0].date);
        }
      } catch (error) {
        console.error("Availability error:", error);
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [id]);

  const selectedDateData = availability.find(
    (item) => item.date === selectedDate
  );

  const availableSlots = selectedDateData?.slots || [];

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and slot");
      return;
    }

    navigate(`/confirm-booking/${id}`, {
      state: { selectedDate, selectedSlot, notes },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 pt-24 pb-32 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-12">
          Book Service
        </h1>

        {/* ================= DATE ================= */}
        <div className="mb-10">
          <label className="block font-medium mb-3">
            Date
          </label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot("");
            }}
            className="w-full border bg-white px-5 py-4 rounded-md focus:outline-none"
          />
        </div>

        {/* ================= TIME SLOTS ================= */}
        <div className="mb-12">
          <label className="block font-medium mb-5">
            Time Slots
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {availableSlots.length === 0 && (
              <p className="text-gray-500">
                No slots available
              </p>
            )}

            {availableSlots.map((slot, index) => (
              <button
                key={index}
                disabled={slot.isBooked}
                onClick={() => setSelectedSlot(slot.time)}
                className={`
                  py-5 rounded-md text-sm font-medium transition
                  ${
                    slot.isBooked
                      ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                      : selectedSlot === slot.time
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* ================= NOTES ================= */}
        <div className="mb-20">
          <label className="block font-medium mb-3">
            Your thoughts
          </label>

          <textarea
            rows="5"
            placeholder="Describe the problem you faced"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border bg-white px-5 py-4 rounded-md resize-none focus:outline-none"
          />
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-10 py-5 flex items-center justify-between">

        <button
          onClick={() => navigate(-1)}
          className="text-gray-500"
        >
          Cancel
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700"></div>
            <span>Booking</span>
          </div>

          <div className="w-20 h-[2px] bg-gray-300"></div>

          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-4 h-4 rounded-full border border-gray-400"></div>
            <span>Confirm booking</span>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="bg-blue-700 text-white px-10 py-3 rounded-md hover:bg-blue-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookingPage;