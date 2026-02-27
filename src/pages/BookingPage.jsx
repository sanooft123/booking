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

        console.log("Availability Data:", data);

        const data = await res.json();

        if (Array.isArray(data)) {
          setAvailability(data);

          // Auto select first available date
          if (data.length > 0) {
            setSelectedDate(data[0].date);
          }
        } else {
          setAvailability([]);
        }

      } catch (error) {
        console.error(error);
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [id]);

  /* ================= FIND SELECTED DATE ================= */
  const selectedDateData = availability.find(
    (item) => item.date === selectedDate
  );

  const availableSlots = selectedDateData?.slots || [];

  /* ================= NEXT ================= */
  const handleNext = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select date and slot");
      return;
    }

    navigate(`/confirm-booking/${id}`, {
      state: {
        selectedDate,
        selectedSlot,
        notes
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-28 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-semibold mb-10">
          Book Service
        </h1>

        {/* ================= DATE DROPDOWN ================= */}
        <div className="mb-8">
          <label className="block font-medium mb-3">
            Date
          </label>

          <select
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedSlot("");
            }}
            className="w-full border px-4 py-4 rounded-lg bg-white"
          >
            {availability.length === 0 && (
              <option>No dates available</option>
            )}

            {availability.map((item) => (
              <option key={item.date} value={item.date}>
                {item.date}
              </option>
            ))}
          </select>
        </div>

        {/* ================= TIME SLOTS ================= */}
        <div className="mb-10">
          <label className="block font-medium mb-4">
            Time Slots
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                className={`py-4 rounded-lg text-sm font-medium border transition
                  ${
                    slot.isBooked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedSlot === slot.time
                      ? "bg-indigo-600 text-white"
                      : "bg-white hover:border-indigo-500"
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
            className="w-full border px-4 py-4 rounded-lg"
          />
        </div>

      </div>

      {/* ================= BOTTOM STICKY ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-6 py-4 flex items-center justify-between">

        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 px-6 py-3"
        >
          Cancel
        </button>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
            Booking
          </div>

          <div className="w-16 h-[2px] bg-gray-300"></div>

          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-4 h-4 rounded-full border"></div>
            Confirm booking
          </div>
        </div>

        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg"
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default BookingPage;