import React from "react";

const CartModal = ({ isOpen, onClose, cartItems }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">

      {/* RIGHT SIDE DRAWER */}
      <div className="bg-white w-full sm:w-[400px] h-full p-5 overflow-y-auto shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Booking</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* CART ITEMS */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No services added</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-3 flex justify-between"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    📅 {item.date}
                  </p>
                  <p className="text-sm text-gray-500">
                    ⏰ {item.time}
                  </p>
                </div>

                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}

        {/* TOTAL */}
        <div className="mt-6 border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* BUTTON */}
        <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
          Continue Booking →
        </button>

      </div>
    </div>
  );
};

export default CartModal;