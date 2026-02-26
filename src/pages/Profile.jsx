import { useState } from "react";
import {
  User,
  Wallet,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "New York, NY",
    walletBalance: 240,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-10">
          My Profile
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <aside className="hidden lg:block bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="space-y-3">

              {/* Profile Button */}
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                  activeTab === "profile"
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <User className="w-5 h-5" />
                Profile Details
              </button>

              {/* Wallet Button */}
              <button
                onClick={() => setActiveTab("wallet")}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                  activeTab === "wallet"
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Wallet className="w-5 h-5" />
                Wallet
              </button>

              {/* Settings Button */}
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                  activeTab === "settings"
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>

              {/* Privacy Button */}
              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition ${
                  activeTab === "privacy"
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Shield className="w-5 h-5" />
                Privacy Policy
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-6"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>

            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">

            {/* Profile Details */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Profile Details
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="mt-2 w-full border rounded-lg px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="mt-2 w-full border rounded-lg px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <input
                        type="text"
                        defaultValue={user.phone}
                        className="mt-2 w-full border rounded-lg px-4 py-3"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <input
                        type="text"
                        defaultValue={user.location}
                        className="mt-2 w-full border rounded-lg px-4 py-3"
                      />
                    </div>
                  </div>

                  <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Wallet */}
            {activeTab === "wallet" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Wallet</h2>

                <div className="bg-indigo-600 text-white rounded-xl p-8 mb-8">
                  <p className="text-lg">Available Balance</p>
                  <h3 className="text-4xl font-bold mt-2">
                    ${user.walletBalance}
                  </h3>
                </div>

                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                  Add Funds
                </button>
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Settings</h2>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span>Email Notifications</span>
                    <input type="checkbox" defaultChecked />
                  </div>

                  <div className="flex justify-between items-center">
                    <span>SMS Notifications</span>
                    <input type="checkbox" />
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Dark Mode</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeTab === "privacy" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">
                  Privacy Policy
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  We value your privacy. Your personal information is securely
                  stored and never shared with third parties without your
                  consent.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}