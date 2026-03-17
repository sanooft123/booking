import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookingPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH SLOTS ================= */

  const fetchSlots = async (date) => {

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://servist.onrender.com/api/bookings/service-slots?serviceId=${id}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {

        const filteredSlots = filterPastSlots(data, date);

        setSlots(filteredSlots);

      } else {
        setSlots([]);
      }

    } catch (error) {

      console.error("Slot fetch error:", error);
      setSlots([]);

    }

  };

  /* ================= FILTER PAST SLOTS ================= */

  const filterPastSlots = (slotList, date) => {

    const today = new Date().toISOString().split("T")[0];

    if (date !== today) return slotList;

    const now = new Date();

    return slotList.filter((slot) => {

      const startTime = slot.split("-")[0]; 

      const [hours, minutes] = startTime.split(":");

      const slotDate = new Date(date);
      slotDate.setHours(Number(hours));
      slotDate.setMinutes(Number(minutes));
      slotDate.setSeconds(0);

      return slotDate > now;

    });

  };

  /* ================= INITIAL DATE ================= */

  useEffect(() => {

    const today = new Date().toISOString().split("T")[0];

    setSelectedDate(today);

    fetchSlots(today);

    setLoading(false);

  }, [id]);

  /* ================= DATE CHANGE ================= */

  const handleDateChange = (date) => {

    setSelectedDate(date);
    setSelectedSlot("");

    fetchSlots(date);

  };

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );

  }

  const today = new Date().toISOString().split("T")[0];

  return (

    <div className="min-h-screen bg-gray-200 pt-24 pb-32 px-6">

      <div className="max-w-3xl mx-auto">

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
            min={today}   /* 🔥 prevents past dates */
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full border bg-white px-5 py-4 rounded-md"
          />

        </div>

        {/* ================= TIME SLOTS ================= */}

        <div className="mb-12">

          <label className="block font-medium mb-5">
            Time Slots
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">

            {slots.length === 0 && (
              <p className="text-gray-500">
                No slots available
              </p>
            )}

            {slots.map((slot, index) => (

              <button
                key={index}
                onClick={() => setSelectedSlot(slot)}
                className={`py-5 rounded-md text-sm font-medium transition
                ${
                  selectedSlot === slot
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {slot}
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
            className="w-full border bg-white px-5 py-4 rounded-md resize-none"
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
          className="bg-blue-700 text-white px-10 py-3 rounded-md hover:bg-blue-800"
        >
          Next
        </button>

      </div>

    </div>

  );

}

export default BookingPage;