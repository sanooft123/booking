import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

function AuthDrawer({ isOpen, onClose, onSuccess }) {
  const [mode, setMode] = useState("login"); // login | register
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const resetState = () => {
    setMode("login");
    setStep(1);
    setName("");
    setPhone("");
    setOtp("");
    setLoading(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/otp/send-otp", { phone });
      setStep(2);
      setLoading(false);
    } catch {
      setLoading(false);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const url =
        mode === "register"
          ? "http://localhost:5000/api/otp/register"
          : "http://localhost:5000/api/otp/verify-otp";

      const payload =
        mode === "register"
          ? { name, phone, otp }
          : { phone, otp };

      const res = await axios.post(url, payload);

      localStorage.setItem("token", res.data.token);

      setLoading(false);
      handleClose();

      if (onSuccess) onSuccess();

    } catch {
      setLoading(false);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Overlay */}
      <div
        className="flex-1 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Drawer */}
      <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl relative animate-slideInRight p-8 overflow-y-auto">

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-600"
        >
          <X size={22} />
        </button>

        {/* Illustration */}
        <div className="flex justify-end mt-4">
          <img
            src="/auth.png"
            alt="auth"
            className="w-24"
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">
          {step === 1
            ? mode === "login"
              ? "Login"
              : "Register"
            : "Verify OTP"}
        </h2>

        <p className="text-gray-500 mt-2">
          {mode === "login"
            ? "Login to your Fixail account"
            : "Create your Fixail account"}
        </p>

        <div className="w-12 h-[2px] bg-gray-800 mt-4 mb-8"></div>

        {/* Step 1 */}
        {step === 1 ? (
          <form onSubmit={sendOtp} className="space-y-6">

            {mode === "register" && (
              <div>
                <label className="text-gray-700 font-medium text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full mt-2 bg-gray-100 rounded-lg px-4 py-3 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="text-gray-700 font-medium text-sm">
                Phone Number
              </label>

              <div className="flex mt-2 gap-3">
                <div className="flex items-center px-3 bg-gray-100 rounded-lg text-sm">
                  IN +91
                </div>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="flex-1 bg-gray-100 rounded-lg px-4 py-3 outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-400 text-white py-3 rounded-lg font-medium hover:bg-gray-500 transition"
            >
              {loading ? "Sending..." : mode === "login" ? "Login" : "Register"}
            </button>
          </form>
        ) : (
          /* Step 2 OTP */
          <form onSubmit={verifyOtp} className="space-y-6">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Toggle Login/Register */}
        {step === 1 && (
          <p className="text-sm text-gray-600 mt-8 text-center">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setMode("register")}
                  className="underline font-medium cursor-pointer"
                >
                  Register
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="underline font-medium cursor-pointer"
                >
                  Login
                </span>
              </>
            )}
          </p>
        )}

        {/* Terms */}
        <p className="text-sm text-gray-600 mt-6">
          By continuing, you agree to our{" "}
          <span className="underline font-medium cursor-pointer">
            Terms and Conditions
          </span>{" "}
          and{" "}
          <span className="underline font-medium cursor-pointer">
            Privacy Policy
          </span>.
        </p>

      </div>
    </div>
  );
}

export default AuthDrawer;