import { useState } from "react";
import axios from "axios";

function CreateService() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/services",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Service created successfully!");
    } catch {
      alert("Failed to create service");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Service Title"
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          placeholder="Category"
          className="w-full p-3 border rounded-xl"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-xl"
        >
          Create Service
        </button>

      </form>
    </div>
  );
}

export default CreateService;