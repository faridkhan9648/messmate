import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        MessMate
      </Link>

      <div className="flex items-center space-x-4">

        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>

        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </Link>

        {/* ❌ Hide on Home */}
        {!isAuthenticated && !isHomePage && (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Signup
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <span className="text-gray-700">
              Welcome, <strong>{user.username}</strong> 👋
            </span>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;





