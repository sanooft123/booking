import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreateService() {

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState(""); // ⭐ NEW
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const categories = [
    { key: "home", label: "Home Services" },
    { key: "fitness", label: "Fitness & Gym" },
    { key: "beauty", label: "Beauty & Salon" },
    { key: "healthcare", label: "Healthcare" },
    { key: "automobile", label: "Automobile Services" },
    { key: "laundry", label: "Laundry Services" },
    { key: "entertainment", label: "Entertainment" },
    { key: "repairs", label: "Repairs & Maintenance" }
  ];

  /* ================= LOAD SERVICE IF EDIT ================= */

  useEffect(() => {

    if (!id) return;

    const fetchService = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/services/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const service = res.data;

        setTitle(service.title);
        setDescription(service.description);
        setPrice(service.price);
        setDuration(service.duration || "30"); // ⭐ load duration
        setCategory(service.category);
        setImage(service.image || "");

        setIsEdit(true);

      } catch (error) {
        alert("Failed to load service");
      }

    };

    fetchService();

  }, [id, token]);

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    try {

      setLoading(true);

      if (isEdit) {

        await axios.put(
          `http://localhost:5000/api/services/${id}`,
          {
            title,
            description,
            price,
            duration,
            category,
            image
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        alert("Service updated successfully!");

      } else {

        await axios.post(
          "http://localhost:5000/api/services",
          {
            title,
            description,
            price,
            duration,
            category,
            image
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        alert("Service created successfully!");

      }

      setLoading(false);
      navigate("/my-services");

    } catch (error) {

      setLoading(false);
      alert("Operation failed");

    }

  };

  return (

    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {isEdit ? "Edit Service" : "Create New Service"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}

          <input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          {/* DESCRIPTION */}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border rounded-lg px-4 py-3"
          />

          {/* PRICE */}

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          {/* ⭐ SERVICE DURATION */}

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}

          </select>

          {/* IMAGE */}

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          {image && (

            <img
              src={image}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg border"
              onError={(e) => (e.target.src = "/default-service.jpg")}
            />

          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              loading
                ? "bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
              ? "Update Service"
              : "Create Service"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateService;