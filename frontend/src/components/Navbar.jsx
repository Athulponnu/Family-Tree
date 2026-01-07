import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuth(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuth(false);
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
        {!isAuth ? (
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
            <button
              onClick={logout}
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
