import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProviderLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/provider-dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT */}
      <div className="md:w-1/2 text-black flex justify-center items-center p-12">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold mb-6">Provider Portal</h1>
          <p className="text-lg text-black/80 max-w-md">
            Manage your services and bookings from one powerful dashboard.
          </p>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">Provider Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition">
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Don't have an account?
            <span
              onClick={() => navigate("/provider-register")}
              className="text-indigo-600 ml-1 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default ProviderLogin;