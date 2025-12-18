import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="text-gray-700 font-medium hover:text-indigo-600 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/create"
          className="text-gray-700 font-medium hover:text-indigo-600 transition"
        >
          Create Event
        </Link>
      </div>

      {token && (
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
