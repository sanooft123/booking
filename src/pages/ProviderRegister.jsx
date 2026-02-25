import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProviderRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "provider"
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/provider-login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white flex flex-col justify-center items-center p-12">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold mb-6">Become a Provider</h1>
          <p className="text-lg text-white/80 max-w-md">
            Offer your services, manage bookings, and grow your business with BookingApp.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">Provider Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition">
              Register as Provider
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?
            <span
              onClick={() => navigate("/provider-login")}
              className="text-purple-600 ml-1 cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default ProviderRegister;



