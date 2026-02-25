import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleBooking = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          serviceId: id,
          date,
          timeSlot
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Booking Confirmed!");
      navigate("/my-bookings");

    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">
        Select Slot
      </h2>

      <input
        type="date"
        className="w-full p-3 border rounded-xl mb-4"
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        className="w-full p-3 border rounded-xl mb-4"
        onChange={(e) => setTimeSlot(e.target.value)}
      >
        <option>Select Time Slot</option>
        <option>9:00 AM</option>
        <option>11:00 AM</option>
        <option>2:00 PM</option>
        <option>5:00 PM</option>
      </select>

      <button
        onClick={handleBooking}
        className="w-full bg-indigo-600 text-white p-3 rounded-xl"
      >
        Confirm Booking
      </button>
    </div>
  );
}

export default BookService;