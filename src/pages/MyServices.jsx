import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  /* ================= CATEGORY LABEL MAP ================= */
  const categoryLabels = {
    home: "Home Services",
    fitness: "Fitness & Gym",
    beauty: "Beauty & Salon",
    healthcare: "Healthcare",
    automobile: "Automobile Services",
    laundry: "Laundry Services",
    entertainment: "Entertainment",
    repairs: "Repairs & Maintenance"
  };

  /* ================= FETCH SERVICES ================= */
  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/services/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setServices(res.data);
      setLoading(false);

    } catch (error) {
      alert("Failed to load services");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* ================= DELETE SERVICE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/services/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Remove deleted service from UI
      setServices((prev) =>
        prev.filter((service) => service._id !== id)
      );

    } catch (error) {
      alert("Failed to delete service");
    }
  };

  if (loading) {
    return (
      <div className="p-8 pt-24">
        <h2 className="text-xl font-semibold">
          Loading services...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 pt-24 pb-20 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          My Services
        </h2>

        <button
          onClick={() => navigate("/create-service")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Service
        </button>
      </div>

      {/* Empty State */}
      {services.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
          You haven’t created any services yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image || "https://via.placeholder.com/400"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">

                <h3 className="text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {categoryLabels[service.category]}
                </p>

                <p className="mt-3 text-gray-600 text-sm">
                  {service.description}
                </p>

                <p className="mt-3 font-semibold text-indigo-600">
                  ₹{service.price}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => navigate(`/create-service/${service._id}`)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(service._id)
                    }
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyServices;