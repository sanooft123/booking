import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/services/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => setServices(res.data))
    .catch(() => alert("Failed to load services"));
  }, []);

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">My Services</h2>

        <button
          onClick={() => navigate("/create-service")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <p>No services created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {services.map(service => (
            <div
              key={service._id}
              className="bg-white shadow rounded-xl p-5"
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p>{service.description}</p>
              <p className="font-semibold mt-2">
                ₹{service.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyServices;