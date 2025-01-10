import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold">
        Medium Clone
      </Link>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <div>
            <Link to="/login" className="px-4 py-2">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;