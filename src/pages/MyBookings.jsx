import { useEffect, useState } from "react";
import axios from "axios";
import { getUserFromToken } from "../utils/auth";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = getUserFromToken();

  const fetchBookings = () => {
    axios.get("http://localhost:5000/api/bookings/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setBookings(res.data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
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
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.map(b => (
        <div key={b._id} className="bg-white p-4 shadow rounded-lg mb-4">
          <p><strong>Service:</strong> {b.service.title}</p>
          <p><strong>Date:</strong> {b.date}</p>
          <p><strong>Time:</strong> {b.timeSlot}</p>

          <p><strong>Status:</strong> {b.status}</p>

          {/* Provider can update */}
          {user.role === "provider" && (
            <select
              value={b.status}
              onChange={(e) => updateStatus(b._id, e.target.value)}
              className="mt-2 border p-2 rounded"
            >
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;