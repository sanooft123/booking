import { getUserFromToken } from "../utils/auth";

function Profile() {
  const user = getUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="p-8 max-w-lg mx-auto">

      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">

        <div className="w-20 h-20 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
          {user?.id?.[0]?.toUpperCase() || "U"}
        </div>

        <h2 className="mt-4 text-xl font-bold capitalize">
          {user.role}
        </h2>

        <p className="text-gray-500 mt-2">
          ID: {user.id}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;