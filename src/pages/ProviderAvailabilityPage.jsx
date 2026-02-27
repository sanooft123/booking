import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const PRESET_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

function ProviderAvailabilityPage() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const token = localStorage.getItem("token");

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔒 Protect Route */
  useEffect(() => {
    if (!user || user.role !== "provider") {
      navigate("/");
    }
  }, [user, navigate]);

  /* Fetch Services */
  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch(
        "http://localhost:5000/api/services/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await res.json();
      setServices(data);
    };

    fetchServices();
  }, [token]);

  /* Fetch Availability */
  useEffect(() => {
    if (!selectedService) return;

    const fetchAvailability = async () => {
      const res = await fetch(
        `http://localhost:5000/api/availability/${selectedService}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await res.json();
      setAvailability(data);
    };

    fetchAvailability();
  }, [selectedService, token]);

  /* Toggle Slot */
  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  /* Save Slots */
  const handleSaveSlots = async () => {
    if (!date || selectedSlots.length === 0) {
      alert("Select date and slots");
      return;
    }

    setLoading(true);

    await fetch("http://localhost:5000/api/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        serviceId: selectedService,
        date,
        slots: selectedSlots.map((time) => ({
          time,
          isBooked: false
        }))
      })
    });

    setSelectedSlots([]);
    setDate("");

    const res = await fetch(
      `http://localhost:5000/api/availability/${selectedService}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    const data = await res.json();
    setAvailability(data);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6 pb-20">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-semibold mb-10">
          Manage Availability
        </h1>

        {/* Select Service */}
        <div className="mb-10">
          <label className="font-medium block mb-2">
            Select Service
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Choose Service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        {/* Preset Slots */}
        {selectedService && (
          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-lg font-medium mb-6">
              Select Date & Time Slots
            </h2>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-4 py-3 rounded-lg mb-6"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {PRESET_SLOTS.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => toggleSlot(slot)}
                  className={`py-3 rounded-lg text-sm font-medium border transition ${
                    selectedSlots.includes(slot)
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button
              onClick={handleSaveSlots}
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Saving..." : "Save Slots"}
            </button>
          </div>
        )}

        {/* Existing Availability */}
        {availability.length > 0 && (
          <div className="space-y-8">
            {availability.map((day) => (
              <div
                key={day._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="font-semibold text-lg mb-4">
                  {day.date}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {day.slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        slot.isBooked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ProviderAvailabilityPage;