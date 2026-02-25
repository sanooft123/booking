import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CustomerRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/otp/send-otp", {
        name,
        phone
      });
      setStep(2);
    } catch {
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/otp/verify-otp",
        { phone, otp }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 text-black flex flex-col justify-center items-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join BookingApp ✨
          </h1>

          <p className="text-lg text-black/80 max-w-md leading-relaxed">
            Create your account in seconds using OTP verification.
            Book trusted services instantly and manage everything easily.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <p>Quick OTP Verification</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <p>Secure & Fast Registration</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black rounded-full"></div>
              <p>Book Services Instantly</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {step === 1 ? "Create Account" : "Verify OTP"}
          </h2>

          {step === 1 ? (
            <form onSubmit={sendOtp} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Send OTP
              </button>

            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">

              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Verify & Register
              </button>

            </form>
          )}

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?
            <span
              onClick={() => navigate("/customer-login")}
              className="text-indigo-600 cursor-pointer ml-1 hover:underline"
            >
              Login
            </span>
          </p>

        </motion.div>
      </div>
    </div>
  );
}

export default CustomerRegister;