import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* LEFT */}
      <Link to="/" className="text-xl font-semibold tracking-wide">
        FamilyTree
      </Link>

      {/* RIGHT */}
      <div className="space-x-6 flex items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/families" className="hover:text-gray-300">
              My Families
            </Link>

            <Link
              to="/families/create"
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
            >
              + Create Family
            </Link>

            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
