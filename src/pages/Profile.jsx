import { useState, useEffect } from "react";
import {
  User,
  Wallet,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const [amount, setAmount] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // 🔥 Fetch Profile From Backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [token]);

  // 🔥 Update Profile
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      setUser(data);
      alert("Profile Updated!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return null;


  const handleAddFunds = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile/wallet", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ amount: Number(amount) })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error updating wallet");
        return;
      }

      setUser(data);   // Update UI instantly
      setAmount("");
      alert("Funds added successfully!");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold mb-10">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 h-fit space-y-3">

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                activeTab === "profile"
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <User className="w-5 h-5" />
              Profile Details
            </button>

            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg ${
                activeTab === "wallet"
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Wallet className="w-5 h-5" />
              Wallet
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>

            <button
              onClick={() => setActiveTab("privacy")}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              <Shield className="w-5 h-5" />
              Privacy
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-6"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">

            {activeTab === "profile" && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Profile Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name || ""}
                    onChange={(e) =>
                      setUser({ ...user, name: e.target.value })
                    }
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ""}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={user.phone || ""}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Location */}
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={user.location || ""}
                    onChange={(e) =>
                      setUser({ ...user, location: e.target.value })
                    }
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

              </div>

                <button
                  onClick={handleSave}
                  className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </>
            )}

            {activeTab === "wallet" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                Wallet
              </h2>

              {/* Wallet Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 mb-8 shadow-lg">
                <p className="text-lg">Available Balance</p>
                <h3 className="text-4xl font-bold mt-2">
                  ${user.walletBalance}
                </h3>
              </div>

              {/* Add Funds Section */}
              <div className="bg-white border rounded-xl p-6 shadow-sm max-w-md">

                <label className="block text-sm text-gray-500 mb-2">
                  Add Amount
                </label>

                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <button
                    onClick={handleAddFunds}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    Add
                  </button>
                </div>

              </div>
            </>
          )}

            {activeTab === "settings" && (
              <div>Settings Content</div>
            )}

            {activeTab === "privacy" && (
              <div>Privacy Policy Content</div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}