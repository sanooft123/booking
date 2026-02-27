import { X } from "lucide-react";

const LoginDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="w-full sm:w-[400px] bg-white h-full shadow-xl p-6 relative animate-slideInRight">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-semibold mt-10">Login</h2>
        <p className="text-gray-500 mt-2">
          Login to continue booking
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Enter phone number"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDrawer;