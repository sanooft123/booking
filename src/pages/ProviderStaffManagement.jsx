import { useState, useEffect } from "react";
import axios from "axios";
import { UserPlus, Trash2 } from "lucide-react";

export default function ProviderStaffManagement() {

  const [staffList, setStaffList] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [workStart, setWorkStart] = useState("");
  const [workEnd, setWorkEnd] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH STAFF ================= */

  const fetchStaff = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/staff/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStaffList(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  /* ================= ADD STAFF ================= */

  const addStaff = async (e) => {

    e.preventDefault();

    if (!name || !phone || !workStart || !workEnd) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/staff/create",
        { name, phone, workStart, workEnd },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setName("");
      setPhone("");
      setWorkStart("");
      setWorkEnd("");

      fetchStaff();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to add staff");
    }
  };

  /* ================= DELETE STAFF ================= */

  const deleteStaff = async (id) => {

    if (!window.confirm("Delete this staff?")) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/staff/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchStaff();

    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Manage Staff
        </h1>

        {/* ADD STAFF FORM */}

        <form
          onSubmit={addStaff}
          className="bg-white p-6 rounded-xl shadow-sm border mb-10"
        >

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New Staff
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Staff Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <div>
              <label className="text-sm text-gray-500">Work Start</label>
              <input
                type="time"
                value={workStart}
                onChange={(e) => setWorkStart(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Work End</label>
              <input
                type="time"
                value={workEnd}
                onChange={(e) => setWorkEnd(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Staff
          </button>

        </form>

        {/* STAFF LIST */}

        <div className="space-y-4">

          {staffList.length === 0 && (
            <p className="text-gray-500 text-center">
              No staff added yet
            </p>
          )}

          {staffList.map((staff) => (

            <div
              key={staff._id}
              className="bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center"
            >

              <div>

                <h3 className="font-semibold text-lg">
                  {staff.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {staff.phone}
                </p>

                <p className="text-gray-500 text-sm">
                  Working: {staff.workStart} - {staff.workEnd}
                </p>

              </div>

              <button
                onClick={() => deleteStaff(staff._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}