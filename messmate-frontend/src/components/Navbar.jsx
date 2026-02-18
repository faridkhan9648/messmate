import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          MessMate
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>

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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>

          {!isAuthenticated && !isHomePage && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-center"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-green-500 text-white px-3 py-1 rounded text-center"
              >
                Signup
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <span>
                Welcome, <strong>{user.username}</strong> 👋
              </span>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;






