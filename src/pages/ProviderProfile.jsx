import { useState, useEffect } from "react";
import { User, Store, Clock, LogOut } from "lucide-react";

export default function ProviderProfile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await fetch(
          "https://servist.onrender.com/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        setUser(data);
        setLoading(false);

      } catch (error) {
        console.error(error);
      }

    };

    fetchProfile();

  }, [token]);

  /* ================= SAVE PROFILE ================= */

  const handleSave = async () => {

    try {

      const res = await fetch(
        "https://servist.onrender.com/api/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(user)
        }
      );

      const data = await res.json();

      setUser(data);

      alert("Profile updated successfully");

    } catch (error) {
      console.error(error);
    }

  };

  if (loading) {
    return (
      <div className="p-10">Loading...</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20 pb-20">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-10">
          Provider Profile
        </h1>

        {/* ================= PROFILE DETAILS ================= */}

        <div className="bg-white rounded-xl shadow p-8 mb-10">

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="w-5 h-5"/>
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              value={user.name || ""}
              onChange={(e)=>
                setUser({...user, name:e.target.value})
              }
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={(e)=>
                setUser({...user, email:e.target.value})
              }
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone"
              value={user.phone || ""}
              onChange={(e)=>
                setUser({...user, phone:e.target.value})
              }
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Location"
              value={user.location || ""}
              onChange={(e)=>
                setUser({...user, location:e.target.value})
              }
              className="border rounded-lg px-4 py-3"
            />

          </div>

        </div>

        {/* ================= SHOP DETAILS ================= */}

        <div className="bg-white rounded-xl shadow p-8 mb-10">

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Store className="w-5 h-5"/>
            Shop Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Shop Name"
              value={user.shopName || ""}
              onChange={(e)=>
                setUser({...user, shopName:e.target.value})
              }
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Shop Address"
              value={user.location || ""}
              onChange={(e)=>
                setUser({...user, location:e.target.value})
              }
              className="border rounded-lg px-4 py-3"
            />

            <textarea
              placeholder="Shop Description"
              value={user.shopDescription || ""}
              onChange={(e)=>
                setUser({...user, shopDescription:e.target.value})
              }
              className="border rounded-lg px-4 py-3 md:col-span-2"
            />

          </div>

        </div>

        {/* ================= SHOP TIMINGS ================= */}

        <div className="bg-white rounded-xl shadow p-8 mb-10">

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5"/>
            Shop Timings
          </h2>

          <div className="space-y-4">

            {days.map((day)=>(
              
              <div
                key={day}
                className="flex items-center gap-4"
              >

                <span className="w-28 capitalize">
                  {day}
                </span>

                <input
                  type="time"
                  value={user.shopTimings?.[day]?.open || ""}
                  onChange={(e)=>
                    setUser({
                      ...user,
                      shopTimings:{
                        ...user.shopTimings,
                        [day]:{
                          ...user.shopTimings?.[day],
                          open:e.target.value
                        }
                      }
                    })
                  }
                  className="border px-3 py-2 rounded-lg"
                />

                <span>to</span>

                <input
                  type="time"
                  value={user.shopTimings?.[day]?.close || ""}
                  onChange={(e)=>
                    setUser({
                      ...user,
                      shopTimings:{
                        ...user.shopTimings,
                        [day]:{
                          ...user.shopTimings?.[day],
                          close:e.target.value
                        }
                      }
                    })
                  }
                  className="border px-3 py-2 rounded-lg"
                />

              </div>

            ))}

          </div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex gap-4">

          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Save Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 border px-6 py-3 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4"/>
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}